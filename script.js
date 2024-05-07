
const firebaseConfig = {
  apiKey: "TUS DATOS DE TU API",
  authDomain: "TUS DATOS DE TU API",
  projectId: "TUS DATOS DE TU API",
  storageBucket: "TUS DATOS DE TU API",
  messagingSenderId: "TUS DATOS DE TU API",
  appId: "TUS DATOS DE TU API",
  measurementId: "TUS DATOS DE TU API"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

/// SIRVE PARA AGREGAR EL EVENTO DE ESCUCHA AL BOTON DEL FORMULARIO SUBMIT
document.getElementById('formulario').addEventListener('submit', async (event) => {
  event.preventDefault();

  /// VALIDAR CAMPO NOMBRE
  let entradaNombre = document.getElementById('name')
  let errorNombre = document.getElementById('nameError')

  if (entradaNombre.value.trim() === '') {
    errorNombre.textContent = 'Ingresa un nombre'
    errorNombre.classList.add('error-message')
  } else {
    errorNombre.textContent = ''
    errorNombre.classList.remove('error-message')
  }



  /// VALIDAR CAMPO CORREO
  let entradaEmail = document.getElementById('email')
  let errorEmail = document.getElementById('emailError')
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  /// PATRON DE VALIDACION BASICO

  if (!emailPattern.test(entradaEmail.value)) {
    errorEmail.textContent = 'Ingresa un email válido'
    errorEmail.classList.add('error-message')
  } else {
    errorEmail.textContent = ''
    errorEmail.classList.remove('error-message')
  }


  /// VALIDAR CAMPO CONTRASEÑA
  let entradaContrasena = document.getElementById('password')
  let errorContrasena = document.getElementById('passwordError')
  let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/; /// PATTERN 

  if (!contrasenaPattern.test(entradaContrasena.value)) {
    errorContrasena.textContent = 'La contraseña al menos debe tener 8 caracteres, números, mayúsculas - minúsculas y caracteres especiales'
    errorContrasena.classList.add('error-message')
  } else {
    errorContrasena.textContent = ''
    errorContrasena.classList.remove('error-message')
  }


  /// SI TODOS LOS DATOS SON CORRECTOS ENVIAR EL FORMULARIO

  if (!errorNombre.textContent && !errorEmail.textContent && !errorContrasena.textContent) {
    // BACKEND QUE RECIBA LA INFORMACION

    db.collection("users").add({
      nombre: entradaNombre.value,
      email: entradaEmail.value,
      password: entradaContrasena.value
    })
      .then((docRef) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos guardados correctamente',
          //text: `ID del documento: ${docRef.id}`,
          customClass: {
            container: 'my-swal', // Clase CSS personalizada para el contenedor de la alerta
          },
          width: '20rem', // Ancho máximo de la alerta
          heightAuto: false, // Desactivar ajuste automático de altura
        });

        document.getElementById('formulario').reset();
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      });
  }

})
