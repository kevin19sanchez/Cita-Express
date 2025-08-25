import React from "react";

export default function IconCircle({icon = 'fa-solid fa-stethoscope', size = 80}){
    return(
        <div 
        className="rounded-circle bg-success-subtle text-success d-inline-flex align-items-center justify-content-center shadow-sm"
        style={{width: size, height: size}}
        aria-hidden:true>
        
        <i className={`${icon} fs-1`}></i>

        </div>
    )
}