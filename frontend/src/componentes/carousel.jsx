import Carousel from 'react-bootstrap/Carousel';

import OfertaCard from './ofertaCard';

function OfertasCarousel() {
  return (
    <Carousel 
      style={{border:"1px solid black",
      borderRadius:"30px" , 
      padding:"10px", 
      width:"800px"
      }} 
      interval={null} 
      indicators={false}
    >
      <Carousel.Item >
          <div style={{display:"flex",}}>
            <OfertaCard  titulo={'Oferta 11'} categoria={'programacion'} texto={'texto descriptivo del trabajo'}/>
            <OfertaCard titulo={'Oferta 1'} categoria={'programacion'} texto={'texto descriptivo del trabajo'}/>
            <OfertaCard titulo={'Oferta 1'} categoria={'programacion'} texto={'texto descriptivo del trabajo'}/>
          </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{display:"flex",}}>
            <OfertaCard titulo={'Oferta 1'} categoria={'programacion'} texto={'texto descriptivo del trabajo'}/>
            <OfertaCard titulo={'Oferta 1'} categoria={'programacion'} texto={'texto descriptivo del trabajo'}/>
            <OfertaCard titulo={'Oferta 1'} categoria={'programacion'} texto={'texto descriptivo del trabajo'}/>
          </div>
      </Carousel.Item>
      <Carousel.Item> 
        <div style={{display:"flex",}}>
            <OfertaCard titulo={'Oferta 1'} categoria={'programacion'} texto={'texto descriptivo del trabajo'}/>
            <OfertaCard titulo={'Oferta 1'} categoria={'programacion'} texto={'texto descriptivo del trabajo'}/>
            <OfertaCard titulo={'Oferta 1'} categoria={'programacion'} texto={'texto descriptivo del trabajo'}/>
          </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default OfertasCarousel;