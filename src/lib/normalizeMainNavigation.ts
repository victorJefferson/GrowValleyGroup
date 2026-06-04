export type NavChild = {
  name?: string;
  href?: string;
  description?: string;
  isFeatured?: boolean;
};

export type NavLink = {
  name?: string;
  href?: string;
  description?: string;
  children?: NavChild[];
};

function isTeamNavItem(item: { name?: string; href?: string }): boolean {
  const name = item.name?.trim().toLowerCase();
  const href = item.href?.trim().toLowerCase() ?? "";
  return name === "team" || href === "/about-us/team" || href.endsWith("/team");
}

function normalizeJoinLink(link: NavLink): NavLink {
  const name = link.name?.trim().toLowerCase();
  const href = link.href?.trim().toLowerCase() ?? "";
  const isJoin =
    name === "join" ||
    href === "/join" ||
    href === "/partner-with-us" ||
    href.startsWith("/partner-with-us/");

  if (!isJoin) return link;

  return {
    name: link.name?.trim() || "Join",
    href: "/join",
  };
}

function isContactNavItem(item: { name?: string; href?: string }): boolean {
  const name = item.name?.trim().toLowerCase();
  const href = item.href?.trim().toLowerCase() ?? "";
  return name === "contact" || href === "/contact";
}

/** Strip Team from About, flatten Join, drop Contact (header CTA covers it). */
export function normalizeMainNavigation(links: NavLink[]): NavLink[] {
  return links
    .filter((link) => !isContactNavItem(link))
    .map((link) => {
      const normalizedJoin = normalizeJoinLink(link);

      if (!normalizedJoin.children?.length) {
        return normalizedJoin;
      }

      const children = normalizedJoin.children.filter((child) => !isTeamNavItem(child));

      if (children.length === normalizedJoin.children.length) {
        return normalizedJoin;
      }

      return {
        ...normalizedJoin,
        children,
      };
    });
}
