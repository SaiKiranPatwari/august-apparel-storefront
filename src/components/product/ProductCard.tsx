import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/mockProducts";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col cursor-pointer">
      <Link href={`/product/${product.id}`} className="relative bg-brand-sand aspect-[3/4] overflow-hidden mb-4">
        {/* Primary Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {/* Secondary Image (Hover State) */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate`}
            fill
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        
        {/* Badges */}
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-white px-2 py-1 text-[10px] uppercase tracking-wider font-semibold text-brand-charcoal z-10">
            New
          </div>
        )}
      </Link>
      
      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <Link href={`/product/${product.id}`} className="font-serif text-lg text-brand-charcoal hover:text-brand-rust transition-colors mb-1">
          {product.name}
        </Link>
        <p className="text-brand-charcoal text-base">${product.price.toFixed(2)}</p>
        
        {/* Colors (mock swatches) */}
        {product.colors && (
          <div className="flex gap-2 mt-3">
            {product.colors.map((color, index) => (
              <div 
                key={index} 
                className="w-4 h-4 rounded-full border border-brand-charcoal/20"
                style={{ backgroundColor: color }}
                title={`Color option ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
