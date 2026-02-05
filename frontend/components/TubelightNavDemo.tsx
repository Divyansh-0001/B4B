"use client";

import { Home, Info, Briefcase, Mail, Shield, BookOpen } from 'lucide-react';
import { TubelightNavBar } from "@/components/ui/tubelight-navbar";

export function TubelightNavDemo() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: Info },
    { name: 'Services', url: '/services', icon: Shield },
    { name: 'Blog', url: '/blog', icon: BookOpen },
    { name: 'Contact', url: '/contact', icon: Mail }
  ];

  return <TubelightNavBar items={navItems} />;
}
