// testUsuario.js

const usuario = {
  nombre: "Julian",
  contraseña: "Pass123!",
  mail: "julian@test.com",
  descripcion: "Soy un postulante",
  rolPostulante: true,
  fotoperfil: "https://example.com/miFoto.jpg",
  fecha: new Date().toISOString()  // ← AGREGADO
};

fetch("http://localhost:3000/usuarios", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(usuario)
})
  .then(res => res.json())
  .then(data => console.log("Respuesta del back:", data))
  .catch(err => console.error("Error:", err));
