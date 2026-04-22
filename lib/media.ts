import { promises as fs } from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

async function listFiles(relativeDirectory: string, allowed: Set<string>) {
  const directoryPath = path.join(process.cwd(), "public", relativeDirectory);

  try {
    const files = await fs.readdir(directoryPath);
    return files
      .filter((file) => allowed.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((file) => `/${relativeDirectory}/${encodeURIComponent(file)}`);
  } catch (error) {
    console.error(`Unable to read /public/${relativeDirectory}:`, error);
    return [];
  }
}

export async function getImagePaths() {
  return listFiles("images", IMAGE_EXTENSIONS);
}

export async function getVideoPaths() {
  return listFiles("videos", VIDEO_EXTENSIONS);
}
