import type { Metadata } from "next";
import "./go.css";
import Experience from "./Experience";

export const metadata: Metadata = {
  title: "Grand Opening — WrapzNfryz | Every Kitchen, One Wrapper",
  description:
    "WrapzNfryz is open. Unwrap the city's kitchens — wraps, loaded fries and shakes from independent vendors, folded into one order. Scratch the foil for a launch-week code.",
  openGraph: {
    title: "WrapzNfryz — Grand Opening",
    description:
      "Every kitchen in town, one wrapper. Unwrap the launch and scratch out your code.",
    images: ["/images/img1.png"],
  },
};

export default function GrandOpeningPage() {
  return <Experience />;
}
