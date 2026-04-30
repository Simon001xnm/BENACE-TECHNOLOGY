import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function LaptopHirePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
          Laptop Hire Services
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Flexible rental solutions for events, projects, or short-term business needs.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Why Hire From Us?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                'Flexible daily, weekly, and monthly rates',
                'Latest models from HP, Dell, and Lenovo',
                'Pre-configured with essential software',
                'Technical support included',
                'Bulk hire for corporate training or events'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-bold">Short Term</h3>
                    <p className="text-muted-foreground text-sm">Perfect for exams, workshops, or business trips.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-bold">Long Term</h3>
                    <p className="text-muted-foreground text-sm">Cost-effective solutions for seasonal staff or long projects.</p>
                </div>
            </div>
            <Button asChild className="w-full" size="lg">
                <Link href="/contact">Inquire for Rates</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}