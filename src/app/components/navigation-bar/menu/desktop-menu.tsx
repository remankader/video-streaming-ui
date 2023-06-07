import Link from "next/link";
import { MenuItem, menuItems } from "./menu-items";

export default function DesktopMenu() {
  return (
    <div className="hidden md:block ml-4">
      <ul className="flex justify-start">
        {menuItems.map((item: MenuItem, index: number) => (
          <li key={index}>
            <Link href={item.link} className="flex ml-0.5 pt-3 px-2 linkMono">
              <span className="font-semibold">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
