export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center items-center">
      <div className="w-full md:w-[350px] px-10 md:m-auto">{children}</div>
    </main>
  );
}
