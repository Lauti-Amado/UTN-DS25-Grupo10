import Card from 'react-bootstrap/Card';

function OfertaCard({titulo,texto,categoria}) {
  return (
    <>
       <Card
          bg={'dark'}
          key={'dark'}
          text={'dark' === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem'}}
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
    </>
  );
}

export default OfertaCard;