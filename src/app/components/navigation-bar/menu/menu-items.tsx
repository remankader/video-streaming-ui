import { ArrowUpTrayIcon, HomeIcon } from "@heroicons/react/24/outline";

export interface MenuItem {
  text: string;
  icon: JSX.Element;
  link: string;
}

export const menuItems: MenuItem[] = [
  {
    text: "Home",
    icon: <HomeIcon className="h-4 w-4 text-gray-100" />,
    link: "/",
  },
  {
    text: "Upload",
    icon: <ArrowUpTrayIcon className="h-4 w-4 text-gray-100" />,
    link: "/upload",
  },
];
