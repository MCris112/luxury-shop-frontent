import { fetchOrderById } from "../orderService";
import PageHeader from "@/components/admin/PageHeader";
import { ChevronLeft, CreditCard, User, MapPin, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DateTime } from "luxon";
import StatusSelector from "./StatusSelector";
import { OrderStatus, statusConfig } from "../order.types";

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const order = await fetchOrderById(id);
    const status = statusConfig[order.status] || statusConfig[OrderStatus.PENDING];
    const StatusIcon = status.icon;



    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders" className="p-2 hover:bg-white/40 rounded-full transition-colors">
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <PageHeader
                                title={`Pedido #${order.id}`}
                                subtitle={`Realizado el ${DateTime.fromISO(order.createdAt).toLocaleString(DateTime.DATETIME_MED)}`}
                            />
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${status.color} mt-1`}>
                                <StatusIcon size={10} />
                                {status.label}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-sans text-muted-fg uppercase tracking-widest font-bold">Cambiar Estado:</span>
                    <StatusSelector orderId={order.id} currentStatus={order.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-sm overflow-hidden">
                        <div className="p-4 border-b border-black/5 flex items-center gap-2">
                            <Package size={18} className="text-muted-fg" />
                            <h2 className="font-serif text-xl">Artículos del Pedido</h2>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-black/5">
                                    <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium">Producto</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium text-center">Cantidad</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium text-right">Precio Unit.</th>
                                    <th className="px-6 py-4 text-xs uppercase tracking-widest font-sans text-muted-fg font-medium text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {order.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    width={100}
                                                    height={100}
                                                    className="w-12 h-12 bg-muted-bg rounded-sm object-cover"
                                                />
                                                <span className="font-serif text-md">{item.product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-sans">{item.quantity}</td>
                                        <td className="px-6 py-4 text-right font-sans">${item.unitPrice.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-sans font-medium">${(item.quantity * item.unitPrice).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-black/5">
                                    <td colSpan={3} className="px-6 py-4 text-right font-sans text-muted-fg uppercase tracking-widest text-xs">Total del Pedido</td>
                                    <td className="px-6 py-4 text-right font-serif text-xl font-bold">${order.totals.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Right Column: Customer & Payment Info */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-sm p-6 space-y-4">
                        <div className="flex items-center gap-2 border-b border-black/5 pb-2">
                            <User size={18} className="text-muted-fg" />
                            <h3 className="font-serif text-lg">Información del Cliente</h3>
                        </div>
                        <div className="space-y-2">
                            <p className="font-serif text-xl">{order.user.name}</p>
                            <p className="font-sans text-sm text-muted-fg">{order.user.email}</p>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-sm p-6 space-y-4">
                        <div className="flex items-center gap-2 border-b border-black/5 pb-2">
                            <MapPin size={18} className="text-muted-fg" />
                            <h3 className="font-serif text-lg">Dirección de Envío</h3>
                        </div>
                        <p className="font-sans text-sm text-muted-fg leading-relaxed">
                            {order.address}
                        </p>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-sm p-6 space-y-4">
                        <div className="flex items-center gap-2 border-b border-black/5 pb-2">
                            <CreditCard size={18} className="text-muted-fg" />
                            <h3 className="font-serif text-lg">Método de Pago</h3>
                        </div>
                        <div className="space-y-2">
                            <p className="font-sans text-sm font-medium uppercase tracking-wider">{order.paymentMethod}</p>
                            <p className="font-sans text-xs text-muted-fg">ID de Pago: {order.payment.paymentId}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
