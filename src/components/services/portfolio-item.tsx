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
    <Card className="overflow-hidden transition-all duration-500 hover:shadow-2xl rounded-[2.5rem] border border-zinc-100 bg-white group">
      <div className="relative h-72 md:h-80 w-full overflow-hidden">
        {projectImage && (
            <Image
            src={projectImage.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={projectImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <CardHeader className="p-8 pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-primary/10 text-primary border-none font-black uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-full">
            {project.category}
          </Badge>
        </div>
        <CardTitle className="text-2xl font-black uppercase tracking-tighter">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <p className="text-zinc-500 font-bold leading-relaxed">{project.description}</p>
      </CardContent>
    </Card>
  );
}
