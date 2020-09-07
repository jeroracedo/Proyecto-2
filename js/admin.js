class GenerarFormulario {
  generarForumulario() {
    const formulario = document.getElementById("formularioAgregarPelicula");
    const elemento = document.createElement("div");
    elemento.innerHTML = `<form id="formulario8">
    <div class="form-group">
      <label for="exampleFormControlInput1">Codigo</label>
      <input type="codigo" class="form-control" id="Codigo" placeholder="Codigo">
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Nombre</label>
      <input type="codigo" class="form-control" id="Nombre" placeholder="Nombre">
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Descripción</label>
      <textarea class="form-control" id="Descripcion" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">Categoria</label>
      <select class="form-control" id="Categoria">
        <option>Acción</option>
        <option>Comedia</option>
        <option>Drama</option>
        <option>Terror</option>
        <option>Suspenso</option>
      </select>
    </div>
    <button type="button" onclick="subirPelicula()" class="btn btn-secondary btn-lg" id="cerrarFormulario">Agregar Pelicula</button>
    
  </form>`;
    formulario.appendChild(elemento);
  }
}

function subirPelicula() {
  console.log("hola");
  const codigo = document.getElementById("Codigo").value;
  const nombre = document.getElementById("Nombre").value;
  const descripcion = document.getElementById("Descripcion").value;
  const categoria = document.getElementById("Categoria").value;
  const pelicula = new Peliculas(codigo, nombre, descripcion, categoria);
  const peliculaAAgregar = new NuevaPelicula();

  if (localStorage.getItem("peliculas")) {
    const peliculas = JSON.parse(localStorage.getItem("peliculas"));
    console.log(peliculas);
    peliculas.push(pelicula);
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    peliculaAAgregar.agregarPelicula(peliculas);
  } else {
    localStorage.setItem("peliculas", JSON.stringify([pelicula]));
    const peliculas = JSON.parse(localStorage.getItem("peliculas"));
    peliculaAAgregar.agregarPelicula(peliculas);
  }
}

class Peliculas {
  constructor(Codigo, Nombre, Descripcion, Categoria) {
    this._Codigo = Codigo;
    this._Nombre = Nombre;
    this._Descripcion = Descripcion;
    this._Categoria = Categoria;
  }
}

class NuevaPelicula {
  revisar(peliculas) {
    for (var i = 0; i < peliculas.length; i++) {
      const tabla = document.getElementById("tabla");
      const elemento = document.createElement("tr");
      elemento.innerHTML = `  <th scope="row">${peliculas[i]._Codigo}</th>
    <td>${peliculas[i]._Nombre}</td>
    <td>${peliculas[i]._Descripcion}</td>
    <td>${peliculas[i]._Categoria}</td>`;
      tabla.appendChild(elemento);
    }
  }

  agregarPelicula(peliculas) {
    var i = peliculas.length - 1;
    const tabla = document.getElementById("tabla");
    const elemento = document.createElement("tr");
    elemento.innerHTML = `  <th scope="row">${peliculas[i]._Codigo}</th>
    <td>${peliculas[i]._Nombre}</td>
    <td>${peliculas[i]._Descripcion}</td>
    <td>${peliculas[i]._Categoria}</td>`;
    tabla.appendChild(elemento);
  }
}

const eventoAgregarPelicula = document
  .getElementById("agregarPelicula")
  .addEventListener("click", function (e) {
    console.log("hice click");
    const formulario = new GenerarFormulario();
    formulario.generarForumulario();
    e.preventDefault();
  });

function inicio() {
  if (localStorage.getItem("peliculas")) {
    const peliculas = JSON.parse(localStorage.getItem("peliculas"));
    const iniciar = new NuevaPelicula();
    iniciar.revisar(peliculas);
  }
}
inicio();
