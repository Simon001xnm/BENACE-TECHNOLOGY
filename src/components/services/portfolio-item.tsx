import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PortfolioProject } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function PortfolioItem({ project }: { project: PortfolioProject }) {
  const projectImage = PlaceHolderImages.find(p => p.id === project.imageId);

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-60 w-full">
        {projectImage && (
            <Image
            src={projectImage.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={projectImage.imageHint}
          />
        )}
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <Badge variant="secondary" className="w-fit">{project.category}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{project.description}</p>
      </CardContent>
    </Card>
  );
}
