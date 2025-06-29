
    function editarPerfil(){
    document.getElementById('editar').style.display='block';
    document.getElementById('fondoborroso').style.display='block';
    }

   
  window.onload=function(){
  const boton = document.getElementById('fotoper');
  const input = document.getElementById('imageInput');
  const preview = document.getElementById('vistaprevia');
  const aceptar=document.getElementById('aceptar')
  const cancelar=document.getElementById('cancelar')
  const fotoperfil=document.getElementById('imagenperfil')

  boton.onclick = function () {
    input.click();
  };

  input.onchange = function () {
    const archivo = input.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'inline-block';
      };
      lector.readAsDataURL(archivo);
    }
  };

  aceptar.onclick=function(){
     fotoperfil.src=preview.src
     cerrar()
  }

   cancelar.onclick=function(){
     cerrar();
   };

   function cerrar(){
    document.getElementById('editar').style.display="none"
    document.getElementById('fondoborroso').style.display="none"
    input.value = "";
   };

}