import { Mail, MoreVertical } from "lucide-react";
import { User } from "./user.types";

export default function UserList({ users }: { users: User[] }) {
    return (
        <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-black/5">
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Identidad</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Nivel de Acceso</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Estado</th>
                        <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                    {users.map((u) => (
                        <tr key={u.id} className="hover:bg-white/60 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="font-serif text-lg">{u.name}</span>
                                    <div className="flex items-center gap-1 text-xs text-muted-fg font-sans uppercase tracking-tighter">
                                        <Mail size={10} /> {u.email}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    {/* {u.role === "Admin" && <Shield size={12} className="text-accent" />}
                    <span className={`text-xs uppercase tracking-widest font-sans ${u.role === "Admin" ? "text-accent font-semibold" : "text-muted-fg"}`}>
                      {u.role}
                    </span> */}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {/* <span className={`text-[10px] uppercase tracking-widest font-sans px-2 py-1 rounded-full ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-black/5 text-muted-fg"}`}>
                    {u.status}
                  </span> */}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-2 hover:bg-black/5 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                                    <MoreVertical size={16} className="text-muted-fg" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}