import type { Metadata } from "next";
import "./_styles/globals.css"; 
import { bricolage } from "./_styles/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "NextKit",
  description: "The ultimate Next.js auth starter powered by TailwindCSS, shadcn/ui, Drizzle ORM, and PostgreSQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.className} antialiased dark`}
      >
        {children}
        <Toaster position="top-center" className={`${bricolage.className} antialiased dark`} />
      </body>
    </html>
  );
}
