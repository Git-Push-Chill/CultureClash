import { useEffect } from "react";

/**
 * Hook for handling keyboard shortcuts
 */
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options?: {
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
    enabled?: boolean;
  }
) {
  const {
    ctrl = false,
    shift = false,
    alt = false,
    meta = false,
    enabled = true,
  } = options || {};

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const keyMatch = event.key.toLowerCase() === key.toLowerCase();
      const ctrlMatch = ctrl ? event.ctrlKey : !event.ctrlKey;
      const shiftMatch = shift ? event.shiftKey : !event.shiftKey;
      const altMatch = alt ? event.altKey : !event.altKey;
      const metaMatch = meta ? event.metaKey : !event.metaKey;

      if (keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, ctrl, shift, alt, meta, enabled]);
}

/**
 * Hook for handling multiple keyboard shortcuts
 */
export function useKeyboardShortcuts(
  shortcuts: Array<{
    key: string;
    callback: () => void;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
    enabled?: boolean;
  }>
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const {
          key,
          callback,
          ctrl = false,
          shift = false,
          alt = false,
          meta = false,
          enabled = true,
        } = shortcut;

        if (!enabled) continue;

        const keyMatch = event.key.toLowerCase() === key.toLowerCase();
        const ctrlMatch = ctrl ? event.ctrlKey : !event.ctrlKey;
        const shiftMatch = shift ? event.shiftKey : !event.shiftKey;
        const altMatch = alt ? event.altKey : !event.altKey;
        const metaMatch = meta ? event.metaKey : !event.metaKey;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch) {
          event.preventDefault();
          callback();
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
}

/**
 * Hook for handling escape key
 */
export function useEscapeKey(callback: () => void, enabled = true) {
  useKeyboardShortcut("Escape", callback, { enabled });
}

/**
 * Hook for handling enter key
 */
export function useEnterKey(callback: () => void, enabled = true) {
  useKeyboardShortcut("Enter", callback, { enabled });
}
