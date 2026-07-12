import type { Metadata } from "next";
import "./go.css";
import Experience from "./Experience";

export const metadata: Metadata = {
  title: "Banjara Hills Opening — Wrapz N Fryz",
  description:
    "Join us for the grand opening of Wrapz N Fryz in Banjara Hills, Hyderabad on Wednesday, 15 July. Experience signature wraps, loaded fries, and handcrafted thickshakes. Scratch the foil for an opening-week code!",
  openGraph: {
    title: "Wrapz N Fryz — Banjara Hills Opening, 15 July",
    description:
      "Banjara Hills grand opening on Wednesday, 15 July.Experience signature wraps, loaded fries, and handcrafted thickshakes—prepared fresh to order, wrapped hot, and served with care. Welcome to your new go-to destination for great food",
    images: ["/images/logoa.png"],
  },
};

export default function GrandOpeningPage() {
  return <Experience />;
}
