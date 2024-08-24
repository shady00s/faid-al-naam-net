import { useTranslations } from "next-intl";
 import { Metadata } from "next";
import WhoWeAreScreen from '../components/who_we_are'
export async function generateMetadata({
  params: { locale },
}: any): Promise<Metadata> {
  return {
    metadataBase:new URL('http://localehost:3000'),
    alternates: {
        canonical: '/',
        languages: {
          'en-US': '/en-US',
          'ar-AR': '/ar-AR',
        },
      },
    icons: {
      icon: "/images/logo1.svg",
      shortcut: "/images/logo1.svg",
    },

    title:
      locale === "en"
        ? "Our team | Faid Al-Naam For Food Security"
        : "  فريقنا | فيض النعم للامن الغذائي",
        description:locale === "en"?"Need more information? Visit us or send your inquiry for your assistance.": 'هل تحتاج إلى مزيد من المعلومات؟ تفضل بزيارتنا  أو أرسل استفسارك لمساعدتك',

    // Open Graph properties
    openGraph: {
      title:
        locale === "en"
          ? "Faid Al-Naam For Food Security"
          : "فيض النعم للامن الغذائي",
          description:locale === "en"?"Need more information? Visit us or send your inquiry for your assistance.": 'هل تحتاج إلى مزيد من المعلومات؟ تفضل بزيارتنا  أو أرسل استفسارك لمساعدتك',
      images: {
        url: "/images/logo11.svg",
        alt: "Faid Al-Naam For Food Security",
        type: "image/svg",
      },
    },
    // Twitter Card properties
    twitter: {
      card: "summary_large_image",
      images: {
        url: "/images/logo11.svg",
        alt: "Faid Al-Naam For Food Security",
        type: "image/svg",
      },
      title:
        locale === "en"
          ? "Faid Al-Naam For Food Security"
          : "فيض النعم للامن الغذائي",
          description:locale === "en"?"Need more information? Visit us or send your inquiry for your assistance.": 'هل تحتاج إلى مزيد من المعلومات؟ تفضل بزيارتنا  أو أرسل استفسارك لمساعدتك',

    },
  };
}
export default function OurTeam(){
    return (<div>
      <WhoWeAreScreen/>
    </div>)
}