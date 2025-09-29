"use client";

import React from "react";
import { DialogDescriptor } from "./types";

const baseZ = 1000;

export default function DialogRenderer({
  dialogs,
  hide,
}: {
  dialogs: DialogDescriptor[];
  hide: (id: string) => void;
}) {
  if (!dialogs.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none">
      {dialogs.map((d, idx) => {
        const z = baseZ + idx + (d.options.zIndex || 0);
        const DialogComponent = d.Component as unknown as React.ComponentType<Record<string, unknown> & { onClose?: () => void }>;
        const props = {
          ...( (d.props ?? {}) as Record<string, unknown> ),
          onClose: () => hide(d.id),
        } as Record<string, unknown> & { onClose: () => void };

        return (
          <div
            key={d.id}
            className="pointer-events-auto fixed inset-0 flex items-center justify-center"
            style={{ zIndex: z }}
          >
            {d.options.backdrop && (
              <div
                onClick={() => d.options.autoClose && hide(d.id)}
                className="absolute inset-0 bg-text/50 dark:bg-dark/50"
              />
            )}
            <div className="relative bg-dark border border-t-highline border-b-bottomline border-x-border rounded-2xl p-4 min-w-3xs">
              {React.createElement(DialogComponent, props)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
