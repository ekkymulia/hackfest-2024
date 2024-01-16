import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
});

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={poppins.className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
