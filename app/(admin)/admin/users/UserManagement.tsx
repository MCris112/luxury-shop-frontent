'use client';

import { useState } from "react";
import UserActionHeader from "./UserActionHeader";
import UserList from "./UserList";
import { User } from "./user.types";
import { fetchUserList } from "./userService";

export default function UserManagement({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const refreshUsers = async () => {
    try {
      const updatedUsers = await fetchUserList();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to refresh users:", error);
    }
  };

  return (
    <div>
      <UserActionHeader onUserCreated={refreshUsers} />
      <UserList users={users} />
    </div>
  );
}
