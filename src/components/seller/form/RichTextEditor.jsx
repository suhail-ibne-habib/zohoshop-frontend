"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { Code, Eye, FileText, AlertCircle } from 'lucide-react';

// Dynamically import ReactQuill to prevent SSR window issues in Next.js
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="h-44 w-full bg-gray-50 animate-pulse border border-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">
      Loading Rich Text Editor...
    </div>
  ),
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'link',
];

const emptySubscribe = () => () => {};
function useHydrated() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function RichTextEditor({
  value = '',
  onChange,
  error,
  placeholder = 'Write a detailed description of your product...',
  disabled = false,
}) {
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'plain'
  const isMounted = useHydrated();
  const currentValue = value || '';

  const handleChange = (content) => {
    if (onChange) {
      onChange(content);
    }
  };

  // Strip HTML tags for clean word & character counts
  const plainTextContent = currentValue.replace(/<[^>]*>/g, '').trim();
  const charCount = plainTextContent.length;
  const wordCount = plainTextContent ? plainTextContent.split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="space-y-2 font-sans">
      {/* Top Bar with Mode Toggle & Stats */}
      <div className="flex items-center justify-between bg-gray-50 px-3 py-1.5 border border-gray-200 rounded-t-lg text-xs">
        <div className="flex items-center gap-1 bg-gray-200/70 p-0.5 rounded-md">
          <button
            type="button"
            onClick={() => setEditorMode('visual')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${editorMode === 'visual'
              ? 'bg-[#006877] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Visual Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setEditorMode('plain')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${editorMode === 'plain'
              ? 'bg-[#006877] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Plain / HTML Source</span>
          </button>
        </div>

        <div className="text-gray-400 text-[11px] font-mono flex items-center gap-3">
          <span>{wordCount} words</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      {/* Editor Body */}
      <div
        className={`border-x border-b border-gray-200 rounded-b-lg overflow-hidden transition-colors ${error ? 'border-red-300 bg-red-50/20' : 'bg-white'
          }`}
      >
        {editorMode === 'visual' ? (
          <div className="quill-editor-wrapper">
            {isMounted ? (
              <ReactQuill
                theme="snow"
                value={currentValue}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                readOnly={disabled}
                className="bg-white min-h-[160px]"
              />
            ) : (
              <div className="h-44 w-full bg-gray-50 animate-pulse border border-gray-100 rounded-b-lg flex items-center justify-center text-xs text-gray-400">
                Loading Rich Text Editor...
              </div>
            )}
          </div>
        ) : (
          <div className="p-3 bg-gray-900 text-gray-100 font-mono text-xs">
            <div className="mb-2 text-gray-400 text-[11px] flex items-center gap-1">
              <FileText className="w-3 h-3 text-[#006877]" />
              <span>Editing Raw HTML Code</span>
            </div>
            <textarea
              rows={8}
              value={currentValue}
              onChange={(e) => handleChange(e.target.value)}
              disabled={disabled}
              placeholder="Enter HTML or plain text content here..."
              className="w-full bg-gray-950 border border-gray-800 rounded-md p-3 text-emerald-400 focus:outline-none focus:ring-1 focus:ring-[#006877] resize-y font-mono text-xs leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* Custom CSS overrides for Quill styling match */}
      <style jsx global>{`
        .quill-editor-wrapper .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #e5e7eb !important;
          background-color: #f9fafb;
          padding: 6px 12px;
        }
        .quill-editor-wrapper .ql-container.ql-snow {
          border: none !important;
          font-family: inherit;
          min-height: 150px;
          font-size: 14px;
        }
        .quill-editor-wrapper .ql-editor {
          min-height: 150px;
          padding: 12px 16px;
        }
        .quill-editor-wrapper .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}
