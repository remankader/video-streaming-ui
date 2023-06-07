import SiteLogo from "./site-logo";
import MobileMenu from "./menu/mobile-menu";
import DesktopMenu from "./menu/desktop-menu";
import SearchBoxContainer from "./search/search-box-container";

export default function NavigationBar() {
  return (
    <>
      <div className="flex justify-between relative">
        <div className="w-full md:w-2/3 flex">
          <MobileMenu />
          <SiteLogo />
          <DesktopMenu />
        </div>
        <div className="md:w-1/3 flex">
          <SearchBoxContainer />
        </div>
      </div>
    </>
  );
}
