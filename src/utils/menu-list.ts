import { routes } from "@/lib/routes";
import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  UserRoundCog,
  Split
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: routes.DASHBOARD_INDEX,
          label: "Dashboard",
          icon: LayoutGrid,
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Employees",
          icon: Split,
          submenus: [
            {
              href: routes.EMPLOYEE_INDEX,
              label: "All Employees"
            },
            
            {
              href: routes.BRANCH_INDEX,
              label: "All Branch"
            },
            {
              href: routes.DEPARTMENT_INDEX,
              label: "All Department"
            },
          ]
        },

      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users
        },
        {
          href: "/account",
          label: "Account",
          icon: Settings
        }
      ]
    }
  ];
}