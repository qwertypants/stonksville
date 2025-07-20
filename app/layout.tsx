import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
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

/**
 * Application layout applied to all routes. Sets up global fonts, Clerk
 * authentication wrappers and common header. Only authenticated users can see
 * children components.
 */

// Custom fonts used throughout the application
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

/**
 * Root layout wrapping every page. Provides global styling and authentication
 * gate. The children will only render inside the `SignedIn` wrapper when a
 * user is authenticated.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${archivoBlack.variable} ${space.variable}`}>
          <SignedIn>
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
                {/* Quick access to account management when signed in */}
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </header>
          </SignedIn>

          <div className="flex items-center justify-items-center">
            <main className="flex flex-col gap-2 tems-center sm:items-start w-4xl mx-auto">
              {/* Splash screen prompting login if user is signed out */}
              <SignedOut>
                <div className="flex justify-center items-center w-full h-screen">
                  <div className="">
                    <Image
                      src="/logo.png"
                      alt="Stonksville"
                      width={250}
                      height={40}
                      priority
                    />
                    <section className="flex gap-3 my-3 justify-center">
                      <SignedOut>
                        <SignInButton mode="modal">
                          <Button>Sign In</Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <Button>Register</Button>
                        </SignUpButton>
                      </SignedOut>
                    </section>
                  </div>
                </div>
              </SignedOut>
              <SignedIn>{children}</SignedIn>
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
