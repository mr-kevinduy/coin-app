import type { Metadata } from "next";
import SiteNavigation from '../ui/SiteNavigation'
import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "Front Site",
  description: "Generated by create next app",
};

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="front-layout">
      <SiteNavigation />

      {children}
    </div>
  );
}
