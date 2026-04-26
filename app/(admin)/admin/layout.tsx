import AdminLayout from "../../../layout/adminLayout";
import { ConfirmProvider } from "@/components/admin/ConfirmDialog";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ConfirmProvider>
      <AdminLayout>{children}</AdminLayout>
    </ConfirmProvider>
  );
}

