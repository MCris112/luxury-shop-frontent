'use client';

import { useState } from "react";
import { Order, OrderStatus } from "../order.types";
import { fetchOrderUpdate } from "../orderService";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

interface StatusSelectorProps {
    orderId: number;
    currentStatus: OrderStatus;
}

const statusOptions = [
    { value: OrderStatus.PENDING, label: "Pendiente" },
    { value: OrderStatus.CONFIRMED, label: "Confirmado" },
    { value: OrderStatus.DELIVERED, label: "Entregado" },
    { value: OrderStatus.CANCELLED, label: "Cancelado" },
    { value: OrderStatus.RETURNED, label: "Devuelto" },
];

export default function StatusSelector({ orderId, currentStatus }: StatusSelectorProps) {
    const [status, setStatus] = useState<OrderStatus>(currentStatus);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (newStatus: OrderStatus) => {
        setLoading(true);
        try {
            await fetchOrderUpdate(orderId, { status: newStatus });
            setStatus(newStatus);
            toast.success(`Estado actualizado a ${newStatus}`);
            // Force a refresh of the page to update other UI parts if needed
            window.location.reload();
        } catch (error) {
            toast.error("Error al actualizar el estado");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative inline-block">
            <select
                value={status}
                disabled={loading}
                onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                className="appearance-none bg-white/40 backdrop-blur-md border border-black/10 rounded-sm px-4 py-2 pr-10 text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer disabled:opacity-50"
            >
                {statusOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-white text-black">
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-fg" />
        </div>
    );
}
