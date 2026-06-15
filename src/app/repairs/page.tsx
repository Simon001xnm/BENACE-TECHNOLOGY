import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Zap, Database, Laptop, ShieldCheck, Clock } from 'lucide-react';

export default function RepairsPage() {
  const repairServices = [
    { 
      title: 'Fixing Hardware', 
      icon: Wrench, 
      desc: 'We fix broken screens, keys that do not work, broken hinges, and charging problems. We use good parts that last long.' 
    },
    { 
      title: 'Make Laptop Fast', 
      icon: Zap, 
      desc: 'Is your laptop slow? We can make it fast by cleaning the system and adding more memory.' 
    },
    { 
      title: 'Recover Lost Files', 
      icon: Database, 
      desc: 'Did you lose your important files or photos? We can try to get them back from your broken disk or USB.' 
    },
    { 
      title: 'Fixing Software', 
      icon: Laptop, 
      desc: 'We can install Windows or macOS for you. We also remove viruses and fix programs that are not working.' 
    },
    {
      title: 'Motherboard Fix',
      icon: ShieldCheck,
      desc: 'We fix deep problems like water damage or power issues. Even if others say it cannot be fixed, bring it to us.'
    },
    {
      title: 'Cleaning Service',
      icon: Clock,
      desc: 'We clean the inside of your laptop and change the cooling paste to stop it from getting too hot.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
          Laptop Repair & Help
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Benace Tech Hub has the most reliable repair services in Nairobi. We fix your device and make sure it works better than before.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repairServices.map((service, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-primary/5 border border-primary/10 p-10 text-center">
        <h2 className="text-2xl font-bold text-primary">Free Check-up</h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Not sure what is wrong? Bring your laptop to our shop at Old Nation House, 2nd Floor, Shop D1. We will check it for free and tell you the price before we start fixing it.
        </p>
        <div className="mt-8 flex justify-center gap-4">
           <div className="flex items-center gap-2 text-sm font-medium">
             <Clock className="h-4 w-4 text-primary" /> Fast Service
           </div>
           <div className="flex items-center gap-2 text-sm font-medium">
             <ShieldCheck className="h-4 w-4 text-primary" /> Parts Warranty
           </div>
        </div>
      </div>
    </div>
  );
}
