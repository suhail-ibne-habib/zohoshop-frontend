"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { UploadCloud, X, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';

export default function SingleImageUpload({
  value,
  onChange,
  error,
  disabled = false,
  maxSizeMB = 5,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState(null);
  const fileInputRef = useRef(null);

  const previewUrl = useMemo(() => {
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }
    return typeof value === 'string' ? value : null;
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl && value instanceof File) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, value]);

  const handleFile = (file) => {
    setFileError(null);
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file (JPEG, PNG, WEBP, GIF)');
      return;
    }

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setFileError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    onChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif"
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {previewUrl ? (
        <div className="relative group border border-gray-200 rounded-xl overflow-hidden bg-gray-50 max-w-md shadow-sm transition-all hover:shadow-md">
          <div className="aspect-video w-full relative flex items-center justify-center bg-gray-900/5">
            <img
              src={previewUrl}
              alt="Main Product Preview"
              className="w-full h-full object-contain p-2"
            />
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate pr-2">
              <ImageIcon className="w-4 h-4 text-[#006877] shrink-0" />
              <span className="text-xs font-medium text-gray-700 truncate">
                {value instanceof File ? value.name : 'Product Cover Image'}
              </span>
              {value instanceof File && (
                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono shrink-0">
                  {(value.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                disabled={disabled}
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 text-xs font-medium text-[#006877] hover:bg-[#006877]/10 rounded-md transition-colors"
              >
                Change
              </button>
              <button
                type="button"
                disabled={disabled}
                onClick={handleRemove}
                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#006877] bg-[#006877]/5 scale-[0.99]'
              : error || fileError
              ? 'border-red-300 bg-red-50/50 hover:bg-red-50'
              : 'border-gray-300 bg-white hover:border-[#006877]/60 hover:bg-gray-50/80'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-[#006877]/10 text-[#006877] rounded-full group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Click to upload <span className="font-normal text-gray-500">or drag and drop</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP or GIF (max {maxSizeMB}MB)</p>
            </div>
          </div>
        </div>
      )}

      {fileError && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{fileError}</span>
        </div>
      )}
    </div>
  );
}
