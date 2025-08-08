import{Book, AgregarLibro, BookResponse, BookListResponse} from '../types/books.ts';

let books:Book[]=[
    {
      id: 1,
      titulo: "Harry Potter",
      autor: "J.K Rowling",
      descripcion: "Saga fantástica que sigue la vida de Harry Potter, un joven mago que asiste a la escuela de magia Hogwarts y se enfrenta al oscuro mago Lord Voldemort. Combina aventuras, amistad y magia en un mundo fascinante.",
      imagen: hp,
      categoria: "Ciencia Ficcion"
    },
    {
      id: 2,
      titulo: "1984",
      autor: "George Orwell",
      descripcion: "Novela distópica sobre un régimen totalitario que vigila y controla cada aspecto de la vida humana. El protagonista, Winston Smith, lucha por preservar su libertad y pensamiento individual en un mundo de opresión y manipulación.",
      imagen: img1984,
      categoria: "Ciencia Ficcion"
    },
    {
      id: 3,
      titulo: "Los juegos del hambre",
      autor: "Suzanne Collins",
      descripcion: "En un futuro postapocalíptico, Katniss Everdeen debe sobrevivir a un mortal torneo televisado donde jóvenes luchan a muerte. Una crítica al poder autoritario y al entretenimiento extremo.",
      imagen: juegos,
      categoria: "Ciencia Ficcion"
    },
    {
      id: 4,
      titulo: "La mano izquierda de la oscuridad",
      autor: "Ursula K. Le Guin",
      descripcion: "Un enviado humano llega a un planeta donde los habitantes no tienen género fijo. La novela explora temas de identidad, política y cultura, desafiando las nociones tradicionales de género.",
      imagen: mano,
      categoria: "Ciencia Ficcion"
    },
    {
      id: 5,
      titulo: "Fundación",
      autor: "Isaac Asimov",
      descripcion: "Primer libro de una saga épica que narra cómo un científico intenta salvar el conocimiento humano ante la inminente caída de un imperio galáctico. Introduce el concepto de 'psicohistoria', una ciencia ficticia que predice el futuro.",
      imagen: fundacion,
      categoria: "Ciencia Ficcion"
    },
    {
      id: 6,
      titulo: "Neuromante",
      autor: "William Gibson",
      descripcion: "Obra pionera del ciberpunk que sigue a un hacker en un mundo dominado por corporaciones, inteligencia artificial y realidades virtuales. Influyó profundamente en la cultura digital y la ciencia ficción moderna.",
      imagen: neuro,
      categoria: "Ciencia Ficcion"
    },
]