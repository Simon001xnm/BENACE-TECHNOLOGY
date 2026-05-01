import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Zap, Database, Laptop, ShieldCheck, Clock } from 'lucide-react';

export default function RepairsPage() {
  const repairServices = [
    { 
      title: 'Hardware Repair', 
      icon: Wrench, 
      desc: 'Expert fixing of broken screens, faulty keyboards, loose hinges, and charging ports. We use high-quality replacement parts for durability.' 
    },
    { 
      title: 'Performance Optimization', 
      icon: Zap, 
      desc: 'Transform your slow PC into a high-speed machine. We offer SSD cloning, RAM upgrades, and deep system cleaning to boost productivity.' 
    },
    { 
      title: 'Advanced Data Recovery', 
      icon: Database, 
      desc: 'Recovering vital files from crashed hard drives, formatted partitions, or corrupted USB drives using professional recovery tools.' 
    },
    { 
      title: 'Software & OS Solutions', 
      icon: Laptop, 
      desc: 'Clean installation of Windows or macOS, virus and malware removal, and driver troubleshooting for a smooth computing experience.' 
    },
    {
      title: 'Motherboard Repair',
      icon: ShieldCheck,
      desc: 'Complex component-level repairs for water damage, power surges, or random shut-offs that others might write off as irreparable.'
    },
    {
      title: 'Preventive Maintenance',
      icon: Clock,
      desc: 'Biannual internal cleaning and thermal paste replacement to prevent overheating and extend the lifespan of your expensive equipment.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
          Professional Repair & Support
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Benace Tech Hub provides Nairobi's most reliable repair services. We don't just fix devices; we ensure they perform better than ever.
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
        <h2 className="text-2xl font-bold text-primary">Free Technical Diagnosis</h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Not sure what's wrong? Bring your device to our shop at Old Nation, 2nd Floor. Our technicians will perform a comprehensive check and provide a transparent quote before any work begins.
        </p>
        <div className="mt-8 flex justify-center gap-4">
           <div className="flex items-center gap-2 text-sm font-medium">
             <Clock className="h-4 w-4 text-primary" /> Fast Turnaround
           </div>
           <div className="flex items-center gap-2 text-sm font-medium">
             <ShieldCheck className="h-4 w-4 text-primary" /> Warranty on Parts
           </div>
        </div>
      </div>
    </div>
  );
}
