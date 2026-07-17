import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BH Menu",
  description:
    "Wrapz N Fryz digital menu — wraps, loaded fries, pizza, sandwiches, thickshakes, mojitos & desserts.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BhMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
