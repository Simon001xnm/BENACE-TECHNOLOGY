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
    title: 'THE BEST LAPTOPS.',
    subtitle: 'QUALITY YOU CAN TRUST.',
    description: 'Visit the best computer shop in Nairobi. We have fast laptops and experts to help you.',
    cta: 'See Laptops',
    link: '/laptops',
    videoUrl: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4',
  },
  {
    type: 'image',
    title: 'WE FIX LAPTOPS.',
    subtitle: 'FAST & GOOD SERVICE.',
    description: 'We can fix your broken laptop quickly. Visit our shop in Nairobi CBD for help.',
    cta: 'Book Repair',
    link: '/repairs',
    imageUrl: 'https://picsum.photos/seed/repair/1920/1080',
    hint: 'tech workshop'
  },
  {
    type: 'image',
    title: 'WE BUILD WEBSITES.',
    subtitle: 'HELP YOUR BUSINESS GROW.',
    description: 'We make beautiful websites that help you get more customers for your business.',
    cta: 'Web Design',
    link: '/services',
    imageUrl: 'https://picsum.photos/seed/code/1920/1080',
    hint: 'modern workspace'
  },
  {
    type: 'image',
    title: 'RENT A LAPTOP.',
    subtitle: 'CHEAP & EASY.',
    description: 'Do not want to buy a laptop? Rent one from us for school, office work, or events.',
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
    }, 6000);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
      <CarouselContent>
        {SLIDES.map((slide, index) => (
          <CarouselItem key={index} className="relative h-[70vh] min-h-[500px] w-full lg:h-[80vh]">
            <div className="absolute inset-0 z-0 bg-black">
              {slide.type === 'video' ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover opacity-50"
                >
                  <source src={slide.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={slide.imageUrl!}
                  alt={slide.title}
                  fill
                  className="object-cover opacity-50"
                  priority={index === 0}
                  data-ai-hint={slide.hint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            <div className="container relative z-10 flex h-full items-center px-4 md:px-6">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-primary border border-primary/20 backdrop-blur-md">
                  <Sparkles className="h-3 w-3" /> {slide.subtitle}
                </div>
                <h1 className="font-headline text-4xl font-black leading-tight tracking-tighter text-white md:text-7xl">
                  {slide.title}
                </h1>
                <p className="max-w-xl text-lg font-medium text-zinc-300 md:text-xl">
                  {slide.description}
                </p>
                <div className="flex flex-col gap-4 sm:flex-row pt-4">
                  <Button asChild size="lg" className="h-14 rounded-full bg-primary px-8 text-sm font-black uppercase tracking-widest text-black hover:bg-white transition-all">
                    <Link href={slide.link}>{slide.cta}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/20 bg-white/5 backdrop-blur-md px-8 text-sm font-black uppercase tracking-widest text-white hover:bg-white hover:text-black">
                    <Link href="/contact">Talk to Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 transition-all duration-500 rounded-full",
              current === i ? "w-10 bg-primary" : "w-3 bg-white/30"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </Carousel>
  );
}
