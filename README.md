# App V2 (con grupos manuales y fixture editable)

Versión mejorada del sistema, con lo necesario para las categorías 2018 y 2019
que no llegaron a los 12 equipos. Usa el mismo Firebase que la app de hoy
(`firebase-config.js` sin tocar), así que va a mostrar automáticamente todos los
equipos, publicidades y resultados ya cargados — no hay que migrar nada.

## Qué cambia respecto a la app original

- **Categorías 2015/2016/2017 (12 equipos, 3 grupos):** funcionan exactamente
  igual que antes. No se tocó ese comportamiento.

- **Categoría 2018 (8 equipos, 2 grupos de 4):** nuevo botón
  **"📋 Cargar Grupos Manualmente"** en la pestaña Fixture (solo visible como
  admin). Ahí cargás a mano, equipo por equipo, en qué grupo quedó cada uno
  según el sorteo ya transmitido — **no usa ningún número aleatorio**, es 100%
  determinístico según lo que cargues. Con eso arma el fixture de grupos
  automáticamente.
  - Si por error alguien toca "🎲 Re-Sortear Grupos" con grupos ya cargados a
    mano, ese botón queda oculto para categorías cargadas manualmente,
    precisamente para que no se pueda alterar el sorteo ya informado.
  - Fase final: pasan los 8 equipos. El 1° de cada grupo cruza con el 4° del
    otro grupo, y el 2° con el 3° del otro grupo (ganadores → semis de Copa de
    Oro, perdedores → semis de Copa de Plata, igual que en las demás
    categorías).

- **Categoría 2019 (4 equipos, todos contra todos):** en el modal de "Editar
  Partido" ahora podés cambiar qué equipo es Local y cuál es Visitante en cada
  fecha ya generada (antes solo se podía cambiar resultado/día/hora/cancha).
  Así ajustás el fixture automático para que coincida exactamente con el que
  ya fue comunicado a los equipos, sin tocar fechas/horarios/canchas.

- **Días y horarios de los cruces (Cuartos, Semis, Finales, 3er Puesto):**
  en cada tarjeta de cruce/semi/final, el botón de edición ahora tiene dos
  acciones separadas:
  - **"📅 Guardar Solo Día/Horario"**: cambia el día, horario y cancha del
    cruce sin tocar el resultado ni definir un ganador. Usalo para fijar o
    corregir el horario ya informado antes de que se juegue el partido.
  - **"Guardar Resultado y Clasificar"**: además de guardar día/horario/cancha,
    carga el resultado y define quién avanza (igual que antes).

- **Corrección de bug (Copa de Plata):** en el código original, cuando ganaba
  el equipo Visitante en un cruce, el "perdedor" se guardaba mal (quedaba
  registrado el mismo equipo como ganador y perdedor a la vez), lo que rompía
  el armado automático de la Copa de Plata en esos casos. Ya está corregido.

- **🔒 Protección contra pérdida de resultados reales (importante):** en el
  código original, los botones "🔄 Cambiar de Modalidad" y "🎲 Re-Sortear
  Grupos" regeneraban el fixture completo **sin avisar**, incluso en
  categorías con partidos en vivo o finalizados ya cargados. Ahora, cualquier
  acción que pueda reemplazar el fixture (cambiar de modalidad, re-sortear al
  azar, o cargar grupos manualmente) primero revisa si hay resultados reales
  cargados y, si los hay, te muestra una advertencia y pide confirmación
  explícita antes de continuar. Si cancelás, no se toca nada.


## Cómo usarla

1. Entrá como admin (mismo PIN de siempre).
2. Andá a la categoría 2018 → pestaña Fixture → "📋 Cargar Grupos Manualmente"
   → completá Grupo A y Grupo B con los equipos reales del sorteo → Guardar.
3. Andá a la categoría 2019 → si no está en modo "Tabla General Única",
   cambiala con el botón correspondiente → entrá a cada partido con
   "✏️ Editar Resultado" → ajustá Local/Visitante según el fixture ya
   comunicado → Guardar.
4. Revisá la pestaña de Posiciones y Cruces de ambas categorías para
   confirmar que todo quedó como se informó públicamente.

## Cómo publicarla como sitio separado (ejemplo con GitHub Pages)

1. Creá un nuevo repositorio en GitHub, por ejemplo `campeonato-futbol-v2`.
2. Subí todos los archivos de esta carpeta a ese repo.
3. Settings → Pages → Source: rama `main`, carpeta `/root`.
4. Probá todo en la URL nueva antes de decidir si reemplazás la actual.

## Antes de tocar nada en esta versión

Hacé el backup de datos de Firebase (2 minutos): Firebase Console → proyecto
`torneo-comunicaciones` → Realtime Database → menú (⋮) junto a
`comu_torneo_state` → **Exportar JSON**. Así, pase lo que pase, tenés forma de
restaurar los datos tal como están hoy.
