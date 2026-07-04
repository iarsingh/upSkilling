import Link from "next/link";
import Avatar from "./Avatar";
import { getProfile } from "@/lib/data";

const links = [
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "experience" },
  { href: "/contact", label: "contact" },
];

export default async function NavBar() {
  const profile = await getProfile();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3.5 font-mono text-sm">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Avatar name={profile?.fullName ?? "AS"} size={30} />
          <span className="text-muted group-hover:text-accent transition-colors">
            <span className="text-accent">~</span>/{(profile?.fullName ?? "portfolio").toLowerCase().replace(/\s+/g, "-")}
          </span>
        </Link>
        <ul className="flex gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-muted hover:text-accent hover:bg-surface transition-colors"
              >
                ./{link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
