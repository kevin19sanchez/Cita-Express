import React, {useState} from 'react'
import { collection, addDoc } from "firebase/firestore"
import IconCirlce from '../welcome-view/IconCircle'
import { db } from "../../firebase";

export default function AppointmentForm({onBack, onConfirm}) {

    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        fecha: "",
        hora: "",
        motivo: "",
    })

    const [loanding, setLoading] = useState(false)
    const [errors, setErrors] = useState(false)

    // VALIDACIONES
    const validate = () =>{
        let newErrors = {};

        if(!formData.nombre.trim()){
            newErrors.nombre = "El nombre es obligatorio";
        }

        const phoneRegex = /^[0-9]{4}-[0-9]{4}$/;
        if(!formData.telefono.match(phoneRegex)){
            newErrors.telefono = "Formato de teléfono inválido (ej: 1234-5678)"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.correo.match(emailRegex)) {
            newErrors.correo = "Correo electrónico inválido";
        }

        if(!formData.fecha){
            newErrors.fecha = "La fecha es obligatoria";
        }else{
            const today = new Date().toISOString().split("T")[0];
            if(formData.fecha < today){
                newErrors.fecha = "La fecha no puede ser anterior a hoy";
            }
        }

        if(!formData.hora){
            newErrors.hora = "La hora es obligatoria";
        }

        return newErrors
    }

    function handleChange(e){
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value});
            setErrors({...errors, [e.target.name]: ""});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const newErrors = validate();
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        try {
            await addDoc(collection(db, "citas"), formData);
            alert("✔ Cita guardada correctamente en Firebase");

            if(onConfirm){
                onConfirm();
            }
            setFormData({
                nombre: "",
                correo: "",
                telefono: "",
                fecha: "",
                hora: "",
                motivo: "",
            });
        } catch (error) {
            console.error("Error al guardar cita:", error);
            alert("❌ Hubo un error al guardar la cita");
        }
        setLoading(false)
    }

    return (
        <main className="container py-5">
        {/* BOTON VOLVER */}
        <button className="btn btn-outline-success" onClick={onBack}>
            <i className="fa-solid fa-arrow-left me-2"></i> Volver
        </button>
        <br />
        <br />

        {/* ENCABEZADO */}
        <div className="text-center mb-4">
            <IconCirlce icon="fa-regular fa-calendar-check" size={90} />
            <h2 className="fw-bold mt-3">Agendar Nueva Cita</h2>
            <p className="text-muted">
            Completa el formulario para programar tu cita médica
            </p>
        </div>

        {/* FORMULARIO */}
        <form
            className="card shadow-sm p-4 mx-auto"
            style={{ maxWidth: "700px" }}
            onSubmit={handleSubmit}
        >
            {/* INFORMACION DEL PACIENTE */}
            <h5 className="text-success mb-3">
            <i className="fa-solid fa-user me-2"></i> Información del Paciente
            </h5>
            <div className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Nombre Completo *</label>
                <input
                type="text"
                name="nombre"
                className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                placeholder="Ingresa tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                required
                />
                {errors.nombre && (
                    <div className='Invalid-feedback'>{errors.nombre}</div>
                )}
            </div>
            <div className="col-md-6">
                <label className="form-label">Teléfono *</label>
                <input
                type="tel"
                name="telefono"
                className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                placeholder="1234-5678"
                value={formData.telefono}
                onChange={handleChange}
                required
                />
                {errors.telefono && (
                    <div className='Invalid-feedback'>{errors.telefono}</div>
                )}
            </div>
            <div className="col-12">
                <label className="form-label">Correo Electrónico *</label>
                <input
                type="email"
                name="correo"
                className={`form-control ${errors.correo ? "is-invalid" : ""}`}
                placeholder="correo@ejemplo.com"
                value={formData.correo}
                onChange={handleChange}
                required
                />
                {errors.correo && (
                    <div className='Invalid-feedback'>{errors.correo}</div>
                )}
            </div>
            </div>

            {/* Fecha y hora */}
            <h5 className="text-success mt-4 mb-3">
            <i className="fa-regular fa-clock me-2"></i> Fecha y Hora de la Cita
            </h5>
            <div className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Fecha *</label>
                <input
                type="date"
                name="fecha"
                className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
                value={formData.fecha}
                onChange={handleChange}
                required
                />
                {errors.fecha && (
                    <div className='Invalid-feedback'>{errors.fecha}</div>
                )}
            </div>
            <div className="col-md-6">
                <label className="form-label">Hora *</label>
                <input
                type="time"
                name="hora"
                className={`form-control ${errors.hora ? "is-invalid" : ""}`}
                value={formData.hora}
                onChange={handleChange}
                required
                />
                {errors.hora && (
                    <div className='Invalid-feedback'>{errors.hora}</div>
                )}
            </div>
            </div>

            {/* Motivo */}
            <div className="mt-3">
            <label className="form-label">Motivo de la Consulta</label>
            <textarea
                name="motivo"
                className="form-control"
                rows="3"
                placeholder="Describe brevemente el motivo de tu consulta (opcional)"
                value={formData.motivo}
                onChange={handleChange}
            ></textarea>
            </div>

            {/* Botón confirmar */}
            <button
            type="submit"
            className="btn btn-success w-100 mt-4"
            disabled={loanding}
            >
            {loanding ? "Guardando..." : "Confirmar Cita"}
            </button>
        </form>
    </main>
    )
}


