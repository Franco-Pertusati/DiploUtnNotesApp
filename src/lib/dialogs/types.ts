import React from "react";

export type DialogId = string;

export type DialogComponent<P = unknown> = React.ComponentType<P & { onClose?: () => void }>;

export interface DialogOptions {
  backdrop?: boolean;
  autoClose?: boolean;
  zIndex?: number;
  width?: string | number;
  height?: string | number;
}

export interface DialogDescriptor<P = unknown> {
  id: DialogId;
  Component: DialogComponent<P>;
  props?: P;
  options: Omit<Required<DialogOptions>, 'width' | 'height'> & {
    width?: string | number;
    height?: string | number;
  };
  isClosing?: boolean
}
