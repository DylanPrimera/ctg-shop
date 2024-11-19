import { auth } from "@/auth";
import { SideMenu } from "./SideMenu";

export async function SideBar() {
  const session = await auth();

  const isAuthenticated = Boolean(session?.user);
  const isAdmin = session?.user.role === "admin";
  return <SideMenu isAuthenticated={isAuthenticated} isAdmin={isAdmin} />;
}
