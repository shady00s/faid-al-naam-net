 import { Metadata } from "next";
 import CareersScreen from '../components/careers'
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
    ? "Careers | Faid Al-Naam For Food Security "
    : "الوظائف | فيض النعم للامن الغذائي",
    description:
    locale === "en"
      ?"Join our passionate team in Faid Al-Naam"
          : "انضم الي فريق فيض النعم",
    // Open Graph properties
    openGraph: {
      title:
        locale === "en"
          ? "Careers | Faid Al-Naam For Food Security "
          : "الوظائف | فيض النعم للامن الغذائي",
      description:
        locale === "en"
          ?"Join our passionate team in Faid Al-Naam"
              : "انضم الي فريق فيض النعم",
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
      ? "Careers | Faid Al-Naam For Food Security "
      : "الوظائف | فيض النعم للامن الغذائي",
      description:
      locale === "en"
        ?"Join our passionate team in Faid Al-Naam"
            : "انضم الي فريق فيض النعم",
    },
  }
}
export default function Projects(){  
    return (<div>
     <CareersScreen/>
     </div>)
}