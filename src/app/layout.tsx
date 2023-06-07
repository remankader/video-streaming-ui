import "./globals.css";
import { Providers } from "./provider";
import metadataFormatter from "@/shared/utilities/metadata-formatter";
import TopMessageBar from "./components/navigation-bar/top-message-bar";
import NavigationBar from "./components/navigation-bar";

export const metadata = metadataFormatter("Home");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <TopMessageBar />
        <Providers>
          <nav className="flex justify-center border-b border-gray-200 dark:border-gray-700">
            <div className="w-full p-1.5 mx-1 md:mx-4">
              <NavigationBar />
            </div>
          </nav>

          <main className="flex justify-center">
            <div className="w-full p-1.5 my-1.5 pb-6 mx-1 md:mx-4">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
