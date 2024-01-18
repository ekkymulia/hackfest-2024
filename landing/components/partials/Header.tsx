"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { ModeToggle } from "./SwitchTheme";
import LoginPath from "./LoginPath";

const navLinks = [
  { href: "/", name: "Home" },
  { href: "/about", name: "About" },
  { href: "/contact", name: "Contact" },
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const shouldHideOnScroll = true;

    setIsScrolled(shouldHideOnScroll ? scrollTop > 0 : false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar className={`transition-all ${isScrolled ? 'bg-background' : 'bg-transparent'}`}>
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <img src="/img-2/tw-logo-ijo.png" width={30} height={30} alt="" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="center">
        {navLinks.map((item: any, index: number) => (
          <NavbarItem key={item.index} isActive={pathname === item.href}>
            <Link
              className={`${
                pathname === item.href ? "text-primary" : "text-foreground"
              }`}
              href={item.href}
              key={index}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-1">
        <NavbarItem className="flex gap-2">
        <LoginPath />
          <ModeToggle />
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden ml-2"
        />
      </NavbarContent>
      <NavbarMenu>
        {navLinks.map((item: any, index: number) => (
          <NavbarMenuItem key={`${item.key}-${index}`}>
            <Link
              className={`w-full ${
                pathname === item.href ? "text-primary" : "text-foreground"
              }`}
              href={item.href}
              key={index}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarItem className="flex gap-2">
          <Button as={Link} color="primary" href="/login" variant="ghost">
            Login
          </Button>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
