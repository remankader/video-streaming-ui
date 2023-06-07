import Link from "next/link";

export default function SiteLogo() {
  return (
    <div className="pt-1 w-full md:w-auto flex justify-center">
      <Link
        href="/"
        className="font-bold italic text-2xl linkMono"
        // dark:text-gray-100 dark:hover:text-gray-200 dark:active:text-gray-300"
      >
        <span className="text-orange-500">V</span>
        <span>ideo</span>
        <span>_</span>
        <span className="text-orange-500">S</span>
        <span>tream</span>
      </Link>
    </div>
  );
}
