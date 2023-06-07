import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchInput) {
      router.push(`/search?title=${searchInput}`);
    }
  };

  return (
    <form className="flex w-full relative" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        id="searchInput"
        className="inputText !pr-11"
        defaultValue={searchParams.get("title") || ""}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <button
        type="submit"
        className="buttonLight !px-3 absolute right-[1px] top-[1px] 
    bottom-[1px] !border-transparent !border-l-gray-300 dark:!border-l-gray-600
    !rounded-tl-none !rounded-bl-none"
      >
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
      </button>
    </form>
  );
}
