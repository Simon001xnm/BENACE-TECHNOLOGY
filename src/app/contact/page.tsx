import { ServiceInquiryForm } from '@/components/services/service-inquiry-form';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary uppercase">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground font-bold uppercase tracking-widest text-xs">
          Reach out to us for any technical inquiries or support at Benace Tech Hub.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full h-fit">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-tight">Our Location</h3>
              <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest mt-1">Old Nation House, 2nd Flr, Shop D1</p>
              <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Nairobi, Kenya</p>
              <Button asChild variant="link" className="px-0 h-auto text-primary font-black uppercase text-[10px] tracking-widest mt-2">
                <Link href="https://share.google/KF3VkjKGYkdCNJMUz" target="_blank" className="flex items-center gap-2">
                  View on Google Business <ExternalLink className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full h-fit">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-tight">Contact Number</h3>
              <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest mt-1">0714210957</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full h-fit">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-tight">Email Address</h3>
              <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest mt-1">benacetechnologies@gmail.com</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full h-fit">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-tight">Business Hours</h3>
              <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest mt-1">Mon - Fri: 8:00 AM - 6:00 PM</p>
              <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Sat: 9:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,112,186,1)]">
          <h2 className="mb-6 text-xl font-black uppercase tracking-tighter">Send us a Message</h2>
          <ServiceInquiryForm />
        </div>
      </div>
    </div>
  );
}
