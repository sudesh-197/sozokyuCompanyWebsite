import {
  Familjen_Grotesk,
  Inter,
  JetBrains_Mono,
  Geist,
  Geist_Mono,
  Caveat,
} from "next/font/google";
import "@fontsource/bluu-next/700.css"; // headline font (Velvetyne, OFL)
import "@fontsource/cal-sans/400.css"; // case-study headings (OFL)
import "./globals.css";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-familjen",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ff-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-jetbrains",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--ff-geist",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ff-geist-mono",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ff-caveat",
  display: "swap",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Sozoq – Creative Tech Agency",
  description:
    "We are a creative tech agency. Design, develop and grow with us.",
};

export default function RootLayout({ children }) {
  const fontVars = [familjen, inter, jetbrains, geist, geistMono, caveat]
    .map((f) => f.variable)
    .join(" ");

  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
