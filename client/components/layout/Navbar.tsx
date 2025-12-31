"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const pathname = usePathname();

    const isAuthPage = pathname === "/login" || pathname === "/signup";

    if (isAuthPage) return null;

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative w-8 h-8 group-hover:rotate-12 transition-transform">
                            <Image
                                src="/logo.png"
                                alt="ACCESS Logo"
                                fill
                                sizes="32px"
                                className="object-contain"
                            />
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
                            ACCESS
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                            Features
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-muted-foreground">
                                    Hello, <span className="text-white font-medium">{user?.name}</span>
                                </span>
                                <Link href={user?.role === 'admin' ? '/dashboard' : '/profile'}>
                                    <Button variant="ghost" size="sm">Dashboard</Button>
                                </Link>
                                <Button variant="destructive" size="sm" onClick={logout}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button variant="midnight" size="sm" className="bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-white">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
