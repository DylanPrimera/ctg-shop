import { Title } from "@/components";
import { UsersList } from "./ui/UsersLists";
import { getUsers } from "@/actions";

export default async function UsersPage() {
  const { users, ok } = await getUsers();
    if(!ok) {
        console.log({ok});
    }
  return (
    <div>
      <Title title="Users" />
      <UsersList users={users}/>
    </div>
  );
}
