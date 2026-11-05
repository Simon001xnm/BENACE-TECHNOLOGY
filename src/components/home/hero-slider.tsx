
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
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const SLIDES = [
  {
    title: 'THE BEST LAPTOPS IN NAIROBI.',
    subtitle: 'QUALITY • FAIR PRICES',
    description: 'Find fast and reliable computers for school, work, or business. We have high-spec 13th Gen models ready for you today.',
    cta: 'Browse Laptops',
    link: '/laptops',
    heroImageId: 'hero-laptop-png-primary',
    bgImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1920&auto=format&fit=crop',
    hint: 'modern laptop'
  },
  {
    title: 'FAST COMPUTER REPAIR SERVICE.',
    subtitle: 'CBD NAIROBI • SAME DAY',
    description: 'Is your laptop broken or slow? We fix screens, batteries, and software problems quickly so you can get back to work.',
    cta: 'Fix My Device',
    link: '/repairs',
    heroImageId: 'hero-laptop-png-2',
    bgImage: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1920&auto=format&fit=crop',
    hint: 'repair tools'
  },
  {
    title: 'PROFESSIONAL WEB DESIGN.',
    subtitle: 'GROW YOUR BUSINESS ONLINE',
    description: 'We build beautiful, fast websites and setup POS systems to help your business find more customers in Kenya.',
    cta: 'View Our Work',
    link: '/services',
    heroImageId: 'hp-series-5-524sf-monitor-img',
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop',
    hint: 'business website'
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
          <CarouselItem key={index} className="relative h-[85vh] min-h-[700px] w-full overflow-hidden">
            {/* Dark Professional Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.bgImage}
                alt={slide.title}
                fill
                className="object-cover opacity-30 grayscale-[0.2]"
                priority={index === 0}
                data-ai-hint={slide.hint}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent" />
            </div>

            <div className="container relative z-10 flex h-full items-center px-6 mx-auto">
              <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">
                {/* Left Side: Impactful Text */}
                <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left duration-700">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#0070ba]/20 border border-[#0070ba]/40 backdrop-blur-md px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <Sparkles className="h-4 w-4 text-[#0070ba]" /> {slide.subtitle}
                  </div>
                  <h1 className="font-headline text-5xl font-black leading-[1.05] tracking-tighter text-white md:text-7xl lg:text-8xl uppercase">
                    {slide.title}
                  </h1>
                  <p className="max-w-md text-xl font-bold text-zinc-400 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row pt-6">
                    <Button asChild size="lg" className="h-16 rounded-none bg-[#0070ba] px-12 text-[12px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-[#0070ba] transition-all shadow-2xl">
                      <Link href={slide.link} className="flex items-center gap-3">
                        {slide.cta} <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-16 rounded-none border-2 border-white/20 bg-white/5 backdrop-blur-md px-12 text-[12px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                      <Link href="https://wa.me/254714210957" target="_blank" className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5" /> WhatsApp Support
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right Side: Primary PNG Showcase (Maximum Visibility) */}
                <div className="relative hidden lg:flex items-center justify-center h-[650px] w-full animate-in fade-in zoom-in duration-1000 delay-300">
                  <div className="relative h-full w-full flex items-center justify-center">
                    {/* Glowing effect behind product */}
                    <div className="absolute h-[550px] w-[550px] bg-[#0070ba]/30 rounded-full blur-[140px] animate-pulse" />
                    
                    {/* The Product Image */}
                    {(() => {
                      const img = PlaceHolderImages.find(p => p.id === slide.heroImageId);
                      if (!img) return null;
                      return (
                        <div className="relative w-full h-full flex items-center justify-center animate-float-high">
                          <Image 
                            src={img.imageUrl} 
                            alt={img.description} 
                            width={1100}
                            height={900}
                            className="object-contain drop-shadow-[0_45px_70px_rgba(0,112,186,0.6)] transition-transform duration-700 hover:scale-110" 
                            data-ai-hint={img.imageHint}
                            priority
                          />
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Progress Bar Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 z-20 flex gap-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 transition-all duration-500 rounded-full",
              current === i ? "w-16 bg-[#0070ba]" : "w-6 bg-white/30"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      
      <style jsx global>{`
        @keyframes float-high {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        .animate-float-high {
          animation: float-high 6s ease-in-out infinite;
        }
      `}</style>
    </Carousel>
  );
}
