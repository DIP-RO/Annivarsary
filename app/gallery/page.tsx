import { GallerySection } from "@/components/GallerySection";
import { getImagePaths } from "@/lib/media";

export default async function GalleryPage() {
  const images = await getImagePaths();

  return <GallerySection images={images} />;
}
