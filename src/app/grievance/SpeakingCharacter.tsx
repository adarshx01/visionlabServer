import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SpeakingCharacter({ isSpeaking, character = "Swara" }) {
  const group = useRef();
  const { scene, animations } = useGLTF(`/models/Teacher_${character}.glb`);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Set the character to T-pose
    if (scene.pose) {
      scene.pose();
    }

    // Disable all animations initially
    Object.values(actions).forEach(action => action.stop());
  }, [scene, actions]);

  useFrame(() => {
    if (isSpeaking) {
      // Simulate lip movement
      scene.traverse((child) => {
        if (child.isMesh && child.morphTargetDictionary) {
          const mouthOpenIndex = child.morphTargetDictionary['mouthOpen'];
          if (mouthOpenIndex !== undefined) {
            child.morphTargetInfluences[mouthOpenIndex] = Math.sin(Date.now() * 0.01) * 0.5 + 0.5;
          }
        }
      });
    }
  });

  return <primitive object={scene} ref={group} />;
}

useGLTF.preload("/models/Teacher_Swara.glb");
useGLTF.preload("/models/Teacher_Dhruv.glb");

