import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r border-black/5 flex flex-col pt-8 bg-muted-bg/30">
                <div className="px-8 mb-12">
                    <h2 className="text-2xl font-serif tracking-widest uppercase">Admin</h2>
                </div>

                <nav className="flex-grow">
                    <ul className="space-y-1">
                        <li>
                            <Link href="/admin" className="flex items-center px-8 py-3 hover:bg-white/40 transition-colors border-l-2 border-transparent hover:border-accent">
                                <span className="text-sm tracking-widest uppercase font-sans">Panel</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/products" className="flex items-center px-8 py-3 hover:bg-white/40 transition-colors border-l-2 border-transparent hover:border-accent">
                                <span className="text-sm tracking-widest uppercase font-sans">Productos</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/users" className="flex items-center px-8 py-3 hover:bg-white/40 transition-colors border-l-2 border-transparent hover:border-accent">
                                <span className="text-sm tracking-widest uppercase font-sans">Usuarios</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="p-8 border-t border-black/5">
                    <Link href="/" className="text-xs uppercase tracking-tighter opacity-50 hover:opacity-100 transition-opacity">
                        Back to Shop
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow">
                <header className="h-20 border-b border-black/5 flex items-center justify-between px-12">
                    <div className="text-xs uppercase tracking-widest text-muted-fg">Vista Actual / Admin</div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-xs uppercase tracking-tighter opacity-50 hover:opacity-100 transition-opacity">
                            Volver a la Tienda
                        </Link>
                        <span className="text-sm font-sans">Administrador</span>
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold">AD</div>
                    </div>
                </header>
                <div className="p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}