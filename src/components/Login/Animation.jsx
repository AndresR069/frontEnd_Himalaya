import React from "react";
const Animation = () => {
    return (
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
            {/* Lado derecho del formulario cuando pantalla completa WEB
                1. No se muestra cuando la pantalla esta pequeña (Menos de la mitad) por el 
                hidden lg:flex   
                w-1/2 para ocupar mitad de pantalla   
                justify-center centrar divs 
            */}
            <div className="w-60 h-60 bg-gradient-to-tr from-green-500 to-blue-500 rounded-full animate-pulse" />
            <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
        </div>
    );
}

export default Animation;