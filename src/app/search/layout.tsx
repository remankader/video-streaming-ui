import metadataFormatter from "@/shared/utilities/metadata-formatter";

export const metadata = metadataFormatter("Search");

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
