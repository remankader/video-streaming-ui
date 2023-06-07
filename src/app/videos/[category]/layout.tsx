import { VIDEO_CATEGORIES } from "@/shared/constants/video";
import metadataFormatter from "@/shared/utilities/metadata-formatter";

export async function generateMetadata({
  params,
}: {
  params: { category: "music" | "game" };
}) {
  return metadataFormatter(VIDEO_CATEGORIES[params.category]);
}

export default function VideoCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
