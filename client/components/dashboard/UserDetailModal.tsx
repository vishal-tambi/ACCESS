"use client";

import { useEffect, useState } from "react";
import { X, User, Mail, Phone, Briefcase, FileText, Calendar } from "lucide-react";
import api from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface UserDetail {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    bio?: string;
    phone?: string;
    jobTitle?: string;
    createdAt: string;
    lastLogin?: string;
}

interface UserDetailModalProps {
    userId: string;
    onClose: () => void;
}

export default function UserDetailModal({ userId, onClose }: UserDetailModalProps) {
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/${userId}`);
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch user details", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!userId) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                    <h2 className="text-xl font-bold text-white">User Profile</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : user ? (
                        <div className="space-y-6">
                            {/* Profile Header */}
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xl font-bold text-primary border border-primary/20">
                                    {user.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-white">{user.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge>
                                        <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>{user.status}</Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid gap-4 py-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-white">{user.email}</span>
                                </div>
                                {user.phone && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-white">{user.phone}</span>
                                    </div>
                                )}
                                {user.jobTitle && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-white">{user.jobTitle}</span>
                                    </div>
                                )}
                                {user.bio && (
                                    <div className="flex items-start gap-3 text-sm">
                                        <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
                                        <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-sm pt-2 border-t border-white/5">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-red-500 py-8">Failed to load user data</div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
