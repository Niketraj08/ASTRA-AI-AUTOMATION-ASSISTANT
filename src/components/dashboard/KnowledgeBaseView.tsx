import React, { useState } from 'react';
import { BookOpen, FileText, Upload, Search, CheckCircle2, Bot, Sparkles, Send } from 'lucide-react';
import { KnowledgeDocument } from '../../types';

interface KnowledgeBaseViewProps {
  documents: KnowledgeDocument[];
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({ documents: initialDocs }) => {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(initialDocs);
  const [query, setQuery] = useState('');
  const [queryAnswer, setQueryAnswer] = useState<string | null>(null);
  const [querying, setQuerying] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');

  const handleSimulatedUpload = () => {
    const newDoc: KnowledgeDocument = {
      id: `doc_${Date.now()}`,
      fileName: uploadUrl || 'Uploaded_Company_Policy_2026.pdf',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      uploadedAt: new Date().toLocaleDateString(),
      vectorChunks: 28,
      status: 'Indexed',
      category: 'Company Policy',
    };
    setDocuments([newDoc, ...documents]);
    setUploadUrl('');
  };

  const handleQueryKnowledge = async () => {
    if (!query) return;
    setQuerying(true);

    try {
      const res = await fetch('/api/gemini/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: documents[0]?.fileName || 'Knowledge Base',
          userQuery: query,
        }),
      });

      const data = await res.json();
      setQueryAnswer(data.answer || 'No relevant information found.');
    } catch (err) {
      console.error(err);
    } finally {
      setQuerying(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Upload Drag & Drop Header */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-2">Upload RAG Knowledge Documents & PDF Files</h3>
        <p className="text-xs text-slate-400 mb-6">
          Astra vectorizes company documentation to accurately answer customer queries during live voice calls and support chats.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={uploadUrl}
            onChange={(e) => setUploadUrl(e.target.value)}
            placeholder="Paste document name or website URL (e.g., https://company.com/faq)..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSimulatedUpload}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload & Index Document</span>
          </button>
        </div>
      </div>

      {/* RAG Knowledge Query Tester & Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Documents Table */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800">
          <h4 className="font-bold text-sm text-white mb-4">Indexed Knowledge Base Documents</h4>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{doc.fileName}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{doc.fileSize} · {doc.vectorChunks} Vector Chunks</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: RAG Test Search Box */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between h-[380px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>RAG Vector Query Tester</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400">GEMINI RAG ENGINE</span>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question against indexed documents..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleQueryKnowledge}
                disabled={querying}
                className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs hover:bg-purple-500 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{querying ? 'Searching Vectors...' : 'Search Knowledge Base'}</span>
              </button>
            </div>

            {queryAnswer && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-purple-500/40 text-xs text-slate-200 leading-relaxed font-mono">
                <div className="text-purple-400 font-bold mb-1">[AI ANSWER FROM INDEX]</div>
                {queryAnswer}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
