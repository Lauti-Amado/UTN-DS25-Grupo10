import Carousel from 'react-bootstrap/Carousel';

import OfertaCard from './ofertaCard';

function OfertasCarousel() {
  return (
    <Carousel 
      style={{border:"1px solid black",
      borderRadius:"30px" , 
      padding:"10px", 
      width:"900px",
      left:"10%"
      }} 
      interval={null} 
      indicators={false}
    >
      <Carousel.Item >
          <div style={{display:"flex",}}>
            <OfertaCard titulo={'Oferta 1'} categoria={'programacion'} texto={'texto descriptivo del trabajo'} n={0}/>
            <OfertaCard titulo={'Oferta 2'} categoria={'programacion'} texto={'texto descriptivo del trabajo'} n={1}/>
            <OfertaCard titulo={'Oferta 3'} categoria={'programacion'} texto={'texto descriptivo del trabajo'} n={2}/>
          </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{display:"flex",}}>
            <OfertaCard titulo={'Oferta 4'} categoria={'programacion'} texto={'texto descriptivo del trabajo'} n={3}/>
            <OfertaCard titulo={'Oferta 5'} categoria={'programacion'} texto={'texto descriptivo del trabajo'} n={4}/>
            <OfertaCard titulo={'Oferta 6'} categoria={'programacion'} texto={'texto descriptivo del trabajo'} n={5}/>
          </div>
      </Carousel.Item>
      <Carousel.Item> 
        <div style={{display:"flex",}}>
            <OfertaCard titulo={'Oferta 7'} categoria={'programacion'} texto={'texto descriptivo del trabajo'} n={6}/>
            <OfertaCard titulo={'Oferta 8'} categoria={'programacion'} texto={'texto descriptivo del trabajo'} n={7}/>
            <OfertaCard titulo={'Oferta 9'} categoria={'programacion'} texto={'texto descriptivo del trabajo'} n={8}/>
          </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default OfertasCarousel;