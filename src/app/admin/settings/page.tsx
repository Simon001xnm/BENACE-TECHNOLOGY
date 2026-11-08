'use client';

import { Settings, Save, Shield, Bell, Database, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({ title: 'Config Updated', description: 'System parameters have been synchronized.' });
    }, 1000);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-10 space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900 leading-none">System Settings</h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-3">Hub Operating Parameters</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="rounded-xl h-11 bg-primary text-white font-black uppercase text-[10px] tracking-widest px-8 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          {saving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Apply Changes
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border border-zinc-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight">Security Protocol</h3>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Administrative Access Control</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Admin Dispatch Center</Label>
                <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold uppercase tracking-tight">Push Notifications</p>
                    <p className="text-[9px] font-medium text-zinc-400 uppercase">Alert for new orders & inquiries</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">WhatsApp Redirection</Label>
                <Input 
                  placeholder="254714210957" 
                  className="h-12 border-zinc-100 bg-white rounded-2xl px-5 text-xs font-bold focus:ring-primary/10" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border border-zinc-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight">Maintenance Hub</h3>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Database & Performance</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-zinc-900 rounded-2xl text-white space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Check className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Optimized Status</span>
                </div>
                <p className="text-[10px] font-medium text-zinc-400 uppercase leading-relaxed tracking-wider">
                  The local cache is fully synchronized with the Firebase Cloud instance. Performance is at peak threshold.
                </p>
                <Button variant="outline" className="w-full h-11 rounded-xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">
                  Purge Cache
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-zinc-100 rounded-2xl">
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold uppercase tracking-tight">Cloud Backup</p>
                  <p className="text-[9px] font-medium text-zinc-400 uppercase">Automatic daily snapshots</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
