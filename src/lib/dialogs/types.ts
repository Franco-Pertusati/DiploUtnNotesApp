import React from "react";

export type DialogId = string;

export type DialogComponent<P = unknown> = React.ComponentType<P & { onClose?: () => void }>;

export interface DialogOptions {
  backdrop?: boolean;
  autoClose?: boolean;
  zIndex?: number;
}

export interface DialogDescriptor<P = unknown> {
  id: DialogId;
  Component: DialogComponent<P>;
  props?: P;
  options: Required<DialogOptions>;
}
