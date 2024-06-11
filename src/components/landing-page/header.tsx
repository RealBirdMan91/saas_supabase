"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "@/assets/cypresslogo.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./ListItem";
import { Button, buttonVariants } from "../ui/button";

function Header() {
  return (
    <header
      className="p-4
      flex
      justify-between
      items-center
  "
    >
      <Link href={"/"} className="flex gap-2 items-center">
        <Image src={Logo} alt="Cypress Logo" width={25} height={25} />
        <span
          className="font-semibold
          dark:text-white
        "
        >
          cypress.
        </span>
      </Link>
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList className="gap-6">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] ld:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <span
                    className="flex h-full w-full select-none
                  flex-col
                  justify-end
                  rounded-md
                  bg-gradient-to-b
                  from-muted/50
                  to-muted
                  p-6 no-underline
                  outline-none
                  focus:shadow-md
                  "
                  >
                    Welcome
                  </span>
                </li>
                <ListItem title="Introduction" href="#">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="#" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="#" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4  md:grid-row-2  ">
                <ListItem title="Pro Plan" href="#">
                  Unlock full power with collaboration.
                </ListItem>
                <ListItem title="free Plan" href="#">
                  Great for teams just starting out.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Testimonial
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div>
        <Link
          href="/login"
          className={buttonVariants({ variant: "btn-secondary" })}
        >
          Login
        </Link>
        <Link
          href="/signup"
          className={buttonVariants({ variant: "btn-primary" })}
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default Header;
