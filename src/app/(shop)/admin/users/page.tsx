import { Pagination, Title } from "@/components";
import { UsersList } from "./ui/UsersLists";
import { getUsers } from "@/actions";

interface Props {
  searchParams: Promise<{ page: string }>;
}
export const metadata = {
  title: "Users",
  description: "List of users registered",
};

export default async function UsersPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;
  const { users, ok, totalPages } = await getUsers({
    page: pageParam,
  });
  if (!ok) {
    console.log({ ok });
  }
  return (
    <div>
      <Title title="Users" />
      <UsersList users={users} />
      {totalPages !== 1 && <Pagination totalPages={totalPages as number} />}
    </div>
  );
}
