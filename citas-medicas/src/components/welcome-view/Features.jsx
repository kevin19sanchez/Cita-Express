import React from 'react'
import FeatureCard from './FeatureCard.jsx'

export default function Features() {
    return (
        <section className='container pb-5'>
            <div className="row">
                <FeatureCard icon="fa-solid fa-user-group" title="Registro Fácil">
                    Completa un formulario simple con tus datos personales y
                    información de contacto.
                </FeatureCard>

                <FeatureCard icon="fa-regular fa-clock" title="Horarios Flexibles">
                    Selecciona la fecha y hora que mejor se ajuste a tu disponibilidad.
                </FeatureCard>

                <FeatureCard icon="fa-regular fa-calendar-check" title="Gestión Completa">
                    Visualiza todas tus citas programadas en un formato claro y organizado.
                </FeatureCard>
            </div>
        </section>
    )
}





