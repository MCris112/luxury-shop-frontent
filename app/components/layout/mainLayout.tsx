import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            {children}

            <Footer />
        </div>
    );
}