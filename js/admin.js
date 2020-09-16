class GenerarFormulario {
  // Genera el Formulario al hacer click en boton generar formulario
  generarForumulario(id, nombre, descripcion) {
    const formulario = document.getElementById("formularioAgregarPelicula");
    //const elemento = document.createElement("div");
    formulario.innerHTML = `<form id="formulario8">
    <div class="form-group">
      <label for="exampleFormControlInput1">Codigo</label>
      <input value="${id}" type="codigo" class="form-control" id="Codigo" placeholder="Codigo">
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Nombre</label>
      <input value="${nombre}" type="codigo" class="form-control" id="Nombre" placeholder="Nombre">
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Descripción</label>
      <textarea class="form-control"  id="Descripcion" rows="3">${descripcion}</textarea>
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
    <button type="button" onclick="subirPelicula()" class="btn btn-secondary btn-lg">Agregar Pelicula</button>
    <button type="button" onclick="cerrarFormulario()" class="btn btn-secondary btn-lg">Cerrar</button>
  </form>`;
  }
}
//cierra el formulario al hacer click en el boton cerrar
function cerrarFormulario() {
  const cerrar = document.getElementById("formulario8");
  cerrar.remove();
}
//Sube la pelicula al local storage
function subirPelicula() {
  console.log("hola");
  const codigo = document.getElementById("Codigo").value;
  const nombre = document.getElementById("Nombre").value;
  const descripcion = document.getElementById("Descripcion").value;
  const categoria = document.getElementById("Categoria").value;
  const pelicula = new Peliculas(codigo, nombre, descripcion, categoria);
  const peliculaAAgregar = new NuevaPelicula();

  if (
    pelicula._Nombre === "" ||
    pelicula._Descripcion === "" ||
    pelicula._Codigo === ""
  ) {
    alert("Debes completar todos los campos");
  } else {
    if (localStorage.getItem("peliculas")) {
      const peliculas = JSON.parse(localStorage.getItem("peliculas"));
      console.log(peliculas);
      let acumulador = 0;
      for (var i = 0; i < peliculas.length; i++) {
        if (peliculas[i]._Codigo == pelicula._Codigo) {
          acumulador++;
        }
      }
      if (acumulador == 0) {
        peliculas.push(pelicula);
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
        peliculaAAgregar.agregarPelicula(peliculas);
      } else {
        alert("El id ya se encuentra agregado ");
        for (var i = 0; i < peliculas.length; i++) {
          if (peliculas[i]._Codigo == pelicula._Codigo) {
            document
              .getElementById(peliculas[i]._Codigo)
              .parentElement.parentElement.remove();
            peliculas.splice(i, 1);
            peliculas.push(pelicula);
            peliculaAAgregar.agregarPelicula(peliculas);
            localStorage.setItem("peliculas", JSON.stringify(peliculas));
          }
        }
      }
    } else {
      localStorage.setItem("peliculas", JSON.stringify([pelicula]));
      const peliculas = JSON.parse(localStorage.getItem("peliculas"));
      peliculaAAgregar.agregarPelicula(peliculas);
    }
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
  // Revisa el Local Storage y ante la presencia de datos genera el listado
  revisar(peliculas) {
    for (var i = 0; i < peliculas.length; i++) {
      const tabla = document.getElementById("tabla");
      const elemento = document.createElement("tr");
      elemento.innerHTML = `  <th scope="row">${peliculas[i]._Codigo}</th>
    <td>${peliculas[i]._Nombre}</td>
    <td>${peliculas[i]._Descripcion}</td>
    <td>${peliculas[i]._Categoria}</td>
    <td> <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
  </div></td>
    <td><button id="${peliculas[i]._Codigo}">Borrar
  </button>
  <button id="${peliculas[i]._Nombre}">Modificar</button>
<a><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg></a>

  </<td>
    `;
      tabla.appendChild(elemento);
      document.getElementById(peliculas[i]._Codigo).onclick = deleteMovie;
      // console.log(document.getElementById(peliculas[i]._Codigo));
      function deleteMovie(e) {
        console.log(e.target.id);

        const array = JSON.parse(localStorage.getItem("peliculas"));
        for (var i = 0; i < array.length; i++) {
          if (array[i]._Codigo === e.target.id) {
            array.splice(i, 1);
            localStorage.setItem("peliculas", JSON.stringify(array));
          }
        }
        e.target.parentElement.parentElement.remove();
      }

      document.getElementById(peliculas[i]._Nombre).onclick = changeMovie;
      function changeMovie(e) {
        const valores = e.target.parentElement.parentElement.childNodes;
        const formulario = new GenerarFormulario();
        formulario.generarForumulario(
          valores[1].textContent,
          valores[3].textContent,
          valores[5].textContent
        );
      }
    }
  }

  // Agrega peliculas al listado
  agregarPelicula(peliculas) {
    var i = peliculas.length - 1;
    const tabla = document.getElementById("tabla");
    const elemento = document.createElement("tr");
    elemento.innerHTML = `  <th scope="row">${peliculas[i]._Codigo}</th>
    <td>${peliculas[i]._Nombre}</td>
    <td>${peliculas[i]._Descripcion}</td>
    <td>${peliculas[i]._Categoria}</td>
    <td> <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
  </div> </td>
    <td><button  id="${peliculas[i]._Codigo}">Borrar
  </button>
  <button id="${peliculas[i]._Nombre}"> Modificar</button>
<a><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg></a>
  </<td>`;
    tabla.appendChild(elemento);
    document.getElementById(peliculas[i]._Codigo).onclick = deleteMovie;
    console.log(document.getElementById(peliculas[i]._Codigo));
    function deleteMovie(e) {
      console.log(e.target.id);
      const array = JSON.parse(localStorage.getItem("peliculas"));
      for (var i = 0; i < array.length; i++) {
        if (array[i]._Codigo === e.target.id) {
          array.splice(i, 1);
          localStorage.setItem("peliculas", JSON.stringify(array));
        }
      }
      e.target.parentElement.parentElement.remove();
    }
    document.getElementById(peliculas[i]._Nombre).onclick = changeMovie;

    function changeMovie(e) {
      const valores = e.target.parentElement.parentElement.childNodes;
      console.log(valores);
      const formulario = new GenerarFormulario();
      formulario.generarForumulario(
        valores[1].textContent,
        valores[3].textContent,
        valores[5].textContent
      );
    }
  }
}

const eventoAgregarPelicula = document
  .getElementById("agregarPelicula")
  .addEventListener("click", function (e) {
    console.log("hice click");
    const formulario = new GenerarFormulario();
    formulario.generarForumulario("", "", "");

    e.preventDefault();
  });

// Se activa al ingresar a la pagina
function inicio() {
  if (localStorage.getItem("peliculas")) {
    const peliculas = JSON.parse(localStorage.getItem("peliculas"));
    const iniciar = new NuevaPelicula();
    iniciar.revisar(peliculas);
  }
}
inicio();
