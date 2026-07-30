import React, { useState } from 'react';
import { Database, Download, Search, CheckCircle2, User, PhoneCall, Filter } from 'lucide-react';
import { LeadRecord } from '../../types';

interface CrmViewProps {
  leads: LeadRecord[];
}

export const CrmView: React.FC<CrmViewProps> = ({ leads: initialLeads }) => {
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [search, setSearch] = useState('');

  const handleExportCsv = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      ['Name,Company,Email,Phone,Score,Status,Source']
        .concat(leads.map(l => `${l.name},${l.company},${l.email},${l.phone},${l.qualificationScore},${l.status},${l.source}`))
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Astra_Leads_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = leads.filter(
    (l) => l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">CRM & Lead Qualification Database</h2>
          <p className="text-xs text-slate-400">Leads captured and automatically qualified by Astra AI during voice calls and chats.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lead by name or company..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Lead Name</th>
                <th className="p-3">Company</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Qual Score</th>
                <th className="p-3">Source</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-800/40 transition-all">
                  <td className="p-3 font-bold text-white">{l.name}</td>
                  <td className="p-3 text-purple-300">{l.company}</td>
                  <td className="p-3 text-slate-400">{l.email}</td>
                  <td className="p-3 font-bold text-emerald-400">{l.qualificationScore}/100</td>
                  <td className="p-3 text-slate-300">{l.source}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
