import Card from 'react-bootstrap/Card';
import './ofertaCard.css';
import { Link } from 'react-router-dom';
import Acordion from './acordion';
import { useNavigate } from 'react-router-dom';
function OfertaCard({titulo,texto,categoria,n}) {
  const navigate =useNavigate();
  const navegar= () =>{
    navigate('/trabajos',{state:{mensaje:n}}) //mensaje es el numero del oferta card
    console.log(n) //muestra en consola el valor de n pasado por el oberta card
  }

  return (
    <>
       <Card 
          bg={'dark'}
          key={'dark'}
          style={{ width: '18rem' }}
          text={'dark' === 'light' ? 'dark' : 'white'}
          className="mb-2 me-2"
          onClick={navegar} //se una la funcion navegar
        >
          <Card.Header>{categoria}</Card.Header>
          <Card.Body>
            <Card.Title>{titulo} </Card.Title>
            <Card.Text>
              {texto}
             
            </Card.Text>
          </Card.Body>
        </Card>
    </>
  );
}

export default OfertaCard;