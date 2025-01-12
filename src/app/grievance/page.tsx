'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ role: string; content: string; type: 'chat' | 'report' }[]>(() => {
    // Load messages from localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
    return [];
  });
  
  const [loading, setLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [declineMessage, setDeclineMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthesisRef.current = window.speechSynthesis;
      
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          console.log('Voices loaded:', speechSynthesis.getVoices().length);
        };
      }
    }

    if (typeof window !== 'undefined' && consentGiven) {
      initializeSpeechRecognition();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, [consentGiven]);

  const initializeSpeechRecognition = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;  // Enable continuous recognition
    recognition.interimResults = true;  // Enable interim results
    recognition.lang = 'en-US';
    let finalTranscript = '';

    recognition.onstart = () => {
      console.log('Microphone activated');
      setIsListening(true);
      finalTranscript = '';
    };

    recognition.onend = () => {
      console.log('Microphone deactivated');
      setIsListening(false);
      if (finalTranscript.trim()) {
        handleSendMessage(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      let interim = '';
      finalTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      // If we have final transcript but user stopped speaking
      if (finalTranscript && !interim) {
        recognition.stop();
      }
    };

    recognitionRef.current = recognition;

    // Initial greeting
    setTimeout(() => {
      const initialGreeting = "Hello, this is Aegis from the cybercrime cell, How can I assist you!";
      speakMessage(initialGreeting);
    }, 1000);
  };

  const speakMessage = async (message: string) => {
    return new Promise<void>((resolve) => {
      if (!synthesisRef.current) {
        console.error('Speech synthesis not initialized');
        resolve();
        return;
      }

      // Cancel any ongoing speech
      synthesisRef.current.cancel();

      // Stop listening while speaking
      stopListening();

      const utterance = new SpeechSynthesisUtterance(message);
      
      // Get available voices
      const voices = synthesisRef.current.getVoices();
      
      // Try to find a female English voice
      const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('woman') || 
        voice.name.includes('girl')
      );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        console.log('Started speaking');
      };
      
      utterance.onend = () => {
        console.log('Finished speaking');
        // Check message length before reactivating microphone
        if (message.length <= 120) {
          setTimeout(() => {
            reactivateMicrophone();
          }, 200);
        }
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        resolve();
      };

      // Only speak if message is not too long
      if (message.length <= 120) {
        synthesisRef.current.speak(utterance);
      } else {
        console.log('Message too long for speech synthesis');
        resolve();
      }
    });
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        // If recognition is already started, stop and start again
        if (error.name === 'InvalidStateError') {
          recognitionRef.current.stop();
          setTimeout(() => {
            recognitionRef.current.start();
          }, 100);
        }
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const reactivateMicrophone = () => {
    if (isVoiceMode && !isListening && !loading) {
      console.log('Reactivating microphone');
      startListening();
    }
  };

  const handleSilence = async () => {
    const silenceMessage = "I didn't hear anything. Could you please speak again?";
    const botMessage = { role: 'assistant', content: silenceMessage, type: 'chat' };
    setMessages(prevMessages => [...prevMessages, botMessage]);
    await speakMessage(silenceMessage);
  };

  // const startListening = () => {
  //   if (recognitionRef.current && !isListening) {
  //     try {
  //       recognitionRef.current.start();
  //     } catch (error) {
  //       console.error('Error starting recognition:', error);
  //     }
  //   }
  // };

  // const stopListening = () => {
  //   if (recognitionRef.current && isListening) {
  //     recognitionRef.current.stop();
  //   }
  //   if (silenceTimeoutRef.current) {
  //     clearTimeout(silenceTimeoutRef.current);
  //   }
  // };

  const handleSendMessage = async (message: string, type: 'chat' | 'report' = 'chat') => {
    if (!message.trim()) return;

    stopListening();
    
    const newMessages = [...messages, { role: 'user', content: message, type }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (data.message) {
        const botMessage = { role: 'assistant', content: data.message, type };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        if (isVoiceMode) {
          await speakMessage(data.message);
        } else {
          reactivateMicrophone();
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportConversationAsJSON = () => {
    if (messages.length === 0) {
      alert('First Provide the incident report and data !!!');
      return;
    }

    // Find the message containing the structured data (usually assistant's response)
    const structuredMessage = messages.find(msg => 
      msg.role === 'assistant' && 
      msg.content.includes('[Victim Name]')
    )?.content || '';

    // Initialize empty values
    let name = '';
    let phone = '';
    let location = '';
    let incidentDate = new Date().toISOString().split('T')[0]; // Current date as default
    let offenderName = '';
    let offenderContact = '';
    let offenderLocation = '';
    let description = '';
    let reportSummary = '';

    // Extract victim details
    const victimNameMatch = structuredMessage.match(/\[Victim Name\]:{([^}]+)}/);
    if (victimNameMatch) name = victimNameMatch[1].trim();

    const victimPhoneMatch = structuredMessage.match(/\[Victim Phone\]:{([^}]+)}/);
    if (victimPhoneMatch) phone = victimPhoneMatch[1].trim();

    const victimLocationMatch = structuredMessage.match(/\[Victim Address\]:{([^}]+)}/);
    if (victimLocationMatch) location = victimLocationMatch[1].trim();

    // Extract offender details
    const offenderNameMatch = structuredMessage.match(/\[Offender Name\]:{([^}]+)}/);
    if (offenderNameMatch) offenderName = offenderNameMatch[1].trim();

    const offenderContactMatch = structuredMessage.match(/\[Offender Contact\]:{([^}]+)}/);
    if (offenderContactMatch) offenderContact = offenderContactMatch[1].trim();

    const offenderLocationMatch = structuredMessage.match(/\[Offender Location\]:{([^}]+)}/);
    if (offenderLocationMatch) offenderLocation = offenderLocationMatch[1].trim();

    // Extract content description
    const contentMatch = structuredMessage.match(/\[Offending Content Description\]:{([^}]+)}/);
    if (contentMatch) description = contentMatch[1].trim();

    // Extract full report
    const reportMatch = structuredMessage.match(/\[Report\]:{([^}]+)}/);
    if (reportMatch) reportSummary = reportMatch[1].trim();

    // Create a comprehensive summary
    const summary = {
      conversation: messages.map((msg, index) => ({
        id: index + 1,
        role: msg.role,
        message: msg.content,
      })),
      complaintDetails: {
        victim: {
          name,
          phone,
          location,
          incidentDate
        },
        offender: {
          name: offenderName,
          contact: offenderContact,
          location: offenderLocation
        },
        incident: {
          description,
          fullReport: reportSummary
        }
      },
      totalMessages: messages.length
    };

    console.log('Extracted Summary:', JSON.stringify(summary, null, 2));

    // Update messages with report summary
    const reportMessage = {
      role: 'assistant',
      content: `Report Summary:
Victim Name: ${name}
Phone: ${phone}
Location: ${location}
Incident Date: ${incidentDate}
Offender Name: ${offenderName}
Offender Contact: ${offenderContact}
Offender Location: ${offenderLocation}
Description: ${description}`,
      type: 'report'
    };

    setMessages(prevMessages => [...prevMessages, reportMessage]);

    // Construct query parameters
    const queryParams = new URLSearchParams({
      name,
      phone,
      location,
      incidentDate,
      offenderName,
      offenderContact,
      offenderLocation,
      description,
      report: reportSummary,
      summary: JSON.stringify(summary.conversation)
    }).toString();

    // Navigate to complaint page with extracted data
    router.push(`/complaint?${queryParams}`);
};

  // const speakMessage = async (message: string) => {
  //   return new Promise<void>((resolve) => {
  //     if (!synthesisRef.current) {
  //       console.error('Speech synthesis not initialized');
  //       resolve();
  //       return;
  //     }

  //     // Cancel any ongoing speech
  //     synthesisRef.current.cancel();

  //     // Stop listening while speaking
  //     stopListening();

  //     const utterance = new SpeechSynthesisUtterance(message);
      
  //     // Get available voices
  //     const voices = synthesisRef.current.getVoices();
      
  //     // Try to find a female English voice
  //     const femaleVoice = voices.find(voice => 
  //       voice.name.includes('Female') || 
  //       voice.name.includes('woman') || 
  //       voice.name.includes('girl')
  //     );

  //     if (femaleVoice) {
  //       utterance.voice = femaleVoice;
  //     }

  //     utterance.lang = 'en-US';
  //     utterance.rate = 1.0;
  //     utterance.pitch = 1.0;
  //     utterance.volume = 1.0; // Maximum volume

  //     utterance.onstart = () => {
  //       console.log('Started speaking');
  //     };
      
  //     utterance.onend = () => {
  //       console.log('Finished speaking');
  //       setTimeout(() => {
  //         reactivateMicrophone();
  //       }, 500);
  //       resolve();
  //     };

  //     utterance.onerror = (event) => {
  //       console.error('Speech synthesis error:', event);
  //       resolve();
  //     };

  //     synthesisRef.current.speak(utterance);
  //   });
  // };

  // const reactivateMicrophone = () => {
  //   if (isVoiceMode && !isListening && !loading) {
  //     console.log('Reactivating microphone');
  //     startListening();
  //   }
  // };

  const handleConsent = () => {
    setConsentGiven(true);
    setDeclineMessage('');
  };

  const handleDecline = () => {
    setDeclineMessage('Please accept the consent to proceed and talk to the AI.');
  };

  const toggleMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (isListening) {
      stopListening();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      handleSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  useEffect(() => {
    if (!isListening && !loading && isVoiceMode) {
      const timeoutId = setTimeout(() => {
        reactivateMicrophone();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isListening, loading, isVoiceMode]);

  return (
    <div>
      {!consentGiven ? (
        <div className="consent-popup">
          <h2>Consent Required</h2>
          <p>
            To continue, we need your consent. Your conversation will be saved and analyzed by the AI to improve the experience and provide you with better support. Do you agree to proceed?
          </p>
          <div className="flex justify-around">
            <Button onClick={handleConsent}>I Agree</Button>
            <Button onClick={handleDecline}>I Decline</Button>
          </div>
          {declineMessage && <p className="text-red-500 mt-4">{declineMessage}</p>}
        </div>
      ) : (
        <>
          <h1 className='mx-auto text-center font-extrabold text-2xl font-serif'>Women's Safety Grievance Registration</h1>
          <div className="video-container mx-auto w-fit">
            <video id="speakingVideo" width="320" height="240" muted autoPlay>
              <source src="/Chatbot.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="chat-box mx-72 px-8 py-4 max-h-96 min-h-96 rounded-3xl shadow-2xl shadow-lime-400 border-2 overflow-y-auto">
            <p>
              <span className="border-2 rounded-lg px-2 py-1 inline-block bg-green-100">
                <span className="font-extrabold">Bot: </span>Hello, this is Aegis from the cybercrime cell, How can I assist you!
              </span>
            </p>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${msg.role === 'user' ? 'text-right' : 'text-left'} my-1`}>
                <div className={`inline-block ${
                  msg.type === 'report' ? 'bg-yellow-100 border-yellow-200' :
                  msg.role === 'user' ? 'bg-blue-100 border-blue-200' : 'bg-green-100 border-green-200'
                } border-2 rounded-lg px-3 py-1 max-w-[76%]`}>
                  <strong className='font-extrabold'>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> <span>{msg.content}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="input-container my-10 text-center space-x-8">
            <Button onClick={toggleMode}>
              {isVoiceMode ? 'Switch to Text' : 'Switch to Voice'}
            </Button>
            {isVoiceMode ? (
              <Button onClick={() => startListening()} disabled={isListening || loading}>
                {isListening ? 'Listening...' : loading ? 'Processing...' : 'Speak'}
              </Button>
            ) : (
              <form onSubmit={handleSubmit} className="inline-block">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="border rounded px-2 py-1 mr-2"
                />
                <Button type="submit" disabled={loading}>Send</Button>
              </form>
            )}
            <Button onClick={exportConversationAsJSON}>
              Raise Complaint
            </Button>
            <Button onClick={() => router.push("/status")}>Check Complaint status</Button>
            <Button onClick={clearChat}>Clear Chat</Button>
          </div>

          {isListening && (
            <div className="text-center text-green-600">
              Microphone is active - Please speak now
            </div>
          )}
        </>
      )}
      <style jsx>{`
        .consent-popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          z-index: 100;
          flex-direction: column;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

