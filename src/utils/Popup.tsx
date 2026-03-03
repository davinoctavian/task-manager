import type { ReactNode } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface PopupContentProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Popup({ isOpen, onClose, children }: PopupProps) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export function PopupContent({ title, children, onClose }: PopupContentProps) {
  return (
    <Popup isOpen={true} onClose={onClose}>
      <h2>{title}</h2>
      <div className="popup-body">{children}</div>
    </Popup>
  );
}
