import Card from 'react-bootstrap/Card';
import './ofertaCard.css';
import { useNavigate } from 'react-router-dom';

function OfertaCard({ titulo, texto, categoria, n }) {
  const navigate = useNavigate();

  const navegar = () => {
    navigate('/trabajos', { state: { mensaje: n } });
  };

  const truncarTexto = (texto, limite) => {
    return texto.length > limite ? texto.slice(0, limite) + '...' : texto;
  };

  return (
    <Card
      bg={'dark'}
      style={{ width: '18rem', height: '140px', cursor: 'pointer' }}
      text={'white'}
      className="mb-2 me-2 card"
      onClick={navegar}
    >
      <Card.Header className='card-header'>{categoria}</Card.Header>
      <Card.Body>
        <Card.Title className="card-title">{titulo}</Card.Title>
        <Card.Text>
          {truncarTexto(texto, 55)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default OfertaCard;