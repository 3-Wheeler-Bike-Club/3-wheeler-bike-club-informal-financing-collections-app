import type { MetadataRoute } from "next"
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "3 Wheeler Bike Club | Informal Financing Collections",
    short_name: "3WB Informal Financing Collections",
    description: 'Monitor repayments, manage borrowers, and track informal financing agreements — all in one place.',
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f5cd1d",
    icons: [
        {
            src: "/icons/192x192.png",
            sizes: "192x192",
            type: "image/png",
        },
        {
            src: "/icons/512x512.png",
            sizes: "512x512",
            type: "image/png",
        },
    ],
    }
}