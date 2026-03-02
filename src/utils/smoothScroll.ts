/**
 * Custom smooth scrolling utility using requestAnimationFrame.
 * Provides a much more premium and controllable feel than native `behavior: 'smooth'`.
 */

// Easing functions
export const easings = {
  // Cubic provides a nice organic acceleration and deceleration
  easeInOutCubic: (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },
  // Quartic is a bit more dramatic (slower start/end, faster middle)
  easeInOutQuart: (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  },
  // Expo is very snappy
  easeOutExpo: (t: number): number => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }
};

interface SmoothScrollOptions {
  container: HTMLElement | Window;
  targetY: number;
  duration?: number;
  easing?: (t: number) => number;
  onComplete?: () => void;
}

export function smoothScrollTo({
  container,
  targetY,
  duration = 800,
  easing = easings.easeInOutCubic,
  onComplete
}: SmoothScrollOptions): () => void {
  // Determine starting position
  const startY =
    container instanceof Window ? window.scrollY : (container as HTMLElement).scrollTop;
  
  const distance = targetY - startY;
  
  // If we are already at the target, finish immediately
  if (distance === 0) {
    if (onComplete) onComplete();
    return () => {}; // No-op cancel function
  }

  let startTime: number | null = null;
  let rafId: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Apply easing
    const easedProgress = easing(progress);
    const nextY = startY + distance * easedProgress;
    
    if (container instanceof Window) {
      window.scrollTo(0, nextY);
    } else {
      (container as HTMLElement).scrollTop = nextY;
    }

    if (timeElapsed < duration) {
      rafId = requestAnimationFrame(animation);
    } else {
      if (onComplete) onComplete();
    }
  };

  // Start the animation
  rafId = requestAnimationFrame(animation);

  // Return a cancel function in case the caller needs to abort the scroll
  return () => {
    if (rafId) cancelAnimationFrame(rafId);
  };
}
