"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "@/assets/cypresslogo.svg";

const routes = [
  { title: "Features", href: "#features" },
  { title: "Reasources", href: "#resources" },
  { title: "Pricing", href: "#pricing" },
  { title: "Testimonials", href: "#testimonial" },
];

function Header() {
  return (
    <header
      className="p-4
      flex
      justify-center
      items-center
  "
    >
      <Link
        href={"/"}
        className="w-full flex gap-2
        justify-left items-center"
      >
        <Image src={Logo} alt="Cypress Logo" width={25} height={25} />
        <span
          className="font-semibold
          dark:text-white
        "
        >
          cypress.
        </span>
      </Link>
    </header>
  );
}

export default Header;
