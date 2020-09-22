class GenerarFormulario {
  // Genera el Formulario al hacer click en boton generar formulario
  generarForumulario(id, nombre, descripcion, nombreBoton) {
    const formulario = document.getElementById("formularioAgregarPelicula");
    //const elemento = document.createElement("div");
    formulario.innerHTML = `<form id="formulario8">
    <div class="form-group">
      <label for="exampleFormControlInput1" class="labelblanco">Codigo</label>
      <input value="${id}" type="codigo" class="form-control" id="Codigo" placeholder="Codigo">
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1" class="labelblanco">Nombre</label>
      <input value="${nombre}" type="codigo" class="form-control" id="Nombre" placeholder="Nombre">
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1" class="labelblanco">Descripción</label>
      <textarea class="form-control"  id="Descripcion" rows="3">${descripcion}</textarea>
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1" class="labelblanco">Imagen</label>
      <input type="codigo" class="form-control" id="Imagen" placeholder="Imagen">
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1" class="labelblanco">Categoria</label>
      <select class="form-control" id="Categoria">
        <option>Acción</option>
        <option>Comedia</option>
        <option>Drama</option>
        <option>Terror</option>
        <option>Suspenso</option>
      </select>
    </div>
    <button type="button" onclick="subirPelicula() " class="btn btn-secondary btn-lg">${nombreBoton}</button>
    <button type="button" onclick="cerrarFormulario()" class="btn btn-secondary btn-lg">Cerrar</button>
  </form>`;
  }
}
//cierra el formulario al hacer click en el boton cerrar
function cerrarFormulario() {
  const cerrar = document.getElementById("formulario8");
  cerrar.remove();
  var mostrarBoton = document.getElementById("agregarPelicula");
  mostrarBoton.style.display = "block";
}
//Sube la pelicula al local storage
function subirPelicula() {
  console.log("hola");
  const codigo = document.getElementById("Codigo").value;
  const nombre = document.getElementById("Nombre").value;
  const descripcion = document.getElementById("Descripcion").value;
  const categoria = document.getElementById("Categoria").value;
  const imagen = document.getElementById("Imagen").value;
  const pelicula = new Peliculas(
    codigo,
    nombre,
    descripcion,
    categoria,
    false,
    imagen,
    false
  );
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
    cerrarFormulario();
    var mostrarBoton = document.getElementById("agregarPelicula");
    mostrarBoton.style.display = "block";
  }
}

class Peliculas {
  constructor(
    Codigo,
    Nombre,
    Descripcion,
    Categoria,
    Destacada,
    Imagen,
    Publicada
  ) {
    this._Codigo = Codigo;
    this._Nombre = Nombre;
    this._Descripcion = Descripcion;
    this._Categoria = Categoria;
    this._Destacada = Destacada;
    this._Imagen = Imagen;
    this._Publicada = Publicada;
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
    <input type="checkbox" class="form-check-input" id="check${
      peliculas[i]._Codigo
    }">
  </div></td>
    <td><button id="${peliculas[i]._Codigo}">Borrar
  </button>
  <button id="${"n" + peliculas[i]._Codigo}">Modificar</button>
  <button id="${"d" + peliculas[i]._Codigo}"> Destacar </button>

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

      document.getElementById("n" + peliculas[i]._Codigo).onclick = changeMovie;
      function changeMovie(e) {
        const valores = e.target.parentElement.parentElement.childNodes;
        const formulario = new GenerarFormulario();
        formulario.generarForumulario(
          valores[1].textContent,
          valores[3].textContent,
          valores[5].textContent,
          "Guardar Cambios"
        );
      }
      document.getElementById(
        "d" + peliculas[i]._Codigo
      ).onclick = peliculaDestacada;
      function peliculaDestacada(e) {
        const array = JSON.parse(localStorage.getItem("peliculas"));
        for (var i = 0; i < array.length; i++) {
          if ("d" + array[i]._Codigo === e.target.id) {
            array[i]._Destacada = true;
          } else {
            array[i]._Destacada = false;
          }
        }
        localStorage.setItem("peliculas", JSON.stringify(array));
      }
      document.getElementById(
        "check" + peliculas[i]._Codigo
      ).onclick = peliculaPublicada;
      function peliculaPublicada(e) {
        console.log(
          e.target.parentElement.parentElement.parentElement.childNodes[1]
            .textContent
        );
        const array = JSON.parse(localStorage.getItem("peliculas"));
        if (e.target.checked === true) {
          const id =
            e.target.parentElement.parentElement.parentElement.childNodes[1]
              .textContent;
          for (var i = 0; i < array.length; i++) {
            if (array[i]._Codigo == id) {
              array[i]._Publicada = true;
              localStorage.setItem("peliculas", JSON.stringify(array));
            }
          }
        } else {
          const id =
            e.target.parentElement.parentElement.parentElement.childNodes[1]
              .textContent;
          for (var i = 0; i < array.length; i++) {
            if (array[i]._Codigo === id) {
              array[i]._Publicada = false;
              localStorage.setItem("peliculas", JSON.stringify(array));
            }
          }
        }
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
    <input type="checkbox" class="form-check-input" id="check${
      peliculas[i]._Codigo
    }">
  </div> </td>
    <td><button  id="${peliculas[i]._Codigo}">Borrar
  </button>
  <button id="${"n" + peliculas[i]._Codigo}"> Modificar</button>
  <button id="${"d" + peliculas[i]._Codigo}"> Destacar </button>
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
    document.getElementById("n" + peliculas[i]._Codigo).onclick = changeMovie;

    function changeMovie(e) {
      const valores = e.target.parentElement.parentElement.childNodes;
      console.log(valores);
      const formulario = new GenerarFormulario();
      formulario.generarForumulario(
        valores[1].textContent,
        valores[3].textContent,
        valores[5].textContent,
        "Guardar Cambios"
      );
    }
    document.getElementById(
      "d" + peliculas[i]._Codigo
    ).onclick = peliculaDestacada;
    function peliculaDestacada(e) {
      const array = JSON.parse(localStorage.getItem("peliculas"));
      for (var i = 0; i < array.length; i++) {
        if ("d" + array[i]._Codigo === e.target.id) {
          array[i]._Destacada = true;
        } else {
          array[i]._Destacada = false;
        }
      }
      localStorage.setItem("peliculas", JSON.stringify(array));
    }
    document.getElementById(
      "check" + peliculas[i]._Codigo
    ).onclick = peliculaPublicada;
    function peliculaPublicada(e) {
      console.log(
        e.target.parentElement.parentElement.childNodes[1].textContent
      );
      const array = JSON.parse(localStorage.getItem("peliculas"));
      if (e.target.checked === true) {
        const id =
          e.target.parentElement.parentElement.parentElement.childNodes[1]
            .textContent;
        for (var i = 0; i < array.length; i++) {
          if (array[i]._Codigo === id) {
            array[i]._Publicada = true;
            localStorage.setItem("peliculas", JSON.stringify(array));
          }
        }
      } else {
        const id =
          e.target.parentElement.parentElement.parentElement.childNodes[1]
            .textContent;
        for (var i = 0; i < array.length; i++) {
          if (array[i]._Codigo === id) {
            array[i]._Publicada = false;
            localStorage.setItem("peliculas", JSON.stringify(array));
          }
        }
      }
    }
  }
}

const eventoAgregarPelicula = document
  .getElementById("agregarPelicula")
  .addEventListener("click", function (e) {
    console.log("hice click");
    const formulario = new GenerarFormulario();
    formulario.generarForumulario("", "", "", "Agregar Pelicula");
    var ocultarBoton = document.getElementById("agregarPelicula");
    ocultarBoton.style.display = "none";
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
