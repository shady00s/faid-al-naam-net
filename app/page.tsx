import { useRouter } from 'next/router';
import SplashScreen from './[locale]/components/splash_screen';

export default function RootPage() {

  const router = useRouter();

  // Simulate data loading or any other delay
  setTimeout(() => {
    router.push('/ar');
  }, 5000);
  return <div><SplashScreen></div>
  
}