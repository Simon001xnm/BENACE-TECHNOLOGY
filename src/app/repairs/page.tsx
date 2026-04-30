import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Zap, Database, Laptop } from 'lucide-react';

export default function RepairsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
          Expert Laptop Repairs
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fast, reliable, and professional repair services for all major brands.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Hardware Repair', icon: Wrench, desc: 'Screen replacement, keyboard repair, and hinge fixes.' },
          { title: 'Speed Boost', icon: Zap, desc: 'RAM upgrades and SSD installations to make your PC fly.' },
          { title: 'Data Recovery', icon: Database, desc: 'Recovering lost files from damaged drives or systems.' },
          { title: 'Software Fix', icon: Laptop, desc: 'OS reinstallation, virus removal, and driver updates.' },
        ].map((service, i) => (
          <Card key={i}>
            <CardHeader>
              <service.icon className="mb-2 h-8 w-8 text-primary" />
              <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{service.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-xl bg-primary/5 p-8 text-center">
        <h2 className="text-2xl font-bold text-primary">Need a quick fix?</h2>
        <p className="mt-2 text-muted-foreground">Bring your device to our shop at Old Nation, 2nd Flr, Shop D1 for a free diagnosis.</p>
      </div>
    </div>
  );
}