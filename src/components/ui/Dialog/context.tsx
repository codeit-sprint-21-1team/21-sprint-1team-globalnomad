"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { flushSync, createPortal } from "react-dom";
import { AlertDialog } from "./variants/AlertDialog";
import { ConfirmDialog } from "./variants/ConfirmDialog";

export interface DialogOptions {
  content: ReactNode;
  type: "confirm" | "alert";
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface DialogContextValue {
  showDialog: (options: DialogOptions) => void;
  onClose: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogOptions | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const showDialog = useCallback((options: DialogOptions) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setDialog(options);
  }, []);

  const onClose = useCallback(() => {
    // flushSync로 inert 제거를 DOM에 즉시 반영한 뒤 포커스 복원
    flushSync(() => setDialog(null));
    triggerRef.current?.focus();
  }, []);

  const handleConfirm = useCallback(() => {
    dialog?.onConfirm?.();
    onClose();
  }, [dialog, onClose]);

  const handleCancel = useCallback(() => {
    dialog?.onCancel?.();
    onClose();
  }, [dialog, onClose]);

  useEffect(() => {
    if (!dialog) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dialog.onCancel?.();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dialog, onClose]);

  function renderDialog(): ReactNode {
    if (!dialog) return null;
    if (dialog.type === "alert") {
      return <AlertDialog content={dialog.content} onClose={handleConfirm} />;
    }
    return (
      <ConfirmDialog
        content={dialog.content}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    );
  }

  const dialogElement = renderDialog();

  return (
    <DialogContext.Provider value={{ showDialog, onClose }}>
      <div inert={dialog ? true : undefined}>{children}</div>
      {dialogElement && createPortal(dialogElement, document.body)}
    </DialogContext.Provider>
  );
}

export function useDialog(): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}
