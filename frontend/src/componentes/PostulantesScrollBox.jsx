import React from 'react';
import TrabajoCard from './TrabajoCard';
import './TrabajosDisponibles.css';

const postulantes = [
  {
    nombre: "Lucía Martínez",
    rol: "Desarrolladora Frontend",
    sueldo: "$350.000",
    imagen: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    nombre: "Carlos Gómez",
    rol: "Diseñador UI/UX",
    sueldo: "$310.000",
    imagen: "https://randomuser.me/api/portraits/men/34.jpg"
  },
  {
    nombre: "Valentina Ruiz",
    rol: "QA Tester",
    sueldo: "$280.000",
    imagen: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    nombre: "Martín Pereyra",
    rol: "Desarrollador Backend",
    sueldo: "$400.000",
    imagen: "https://randomuser.me/api/portraits/men/51.jpg"
  },
  {
    nombre: "Camila Fernández",
    rol: "Científica de Datos",
    sueldo: "$450.000",
    imagen: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    nombre: "Santiago López",
    rol: "DevOps Engineer",
    sueldo: "$500.000",
    imagen: "https://randomuser.me/api/portraits/men/76.jpg"
  },
  {
    nombre: "Julieta Castro",
    rol: "Full Stack Developer",
    sueldo: "$550.000",
    imagen: "https://randomuser.me/api/portraits/women/12.jpg"
  }
];


const PostulantesScrollBox = () => { 
  return (
    <div className="trabajos-container container">
      <h4 className=" my-4">Perfiles de postulantes</h4>
      <div className="scroll-box">
        <div className="trabajos-grid">
          {postulantes.map((postulante, index) => (
            <TrabajoCard //reutilizamos TrabajoCard
              key={index}
              EsTrabajo={false}
              titulo={postulante.nombre}
              sueldo={postulante.sueldo}
              rol={postulante.rol}
              imagen={postulante.imagen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostulantesScrollBox;