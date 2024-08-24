import type { Metadata } from "next";
import {IBM_Plex_Sans  } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider,SignedIn,SignedOut,UserButton,SignInButton } from "@clerk/nextjs";

const IBMPlex = IBM_Plex_Sans({ 
  subsets: ["latin"],
weight:['400','500','600','700'],
variable: '--font-ibm-plex' });

export const metadata: Metadata = {
  title: "editify",
  description: "AI powered image generator",
};


function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
      <h1>My App</h1>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider appearance={{
        variables:{colorPrimary: '#624cf5'}
      }}>
    <html lang="en">
      <body className={cn("font-IBMPlex antialiased",IBMPlex.variable)}>
      <Header />
      {children}
      </body>
    </html>
    </ClerkProvider>
  );//antialaisesd css ka property h which makes font more clear to read
  //IBMPlex.variable actual font ko apply krega
}
