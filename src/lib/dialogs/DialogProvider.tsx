"use client";

import React, { createContext, useCallback, useContext, useReducer } from "react";
import { DialogDescriptor, DialogComponent, DialogOptions, DialogId } from "./types";
import DialogRenderer from "./DialogRenderer";

type State = {
  dialogs: DialogDescriptor[];
};

type Action =
  | { type: "ADD"; payload: DialogDescriptor }
  | { type: "REMOVE"; payload: { id: DialogId } }
  | { type: "CLEAR" };

const initialState: State = { dialogs: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return { dialogs: [...state.dialogs, action.payload] };
    case "REMOVE":
      return { dialogs: state.dialogs.filter((d) => d.id !== action.payload.id) };
    case "CLEAR":
      return { dialogs: [] };
    default:
      return state;
  }
}

type ShowFn = <P = unknown>(Component: DialogComponent<P>, props?: P, options?: Partial<DialogOptions>) => DialogId;

interface DialogContextValue {
  show: ShowFn;
  hide: (id: DialogId) => void;
  closeAll: () => void;
  dialogs: DialogDescriptor[];
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialogContext must be used within DialogProvider");
  return ctx;
}

export default function DialogProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const show: ShowFn = useCallback((Component, props, options) => {
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const descriptor: DialogDescriptor = {
      id,
      Component: Component as DialogComponent,
      props,
      options: {
        backdrop: options?.backdrop ?? true,
        autoClose: options?.autoClose ?? true,
        zIndex: options?.zIndex ?? 0,
      },
    };
    dispatch({ type: "ADD", payload: descriptor });
    return id;
  }, []);

  const hide = useCallback((id: DialogId) => {
    dispatch({ type: "REMOVE", payload: { id } });
  }, []);

  const closeAll = useCallback(() => dispatch({ type: "CLEAR" }), []);

  return (
    <DialogContext.Provider value={{ show, hide, closeAll, dialogs: state.dialogs }}>
      {children}
      <DialogRenderer dialogs={state.dialogs} hide={hide} />
    </DialogContext.Provider>
  );
}
