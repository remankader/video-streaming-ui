import metadataFormatter from "@/shared/utilities/metadata-formatter";

export const metadata = metadataFormatter("Upload");

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
