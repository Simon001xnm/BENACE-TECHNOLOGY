'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    type: 'video',
    title: 'THE FUTURE OF TECH.',
    subtitle: 'ABOVE AND BEYOND.',
    description: 'Experience Nairobi\'s most sophisticated digital hub. High-performance gear meets expert craftsmanship.',
    cta: 'Explore Catalog',
    link: '/laptops',
    videoUrl: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4', // Modern tech abstract video
  },
  {
    type: 'image',
    title: 'PRECISION REPAIRS.',
    subtitle: 'VERSION 1255 QUALITY.',
    description: 'We don\'t just fix devices; we enhance them. Expert diagnostics and professional hardware support in Nairobi CBD.',
    cta: 'Book Repair',
    link: '/repairs',
    imageUrl: 'https://picsum.photos/seed/repair/1920/1080',
    hint: 'tech workshop'
  },
  {
    type: 'image',
    title: 'DIGITAL ARCHITECTURE.',
    subtitle: 'CRAFTED SOLUTIONS.',
    description: 'Building stunning, high-performance websites that elevate your brand and drive real business results.',
    cta: 'Web Design',
    link: '/services',
    imageUrl: 'https://picsum.photos/seed/code/1920/1080',
    hint: 'modern workspace'
  },
  {
    type: 'image',
    title: 'PREMIUM LAPTOP HIRE.',
    subtitle: 'ON-DEMAND POWER.',
    description: 'Access the best hardware for your corporate events, exams, or business travel without the long-term cost.',
    cta: 'Rent Today',
    link: '/laptop-hire',
    imageUrl: 'https://picsum.photos/seed/office/1920/1080',
    hint: 'business office'
  }
];

export function HeroSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 6000); // 6 seconds auto-slide

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
      <CarouselContent>
        {SLIDES.map((slide, index) => (
          <CarouselItem key={index} className="relative h-[80vh] min-h-[600px] w-full lg:h-[90vh]">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
              {slide.type === 'video' ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover opacity-60 grayscale-[0.5] contrast-[1.1]"
                >
                  <source src={slide.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={slide.imageUrl!}
                  alt={slide.title}
                  fill
                  className="object-cover opacity-60 grayscale-[0.3]"
                  priority={index === 0}
                  data-ai-hint={slide.hint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            {/* Content Layer */}
            <div className="container relative z-10 flex h-full items-center px-4 md:px-6">
              <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-left-12 duration-1000">
                <div className="flex flex-col gap-4">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/20 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-primary border-2 border-primary/20 backdrop-blur-md">
                    <Sparkles className="h-4 w-4" /> {slide.subtitle}
                  </div>
                  <h1 className="font-headline text-5xl font-black leading-[1] tracking-tighter text-white md:text-8xl lg:text-[100px]">
                    {slide.title.split('.').map((part, i) => (
                        <span key={i} className={cn(i === 1 ? "text-primary italic" : "")}>
                            {part}{i < slide.title.split('.').length - 1 ? '.' : ''} <br/>
                        </span>
                    ))}
                  </h1>
                </div>
                
                <p className="max-w-2xl text-xl font-medium leading-relaxed text-zinc-400 md:text-2xl">
                  {slide.description}
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="h-16 rounded-full bg-primary px-10 text-lg font-black uppercase tracking-widest text-black transition-all hover:scale-105 active:scale-95 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
                    <Link href={slide.link}>{slide.cta}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-16 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-md px-10 text-lg font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black">
                    <Link href="/contact" className="flex items-center gap-2">Contact Us <ChevronRight className="h-5 w-5" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* V1255 Pagination Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-2 transition-all duration-500 rounded-full",
              current === i ? "w-12 bg-primary" : "w-4 bg-white/20 hover:bg-white/40"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
}
