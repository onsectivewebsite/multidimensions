import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import { business } from "@/lib/data";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.mddrivers.ca"),
  title: {
    default: `${business.name} | MTO-Approved Driving School in Brampton`,
    template: `%s | ${business.name}`,
  },
  description:
    "MTO-approved BDE driving school in Brampton & the GTA. Flexible packages from $600, patient certified instructors, online + in-car lessons, and road-test support.",
  keywords: [
    "driving school Brampton",
    "MTO approved BDE",
    "driving lessons GTA",
    "G2 road test",
    "Multi-Dimensions Driving School",
  ],
  openGraph: {
    title: `${business.name}`,
    description:
      "Building confident, proficient motorists. MTO-approved packages, certified instructors, road-test ready.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-sign-700 focus:px-4 focus:py-2 focus:text-white focus:font-semibold"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <AIChat />
      </body>
    </html>
  );
}
