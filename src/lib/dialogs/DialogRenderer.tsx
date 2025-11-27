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

        const DialogComponent =
          d.Component as unknown as React.ComponentType<
            Record<string, unknown> & { onClose?: () => void }
          >;

        const props = {
          ...(d.props ?? {}),
          onClose: () => hide(d.id),
        };

        return (
          <div
            key={d.id}
            className="pointer-events-auto fixed inset-0 flex items-center justify-center"
            style={{ zIndex: z }}
          >
            {/* BACKDROP */}
            {d.options.backdrop && (
              <div
                className={`
                  absolute inset-0 bg-black/50 backdrop-blur-sm
                  transition-opacity duration-200
                  ${
                    d.isClosing
                      ? "opacity-0"
                      : "opacity-100"
                  }
                `}
                onClick={() => d.options.autoClose && hide(d.id)}
              />
            )}

            {/* DIALOG */}
            <div
              className={`
                relative bg-dark border border-t-highline border-b-bottomline border-x-border
                rounded-2xl p-4 min-w-3xs
                transition-all duration-200
                ${
                  d.isClosing
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                }
              `}
              style={{
                width: d.options.width,
                height: d.options.height,
              }}
            >
              {React.createElement(DialogComponent, props)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
