import metadataFormatter from "@/shared/utilities/metadata-formatter";

export const metadata = metadataFormatter("Watch");

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
