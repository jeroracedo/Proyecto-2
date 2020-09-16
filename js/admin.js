class GenerarFormulario {
  // Genera el Formulario al hacer click en boton generar formulario
  generarForumulario() {
    const formulario = document.getElementById("formularioAgregarPelicula");
    //const elemento = document.createElement("div");
    formulario.innerHTML = `<form id="formulario8">
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
    <td><button href="" onclick="eliminarPelicula()" id="${peliculas[i]._Codigo}">Borrar<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>
  </button>
  <button onclick="modificarPelicula()" id="botonModificar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button>
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
    <td><button href="" onclick="eliminarPelicula()" id="${peliculas[i]._Codigo}">Borrar<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>
  </button>
  <button onclick="modificarPelicula()" id="botonModificar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></button>
<a><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg></a>
  </<td>`;
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

// Se activa al ingresar a la pagina
function inicio() {
  if (localStorage.getItem("peliculas")) {
    const peliculas = JSON.parse(localStorage.getItem("peliculas"));
    const iniciar = new NuevaPelicula();
    iniciar.revisar(peliculas);
  }
}
inicio();

/*const eliminarPelicula = document
  .getElementById("tabla")
  .addEventListener("click", function (e) {
    const array = JSON.parse(localStorage.getItem("peliculas"));
    array.splice(e, 1);

    localStorage.setItem("peliculas", JSON.stringify(array));
    console.log("funciona el botonnn");
  });



function eliminarPelicula() {
  console.log("funciona el boton");

  const cerrar = document.getElementById();
  console.log(cerrar.parentElement.parentElement.childNodes[1].textContent);
  const array = JSON.parse(localStorage.getItem("peliculas"));
  for (var i = 0; i < array.length; i++) {
    if (
      array[i]._Codigo ===
      cerrar.parentElement.parentElement.childNodes[1].textContent
    ) {
      array.splice(i, 1);
      localStorage.setItem("peliculas", JSON.stringify(array));
    }
  }
  cerrar.parentElement.parentElement.remove();
}
function modificarPelicula() {
  const formulario = new GenerarFormulario();
  formulario.generarForumulario();
  const modificar= documment.getElementById("botonModificar");
  const i = modificar.parentElement.parentElement.childNodes[1].textContent;
  const array = JSON.parse(localStorage.getItem("peliculas"));
}
*/
