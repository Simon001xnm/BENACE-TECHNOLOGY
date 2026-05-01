import React from 'react';

export function GoogleMap() {
  // Using the Naivasha location for Benace Technologies
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1678229983994!2d36.4357597!3d-0.7171448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1829177a4a2c0f9f%3A0x6d9f7a8e7a6d8d6!2sBenace%20Technologies!5e0!3m2!1sen!2ske!4v1710000000000!5m2!1sen!2ske";

  return (
    <section className="w-full border-t-4 border-black bg-zinc-100">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-8 flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="font-headline text-3xl font-black uppercase tracking-tight text-black sm:text-4xl">
            Visit Our <span className="text-primary">Naivasha Shop</span>
          </h2>
          <p className="mt-2 font-bold text-zinc-600">
            Old Nation Building, 2nd Floor, Shop D1 • Naivasha, Kenya
          </p>
        </div>
        
        <div className="relative h-[450px] w-full overflow-hidden rounded-2xl border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Benace Tech Hub Location Map"
            className="filter grayscale contrast-125 transition-all duration-700 hover:grayscale-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
