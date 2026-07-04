import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const AVATAR_PATH = path.join(process.cwd(), "public", "avatar.jpg");

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Avatar({ name, size = 96 }: { name: string; size?: number }) {
  const hasPhoto = fs.existsSync(AVATAR_PATH);

  if (hasPhoto) {
    return (
      <Image
        src="/avatar.jpg"
        alt={name}
        width={size}
        height={size}
        priority
        className="rounded-full object-cover ring-2 ring-border"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full ring-2 ring-border flex items-center justify-center font-semibold bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {getInitials(name)}
    </div>
  );
}
