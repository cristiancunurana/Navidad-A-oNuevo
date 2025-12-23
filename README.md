# 🎄 Árbol de Recuerdos 2024

Una página web interactiva y emotiva que representa la Navidad como cierre de un año vivido. Cada bolita del árbol contiene una foto que representa un mes del año 2024.

## 📖 Descripción

Este proyecto es una experiencia web estática, elegante y simple, diseñada para compartir recuerdos del año de una manera especial y navideña. No es un proyecto infantil, sino una representación emotiva del paso del tiempo y los momentos vividos.

### Características principales:

- **Árbol de Navidad estilizado** con 12 bolitas interactivas (una por cada mes)
- **Dos contadores funcionales**:
  - Cuenta regresiva hasta Navidad (25 de diciembre)
  - Días vividos en el año actual
- **Modal interactivo** para ver las fotos en grande
- **Audio ambiental** navideño (se activa al iniciar la experiencia)
- **Diseño responsive** que se adapta a diferentes dispositivos
- **Animaciones suaves** y elegantes

## 🚀 Cómo usar

### Opción 1: Abrir localmente

1. Descarga todos los archivos del proyecto
2. Asegúrate de mantener la estructura de carpetas
3. Coloca tus fotos (12 imágenes) en `assets/img/` con los nombres:
   - `recuerdo1.jpg` (Enero)
   - `recuerdo2.jpg` (Febrero)
   - ... hasta `recuerdo12.jpg` (Diciembre)
4. (Opcional) Agrega un archivo de audio navideño en `assets/audio/ambient.mp3`
5. Abre `index.html` en tu navegador

### Opción 2: Desplegar en GitHub Pages (GRATIS)

1. **Crea un repositorio en GitHub**:
   - Ve a GitHub.com y crea un nuevo repositorio
   - Nómbralo como quieras (ej: `arbol-navidad-2024`)
   - Marca como público o privado según prefieras

2. **Sube los archivos**:
   - Sube todos los archivos del proyecto manteniendo la estructura de carpetas
   - Asegúrate de incluir tus 12 fotos en `assets/img/`

3. **Activa GitHub Pages**:
   - Ve a la pestaña **Settings** del repositorio
   - En el menú lateral, busca **Pages**
   - En "Source", selecciona la rama `main` o `master`
   - Selecciona la carpeta `/ (root)`
   - Haz clic en **Save**

4. **Accede a tu página**:
   - GitHub te dará una URL como: `https://tu-usuario.github.io/arbol-navidad-2024/`
   - Espera 1-2 minutos para que se publique
   - ¡Comparte el link con quien quieras!

## 📁 Estructura del proyecto

```
/
├── index.html              # Página principal
├── css/
│   └── style.css          # Todos los estilos
├── js/
│   └── main.js            # Toda la lógica interactiva
├── assets/
│   ├── img/
│   │   ├── recuerdo1.jpg  # Foto de enero
│   │   ├── recuerdo2.jpg  # Foto de febrero
│   │   └── ...            # (hasta recuerdo12.jpg)
│   └── audio/
│       └── ambient.mp3    # Audio ambiental (opcional)
└── README.md              # Este archivo
```

## 🎨 Personalización

### Cambiar colores:
Edita `css/style.css` y busca los colores principales:
- `#8B0000` y `#B22222` - Rojo navideño del fondo
- `#FFD700` - Dorado para detalles
- `#228B22` - Verde del árbol

### Cambiar mensajes:
Edita `index.html` para modificar:
- El texto de bienvenida
- El mensaje cuando llega la Navidad
- Los títulos de los contadores

### Ajustar audio:
En `js/main.js`, línea con `ambientAudio.volume`, cambia el valor (0.0 - 1.0)

## 🛠️ Tecnologías utilizadas

- **HTML5** - Estructura
- **CSS3** - Diseño y animaciones
- **JavaScript (Vanilla)** - Lógica e interactividad
- **Sin frameworks** - 100% código nativo
- **Sin backend** - Completamente estático
- **Sin base de datos** - Todo en el frontend

## 📝 Notas importantes

- Este proyecto **no requiere servidor**, funciona abriendo el archivo HTML directamente
- **No guarda datos** - es una experiencia de solo lectura
- Las fotos deben estar en formato `.jpg` o `.png`
- El audio es opcional - si no agregas el archivo `ambient.mp3`, simplemente no sonará
- Es **completamente gratuito** desplegarlo en GitHub Pages

## 💝 Propósito

Este proyecto fue creado para ser una forma emotiva y elegante de cerrar el año, recordando los momentos vividos mes a mes. Es perfecto para compartir con seres queridos como un regalo digital especial.

---

**Hecho con ❤️ y nostalgia navideña**