import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account & Orders | Fittrock Ergonomics',
  description: 'Manage your Fittrock customer profile, addresses, and order history.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
