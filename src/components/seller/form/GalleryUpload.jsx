"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, X, Image as ImageIcon, Plus, AlertCircle } from 'lucide-react';

export default function GalleryUpload({
  value = [],
  onChange,
  error,
  maxFiles = 5,
  maxSizeMB = 5,
  disabled = false,
}) {
  const [fileError, setFileError] = useState(null);
  const fileInputRef = useRef(null);

  const images = Array.isArray(value) ? value : [];

  const handleAddFiles = (newFiles) => {
    setFileError(null);
    if (!newFiles || newFiles.length === 0) return;

    const fileList = Array.from(newFiles);

    // Validate limit
    if (images.length + fileList.length > maxFiles) {
      setFileError(`You can upload a maximum of ${maxFiles} gallery images.`);
      return;
    }

    const validFiles = [];
    for (const file of fileList) {
      if (!file.type.startsWith('image/')) {
        setFileError('One or more files are not valid images.');
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setFileError(`Image "${file.name}" exceeds ${maxSizeMB}MB size limit.`);
        return;
      }
      validFiles.push(file);
    }

    onChange([...images, ...validFiles]);
  };

  const handleRemove = (indexToRemove) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
    setFileError(null);
  };

  const getPreviewUrl = (item) => {
    if (item instanceof File) {
      return URL.createObjectURL(item);
    }
    return typeof item === 'string' ? item : '';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Gallery Images ({images.length}/{maxFiles})
        </span>
        {images.length > 0 && (
          <span className="text-xs text-gray-400">
            {maxFiles - images.length} remaining slot(s)
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/webp, image/gif"
        className="hidden"
        disabled={disabled || images.length >= maxFiles}
        onChange={(e) => {
          if (e.target.files) handleAddFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {/* Grid view of existing gallery images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {images.map((item, idx) => {
          const url = getPreviewUrl(item);
          return (
            <div
              key={idx}
              className="group relative aspect-square rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shadow-xs hover:shadow-sm transition-all"
            >
              <img
                src={url}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover"
                onLoad={() => {
                  if (item instanceof File) URL.revokeObjectURL(url);
                }}
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => handleRemove(idx)}
                  className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-transform hover:scale-110 shadow-sm"
                  title="Delete image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                #{idx + 1}
              </span>
            </div>
          );
        })}

        {/* Add image card button */}
        {images.length < maxFiles && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square border-2 border-dashed border-gray-300 hover:border-[#006877] bg-white hover:bg-[#006877]/5 rounded-lg flex flex-col items-center justify-center p-3 text-center transition-all cursor-pointer group"
          >
            <div className="p-2 bg-gray-100 group-hover:bg-[#006877]/10 text-gray-500 group-hover:text-[#006877] rounded-full transition-colors mb-1">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-gray-600 group-hover:text-[#006877]">
              Add Image
            </span>
          </button>
        )}
      </div>

      {fileError && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{fileError}</span>
        </div>
      )}
    </div>
  );
}
