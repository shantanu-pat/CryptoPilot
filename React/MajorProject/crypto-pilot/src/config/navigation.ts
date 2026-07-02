import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

export interface NavigationItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: DashboardRoundedIcon,
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    icon: AccountBalanceWalletRoundedIcon,
  },
  {
    title: "Market",
    href: "/market",
    icon: ShowChartRoundedIcon,
  },
  {
    title: "Strategy Lab",
    href: "/strategy",
    icon: ScienceRoundedIcon,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: AnalyticsRoundedIcon,
  },
  {
    title: "Watchlist",
    href: "/watchlist",
    icon: StarRoundedIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: SettingsRoundedIcon,
  },
];