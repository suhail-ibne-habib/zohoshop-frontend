"use client";

import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function FormField({
  label,
  required = false,
  error,
  hint,
  children,
  id,
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="block text-sm font-medium text-gray-800">
            {label}
            {required && <span className="text-red-500 ml-1 font-bold">*</span>}
          </label>
          {hint && <span className="text-xs text-gray-400">{hint}</span>}
        </div>
      )}
      
      {children}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{typeof error === 'string' ? error : error.message}</span>
        </div>
      )}
    </div>
  );
}
