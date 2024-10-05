import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { client } from "@/sanity/lib/client";
import { Navigation, Page } from "../../sanity.types";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

async function getNavbar() {
    const getNavbar = `*[_type == 'navigation' && internal_title == 'Navbar'] {
        pages[]->{
            slug,
            title
        }
    }`

    const pages = await client.fetch(getNavbar)
    return pages[0] as Navigation
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const result = await getNavbar()
    console.log('=== pages', result)

  return (
    <html lang="en" data-theme="dark">
        <head>
        <meta name="color-scheme" content="light" />
        </head>
      <body>
        <Navbar pages={result?.pages as unknown as Page[]} />
        {children}
      </body>
    </html>
  );
}
