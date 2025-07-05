import Carousel from 'react-bootstrap/Carousel';
import OfertaCard from './ofertaCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import datosEmpleosIniciales from './datosIniciales';

function OfertasCarousel() {
  const [ofertas, setOfertas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('empleos');
    if (data) {
      setOfertas(JSON.parse(data));
    } else {
      localStorage.setItem('empleos', JSON.stringify(datosEmpleosIniciales));
      setOfertas(datosEmpleosIniciales);
    }
  }, []);

  const irAOferta = (index) => {
    navigate('/trabajos', { state: { mensaje: index } });
  };

  const ofertasEnSlides = [];
    for (let i = 0; i < ofertas.length; i++) {
      const grupo = [
        ofertas[i],
        ofertas[(i + 1) % ofertas.length],
        ofertas[(i + 2) % ofertas.length],
      ];
      ofertasEnSlides.push(grupo);
      if ((i + 3) % ofertas.length === 0) break;
    }


  return (
    <Carousel 
      className="carrusel-empleos"
      interval={null} 
      indicators={false}
    >

      {ofertasEnSlides.map((grupo, i) => (
        <Carousel.Item key={i}>
          <div style={{ display: "flex" }}>
            {grupo.map((oferta, index) => (
              <div key={oferta.id} onClick={() => irAOferta(i * 3 + index)}>
                <OfertaCard
                  titulo={oferta.titulo}
                  categoria={oferta.categoria}
                  texto={oferta.contenido}
                  n={i * 3 + index}
                />
              </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default OfertasCarousel;
