import { fetchUserList } from "./userService";
import UserManagement from "./UserManagement";

export default async function AdminUsers() {
  const users = await fetchUserList();

  return (
    <div>
      <UserManagement initialUsers={users} />
    </div>
  );
}
