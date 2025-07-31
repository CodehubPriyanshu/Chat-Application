import { useState, useCallback, useEffect, useRef } from 'react';
import { database } from './firebase';

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
}

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(() => {
    try {
      return window.matchMedia(query).matches;
    } catch (error) {
      console.error('Error in useMediaQuery:', error);
      return false;
    }
  });

  useEffect(() => {
    try {
      const queryList = window.matchMedia(query);
      setMatches(queryList.matches);

      const listener = evt => setMatches(evt.matches);

      queryList.addListener(listener);
      return () => queryList.removeListener(listener);
    } catch (error) {
      console.error('Error setting up media query listener:', error);
    }
  }, [query]);

  return matches;
};

export function usePresence(uid) {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const userStatusRef = database.ref(`/status/${uid}`);

    const handleValue = snap => {
      try {
        if (snap.exists()) {
          const data = snap.val();
          setPresence(data);
        } else {
          setPresence(null);
        }
      } catch (error) {
        console.error('Error processing presence data:', error);
        setPresence(null);
      }
    };

    const handleError = error => {
      console.error('Error listening to presence:', error);
      setPresence(null);
    };

    userStatusRef.on('value', handleValue, handleError);

    return () => {
      userStatusRef.off('value', handleValue);
    };
  }, [uid]);

  return presence;
}

export function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
      }
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}
