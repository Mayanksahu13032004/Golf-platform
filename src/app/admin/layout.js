import Navbar from "@/components/Navbar";
import AdminSidebar from "@/components/AdminSidebar";
import MobileSidebar from "@/components/MobileSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({
  children,
}) {
  const links = [
    {
      label: "Dashboard",
      href: "/admin",
    },
    {
      label: "Charities",
      href:
        "/admin/charities",
    },
    {
      label: "Draws",
      href:
        "/admin/draws",
    },
    {
      label: "Winners",
      href:
        "/admin/winners",
    },
    {
      label:
        "Analytics",
      href:
        "/admin/analytics",
    },
  ];

  return (
    <ProtectedRoute role="ADMIN">

      <Navbar />

      <div className="bg-black min-h-screen">

        <div className="p-4 md:hidden">
          <MobileSidebar
            links={links}
            title="Admin Panel"
          />
        </div>

        <div className="flex">

          <AdminSidebar />

          <main className="flex-1 p-6">
            {children}
          </main>

        </div>

      </div>

    </ProtectedRoute>
  );
}