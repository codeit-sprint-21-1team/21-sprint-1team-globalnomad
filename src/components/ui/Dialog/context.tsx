"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { AlertDialog } from "./variants/AlertDialog";
import { ConfirmDialog } from "./variants/ConfirmDialog";

export interface DialogOptions {
  content: ReactNode;
  type: "confirm" | "alert";
  onConfirm?: () => void;
}

interface DialogContextValue {
  showDialog: (options: DialogOptions) => void;
  onClose: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogOptions | null>(null);

  const showDialog = useCallback((options: DialogOptions) => {
    setDialog(options);
  }, []);

  const onClose = useCallback(() => {
    setDialog(null);
  }, []);

  const handleConfirm = useCallback(() => {
    dialog?.onConfirm?.();
    onClose();
  }, [dialog, onClose]);

  return (
    <DialogContext.Provider value={{ showDialog, onClose }}>
      <div inert={dialog ? true : undefined}>{children}</div>
      {dialog?.type === "alert" && (
        <AlertDialog content={dialog.content} onClose={handleConfirm} />
      )}
      {dialog?.type === "confirm" && (
        <ConfirmDialog
          content={dialog.content}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
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
