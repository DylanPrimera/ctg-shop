import { Footer, SideBar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-[1]">
      <TopMenu />
      <SideBar/>
      <div className="px-3 sm:px-10">{children}</div>
      <Footer/>
    </main>
  );
}
