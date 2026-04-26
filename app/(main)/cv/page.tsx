'use client';

import Link from "next/link";
import { Globe, Languages, Code2, Layers, Cpu, Briefcase, ExternalLink, Mail, Phone, MapPin, Download } from "lucide-react";
import Image from "next/image";

export default function CVPage() {
  const languages = [
    { name: "Español", level: "Nativo", percentage: 100 },
    { name: "Inglés", level: "Fluido", percentage: 90 },
    { name: "Francés", level: "Básico", percentage: 30 },
  ];

  const programmingLanguages = ["PHP", "JS", "Java", "HTML", "CSS", "SCSS", "jQuery", "Python"];

  const frameworks = [
    "Laravel", "Angular", "Next.js", "React", "WordPress", "SpringBoot", "Supabase"
  ];

  const expertises = [
    { title: "Gestión de VPS", description: "Despliegue y optimización de servidores." },
    { title: "Ecosistema WordPress", description: "Creación de temas y plugins personalizados." },
    { title: "Arquitectura de BD", description: "Diseño y optimización de esquemas complejos." },
  ];

  const projects = [
    {
      title: "Cri Academy",
      type: "SaaS LMS",
      description: "Un sistema de gestión de aprendizaje a gran escala diseñado para el rendimiento.",
    },
    {
      title: "ERPs Empresariales",
      type: "2 Sistemas Internos",
      description: "Soluciones de planificación de recursos a medida para operaciones comerciales eficientes.",
    },
    {
      title: "Portafolio Web de Lujo",
      type: "Varios Sitios Web",
      description: "Experiencias digitales de alta gama creadas con atención al detalle.",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="min-h-[90vh] pt-24 flex flex-col lg:flex-row items-stretch border-b border-black/5">

        {/* Left Side: Massive Typography */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-20 py-24 relative overflow-hidden">
          {/* Decorative vertical text */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 writing-vertical text-[12rem] font-serif opacity-[0.03] select-none pointer-events-none">
            ARQUITECTO
          </div>

          <div className="relative z-10 animate-in fade-in slide-in-from-left duration-1000 ease-out">
            <span className="text-xs uppercase tracking-[0.5em] text-accent font-bold mb-8 block ml-2">
              Full-stack Developer & Architect
            </span>
            <h1 className="text-[15vw] lg:text-[10rem] font-serif leading-[0.85] tracking-tight mb-12">
              Cristopher <br />
              <span className="italic">Quiñones</span>
            </h1>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-12 mt-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm uppercase tracking-widest hover:text-accent transition-colors">
                  <Globe size={16} className="text-accent" />
                  <Link href="https://darkredgm.com" target="_blank" className="border-b border-black/10">darkredgm.com</Link>
                </div>
                <div className="flex items-center gap-3 text-sm uppercase tracking-widest text-muted-fg">
                  <MapPin size={16} />
                  <span>Remoto / Internacional</span>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="group flex items-center gap-4 bg-foreground text-background px-10 py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-accent transition-all duration-700"
              >
                <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                Descargar Portafolio
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Full Height Image */}
        <div className="w-full lg:w-[40%] overflow-hidden h-[60vh] lg:h-auto relative bg-muted-bg animate-in fade-in slide-in-from-right duration-1000 delay-300">
          <Image
            src="/me.jpg"
            alt="Cristopher Quiñones"
            fill
            className="object-contain grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-16 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">

          {/* Columna Izquierda: Información Principal */}
          <div className="lg:col-span-4 space-y-20">
            {/* Idiomas */}
            <section className="animate-fade-in [animation-delay:200ms]">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-8 bg-accent" />
                <h2 className="uppercase tracking-[0.4em] text-xs font-semibold">Idiomas</h2>
              </div>
              <div className="space-y-6">
                {languages.map((lang) => (
                  <div key={lang.name} className="group cursor-default">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-serif text-2xl group-hover:text-accent transition-colors">{lang.name}</span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-fg">{lang.level}</span>
                    </div>
                    <div className="h-[2px] w-full bg-muted-bg overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-1000 ease-out"
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Lenguajes de Programación */}
            <section className="animate-fade-in [animation-delay:400ms]">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-8 bg-accent" />
                <h2 className="uppercase tracking-[0.4em] text-xs font-semibold">Stack Principal</h2>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {programmingLanguages.map((lang) => (
                  <span key={lang} className="font-serif text-xl hover:text-accent transition-colors cursor-default">
                    {lang}
                  </span>
                ))}
              </div>
            </section>

            {/* Contacto / CTA Social */}
            <section className="p-8 border border-foreground/5 bg-muted-bg/30 rounded-sm">
              <p className="text-xs uppercase tracking-widest text-muted-fg mb-4 italic">Listo para nuevos desafíos</p>
              <h3 className="font-serif text-2xl mb-6">Construyamos algo excepcional.</h3>
              <Link
                href="mailto:contact@darkredgm.com"
                className="inline-block border-b border-accent text-sm uppercase tracking-widest py-1 hover:text-accent transition-colors"
              >
                Consultar Proyecto
              </Link>
            </section>
          </div>

          {/* Columna Derecha: Experiencia y Proyectos */}
          <div className="lg:col-span-8 space-y-20">
            {/* Enfoque Profesional */}
            <section className="animate-fade-in [animation-delay:300ms]">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[1px] w-8 bg-accent" />
                <h2 className="uppercase tracking-[0.4em] text-xs font-semibold">Experiencia & Frameworks</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-12">
                {expertises.map((exp, i) => (
                  <div key={i} className="group">
                    <h3 className="font-serif text-2xl mb-3 group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                      <span className="text-accent text-sm">0{i + 1}</span>
                      {exp.title}
                    </h3>
                    <p className="text-muted-fg text-sm leading-relaxed max-w-xs">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {frameworks.map((fw) => (
                  <span key={fw} className="px-4 py-2 border border-foreground/10 text-[10px] uppercase tracking-widest hover:border-accent hover:text-accent transition-all duration-300">
                    {fw}
                  </span>
                ))}
              </div>
            </section>

            {/* Proyectos / Casos de Estudio */}
            <section className="animate-fade-in [animation-delay:500ms]">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-[1px] w-8 bg-accent" />
                <h2 className="uppercase tracking-[0.4em] text-xs font-semibold">Trabajos Seleccionados</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-20">
                <div className="relative aspect-[4/5] overflow-hidden group rounded-sm shadow-2xl">
                  <img
                    src="/luxury_workspace_cv_1777200035204.png"
                    alt="Espacio de Trabajo de Lujo"
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="flex flex-col justify-center space-y-12">
                  {projects.map((project, i) => (
                    <div key={i} className="group relative">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-fg block mb-2">{project.type}</span>
                      <h3 className="font-serif text-2xl group-hover:text-accent transition-colors mb-3">{project.title}</h3>
                      <p className="text-muted-fg text-sm leading-relaxed italic">
                        "{project.description}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Filosofía */}
            <section className="pt-12 animate-fade-in [animation-delay:600ms]">
              <div className="p-12 border border-accent/20 bg-accent/[0.02] relative overflow-hidden">
                <div className="absolute -bottom-8 -right-8 text-8xl font-serif text-accent/5 select-none">
                  CQ
                </div>
                <blockquote className="relative z-10">
                  <p className="font-serif text-3xl italic leading-relaxed mb-6">
                    "La arquitectura no es solo para edificios; los espacios digitales requieren la misma integridad estructural y precisión estética."
                  </p>
                  <cite className="text-xs uppercase tracking-widest font-sans text-accent not-italic">
                    — Cristopher Quiñones
                  </cite>
                </blockquote>
              </div>
            </section>
          </div>
        </div>

        {/* Info del pie de página */}
        <footer className="mt-32 pt-12 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-muted-fg">
          <span>&copy; 2026 Cristopher Quiñones</span>
          <span>EST. 2026 / Estudio Digital de Lujo</span>
          <Link href="/" className="hover:text-accent transition-colors">Volver a la Boutique</Link>
        </footer>
      </div>
    </div>
  );
}
