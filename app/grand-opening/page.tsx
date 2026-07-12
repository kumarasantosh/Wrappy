import type { Metadata } from "next";
import "./go.css";
import Experience from "./Experience";

export const metadata: Metadata = {
  title: "Grand Opening 15 July — WrapzNfryz, Banjara Hills",
  description:
    "WrapzNfryz opens its doors in Banjara Hills, Hyderabad on Wednesday, 15 July. Signature wraps, loaded fries and thickshakes — rolled fresh at the counter. Scratch the foil for an opening-week code.",
  openGraph: {
    title: "WrapzNfryz — Grand Opening 15 July, Banjara Hills",
    description:
      "Doors open 15 July in Banjara Hills. Unwrap the reveal and scratch out your opening-week code.",
    images: ["/images/img1.png"],
  },
};

export default function GrandOpeningPage() {
  return <Experience />;
}
