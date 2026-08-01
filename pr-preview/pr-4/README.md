# Bingo Musical Valdemoro del Rey

Aplicación web para presentar y sortear el Bingo Musical de Valdemoro del Rey. Funciona completamente en el navegador, sin servidor ni backend.

## URL del juego

🎵 **https://maxgarsaiz.github.io/vdr-bingo-musical/**

---

## Características

### Selector de versión de catálogo
- Un desplegable en la cabecera detecta automáticamente qué archivos `bingo_musical_vdr_v1.json` … `v20.json` existen en la carpeta (comprobándolos uno a uno) y permite elegir cuál cargar.
- La versión elegida se recuerda entre sesiones (`localStorage`).
- Cambiar de versión con una partida en curso pide confirmación, ya que reinicia el sorteo.

### Servicio de reproducción preferido
- Un desplegable en la cabecera permite elegir qué servicio se intenta primero al reproducir cada canción: Apple Music, YouTube o Spotify (en ese orden por defecto).
- Afecta a qué enlace se abre automáticamente al sacar bola, qué reproductor se muestra por defecto, y el orden de los iconos de servicio en las listas y el panel de filtro.
- Si la canción concreta no tiene enlace al servicio preferido, cae automáticamente al siguiente disponible en el orden — nunca se queda sin reproducir nada.
- La preferencia se recuerda entre sesiones (`localStorage`).

### Sorteo
- Saca bolas una a una (botón o tecla **Espacio**, con un pequeño margen de seguridad para evitar dobles pulsaciones accidentales).
- **Bola fija** (`fixedBall`): una canción puede reservar siempre una posición concreta (p. ej. el pasodoble del pueblo en la bola 24).
- **Garantía de sorteo** (`guaranteedBy`): una canción se sortea aleatoriamente pero, si para la bola N todavía no ha salido, se fuerza en ese momento.
- **Modo equilibrado**: alterna entre categorías de público (jóvenes / mayores / bisagra / todas-edades) en lugar de puro azar.
- **Filtro por categoría fija**: además del modo equilibrado, se puede restringir el sorteo a una sola categoría ("Solo jóvenes", "Solo mayores", "Solo bisagra"). Es mutuamente excluyente con el modo equilibrado y entre sí. Si se agotan las canciones de la categoría elegida, avisa y pasa a sorteo libre.
- Contador de bolas salidas y pendientes. El estado de la sesión se guarda en `localStorage` (ligado a la versión de catálogo cargada) y se restaura al recargar la página.

### Reproductor embebido
- Al sacar cada bola se muestra un reproductor embebido con la canción, según el servicio preferido configurado (o el siguiente disponible).
- También puede abrirse en una pestaña lateral con reproducción automática.
- Si "Abrir enlace al sacar bola" está activo, el reproductor embebido se desactiva automáticamente (muestra un aviso en su lugar) para evitar que la canción suene dos veces a la vez, una en la pestaña lateral y otra en el reproductor embebido. Al desmarcar esa opción, el reproductor embebido vuelve a activarse al instante.
- El reproductor puede ocultarse desde los controles del encabezado.
- Cada canción, tanto en las listas de "ya salieron"/"pendientes" como en el panel de filtro, muestra iconos compactos con enlace directo a cada servicio disponible.

### Filtro y editor de canciones
- Panel plegable para activar o desactivar canciones del catálogo antes de empezar, y para **añadir, editar o eliminar canciones directamente desde la interfaz**, sin tocar el JSON a mano.
- **Añadir canción**: botón "+ Añadir canción" que abre un formulario con título, artista, álbum, género, década, etiquetas de público y las URLs de Apple Music/YouTube/Spotify. Al pegar cada URL, la app reconoce automáticamente el ID de la canción a partir de la propia dirección (sin necesidad de buscarlo ni copiarlo aparte); si el patrón de la URL no corresponde a ese servicio, avisa del error.
- **Editar canción**: icono de lápiz (✏️) en cada fila del panel de filtro, que abre el mismo formulario ya relleno con los datos actuales.
- **Eliminar canción**: icono de papelera (🗑️) en cada fila (no disponible para la canción con bola fija, que no se puede borrar desde aquí), con confirmación previa.
- Las bolas se renumeran automáticamente del 1 al total de canciones activas (sin huecos).
- La canción con `fixedBall` tiene un candado 🔒, no puede desactivarse ni eliminarse desde el panel.
- **Aviso de tamaño habitual**: si el número de canciones activas no son 89 (+ el pasodoble = 90, el tamaño de un bingo tradicional de cartones comerciales), se muestra un aviso indicando cuántas faltan o sobran, pidiendo confirmación antes de continuar.
- El filtro elegido se recuerda entre recargas de página (por título+artista de cada canción, no por posición, así que sobrevive aunque cambie el orden del catálogo).
- Se puede descargar el catálogo (con los cambios del filtro y del editor ya aplicados) como JSON para compartirlo entre el dispositivo de sorteo y el de generación de cartones — el campo `version` del archivo descargado se ajusta automáticamente a la versión de catálogo que estuviera cargada, en vez de quedar fijo.
- **Bloqueo de partida**: en cuanto sale la primera bola, tanto el panel de filtro/editor como el generador de cartones (y el selector de versión) se bloquean visualmente, con el aviso "— reinicia la partida para modificar". Así se evita cambiar el catálogo o la versión a mitad de sorteo y que los cartones ya impresos dejen de cuadrar con la numeración.

### Generador de cartones (PDF)
- Genera un PDF en A4 con 2 cartones por página y 4×2 casillas por cartón.
- Las bolas fijas aparecen siempre en todos los cartones.
- Configurable entre 2 y 100 cartones.
- Cada cartón lleva impresa, en una esquina, una etiqueta pequeña con la versión de catálogo usada y el número de bolas (p. ej. "Lista v7 · 90 bolas", o "Lista v7 · 89/97 bolas (filtrada)" si hay un filtro aplicado). Sirve para comprobar de un vistazo, en el papel, que los cartones y el sorteo están usando exactamente el mismo catálogo.

### Validador de boletos
- Modal para introducir los 8 números de un cartón y verificar si ha ganado según las bolas ya salidas.
- Admite pegar los números separados por comas en el primer campo.
- Cada casilla se colorea en tiempo real mientras se escribe: roja si el valor no es válido, verde si esa bola ya ha salido, roja si aún está pendiente — sin esperar a pulsar "Validar".

---

## Catálogo (`bingo_musical_vdr_vN.json`)

El nombre de archivo incluye el número de versión (`v1`, `v2`, `v3`…), y la app los detecta automáticamente. El esquema interno es compatible desde la versión 2 en adelante. Cada pista incluye:

| Campo | Descripción |
|---|---|
| `title`, `artist`, `album` | Metadatos de la canción |
| `isrc` | Código ISRC internacional |
| `genre`, `decade` | Género musical y década |
| `tags` | Categorías de público: `jovenes`, `mayores`, `bisagra`, `todas-edades` |
| `links` | Objeto con entradas para `applemusic`, `spotify` y/o `youtube` (cada una con `id` y `url`) |
| `active` | `true`/`false` — si la canción entra en juego |
| `fixedBall` | Número de bola reservado para esta canción |
| `guaranteedBy` | Bola límite a partir de la cual se fuerza si aún no ha salido |

### Ejemplo de pista

```json
{
  "id": "t001",
  "title": "LAS BABYS",
  "artist": "Aitana",
  "genre": "pop urbano",
  "decade": "2020s",
  "tags": ["jovenes"],
  "links": {
    "applemusic": { "id": "1690003453", "url": "https://music.apple.com/es/song/1690003453" }
  },
  "active": true
}
```

---

## Uso local

Basta con servir la carpeta con cualquier servidor HTTP estático, por ejemplo:

```bash
npx serve .
# o bien
python3 -m http.server
```

No hay dependencias npm. El único recurso externo es la librería [jsPDF](https://github.com/parallax/jsPDF) cargada desde CDN para la generación del PDF.
