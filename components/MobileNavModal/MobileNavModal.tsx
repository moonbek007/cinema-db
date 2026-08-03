"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HouseIcon, LibraryIcon, SearchIcon } from "lucide-react";

import "../../css/navmodal.css";

const MobileNavModal = ({ closeModal }: NavModalProps) => {
  const pathName = usePathname();
  return (
    <div className="nav-modal">
      <nav className="nav">
        <ul>
          <li>
            <button
              className={`nav__btn text-amber-50 hover:text-gray-100 ${pathName === "/" && "link-active"}`}
              onClick={closeModal}
            >
              <Link href="/">
                <HouseIcon />
                <span>Home</span>
              </Link>
            </button>
          </li>
          <li>
            <button
              className={`nav__btn text-amber-50 hover:text-gray-100 ${pathName === "/collections" && "link-active"}`}
              onClick={closeModal}
            >
              <Link href="/collections">
                <LibraryIcon />
                <span>Collections</span>
              </Link>
            </button>
          </li>
          <li>
            <button
              className={`nav__btn text-amber-50 hover:text-gray-100 ${pathName === "/explore" && "link-active"}`}
              onClick={closeModal}
            >
              <Link href="/explore">
                <SearchIcon />
                <span>Explore</span>
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default memo(MobileNavModal);
