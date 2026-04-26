import OrderContent from "./OrderContent";
import { fetchOrderList } from "./orderService";

export default async function AdminOrders() {
    const orders = await fetchOrderList();

    return (
        <div>
            <OrderContent data={orders} />
        </div>
    );
}
