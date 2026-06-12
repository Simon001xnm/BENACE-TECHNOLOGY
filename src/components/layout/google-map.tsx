import React from 'react';

export function GoogleMap() {
  // Updated to point more specifically towards the Old Nation House area in Nairobi CBD
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819364531405!2d36.8252277!3d-1.2842105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d65961e01f%3A0x2f1532155f9a710b!2sOld%20Nation%20House!5e0!3m2!1sen!2ske!4v1710000000000!5m2!1sen!2ske";

  return (
    <section className="w-full border-t border-zinc-100 bg-white">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="mb-10 flex flex-col items-center text-center md:items-start md:text-left">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-primary mb-4 border border-primary/20">
            Physical Location
          </div>
          <h2 className="font-headline text-3xl font-black uppercase tracking-tight text-black sm:text-4xl">
            Visit Our <span className="text-primary">Nairobi Shop</span>
          </h2>
          <p className="mt-2 text-sm font-bold text-zinc-500 uppercase tracking-widest">
            Old Nation Building, 2nd Floor, Shop D1 • Nairobi, Kenya
          </p>
        </div>
        
        <div className="relative h-[500px] w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-500">
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
