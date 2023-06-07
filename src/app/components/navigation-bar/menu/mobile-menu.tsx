"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { MenuItem, menuItems } from "./menu-items";

export default function MobileMenu() {
  return (
    <div className="md:hidden">
      <Menu>
        <Menu.Button
          className="border border-gray-300 dark:border-gray-600 
          rounded-md p-2.5 active:bg-gray-700"
        >
          <Bars3Icon className="h-5 w-5 text-gray-500" />
        </Menu.Button>
        <div className="bg-white dark:bg-gray-700 absolute mt-0.5">
          <Menu.Items>
            {menuItems.map((item: MenuItem, index: number) => (
              <Menu.Item key={index}>
                <Link
                  href={item.link}
                  className="mb-[-1px] py-2.5 px-5 block w-full 
                    text-gray-800 dark:text-gray-100 font-semibold
                    min-w-[200px] border border-gray-300 dark:border-gray-600 
                    hover:bg-gray-600 hover:!text-gray-100 hover:!no-underline 
                    active:bg-gray-700"
                >
                  {item.text}
                </Link>
              </Menu.Item>
            ))}
          </Menu.Items>
        </div>
      </Menu>
    </div>
  );
}
