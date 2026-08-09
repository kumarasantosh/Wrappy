import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // make sure Google can fetch the images that power image search
        userAgent: "Googlebot-Image",
        allow: "/",
      },
    ],
    sitemap: "https://wrapznfryz.com/sitemap.xml",
    host: "https://wrapznfryz.com",
  };
}
