import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout | Fittrock Ergonomics',
  description: 'Complete your purchase securely at Fittrock Ergonomics with 100% Free Pan-India Delivery.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
