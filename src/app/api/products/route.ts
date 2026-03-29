import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockProducts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const brands = searchParams.get('brands'); // comma separated

  let products = [...mockProducts];

  // Filter by category
  if (category && category !== 'all') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Filter by brand
  if (brands) {
    const brandArray = brands.split(',').map(b => b.trim().toLowerCase());
    products = products.filter(p => {
      if (!p.brand) return false;
      return brandArray.includes(p.brand.toLowerCase());
    });
  }

  // Simulate network delay to demonstrate loading states in frontend
  await new Promise(resolve => setTimeout(resolve, 600));

  return NextResponse.json(products);
}
