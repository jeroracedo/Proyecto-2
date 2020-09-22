Roles: function obtenerlistadeusuarios() {
  /*aca se puede agregar usuarios */
  listaUsuarios = [
    { permisos: 1, username: "admin", password: "admin" },
    { permisos: 2, username: "cliente", password: "1234" },
    { permisos: 2, username: "jero", password: "1234" },
  ];

  localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));

  return listaUsuarios;
}

function validarCredenciales(pUsuario, pPassword) {
  var listaUsuarios = obtenerlistadeusuarios();
  var bAcceso = false;
  var pRol = 0;

  var listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
  /*console.log(listaUsuarios[0][0].password);*/
  for (var i = 0; i < listaUsuarios[0].length; i++) {
    /*if (pUsuario == listaUsuarios[i][1] && pPassword == listaUsuarios[i][2]) {
      bAcceso = true;
    }*/
    if (
      pUsuario == listaUsuarios[0][i].username &&
      pPassword == listaUsuarios[0][i].password
    ) {
      bAcceso = true;
      /*Reviso el rol y dependiendo que tiene entra o no */
      pRol = listaUsuarios[0][i].permisos;
      switch (pRol) {
        case 0:
          // code block
          break;
        case 1:
          location.replace("admin.html");
          break;
        case 2:
          location.replace("cliente.html");
          break;
      }
    }
  }
  return bAcceso;
}
