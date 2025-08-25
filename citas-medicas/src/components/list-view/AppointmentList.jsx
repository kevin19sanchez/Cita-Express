import {useEffect, useState} from 'react'
import { db } from "../../firebase";
import { collection, getDocs } from 'firebase/firestore';

export default function AppointmentList ({onBack, onNuevaCita}) {

    const [appoinments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const quesrySnapshot = await getDocs(collection(db, "citas"));
                const data = quesrySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAppointments(data)
            } catch (error) {
                console.error("Error al obtener citas: ", error)
            }
        };
        fetchAppointments();
    }, []);

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <button className='btn btn-outline-success' onClick={onBack}>
                    <i className='fa-solid fa-arrow-left me-2'></i> Volver al inicio
                </button>

                <button className='btn btn-outline-success' onClick={onNuevaCita}>
                    <i className='fa-solid fa-plus me-2'></i> Nueva Cita
                </button>
            </div>

            <h2 className='fw-bold'>Mis Citas Médicas</h2>
            <p className='text-muted'>
                Tienes {appoinments.length} citas programadas
            </p>

            {appoinments.map((appt) => (
                <div key={appt.id} className='card mb-3 shadow-sm'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between'>
                            {/** INFO DEL PACIENTE */}
                            <div>
                                <h5 className='fw-bold mb-1'>{appt.nombre}</h5>
                                <p className='mb-1'>
                                    <i className='fa-solid fa-envelope me-2'></i>
                                    {appt.correo}
                                </p>
                                <p className='mb-1'>
                                    <i className='fa-solid fa-phone me-2"'></i>
                                    {appt.telefono}
                                </p>
                            </div>
                            {/** ESTADO */}
                            <span className='badge bg-success align-self-start'>Próxima</span>
                        </div>

                        <hr />

                        {/** FECHA Y HORA */}
                        <div className='d-flex justify-content-between'>
                            <p className='mb-1'>
                                <i className='fa-solid fa-calendar me-2'></i>
                                <strong>Fecha:</strong> {appt.fecha}
                            </p>
                            <p className='mb-1'>
                                <i className='fa-solid fa-clock me-2'></i>
                                <strong>Hora:</strong> {appt.hora}
                            </p>
                        </div>

                        {/** MOTIVO */}
                        <p className='mt-2'>
                            <strong>Motivo de la consulta:</strong><br />
                            {appt.motivo}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}


