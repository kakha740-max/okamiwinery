import GalleryEditorial from "@/components/gallery/GalleryEditorial";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Inside Etno Okami Winery: the estate and its historic halls, the cellar and oak casks, production, tastings and the grape harvest in Shida Kartli, Georgia.",
  path: "/gallery",
  image: "/images/og/gallery.jpg",
  imageAlt: "The great hall at Etno Okami Winery",
});

export default function GalleryPage() {
  return (
    <main id="main" className="bg-paper">
      <GalleryEditorial />
    </main>
  );
}
