import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SpeakingCharacter } from './SpeakingCharacter';

export function CharacterWrapper({ isSpeaking, character }) {
  return (
    <div className="character-wrapper" style={{ width: '320px', height: '240px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 1.5, 2.5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SpeakingCharacter isSpeaking={isSpeaking} character={character} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

