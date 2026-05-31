import { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && 'ontouchstart' in window;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = e.clientX - 10 + 'px';
      cursorRef.current.style.top = e.clientY - 10 + 'px';
    }
    if (dotRef.current) {
      dotRef.current.style.left = e.clientX - 3 + 'px';
      dotRef.current.style.top = e.clientY - 3 + 'px';
    }
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
      cursorRef.current?.classList.add('hover');
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    cursorRef.current?.classList.remove('hover');
  }, []);

  const handleTouch = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    ripple.style.left = touch.clientX - 10 + 'px';
    ripple.style.top = touch.clientY - 10 + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.addEventListener('touchstart', handleTouch);
      return () => document.removeEventListener('touchstart', handleTouch);
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile, handleMouseMove, handleMouseOver, handleMouseOut, handleTouch]);

  if (isMobile) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

export default CustomCursor;
