import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth();
  if(session?.user) {
    redirect('/');
  }

  return (
    <main className="flex justify-center items-center">
      <div className="w-full md:w-[350px] px-10 md:m-auto">{children}</div>
    </main>
  );
}
