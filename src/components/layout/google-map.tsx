import React from 'react';

export function GoogleMap() {
  // Point specifically towards the Old Nation House area in Nairobi CBD
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819364531405!2d36.8252277!3d-1.2842105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d65961e01f%3A0x2f1532155f9a710b!2sOld%20Nation%20House!5e0!3m2!1sen!2ske!4v1710000000000!5m2!1sen!2ske";

  return (
    <section className="w-full bg-white border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 flex flex-col items-start text-left">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Our Location
          </h2>
          <p className="mt-1 text-sm font-medium text-zinc-500 uppercase tracking-widest">
            Old Nation Building, 2nd Floor, Shop D1 • Nairobi, Kenya
          </p>
        </div>
        
        <div className="relative h-[450px] w-full overflow-hidden border border-zinc-200">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Benace Tech Hub Location Map"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
