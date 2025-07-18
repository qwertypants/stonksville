import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Archivo_Black,
  Space_Grotesk,
} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Button } from "@/components/retroui/Button";
import Chat from "@/components/chat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stonksville",
  description: "Your Portfolio’s Favorite Side Quest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          className={`${archivoBlack.variable} ${space.variable}`}
        >
          <header className="flex justify-between items-center p-4">
            <div className="flex items-center gap-8">
              <Link href="/">
                <Image
                  src="/logo-text.png"
                  alt="Stonksville"
                  className=" transition duration-200"
                  width={100}
                  height={40}
                  priority
                />
              </Link>
            </div>
            <div className="flex gap-2">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          <div className="flex items-center justify-items-center h-screen">
            <main className="flex flex-col gap-2 tems-center sm:items-start max-w-3xl mx-auto">
              <SignedOut>
                <Image
                  src="/logo.png"
                  alt="Stonksville"
                  width={250}
                  height={40}
                  priority
                />
              </SignedOut>
              <section className="flex gap-3">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button>Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>Register</Button>
                  </SignUpButton>
                </SignedOut>
              </section>
              <SignedIn>{children}</SignedIn>
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
