"use client";

import React from "react";

export default function ExampleModal({ title = "Hola", message = "Este es un diálogo." , onClose }: { title?: string; message?: string; onClose?: () => void }) {
  return (
    <div className="w-[480px] bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button onClick={onClose} className="text-gray-500">✕</button>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300">{message}</div>
      <div className="mt-6 flex justify-end">
        <button onClick={onClose} className="px-4 py-2 bg-sky-600 text-white rounded">Cerrar</button>
      </div>
    </div>
  );
}
