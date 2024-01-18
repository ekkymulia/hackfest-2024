import DashboardHeader from "@/components/partials/DashboardHeader";
import Sidebar from "@/components/partials/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-background">
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80]">
        <Sidebar />
      </div>
      <div className="md:pl-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
