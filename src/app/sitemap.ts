import type { MetadataRoute } from "next";

const siteUrl = "https://quarrysoftware.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/approach", "/contact", "/web-server"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
  }));
}
