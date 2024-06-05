import React from "react";

interface ModalProps {
    children: React.ReactNode
    title: string
    onClose: () => void
}

export function Modal({ children, title, onClose }: ModalProps) {
    return (
        <>
            <div
                className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"
                onClick={onClose}
            />
            <div
                className="w-[500px] p-5 rounded bg-white absolute top-10 left-1/2 -translate-x-1/2"
            >
                <span className="absolute top-0 right-0 h-10 w-10 bg-red-700 text-white cursor-pointer flex justify-center items-center" onClick={onClose}>X</span>
                <h3>{title}</h3>
                {children}
            </div >
        </>
    )
} 