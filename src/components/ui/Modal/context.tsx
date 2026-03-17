"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { ModalRenderer } from "./ui";

interface ModalData {
  content: ReactNode;
}

interface ModalContextValue {
  showModal: (content: ReactNode) => void;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalData | null>(null);

  const showModal = useCallback((content: ReactNode) => {
    setModal({ content });
  }, []);

  const onClose = useCallback(() => {
    setModal(null);
  }, []);

  useEffect(() => {
    if (!modal) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, modal]);

  return (
    <ModalContext.Provider value={{ showModal, onClose }}>
      <div inert={modal ? true : undefined}>{children}</div>
      {modal && <ModalRenderer content={modal.content} onClose={onClose} />}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
