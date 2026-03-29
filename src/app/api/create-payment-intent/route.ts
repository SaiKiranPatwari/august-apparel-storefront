import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Provide a fallback dummy string so Next.js static analysis does not crash during the build phase
const stripe = new Stripe((process.env.STRIPE_SECRET_KEY as string) || 'sk_test_dummy');

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert dollars to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err: unknown) {
    console.error('Stripe processing error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
