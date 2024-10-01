'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router= useRouter()
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [declineMessage, setDeclineMessage] = useState(''); // State for decline message

  const handleSpeechInput = async () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log('Voice recognition started.');
    };

    recognition.onerror = (event: any) => {
      console.error('Error occurred in recognition:', event.error);
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSendMessage(transcript);
    };

    recognition.start();
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newMessages = [...messages, { role: 'user', content: message }];
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
        const botMessage = { role: 'assistant', content: data.message };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        speakMessage(data.message);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlestatus = () =>{
    router.push("/status");
  }

  const speakMessage = (message: string) => {
    console.log('Speaking message');
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US';
    utterance.rate = 1.3;
    utterance.pitch = 2.6;
    speechSynthesis.speak(utterance);
    console.log('Speaking message ended');
  };

  const exportConversationAsJSON = () => {
    if (messages.length === 0) {
      alert('First Provide the incident report and data !!!');
    } else {
      const summary = {
        conversation: messages.map((msg, index) => ({
          id: index + 1,
          role: msg.role,
          message: msg.content,
        })),
        totalMessages: messages.length,
      };
      console.log('Conversation Summary:', JSON.stringify(summary, null, 2));
      router.push("/complaint");
    }
  };

  // Consent Handlers
  const handleConsent = () => {
    setConsentGiven(true); // User agreed to consent
    setDeclineMessage(''); // Clear decline message
  };

  const handleDecline = () => {
    setDeclineMessage('Please accept the consent to proceed and talk to the AI.'); // Set decline message
  };

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
          {declineMessage && <p className="text-red-500 mt-4">{declineMessage}</p>} {/* Display decline message */}
        </div>
      ) : (
        <>
          <h1 className='mx-auto text-center font-extrabold text-2xl font-serif'>Women’s Safety Grievance Registration</h1>
          <div className="video-container mx-auto w-fit ">
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
                <div className={`inline-block ${msg.role === 'user' ? 'bg-blue-100 border-blue-200' : 'bg-green-100 border-green-200'} border-2 rounded-lg px-3 py-1 max-w-[76%]`}>
                  <strong className='font-extrabold'>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> <span>{msg.content}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="input-container my-10 text-center space-x-8">
            <Button onClick={handleSpeechInput} disabled={loading}>
              {loading ? 'Listening...' : 'Speak'}
            </Button>
            <Button onClick={exportConversationAsJSON}>
              Raise Complaint
            </Button>
            <Button onClick={handlestatus}>Check Complaint status</Button>
          </div>
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
