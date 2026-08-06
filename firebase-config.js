/* ==========================================================================
   CONFIGURACIÓN DE SINCRONIZACIÓN EN TIEMPO REAL (Firebase Realtime Database)
   ==========================================================================

   Este archivo conecta la app a una base de datos gratuita de Google (Firebase)
   para que, cuando el administrador actualice un resultado, horario o sponsor,
   TODOS los usuarios que tengan la app abierta lo vean reflejado al instante,
   sin recargar la página.

   PASOS PARA ACTIVARLO (gratis, 5 minutos, no requiere tarjeta de crédito):

   1) Entra a https://console.firebase.google.com/ e inicia sesión con una
      cuenta de Google.
   2) Clic en "Agregar proyecto" (Add project). Ponle un nombre, por ejemplo
      "comu-torneo-mercedes". Podés desactivar Google Analytics, no hace falta.
   3) Dentro del proyecto, en el menú lateral izquierdo, entra a
      "Compilación" (Build) → "Realtime Database".
   4) Clic en "Crear base de datos" (Create Database). Elegí la ubicación
      más cercana (ej. us-central1) y arrancá en "modo de prueba" (test mode).
   5) En el menú lateral, entra a "Configuración del proyecto" (⚙️ ícono de
      engranaje, arriba a la izquierda) → "Configuración del proyecto".
   6) Bajá hasta "Tus apps" (Your apps) y clic en el ícono </> (Web).
      Ponle un apodo (ej. "comu-app") y clic en "Registrar app".
   7) Firebase te va a mostrar un bloque de código con un objeto
      "firebaseConfig" parecido a este:

       /* ==========================================================================
   CONFIGURACIÓN DE SINCRONIZACIÓN EN TIEMPO REAL (Firebase Realtime Database)
   Proyecto: torneo-comunicaciones
   ==========================================================================

   Este archivo conecta la app a tu base de datos de Firebase para que,
   cuando el administrador actualice un resultado, horario o sponsor,
   TODOS los usuarios que tengan la app abierta lo vean reflejado al
   instante, sin recargar la página.

   IMPORTANTE: no uses "import" acá — esta app carga Firebase con
   <script> clásicos (compat), no con módulos ES. Este archivo ya está
   en el formato correcto para eso, no hace falta tocar nada más.
   ========================================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyCt22KpsfZXQkHaxYyFEyLWxYPZ2FkRg74",
  authDomain: "torneo-comunicaciones.firebaseapp.com",
  databaseURL: "https://torneo-comunicaciones-default-rtdb.firebaseio.com",
  projectId: "torneo-comunicaciones",
  storageBucket: "torneo-comunicaciones.firebasestorage.app",
  messagingSenderId: "200377825369",
  appId: "1:200377825369:web:52343353d747100cc19948"
};

// No tocar nada debajo de esta línea.
window.COMU_FIREBASE_CONFIG = firebaseConfig;