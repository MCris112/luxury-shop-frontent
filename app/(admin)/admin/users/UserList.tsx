import { Mail, Trash2, User as UserIcon, Eye } from "lucide-react";
import { User } from "./user.types";
import { useConfirm } from "@/components/admin/ConfirmDialog";
import { fetchUserDelete } from "./userService";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UserList({ users, onUserDeleted }: { users: User[], onUserDeleted: () => void }) {
    const confirm = useConfirm();

    const handleDelete = async (id: string) => {
        await confirm({
            title: "Eliminar Usuario",
            description: "¿Está seguro de que desea eliminar permanentemente este usuario? Esta acción no se puede deshacer.",
            confirmLabel: "Eliminar",
            cancelLabel: "Mantener",
            variant: "danger",
            onConfirm: async () => {
                try {
                    await fetchUserDelete(id);
                    toast.success("Usuario eliminado");
                    onUserDeleted();
                } catch (error) {
                    toast.error("Error al eliminar usuario");
                    throw error;
                }
            }
        });
    };

    return (
        <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-black/5">
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Identidad</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                    {users.map((u) => (
                        <tr key={u.id} className="hover:bg-white/60 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-muted-fg border border-black/5">
                                        <UserIcon size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-serif text-lg leading-tight">{u.name}</span>
                                        <div className="flex items-center gap-1.5 text-[10px] text-muted-fg font-sans uppercase tracking-widest mt-1">
                                            <Mail size={10} /> {u.email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <Link 
                                        href={`/admin/users/${u.id}`}
                                        className="p-2 hover:bg-black/5 rounded-full transition-colors opacity-0 group-hover:opacity-100 text-muted-fg"
                                    >
                                        <Eye size={16} />
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(u.id)}
                                        className="p-2 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100 text-red-400"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
