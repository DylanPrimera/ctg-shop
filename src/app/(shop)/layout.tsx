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
        <div className="flex-grow px-3 sm:px-10 xl:w-[1400px] xl:mx-auto xl:my-0">{children}</div>
        <Footer />
      </main>
    </>
  );
}
