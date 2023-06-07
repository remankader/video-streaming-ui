export default function metadataFormatter(
  title?: string,
  description?: string
) {
  const metadata = {
    title: `${title ? `${title} - ` : ""}${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: description || "A video streaming service demo",
  };

  return metadata;
}
