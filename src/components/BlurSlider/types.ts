import { ReactNode } from 'react';

/**
 * Base interface for a single BlurSlider item.
 * Any type passed to <BlurSlider> must extend this interface.
 * The `imageUrl` is used internally for the background blur halo effect.
 */
export interface BlurSliderItem {
  id: string | number;
  /** Used internally for the background glow/blur halo of the active slide */
  imageUrl: string;
}

/**
 * Props for the generic BlurSlider component.
 *
 * @template T - A type that extends BlurSliderItem.
 */
export interface BlurSliderProps<T extends BlurSliderItem> {
  /** Array of items to render as slides. Must satisfy BlurSliderItem contract. */
  items: T[];

  /**
   * Render prop: receives each item and must return the slide content node.
   * This makes BlurSlider fully agnostic — it doesn't know about PixelCard or any specific UI.
   */
  renderItem: (item: T) => ReactNode;

  /** Optional additional CSS class on the root element */
  className?: string;
}
