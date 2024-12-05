import { Footer, SideBar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar />
      <main className="flex flex-col min-h-screen">
        <TopMenu />
        <div className="flex-grow px-3 sm:px-10 lg:w-[1400px] lg:mx-auto lg:my-0">{children}</div>
        <Footer />
      </main>
    </>
  );
}
