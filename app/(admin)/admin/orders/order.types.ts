import { Product } from "@/app/(main)/products/product.types"
import { Clock, CheckCircle, XCircle, RotateCcw } from "lucide-react";

export enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    DELIVERED = "DELIVERED",
    RETURNED = "RETURNED"
}

export const statusConfig = {
    [OrderStatus.PENDING]: { label: "Pendiente", color: "bg-amber-50 text-amber-600 border-amber-100", icon: Clock },
    [OrderStatus.CONFIRMED]: { label: "Confirmado", color: "bg-blue-50 text-blue-600 border-blue-100", icon: CheckCircle },
    [OrderStatus.DELIVERED]: { label: "Entregado", color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: CheckCircle },
    [OrderStatus.CANCELLED]: { label: "Cancelado", color: "bg-red-50 text-red-600 border-red-100", icon: XCircle },
    [OrderStatus.RETURNED]: { label: "Devuelto", color: "bg-slate-50 text-slate-600 border-slate-100", icon: RotateCcw },
};

export interface Order {

    id: number,
    address: string,
    items: OrderItem[],
    payment: {
        paymentId: string,
    },
    paymentMethod: "mercadopago",
    totals: number,
    status: OrderStatus,
    user: {
        id: number,
        email: string,
        name: string
    }

    createdAt: string;
}

export interface OrderItem {
    id: number,
    product: Product,
    quantity: number,
    unitPrice: number
}
