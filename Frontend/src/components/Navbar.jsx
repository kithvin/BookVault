import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  // navItems here

  const navItems = [

    { link: "Home", path: "/"},
    { link: "About", path: "/about"},
    { link: "Shop", path: "/shop" },
    { link: "Sell Your Book", path: "/admin/dashboard"},
    { link: "Blog", path: "/blog"},

  ]

  return (
  <header>
    <nav>
        <div>
            {/* logo */}
            <Link to="/">Books</Link>
        </div>
    </nav>
  </header>
)}

export default Navbar;
