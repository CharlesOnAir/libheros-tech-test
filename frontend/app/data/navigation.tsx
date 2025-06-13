import { ListTodoIcon } from "lucide-react";

interface NavigationItem {
  title: string;
  icon: React.ReactNode;
  url: string;
  isActive?: boolean;
}

interface NavigationElement {
  title: string;
  url: string;
  items: NavigationItem[];
}

export const navigationItems: NavigationElement[] = [
  {
    title: "Listes de tâches",
    url: "#",
    items: [
      {
        title: "Listes de tâches",
        icon: <ListTodoIcon />,
        url: "#",
        isActive: true,
      },
    ],
  },
];
