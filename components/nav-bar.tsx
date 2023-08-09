import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/theme-toggle";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <h1 className="space-x-2 text-xl font-bold">MegaLinks</h1>
        <div>
          <MainNav className="mx-6" />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
