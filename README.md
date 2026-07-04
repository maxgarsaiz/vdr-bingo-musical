# Bingo Musical Valdemoro del Rey

Aplicación web para presentar y sortear el Bingo Musical de Valdemoro del Rey. Funciona completamente en el navegador, sin servidor ni backend.

## URL del juego

🎵 **https://maxgarsaiz.github.io/vdr-bingo-musical/**

---

## Características

### Sorteo
- Saca bolas una a una (botón o tecla **Espacio**).
- **Bola fija** (`fixedBall`): una canción puede reservar siempre una posición concreta (p. ej. el pasodoble del pueblo en la bola 24).
- **Garantía de sorteo** (`guaranteedBy`): una canción se sortea aleatoriamente pero, si para la bola N todavía no ha salido, se fuerza en ese momento.
- **Modo equilibrado**: alterna entre categorías de público (jóvenes / mayores / bisagra / todas-edades) en lugar de puro azar.
- Contador de bolas salidas y pendientes. El estado de la sesión se guarda en `localStorage` y se restaura al recargar la página.

### Reproductor embebido
- Al sacar cada bola se muestra un reproductor embebido con la canción (Apple Music, Spotify o YouTube, por orden de prioridad).
- También puede abrirse en una pestaña lateral con reproducción automática.
- El reproductor puede ocultarse desde los controles del encabezado.

### Filtro de canciones
- Panel plegable para activar o desactivar canciones del catálogo antes de empezar.
- Las bolas se renumeran automáticamente del 1 al total de canciones activas (sin huecos).
- La canción con `fixedBall` tiene un candado 🔒 y no puede desactivarse.
- Se puede descargar el catálogo filtrado como JSON para compartirlo entre el dispositivo de sorteo y el de generación de cartones.

### Generador de cartones (PDF)
- Genera un PDF en A4 con 2 cartones por página y 4×2 casillas por cartón.
- Las bolas fijas aparecen siempre en todos los cartones.
- Configurable entre 2 y 100 cartones.

### Validador de boletos
- Modal para introducir los 8 números de un cartón y verificar si ha ganado según las bolas ya salidas.
- Admite pegar los números separados por comas en el primer campo.

---

## Catálogo (`bingo_musical_vdr_v5.json`)

El catálogo usa el **esquema v5** (compatible con v2+). Cada pista incluye:

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

