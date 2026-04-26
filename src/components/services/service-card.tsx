import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Service } from '@/lib/types';

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Card className="text-center">
      <CardHeader className="items-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Icon className="h-8 w-8" />
        </div>
        <CardTitle>{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{service.description}</p>
      </CardContent>
    </Card>
  );
}
