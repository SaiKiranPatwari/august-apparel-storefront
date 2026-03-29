import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      {/* Promotional Marquee */}
      <div className="bg-brand-sage text-brand-charcoal py-2 overflow-hidden whitespace-nowrap border-b border-brand-sand">
        <div className="animate-[marquee_20s_linear_infinite] inline-block font-medium tracking-wide text-sm uppercase">
          <span className="mx-4">Enjoy 20% off all dresses this weekend only.</span>
          <span className="mx-4">•</span>
          <span className="mx-4">Free standard shipping on orders over $150.</span>
          <span className="mx-4">•</span>
          <span className="mx-4">New arrivals just landed: Shop the Fall Collection.</span>
          <span className="mx-4">•</span>
          <span className="mx-4">Enjoy 20% off all dresses this weekend only.</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[85vh] bg-brand-charcoal overflow-hidden group">
        <Image 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
          alt="Fall Collection Editorial"
          fill
          className="object-cover object-center transform transition-transform duration-[15s] group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Slight overlay for text readability */}
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 mt-16 text-white text-balance">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 font-semibold tracking-wide drop-shadow-md">
            The Fall Collection
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl font-light tracking-wider drop-shadow-md">
            Embrace the change of seasons with rich textures, earthy hues, and timeless silhouettes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/collections/all" 
              className="bg-white text-brand-charcoal px-10 py-4 font-semibold uppercase tracking-wider text-sm hover:bg-brand-sand transition-colors duration-300"
            >
              Shop New Arrivals
            </Link>
            <Link 
              href="#curated" 
              className="bg-transparent border border-white text-white px-10 py-4 font-semibold uppercase tracking-wider text-sm hover:bg-white hover:text-brand-charcoal transition-colors duration-300"
            >
              Discover The Lookbook
            </Link>
          </div>
        </div>
      </section>

      {/* Asymmetrical Curated Grid */}
      <section id="curated" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">Curated For You</h2>
          <div className="w-16 h-px bg-brand-charcoal mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          
          {/* Large Editorial Card (Left) */}
          <Link href="/collections/dresses" className="col-span-1 md:col-span-7 group block relative overflow-hidden h-[500px] md:h-[700px]">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1481&auto=format&fit=crop"
              alt="Dresses collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
              <h3 className="font-serif text-3xl md:text-5xl mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">The Dress Edit</h3>
              <p className="text-sm uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Shop Dresses &rarr;</p>
            </div>
          </Link>

          {/* Right Column Stack */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-6 md:gap-8 h-full">
            
            {/* Top Right Card */}
            <Link href="/collections/accessories" className="group block relative overflow-hidden h-[300px] md:h-[330px] flex-1">
              <Image
                src="https://images.unsplash.com/photo-1582142407894-ec85a1260a46?q=80&w=1527&auto=format&fit=crop"
                alt="Accessories"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h3 className="font-serif text-2xl md:text-3xl mb-2">Finishing Touches</h3>
                <span className="text-xs uppercase tracking-widest border-b border-transparent group-hover:border-white transition-colors duration-300 pb-1">Shop Accessories</span>
              </div>
            </Link>

            {/* Bottom Right Card */}
            <Link href="/collections/shoes" className="group block relative overflow-hidden h-[300px] md:h-[330px] flex-1">
              <Image
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop"
                alt="Shoes"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h3 className="font-serif text-2xl md:text-3xl mb-2">Step Forward</h3>
                <span className="text-xs uppercase tracking-widest border-b border-transparent group-hover:border-white transition-colors duration-300 pb-1">Shop Shoes</span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Text / Quote Section */}
      <section className="bg-brand-sand py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-serif text-2xl md:text-4xl leading-relaxed text-brand-charcoal">
            &quot;Our philosophy is simple: we believe in creating beautiful pieces that inspire confidence and stand the test of time. Every garment tells a story.&quot;
          </p>
          <div className="mt-8">
            <Link href="#" className="text-sm uppercase tracking-widest font-semibold text-brand-charcoal border-b border-brand-charcoal pb-1 hover:text-brand-rust hover:border-brand-rust transition-colors duration-300">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup (Before Footer) */}
      <section className="py-20 border-t border-brand-sand relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl mb-4 text-brand-charcoal">Join The Aura Community</h2>
          <p className="mb-8 text-brand-charcoal/80">Sign up for exclusive offers, original stories, activism awareness, events and more.</p>
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              className="flex-1 border-b border-brand-charcoal bg-transparent px-2 py-3 focus:outline-none placeholder-brand-charcoal/50 text-brand-charcoal"
            />
            <button type="submit" className="bg-brand-charcoal text-white px-8 py-3 uppercase tracking-wider text-xs font-semibold hover:bg-brand-rust transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
