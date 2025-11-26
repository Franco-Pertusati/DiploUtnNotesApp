"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface NotesContextType {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <NotesContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesRefresh() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotesRefresh must be used within a NotesProvider");
  }
  return context;
}