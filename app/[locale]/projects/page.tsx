import { useTranslations } from "next-intl";
 import { Metadata } from "next";
import ProjectsScreen from "../components/projects";

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
        ? "Projects | Faid Al-Naam For Food Security"
        : " المشاريع | فيض النعم للامن الغذائي",
    description:
      locale === "en"
        ? "Discover Fiyad Al-Ni'am's projects in Egypt in land reclamation and animal production "
        : " تعرف على مشاريع فيض النعم فى مصر فى الاستصلاح الزراعى والانتاج الحيوانى.",
    // Open Graph properties
    openGraph: {
      title:
        locale === "en"
          ? "Faid Al-Naam For Food Security"
          : "فيض النعم للامن الغذائي",
      description:
        locale === "en"
          ? "Discover Fiyad Al-Ni'am's projects in Egypt in land reclamation and animal production"
          : " تعرف على مشاريع فيض النعم فى مصر فى الاستصلاح الزراعى والانتاج الحيوانى.",
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
      description:
        locale === "en"
          ? "Discover Fiyad Al-Ni'am's projects in Egypt in land reclamation and animal production"
          : " تعرف على مشاريع فيض النعم فى مصر فى الاستصلاح الزراعى والانتاج الحيوانى.",
    },
  };
}
export default  function Projects() {

  return (
    <div>
          <ProjectsScreen/>

    </div>
  );
}
