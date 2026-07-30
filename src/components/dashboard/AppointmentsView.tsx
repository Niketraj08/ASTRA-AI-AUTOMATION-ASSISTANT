import React from 'react';
import { Calendar, Clock, User, CheckCircle2 } from 'lucide-react';
import { Appointment } from '../../types';

interface AppointmentsViewProps {
  appointments: Appointment[];
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({ appointments }) => {
  return (
    <div className="space-y-8">
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Calendar & Scheduled Demo Calls</h2>
          <p className="text-xs text-slate-400">Appointments booked autonomously by Astra AI Voice and Chat assistants.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((apt) => (
          <div key={apt.id} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-sm text-white">{apt.type}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                {apt.status}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-bold text-white text-base">{apt.clientName}</div>
              <div className="text-purple-300 font-mono">{apt.company}</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{apt.date} at {apt.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
