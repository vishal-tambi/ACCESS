"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { User, Lock, Save } from "lucide-react";

export default function ProfilePage() {
    const { user, loading, isAuthenticated, logout } = useAuth();
    const router = useRouter();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
        if (user) {
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("bio", user.bio || "");
            setValue("phone", user.phone || "");
            setValue("jobTitle", user.jobTitle || "");
        }
    }, [user, loading, isAuthenticated, router, setValue]);

    const onUpdateProfile = async (data: any) => {
        try {
            await api.put("/users/profile", data);
            setSuccess("Profile updated successfully");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update profile");
            setTimeout(() => setError(""), 3000);
        }
    };

    const onChangePassword = async (data: any) => {
        try {
            await api.put("/users/password", {
                currentPassword: data.currentPassword, // Ensure input names match these
                newPassword: data.newPassword
            });
            setSuccess("Password updated successfully");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update password");
            setTimeout(() => setError(""), 3000);
        }
    };

    if (loading || !user) return <div className="text-white pt-24 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
                        <p className="text-muted-foreground">Manage your profile information and security.</p>
                    </div>
                    <Button
                        variant="destructive"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </div>

                {/* Profile Form */}
                <div className="bg-surface/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <User className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Personal Information</h2>
                    </div>

                    <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6 max-w-lg">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" {...register("name")} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register("email")} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" {...register("phone")} placeholder="+1 234 567 8900" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Input id="jobTitle" {...register("jobTitle")} placeholder="Software Engineer" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea
                                id="bio"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...register("bio")}
                                placeholder="Tell us about yourself"
                            />
                        </div>
                        <Button type="submit" className="bg-primary text-black hover:bg-primary-dark">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
                    </form>
                </div>

                {/* Security Form */}
                <div className="bg-surface/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Security</h2>
                    </div>

                    <form onSubmit={handleSubmit(onChangePassword)} className="space-y-6 max-w-lg">
                        <div className="grid gap-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" {...register("currentPassword")} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" {...register("newPassword")} />
                        </div>
                        <Button variant="outline" type="submit" className="border-white/10 hover:bg-white/5 text-white">
                            Change Password
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    );
}
