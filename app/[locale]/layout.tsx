import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NavigationComponent from "./components/navigation";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params: { locale },
}: any): Promise<Metadata> {
  return {
    metadataBase: new URL("http://localehost:3000"),
    icons: {
      icon: "/images/logo1.svg",
      shortcut: "/images/logo1.svg",
    },

    title:
      locale === "en"
        ? "Faid Al-Naam For Food Security"
        : "فيض النعم للامن الغذائي",
    description:
      locale === "en"
        ? "Faid Al-Naam Food Security Projects Company specializes in land reclamation and livestock production projects for the food sector. A group of companies dedicated to food security was established with a capital of 100,000,000 Egyptian pounds, spearheaded by Faid Al-Naam."
        : "شركة فيض النعم لمشاريع الأمن الغذائي متخصص في مشاريع استصلاح الأراضي والإنتاج الحيواني. تم تأسيس مجموعة شركات متخصصة في مجال الأمن الغذائي برأس مال 100,000,000 جنية من خلال شركة فيض النعم لمشاريع الأمن الغذائي",
    // Open Graph properties
    openGraph: {
      title:
        locale === "en"
          ? "Faid Al-Naam For Food Security"
          : "فيض النعم للامن الغذائي",
      description:
        locale === "en"
          ? "Faid Al-Naam Food Security Projects Company specializes in land reclamation and livestock production projects for the food sector. A group of companies dedicated to food security was established with a capital of 100,000,000 Egyptian pounds, spearheaded by Faid Al-Naam."
          : "شركة فيض النعم لمشاريع الأمن الغذائي متخصص في مشاريع استصلاح الأراضي والإنتاج الحيواني. تم تأسيس مجموعة شركات متخصصة في مجال الأمن الغذائي برأس مال 100,000,000 جنية من خلال شركة فيض النعم لمشاريع الأمن الغذائي",

      images: {
        url: "/images/logo1.svg",
        alt: "Faid Al-Naam For Food Security",
        type: "image/svg",

        // Replace with your image path
      },
    },
    // Twitter Card properties
    twitter: {
      images: {
        url: "/images/logo11.svg",
        alt: "Faid Al-Naam For Food Security",
        type: "image/svg",
      },
      card: "summary_large_image",
      title:
        locale === "en"
          ? "Faid Al-Naam For Food Security"
          : "فيض النعم للامن الغذائي",
      description:
        locale === "en"
          ? "Faid Al-Naam Food Security Projects Company specializes in land reclamation and livestock production projects for the food sector. A group of companies dedicated to food security was established with a capital of 100,000,000 Egyptian pounds, spearheaded by Faid Al-Naam."
          : "شركة فيض النعم لمشاريع الأمن الغذائي متخصص في مشاريع استصلاح الأراضي والإنتاج الحيواني. تم تأسيس مجموعة شركات متخصصة في مجال الأمن الغذائي برأس مال 100,000,000 جنية من خلال شركة فيض النعم لمشاريع الأمن الغذائي",
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <div className={inter.className}>
      <div className="w-screen h-full bg-white overflow-y-auto overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <NavigationComponent />
          {children}
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
