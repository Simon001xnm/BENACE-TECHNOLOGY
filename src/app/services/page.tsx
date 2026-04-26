import Image from 'next/image';
import { services, portfolioProjects } from '@/lib/data';
import { ServiceCard } from '@/components/services/service-card';
import { PortfolioItem } from '@/components/services/portfolio-item';
import { ServiceInquiryForm } from '@/components/services/service-inquiry-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ServicesPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'portfolio-2');

  return (
    <div>
      <section className="relative bg-primary py-20 text-primary-foreground md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Digital Experiences, Masterfully Crafted
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
            We partner with you to build stunning, high-performing websites that
            drive results and elevate your brand.
          </p>
        </div>
      </section>

      <section id="our-services" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              What We Offer
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              A complete suite of services to build and grow your online presence.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Our Work
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Take a look at some of the projects we're proud to have been a part of.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {portfolioProjects.map(project => (
              <PortfolioItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 rounded-lg border bg-card p-8 shadow-lg md:grid-cols-2 md:p-12">
            <div>
              <h2 className="font-headline text-3xl font-bold text-primary">
                Have a project in mind?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Let's talk about your goals. Fill out the form, and our team
                will get back to you to schedule a free consultation. We're
                excited to learn how we can help.
              </p>
              <div className="relative mt-8 h-64 w-full rounded-md md:h-80">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    fill
                    className="rounded-md object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
            </div>
            <ServiceInquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
