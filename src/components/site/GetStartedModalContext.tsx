"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type GetStartedModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const GetStartedModalContext = createContext<GetStartedModalContextValue | null>(null);

export function GetStartedModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GetStartedModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </GetStartedModalContext.Provider>
  );
}

export function useGetStartedModal() {
  const ctx = useContext(GetStartedModalContext);
  if (!ctx) {
    throw new Error("useGetStartedModal must be used within a GetStartedModalProvider");
  }
  return ctx;
}
