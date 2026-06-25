import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Profile",
      href:
        "/dashboard/profile",
    },
    {
      label: "Scores",
      href:
        "/dashboard/scores",
    },
    {
      label:
        "Subscription",
      href:
        "/dashboard/subscription",
    },
    {
      label: "Winnings",
      href:
        "/dashboard/winnings",
    },
  ];

  return (
    <ProtectedRoute>

      <Navbar />

      <div className="bg-black min-h-screen">

        <div className="p-4 md:hidden">
          <MobileSidebar
            links={links}
            title="User Panel"
          />
        </div>

        <div className="flex">

          <Sidebar />

          <main className="flex-1 p-6">
            {children}
          </main>

        </div>

      </div>

    </ProtectedRoute>
  );
}