import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
  href?: string;
  actionIcon?: LucideIcon;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  actionLabel, 
  onAction, 
  href,
  actionIcon: Icon 
}: PageHeaderProps) {
  const content = (
    <>
      {Icon && <Icon size={16} />}
      {actionLabel}
    </>
  );

  const className = "flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-black/80 transition-all uppercase text-xs tracking-widest font-sans";

  return (
    <div className="flex justify-between items-end mb-12">
      <div>
        <h1 className="text-4xl font-serif mb-2">{title}</h1>
        <p className="text-muted-fg font-sans tracking-wide uppercase text-xs">{subtitle}</p>
      </div>
      {actionLabel && (
        href ? (
          <Link href={href} className={className}>
            {content}
          </Link>
        ) : onAction ? (
          <button onClick={onAction} className={className}>
            {content}
          </button>
        ) : null
      )}
    </div>
  );
}