import LogInScreen from '@/app/_screens/LogInScreen';
import { findLoggedInUser } from '@/app/api/_services/auth.service';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const user = await findLoggedInUser();

  if (user) {
    redirect('/dashboard');
  }

  return <LogInScreen />;
}
