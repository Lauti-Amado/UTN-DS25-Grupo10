import Card from 'react-bootstrap/Card';
import './ofertaCard.css';
import { Link } from 'react-router-dom';
function OfertaCard({titulo,texto,categoria}) {
  return (
    <>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
       <Card
          bg={'dark'}
          key={'dark'}
          style={{ width: '18rem' }}
          text={'dark' === 'light' ? 'dark' : 'white'}
          className="mb-2 me-2"
        >
          <Card.Header>{categoria}</Card.Header>
          <Card.Body>
            <Card.Title>{titulo} </Card.Title>
            <Card.Text>
              {texto}
             
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
}

export default OfertaCard;