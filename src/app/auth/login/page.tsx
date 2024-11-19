import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";

interface Props {
  searchParams: Promise<{
    redirectTo?: string;
  }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { redirectTo } = await searchParams;
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Login</h1>

      <LoginForm redirecTo={redirectTo} />
    </div>
  );
}
