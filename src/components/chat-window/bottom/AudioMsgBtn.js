import React, { useState, useCallback, useRef, useEffect } from 'react';
import { InputGroup, Icon, Alert } from 'rsuite';
import { useParams } from 'react-router';
import { storage } from '../../../misc/firebase';

// Helper function to check browser compatibility
const checkAudioRecordingSupport = () => {
  const issues = [];

  if (!navigator.mediaDevices) {
    issues.push('MediaDevices API not supported');
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    issues.push('getUserMedia not supported');
  }

  if (!window.MediaRecorder) {
    issues.push('MediaRecorder API not supported');
  }

  return {
    isSupported: issues.length === 0,
    issues
  };
};

const AudioMsgBtn = ({ afterUpload }) => {
  const { chatId } = useParams();

  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // Check browser compatibility on mount
  useEffect(() => {
    const { isSupported: supported, issues } = checkAudioRecordingSupport();
    setIsSupported(supported);

    if (!supported) {
      console.warn('Audio recording not supported:', issues);
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        Alert.error('Audio recording is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.');
        return;
      }

      // Check if MediaRecorder is supported
      if (!window.MediaRecorder) {
        Alert.error('Audio recording is not supported in this browser. Please update your browser or use a different one.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Check if we got a valid stream
      if (!stream || stream.getAudioTracks().length === 0) {
        Alert.error('No microphone found. Please connect a microphone and try again.');
        return;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          await onUpload(blob);
        } catch (uploadError) {
          console.error('Error uploading audio:', uploadError);
          Alert.error('Failed to upload audio message. Please try again.');
        } finally {
          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
        Alert.error('Recording failed. Please try again.');
        setIsRecording(false);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      Alert.info('Recording started. Click again to stop.', 2000);
    } catch (error) {
      console.error('Error starting recording:', error);

      let errorMessage = 'Could not access microphone. ';

      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage += 'Please allow microphone access in your browser settings and try again.';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage += 'No microphone found. Please connect a microphone and try again.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMessage += 'Microphone is being used by another application. Please close other apps and try again.';
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        errorMessage += 'Microphone does not meet the required specifications.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Audio recording is not supported in this browser.';
      } else if (error.name === 'AbortError') {
        errorMessage += 'Recording was interrupted. Please try again.';
      } else {
        errorMessage += 'Please check your microphone settings and try again.';
      }

      Alert.error(errorMessage, 6000);
    }
  }, [onUpload]);

  const stopRecording = useCallback(() => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        Alert.info('Recording stopped. Processing audio...', 2000);
      } else {
        console.warn('Attempted to stop recording but no active recording found');
        setIsRecording(false);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.error('Error stopping recording. Please try again.');
      setIsRecording(false);
    }
  }, []);

  const onClick = useCallback(() => {
    if (!isSupported) {
      Alert.error('Audio recording is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.', 5000);
      return;
    }

    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, isSupported, startRecording, stopRecording]);

  const onUpload = useCallback(
    async (blob) => {
      setIsUploading(true);
      try {
        const snap = await storage
          .ref(`/chat/${chatId}`)
          .child(`audio_${Date.now()}.webm`)
          .put(blob, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });

        const file = {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };

        setIsUploading(false);
        afterUpload([file]);
      } catch (error) {
        setIsUploading(false);
        Alert.error(error.message);
      }
    },
    [afterUpload, chatId]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
        // Also clean up any active streams
        if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };
  }, []);

  return (
    <InputGroup.Button
      onClick={onClick}
      disabled={isUploading || !isSupported}
      className={isRecording ? 'animate-blink' : ''}
      title={!isSupported ? 'Audio recording not supported in this browser' : isRecording ? 'Stop recording' : 'Start recording'}
    >
      <Icon icon="microphone" />
    </InputGroup.Button>
  );
};

export default AudioMsgBtn;