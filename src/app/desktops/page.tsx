import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Cpu, Mouse } from 'lucide-react';

export default function DesktopsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
          Desktops & Monitors
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          High-performance workstations and crystal-clear displays for your home or office.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Monitor className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Professional Monitors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              From 24-inch office screens to 4K creative displays. Brands include Dell, HP, and Samsung.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Cpu className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Workstation Towers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Powerful CPU towers for engineering, video editing, and heavy business processing.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Mouse className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Complete Bundles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Full desktop sets including monitor, CPU, keyboard, and mouse. Ready to use out of the box.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-muted-foreground">Contact us for current inventory and custom configurations.</p>
      </div>
    </div>
  );
}