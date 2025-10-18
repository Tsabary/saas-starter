"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function HeaderMenu() {
  return (
    <NavigationMenu className="text-foreground">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={
              navigationMenuTriggerStyle() +
              " bg-transparent px-2 py-1 lg:px-4 lg:py-2"
            }
          >
            <a href="https://discord.com/invite/REKxnCJzPz">Community</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={
              navigationMenuTriggerStyle() +
              " bg-transparent px-2 py-1 lg:px-4 lg:py-2"
            }
          >
            <a href="https://docs.replyke.com">Documentation</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={
              navigationMenuTriggerStyle() +
              " bg-transparent px-2 py-1 lg:px-4 lg:py-2"
            }
          >
            <a href="https://roadmap.replyke.com">Roadmap</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={
              navigationMenuTriggerStyle() +
              " bg-transparent px-2 py-1 lg:px-4 lg:py-2"
            }
          >
            <a href="https://blog.replyke.com">Blog</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { path?: string }
>(({ className, title, children, path, href, ...props }, ref) => {
  const content = (
    <div
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {children}
      </p>
    </div>
  );

  return (
    <li>
      <NavigationMenuLink asChild>
        {path ? (
          <Link href={`/${path}`} passHref legacyBehavior>
            <a ref={ref} {...props}>
              {content}
            </a>
          </Link>
        ) : (
          <a ref={ref} href={href} {...props} rel="noopener noreferrer">
            {content}
          </a>
        )}
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
