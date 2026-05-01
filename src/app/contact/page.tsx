import { ServiceInquiryForm } from '@/components/services/service-inquiry-form';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We're here to help. Reach out to us for any inquiries or support.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full h-fit">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Our Location</h3>
              <p className="text-muted-foreground">Old Nation, 2nd Flr, Shop D1</p>
              <p className="text-muted-foreground">Nairobi, Kenya</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full h-fit">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Contact Number</h3>
              <p className="text-muted-foreground">0714210957</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full h-fit">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Email Address</h3>
              <p className="text-muted-foreground">benacetechnologies@gmail.com</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full h-fit">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Business Hours</h3>
              <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 6:00 PM</p>
              <p className="text-muted-foreground">Sat: 9:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">Send us a Message</h2>
          <ServiceInquiryForm />
        </div>
      </div>
    </div>
  );
}
