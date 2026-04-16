export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif mb-8 text-accent">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
          <h2 className="text-xl font-serif mb-2">Products</h2>
          <p className="text-muted-foreground mb-4">Manage your luxury catalog</p>
          <button className="px-4 py-2 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity">
            View Products
          </button>
        </div>
        <div className="p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
          <h2 className="text-xl font-serif mb-2">Users</h2>
          <p className="text-muted-foreground mb-4">Manage customers and admins</p>
          <button className="px-4 py-2 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity">
            View Users
          </button>
        </div>
        <div className="p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
          <h2 className="text-xl font-serif mb-2">Orders</h2>
          <p className="text-muted-foreground mb-4">Track sales and fulfillments</p>
          <button className="px-4 py-2 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity">
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}
