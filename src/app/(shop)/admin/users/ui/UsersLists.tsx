"use client";
import { changeUserRole } from "@/actions";
import { Role, User } from "@/interfaces";
import { useToastStore } from "@/store";

interface Props {
  users?: User[];
  
}
// TODO make a modal to confirm role changed
export const UsersList = ({ users }: Props) => {
  const showToast = useToastStore(state => state.showToast)
  
  const onChangeUserRole = async (id: string, role: Role) => {
    const {ok} = await changeUserRole(id, role);
    if(!ok) {
      showToast('Unable to update user role', 'error');
    }
    showToast('User role changed successfully', 'success');
  }
  return (
    <>
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Name
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Email
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="flex items-center mt-4 text-sm text-gray-900 font-light px-6 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => onChangeUserRole(user.id, e.target.value as Role)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg   p-1.5 outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
