import { VideoSection } from "@/components/VideoSection";
import { getVideoPaths } from "@/lib/media";

export default async function VideoPage() {
  const videos = await getVideoPaths();

  return <VideoSection videos={videos} />;
}
