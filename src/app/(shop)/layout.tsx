import { Footer, SideMenu, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1">
      <TopMenu />
      <SideMenu />
      <div className="px-0 sm:px-10">{children}</div>
      <Footer/>
    </main>
  );
}
