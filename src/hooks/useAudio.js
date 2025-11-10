import { useState, useEffect, useRef, useCallback } from 'react';

export const useAudio = () => {
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioContext = useRef(null);

  // 初始化音頻上下文
  useEffect(() => {
    const initAudio = () => {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      }
    };

    // 用戶交互後初始化音頻
    const handleUserInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // 播放音調
  const playTone = useCallback((frequency, duration) => {
    if (!audioContext.current || isMuted) return;

    try {
      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
      oscillator.type = 'square';

      gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContext.current.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + duration);

      oscillator.start(audioContext.current.currentTime);
      oscillator.stop(audioContext.current.currentTime + duration);
    } catch (error) {
      console.warn('無法播放音頻:', error);
    }
  }, [volume, isMuted]);

  // 根據警報等級播放不同的聲音
  const playAlert = useCallback((level) => {
    if (isMuted) return;

    const alertSounds = {
      critical: { frequency: 800, duration: 1.0, count: 3 },
      warning: { frequency: 600, duration: 0.5, count: 2 },
      info: { frequency: 400, duration: 0.3, count: 1 }
    };

    const sound = alertSounds[level] || alertSounds.info;

    for (let i = 0; i < sound.count; i++) {
      setTimeout(() => {
        playTone(sound.frequency + i * 100, sound.duration * 0.3);
      }, i * 200);
    }
  }, [playTone, isMuted]);

  // 切換靜音
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return {
    volume,
    isMuted,
    setVolume,
    toggleMute,
    playAlert
  };
};
