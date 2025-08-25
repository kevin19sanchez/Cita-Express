import { useState } from 'react'
import './App.css'
import Hero from './components/welcome-view/Hero.jsx'
import Features from './components/welcome-view/Features.jsx'
import AppointmentForm from './components/form-view/AppointmentForm.jsx'
import AppointmentList from './components/list-view/AppointmentList.jsx'

function App() {
  const [vista, setVista] = useState("home")

  return (
    <>
      {vista === "home" && (
        <>
          <Hero onAgendaClick={() => setVista("form")}/>
            <Features />
        </>
      )}

      {vista === "form" && (
        <AppointmentForm 
        onBack={() => setVista("home")}
        onConfirm={() => setVista("list")}/>
      )}

      {vista === "list" && (
        <AppointmentList onBack={() => setVista("home")}
        onNuevaCita={() => setVista("form")}/>
      )}
    </>
  )
}

export default App

/**
 * 
 * <main className='container-py-5'>
        <h2 className='mb-3'>
          <i className='fa-solid fa-clipboard-list me-2'></i>
          Formulario de Pacientes
        </h2>
        <p className='text-muted'>
          Aquí irá tu formulario de registro y selección de cita.
        </p>
        <button className="btn btn-outline-secondary" onClick={() => setMostrarFormulario(false)}>
          <i className="fa-solid fa-arrow-left me-2"></i>
          volver
        </button>
      </main>
 * 
 */