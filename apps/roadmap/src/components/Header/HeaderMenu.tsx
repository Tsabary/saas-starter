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
