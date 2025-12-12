import { useMediaQuery } from "../../utils/hooks/useMediaQuery";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

export default function DashboardLayout() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return isDesktop ? <DesktopLayout /> : <MobileLayout />;
}
