'use client';

import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { fetchUserStore } from "./userService";
import { UserStore } from "./user.types";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

export default function UserCreateModal({ isOpen, onClose, onUserCreated }: { isOpen: boolean, onClose: () => void, onUserCreated: () => void }) {
    const { register, handleSubmit, reset } = useForm<UserStore>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: UserStore) => {
        setIsSubmitting(true);
        try {
            await fetchUserStore(data);
            toast.success("Usuario registrado correctamente");
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
                </div>
                
                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? "Creando..." : "Crear Usuario"}
                </Button>
            </form>
        </Modal>
    )
}
