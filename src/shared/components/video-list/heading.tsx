import Link from "next/link";

export default function VideoListHeading({
  title,
  path,
}: {
  title: string;
  path?: string;
}) {
  return (
    <div>
      {path ? (
        <>
          <div className="flex">
            <h1 className="w-1/2">{title}</h1>
            <div className="w-1/2 flex justify-end">
              <Link href={path} className="place-self-end py-2.5">
                Browse All
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1>{title}</h1>
        </div>
      )}
      <hr />
    </div>
  );
}
