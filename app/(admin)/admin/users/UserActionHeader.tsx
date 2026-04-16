'use client';

import { useState } from "react";
import { UserPlus } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import UserCreateModal from "./UserCreateModal";

export default function UserActionHeader({ onUserCreated }: { onUserCreated: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Usuarios"
        subtitle="Gestión de Clientes y Staff"
        actionLabel="Nuevo Usuario"
        onAction={() => setIsOpen(true)}
        actionIcon={UserPlus}
      />

      <UserCreateModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onUserCreated={onUserCreated}
      />
    </>
  );
}
