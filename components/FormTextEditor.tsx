'use client';

import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic';

// Dynamic import for ReactQuill to ensure it only loads on the client
const ReactQuill = dynamic(() => import('react-quill-new'), { 
    ssr: false,
    loading: () => <div className="h-[200px] bg-muted-bg/10 animate-pulse border border-black/5" />
});

interface FormTextEditorProps {
    value: string;
    onChange: (content: string) => void;
}

export default function FormTextEditor({ value, onChange }: FormTextEditorProps) {
    return (
        <div className="luxury-editor shadow-sm border border-black/10 transition-colors focus-within:border-accent">
            <ReactQuill 
                theme="snow" 
                value={value} 
                onChange={onChange}
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link', 'clean']
                    ],
                }}
            />
            <style jsx global>{`
                .luxury-editor .ql-container {
                    font-family: var(--font-sans), sans-serif !important;
                    font-size: 0.875rem;
                    min-height: 250px;
                    border: none !important;
                }
                .luxury-editor .ql-toolbar {
                    border: none !important;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
                    background: rgba(0,0,0,0.02);
                }
                .luxury-editor .ql-editor {
                    padding: 1.5rem;
                    line-height: 1.7;
                }
                .luxury-editor .ql-editor.ql-blank::before {
                    color: rgba(0, 0, 0, 0.3);
                    font-style: italic;
                    left: 1.5rem;
                }
            `}</style>
        </div>
    );
}