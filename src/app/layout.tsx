// app/layout.tsx
import { Indie_Flower, Alegreya } from "next/font/google";
import "/src/app/globals.css";
import "flowbite/dist/flowbite.css";

export const headingFont = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-headingFont",
});

export const bodyFont = Alegreya({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-bodyfont",
});

export const metadata = {
  title: "Default Title",
  icons: {
    icon: "/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="bg-black-to-navy min-h-screen bg-no-repeat bg-fixed">
        {children}
      </body>
    </html>
  );
}
