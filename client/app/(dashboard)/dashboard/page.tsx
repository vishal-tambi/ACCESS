"use client";

import { useEffect, useState } from "react";
import { useAuth, User } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import UserTable from "@/components/dashboard/UserTable";
import Pagination from "@/components/ui/pagination";
import { Users, UserCheck, Shield } from "lucide-react";
import api from "@/lib/api";

import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login"); // Redirect if not logged in
    } else if (!loading && user?.role !== "admin") {
      router.push("/profile"); // Redirect non-admins
    }
  }, [user, loading, isAuthenticated, router]);

  const fetchUsers = async () => {
    setIsLoadingData(true);
    try {
      const res = await api.get(`/users?page=${page}`);
      setUsers(res.data.users);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      fetchUsers();
    }
  }, [page, isAuthenticated, user]);

  if (loading || (isAuthenticated && user?.role !== "admin"))
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (!user) return null;

  // Derived Stats (Note: These are page-level stats now, ideally backend should provide global stats)
  // For now showing stats based on current page or we can fetch stats endpoint if we had one.
  // Let's assume for this MVP we just show length of current page or keep it simple.
  // Or better, update backend to return stats. For now, I'll calculate from `users` but noting it's partial.
  // Actually, backend count return `total` or generic counts.
  // Let's just use what we have on the page or 0.
  const totalUsers = users.length; // This is only for the current page
  const activeUsers = users.filter((u) => u.status === "active").length;
  const adminUsers = users.filter((u) => u.role === "admin").length;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">
              ACCESS Console
            </h1>
            <p className="text-muted-foreground">
              Elite user management and security.
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={logout}
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards - Note: These are limited to current page data, ideally strictly server-side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Users (Page)"
            value={totalUsers}
            icon={Users}
            color="bg-primary/20 text-primary"
          />
          <StatCard
            title="Active (Page)"
            value={activeUsers}
            icon={UserCheck}
            color="bg-green-500/20 text-green-500"
          />
          <StatCard
            title="Admins (Page)"
            value={adminUsers}
            icon={Shield}
            color="bg-purple-500/20 text-purple-500"
          />
        </div>

        {/* User Management */}
        <div className="bg-surface/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">User Directory</h2>
          </div>

          {isLoadingData ? (
            <div className="text-center py-10 text-muted-foreground">
              Loading users...
            </div>
          ) : (
            <UserTable users={users} onUserUpdate={fetchUsers} />
          )}

          <div className="mt-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-surface/50 border border-white/10 rounded-xl p-6 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
