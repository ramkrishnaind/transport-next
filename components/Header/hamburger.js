import { useState } from "react";

export default function Hamburger() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
            >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-4 py-4 hover:bg-slate-200"
              onClick={() => setIsNavOpen(false)}>
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[150px]">
              <li className="  my-2">
                <a
                  href="/home1"
                  className="block px-2 py-2 hover:bg-slate-300 Hamburger-text transition duration-500">
                  Home
                </a>
              </li>
              <li className="  my-2">
                <a
                  href="/aboutus"
                  className="block px-2 py-2 hover:bg-slate-300 Hamburger-text transition duration-500"
                  >
                  About Us
                </a>
              </li>
              <li className=" my-2">
                <a
                  href="/services"
                  className="block px-2 py-2 hover:bg-blue-300 Hamburger-text transition duration-500">
                  Services
                </a>
              </li>
              <li className=" my-2">
                <a
                  href="/blog"
                  className="block px-2 py-2 hover:bg-blue-300 Hamburger-text transition duration-500">
                  Blog
                </a>
              </li>
              <li className=" my-2">
                <a
                  href="/contact"
                  className="block px-2 py-2 hover:bg-blue-300 Hamburger-text transition duration-500">
                  Contact
                </a>
              </li>
              <li className=" my-2">
                <a
                  href="/contact"
                  className="block px-2 py-2 hover:bg-blue-300 Hamburger-text transition duration-500">
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>
        </section>
      </nav>
    </div>
  );
}
