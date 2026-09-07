import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | Fittrock Ergonomics',
  description: 'View and manage the items in your Fittrock ergonomic desk shopping cart.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
