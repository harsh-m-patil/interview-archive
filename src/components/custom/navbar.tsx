import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./theme-toggle";

type LinkItem = { name: string; href: string };

const links: LinkItem[] = [
  { name: "Home", href: "/" },
  { name: "Questions", href: "/questions" },
];

export function Navbar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
      <Link href="/">
        <span className="bg-gradient-to-br from-primary/40 via-foreground to-primary/40 bg-clip-text font-semibold text-shadow text-transparent tracking-tighter md:text-xl">
          Interview Archive
        </span>
      </Link>
      <div className="flex items-center justify-between gap-4">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <span className="font-medium text-foreground hover:text-primary">
              {link.name}
            </span>
          </Link>
        ))}
        <div className="flex items-center justify-between gap-4">
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
