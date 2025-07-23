import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BadgeQuestionMark, CircleSlash2 } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";

type link = {
  label: string;
  href: string;
};

export const Navbar = () => {
  const links: link[] = [
    {
      label: "Questions",
      href: "/questions",
    },
    {
      label: "Integrations",
      href: "/",
    },
    {
      label: "Testimonials",
      href: "/",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="flex justify-between items-center">
        <div className="text-xl sm:text-2xl py-3 font-semibold flex items-center gap-x-2">
          <BadgeQuestionMark />
          Interview Archive
        </div>
        <ul className="sm:flex gap-x-8 text-lg hidden">
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </ul>
        <div className="flex items-center gap-x-4">
          <ModeToggle />
          <Link href="/questions">
            <Button>Explore</Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};
