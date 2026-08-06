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
