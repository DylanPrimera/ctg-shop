import { Footer, SideBar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar />
      <main className="grid min-h-dvh grid-rows-[auto,1fr,auto]">
        <TopMenu />
        <div className="px-3 sm:px-10">{children}</div>
        <Footer />
      </main>
    </>
  );
}
