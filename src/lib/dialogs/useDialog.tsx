"use client";

import { useDialogContext } from "./DialogProvider";

export default function useDialog() {
  const ctx = useDialogContext();
  return ctx;
}
