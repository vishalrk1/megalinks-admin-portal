"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { auth } from "@clerk/nextjs";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.userId}`,
      label: "Home",
      active: pathname === `/${params.userId}`,
    },
    {
      href: `/${params.userId}/categories`,
      label: "Categories",
      active: pathname === `/${params.userId}/categories`,
    },
    {
      href: `/${params.userId}/scenepacks`,
      label: "Scene Packs",
      active: pathname === `/${params.userId}/scenepacks`,
    },
    {
      href: `/${params.userId}/animepacks`,
      label: "Anime Packs",
      active: pathname === `/${params.userId}/animepacks`,
    },
    {
      href: `/${params.userId}/tutorials`,
      label: "Tutorials",
      active: pathname === `/${params.userId}/tutorials`,
    },
    {
      href: `/${params.userId}/editingtools`,
      label: "Softwares",
      active: pathname === `/${params.userId}/editingtools`,
    },
    {
      href: `/${params.userId}/feedbacks`,
      label: "Feedbacks",
      active: pathname === `/${params.userId}/feedbacks`,
    },
    {
      href: `/${params.userId}/settings`,
      label: "Settings",
      active: pathname === `/${params.userId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
