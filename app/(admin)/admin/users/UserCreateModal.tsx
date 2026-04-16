'use client';

import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { userStore } from "./userService";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UserCreateModal({ isOpen, onClose, onUserCreated }: { isOpen: boolean, onClose: () => void, onUserCreated: () => void }) {
    const { register, handleSubmit, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            await userStore(data);
            toast.success("Cliente registrado correctamente");
            reset();
            onUserCreated();
            onClose();
        } catch (error) {
            toast.error("Error al registrar: verifique los datos");
            console.error("Failed to create user:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Crear Usuario">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-2">
                <div className="space-y-6">
                    <Input 
                        label="Nombre Completo" 
                        placeholder="Ej: Julianne Moore" 
                        {...register("name", { required: true })} 
                    />
                    <Input 
                        label="Correo Electrónico" 
                        placeholder="Ej: nombre@editorial.com" 
                        type="email" 
                        {...register("email", { required: true })} 
                    />
                    <Input 
                        label="Contraseña" 
                        placeholder="Ingrese clave segura" 
                        type="password" 
                        {...register("password", { required: true })} 
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-foreground text-background uppercase tracking-[0.2em] text-xs font-medium hover:bg-black/80 transition-all disabled:opacity-50"
                >
                    {isSubmitting ? "Creando..." : "Crear Usuario"}
                </button>
            </form>
        </Modal>
    )
}