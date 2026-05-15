
'use client';

import { Settings, Save, Shield, Bell, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black">Hub Settings</h1>
          <p className="font-bold text-muted-foreground uppercase tracking-widest text-xs mt-1">
            Configure Benace Hub system parameters
          </p>
        </div>
        <Button className="bg-black text-white font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-black uppercase text-sm">
              <Shield className="h-4 w-4 text-primary" /> Security & Access
            </CardTitle>
            <CardDescription className="font-bold text-xs uppercase tracking-widest">Manage administrative permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="font-black uppercase text-[10px] tracking-widest text-zinc-400">Admin Email Notifications</Label>
              <div className="flex items-center justify-between rounded-lg border-2 border-black p-4 bg-zinc-50">
                <span className="text-xs font-bold uppercase">Enable Alerts</span>
                <Switch />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black uppercase text-[10px] tracking-widest text-zinc-400">WhatsApp Redirection</Label>
              <Input placeholder="254714210957" className="border-2 border-black font-bold h-12" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,186,242,1)] bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-black uppercase text-sm">
              <Database className="h-4 w-4 text-primary" /> System Maintenance
            </CardTitle>
            <CardDescription className="font-bold text-xs uppercase tracking-widest">Database and cache management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border-2 border-black p-4 bg-zinc-50 space-y-4">
              <p className="text-[10px] font-bold text-zinc-500 uppercase leading-tight">
                Performing a "Hard Reset" will clear your local storage cache and force a fresh synchronization with Firebase.
              </p>
              <Button variant="outline" className="w-full border-2 border-black font-black uppercase text-[10px]">
                Purge System Cache
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border-2 border-black p-4">
              <div className="space-y-0.5">
                <p className="text-xs font-black uppercase">Dev Mode Bypass</p>
                <p className="text-[9px] font-bold text-zinc-400 uppercase">Allow anonymous admin access</p>
              </div>
              <Switch checked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
