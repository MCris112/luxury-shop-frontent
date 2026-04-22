import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 border-t border-foreground/10 mt-auto">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4">
            <h2 className="font-serif text-4xl mb-8 tracking-tight">
              Suscríbete para <br />
              <span className="italic text-accent">Novedades Editoriales</span>
            </h2>
            <div className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="correo@ejemplo.com"
                className="bg-transparent border-b border-background/20 focus:border-accent outline-none py-4 font-serif italic text-lg transition-colors duration-500 placeholder:text-background/40"
              />
              <button className="self-start text-[10px] uppercase tracking-[0.3em] hover:text-accent transition-colors duration-500 mt-2">
                Suscribirse —
              </button>
            </div>
          </div>

          <div className="md:col-start-7 md:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-background/40 mb-8">Navegación</h3>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'Inicio', path: '/' },
                { label: 'Productos', path: '/products' },
                { label: 'Colecciones', path: '#' },
                { label: 'Nosotros', path: '/about' }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.path} className="text-sm hover:text-accent transition-colors duration-500">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-background/40 mb-8">Social</h3>
            <ul className="flex flex-col gap-4">
              {['Instagram', 'Pinterest', 'Journal'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm hover:text-accent transition-colors duration-500">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-background/40 mb-8">Legal</h3>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'Política de Privacidad', path: '#' },
                { label: 'Términos de Servicio', path: '#' },
                { label: 'Envíos', path: '#' }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.path} className="text-sm hover:text-accent transition-colors duration-500">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t border-background/10 pt-12 gap-8">
          <div className="font-serif text-8xl md:text-[10rem] leading-[0.8] tracking-tighter opacity-10 select-none">
            LUXURY
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-background/40 text-right">
            © 2026 LUXURY Editorial. <br />
            Demo por <a href="https://darkredgm.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Darkredgm - Cristopher</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
