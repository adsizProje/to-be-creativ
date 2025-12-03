import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const baloo = localFont({
  src: [
    {
      path: "../public/assets/Baloo_2/static/Baloo2-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/Baloo_2/static/Baloo2-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/Baloo_2/static/Baloo2-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/assets/Baloo_2/static/Baloo2-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: "ToBe Creative",
  description: "We help companies to be",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${baloo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

