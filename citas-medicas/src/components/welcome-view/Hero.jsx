import React from 'react'
import IconCircle from './IconCircle'


export default function Hero({onAgendaClick}) {
    return (
        <header className='container text-center py-5'>
            <IconCircle icon='fa-solid fa-stethoscope' size={90}/>

            <h1 className='display-5 fw-bold mt-4'>Sistema de Citas Médicas</h1>

            <p className='lead text-muted mx-auto' style={{maxWidth:720}}>
                Agenda tu cita médica de forma rápida y sencilla. Nuestro sistema te
                permite registrar tus datos y seleccionar el horario que mejor se adapte
                a tus necesidades.
            </p>

            <button className='btn btn-success btn-lg mt-3' onClick={onAgendaClick}>
                <i className='fa-solid fa-calendar-check me-2'></i>
                Agendar Cita
            </button>
        </header>
    )
}


