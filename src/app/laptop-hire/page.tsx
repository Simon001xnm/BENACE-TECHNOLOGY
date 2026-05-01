import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, Clock, Briefcase, GraduationCap, Users } from 'lucide-react';
import Link from 'next/link';

export default function LaptopHirePage() {
  const useCases = [
    {
      title: 'Corporate Training',
      icon: Users,
      desc: 'Uniform, pre-configured laptops for bulk training sessions, workshops, or temporary staff surges.'
    },
    {
      title: 'Student Exams',
      icon: GraduationCap,
      desc: 'Reliable machines for university projects, online certifications, or final exams when your own PC fails.'
    },
    {
      title: 'Business Travel',
      icon: Briefcase,
      desc: 'Lightweight, high-end business ultrabooks for professionals on the move who need security and battery life.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
          Premium Laptop Rental
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Don't let hardware limitations slow you down. Access high-performance computing with our flexible rental plans.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3 mb-16">
        {useCases.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 border rounded-2xl bg-card">
            <div className="mb-4 p-3 rounded-full bg-primary/10">
              <item.icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-primary/20 bg-primary/[0.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                The Benace Advantage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                'Highly competitive daily, weekly, and monthly rates',
                'Pristine condition devices from HP, Dell, and Lenovo',
                'Optional software pre-loading (Office, Design tools)',
                'On-call technical support included in every hire',
                'Free local delivery in Nairobi for bulk orders',
                'Comprehensive device insurance coverage'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex flex-col justify-center space-y-8 p-6">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-xl">
                      <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                      <h3 className="font-bold">Short-Term Rentals</h3>
                      <p className="text-muted-foreground text-sm">Need a laptop for just a day or two? Our flexible short-term plans are designed for immediate, high-impact needs.</p>
                  </div>
              </div>
              <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-xl">
                      <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                      <h3 className="font-bold">Long-Term Leasing</h3>
                      <p className="text-muted-foreground text-sm">Cost-effective solutions for startups or seasonal projects. Keep your capital and rent the latest tech instead.</p>
                  </div>
              </div>
            </div>
            <div className="pt-4">
              <Button asChild className="w-full h-12 text-lg shadow-lg" size="lg">
                  <Link href="/contact">Request a Rental Quote</Link>
              </Button>
              <p className="text-center text-[10px] text-muted-foreground mt-4 uppercase tracking-widest font-bold">
                Terms and Conditions Apply • Identification Required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
