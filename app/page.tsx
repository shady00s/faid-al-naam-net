import { useRouter } from 'next/router';
import SplashScreen from './[locale]/components/splash_screen';

export default function RootPage() {

  const router = useRouter();
  return <div><SplashScreen></div>
  
}