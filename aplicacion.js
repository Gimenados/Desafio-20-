document.addEventListener("DOMContentLoaded", function () {
    // Definir la clase Usuario
    class Usuario {
        constructor(id, nombre, correo, contraseña) {
            this.id = id;
            this.nombre = nombre;
            this.correo = correo;
            this.contraseña = contraseña;
        }
    }

    // Definir la clase Formulario
    class Formulario {
        constructor(usuariosIniciales) {
            this.usuariosRegistrados = [...usuariosIniciales];
        }

        // Función base mensaje alert 
        messageAlert(message) {
            alert(message);
        }

        // Función para validar la contraseña
        validatePassword(password) {
            // Al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número
            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
            return passwordRegex.test(password);
        }

        // Validar campos obligatorios 
        validateFields(name, email, password) {
            if (name.length < 3 || email === "" || password === "") {
                this.messageAlert("Por favor, completa todos los campos. El nombre debe tener al menos 3 caracteres.");
                return false;
            }
            return true;
        }

        // Registrar usuario
        registrarUsuario(nombre, correo, contraseña) {
            const id = this.usuariosRegistrados.length + 1;
            
              // Validar la contraseña
            if (!this.validatePassword(contraseña)) {
                  this.messageAlert("La contraseña no cumple con los requisitos mínimos.");
            return;
    }
            
            const usuario = new Usuario(id, nombre, correo, contraseña);
            this.usuariosRegistrados.push(usuario);
        }

        // Obtener usuarios registrados
        getUsuariosRegistrados() {
            return this.usuariosRegistrados;
        }
    }

    // Definir la clase TablaUsuarios
    class TablaUsuarios {
        constructor(formulario) {
            this.formulario = formulario;
        }

        render() {
            const tablaBody = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];
            tablaBody.innerHTML = '';

            const usuarios = this.formulario.getUsuariosRegistrados();

            for (let i = 0; i < usuarios.length; i++) {
                const usuario = usuarios[i];
                const row = document.createElement('tr');
                const nombreCell = document.createElement('td');
                nombreCell.textContent = usuario.nombre;
                const correoCell = document.createElement('td');
                correoCell.textContent = usuario.correo;
                row.appendChild(nombreCell);
                row.appendChild(correoCell);
                tablaBody.appendChild(row);
            }
        }
    }

    const usuariosIniciales = [
        new Usuario(1, "Gimena Sande", "gimenasande1@gmail.com", "Pass1234"),
        new Usuario(2, "Micaela Sande", "sandemicaela@gmail.com", "Pass1234"),
        new Usuario(3, "Sandra Gosetti", "gosettisandra@gmail.com", "Pass1234")
    ];

    const formulario = new Formulario(usuariosIniciales);
    const tablaUsuarios = new TablaUsuarios(formulario);

    // Evento de envío del formulario
    document.getElementById("registroForm").addEventListener("submit", function (event) {
        event.preventDefault();

           // Obtener valores de los campos
      const nombre = document.getElementById("nombre").value;
      const correo = document.getElementById("correo").value;
      const contraseña = document.getElementById("contraseña").value;

        if (!formulario.validateFields(nombre, correo, contraseña)) {
            return;
        }
    
      // Registrar usuario y renderizar la tabla
      formulario.registrarUsuario(nombre, correo, contraseña);
      tablaUsuarios.render();
      formulario.messageAlert("Usuario registrado correctamente.");
      document.getElementById("registroForm").reset();
    });

    // Renderizar la tabla al cargar la página
    tablaUsuarios.render();
});
