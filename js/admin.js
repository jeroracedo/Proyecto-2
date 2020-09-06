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
    <button type="submit" class="btn btn-secondary btn-lg" id="cerrarFormulario">Agregar Pelicula</button>
    
  </form>`;
    formulario.appendChild(elemento);
  }
  eliminarProducto(elemento) {
    elemento.target.parentElement.remove();
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
  agregarPelicula(pelicula) {
    const tabla = document.getElementById("tabla");
    const elemento = document.createElement("tr");
    elemento.innerHTML = `  <th scope="row">${pelicula._Codigo}</th>
    <td>${pelicula._Nombre}</td>
    <td>${pelicula._Descripcion}</td>
    <td>${pelicula._Categoria}</td>`;
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

const eventoCerrarFormulario = document
  .getElementById("formularioAgregarPelicula")
  .addEventListener("submit", function (e) {
    console.log("hola");
    const codigo = document.getElementById("Codigo").value;
    const nombre = document.getElementById("Nombre").value;
    const descripcion = document.getElementById("Descripcion").value;
    const categoria = document.getElementById("Categoria").value;
    const pelicula = new Peliculas(codigo, nombre, descripcion, categoria);
    const peliculaAAgregar = new NuevaPelicula();
    peliculaAAgregar.agregarPelicula(pelicula);
    const formulario = new GenerarFormulario();

    e.preventDefault();
  });
