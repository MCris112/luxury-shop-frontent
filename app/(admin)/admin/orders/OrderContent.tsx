'use client';

import PageHeader from "@/components/admin/PageHeader";
import { Search, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { fetchOrderDelete } from "./orderService";
import { DateTime } from "luxon";
import { Order, OrderStatus, statusConfig } from "./order.types";
import { useConfirm } from "@/components/admin/ConfirmDialog";


export default function OrderContent({ data }: { data: Order[] }) {
    const [orders, setOrders] = useState<Order[]>(data);
    const [searchTerm, setSearchTerm] = useState("");
    const confirm = useConfirm();

    const handleDelete = async (id: number) => {
        await confirm({
            title: "Eliminar Pedido",
            description: "¿Está seguro de que desea eliminar permanentemente este pedido? Esta acción no se puede deshacer.",
            confirmLabel: "Eliminar",
            cancelLabel: "Mantener",
            variant: "danger",
            onConfirm: async () => {
                try {
                    await fetchOrderDelete(id);
                    setOrders(orders.filter(o => o.id !== id));
                    toast.success("Pedido eliminado");
                } catch (error) {
                    toast.error("Error al eliminar pedido");
                    throw error; // Re-throw to let the dialog know it failed
                }
            }
        });
    };


    const filteredOrders = orders.filter(o =>
        o.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.id.toString().includes(searchTerm)
    );

    return (
        <>
            <PageHeader
                title="Pedidos"
                subtitle="Registro de Transacciones Exclusivas"
            />

            <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-sm overflow-hidden">
                <div className="p-4 border-b border-black/5 flex justify-between items-center">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-fg" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar pedidos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-sm font-sans pl-10" />
                    </div>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-black/5">
                            <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">ID</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Cliente</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Estado</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Fecha</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Total</th>
                            <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {filteredOrders.map((o) => {
                            const status = statusConfig[o.status] || statusConfig[OrderStatus.PENDING];
                            const StatusIcon = status.icon;

                            return (
                                <tr key={o.id} className="hover:bg-white/60 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-sans text-sm text-muted-fg">#{o.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-serif text-lg leading-tight">{o.user.name}</span>
                                            <span className="font-sans text-xs text-muted-fg">{o.user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${status.color}`}>
                                            <StatusIcon size={10} />
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-sans text-muted-fg">
                                        {DateTime.fromISO(o.createdAt).toLocaleString(DateTime.DATE_MED)}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-sans font-medium">
                                        ${o.totals.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/admin/orders/${o.id}`}
                                                className="p-2 hover:bg-accent/10 rounded-full transition-colors"
                                            >
                                                <Eye size={14} className="text-muted-fg" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(o.id)}
                                                className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-400"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && (
                    <div className="p-8 text-center text-muted-fg font-sans text-sm">
                        No se encontraron pedidos.
                    </div>
                )}
            </div>
        </>
    );
}
