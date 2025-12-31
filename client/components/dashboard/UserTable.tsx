"use client";

import { useState } from "react";
import { User, useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trash2, Edit, Eye } from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import UserDetailModal from "./UserDetailModal";
import { toast } from "sonner";


export default function UserTable({ users, onUserUpdate }: { users: User[], onUserUpdate: () => void }) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const toggleStatus = async (userId: string, currentStatus: string) => {
        setLoadingId(userId);
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        try {
            await api.patch(`/users/${userId}`, { status: newStatus });
            toast.success(`User ${newStatus === 'active' ? 'activated' : 'deactivated'}`, {
                description: `User status successfully updated to ${newStatus}.`,
            });
            onUserUpdate(); // Refresh list
        } catch (error) {
            console.error("Failed to update user status", error);
            toast.error("Failed to update status", {
                description: "Something went wrong. Please try again.",
            });
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <>
            <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-surface/30 backdrop-blur-sm">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-white/5">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold text-white uppercase border border-white/10">
                                            {user.name.substring(0, 2)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{user.name}</div>
                                            <div className="text-xs text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                        {user.role}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>
                                        {user.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-blue-400 hover:text-blue-300"
                                            onClick={() => setSelectedUserId(user.id)}
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={cn("h-8 w-8 p-0", user.status === 'active' ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300')}
                                            onClick={() => toggleStatus(user.id, user.status)}
                                            disabled={loadingId === user.id}
                                        >
                                            {user.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                        No users found.
                    </div>
                )}
            </div>

            {selectedUserId && (
                <UserDetailModal
                    userId={selectedUserId}
                    onClose={() => setSelectedUserId(null)}
                />
            )}
        </>
    );
}
