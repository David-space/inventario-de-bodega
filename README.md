# Almacén Norte · Panel de inventario

Dashboard administrativo para el control de inventario de una bodega: existencias por producto, movimientos de entrada/salida, proveedores activos y alertas de stock.

## Descripción del dashboard

El panel muestra de un vistazo el estado del inventario de una bodega central:

- **Tarjetas de resumen**: SKUs activos, unidades totales, valor del inventario y productos en stock crítico.
- **Gráfico de barras**: comparación de entradas vs. salidas de los últimos 7 días.
- **Tabla de existencias**: listado de productos con SKU, categoría, existencias, mínimo y estado (óptimo / bajo mínimo / crítico).
- **Proveedores activos** y **alertas recientes** de quiebres de stock.
- **Barra lateral de navegación** con acceso directo a cada sección.

## Tecnologías usadas

- **HTML5 semántico**: `<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`, `<table>`.
- **CSS Grid** para el layout principal (`grid-template-areas`: sidebar, topbar, main, footer).
- **Flexbox** para componentes internos: tarjetas, barra lateral, filas de proveedores, gráfico de barras.
- **Variables CSS (custom properties)** para colores, tipografías y radios de borde, centralizadas en `:root`.
- **Transiciones** `:hover` y `:focus-visible` en tarjetas, botones, enlaces y filas de la tabla.
- **Media queries** para tres puntos de quiebre: escritorio, tablet (≤1024px) y móvil (≤720px), donde el sidebar se convierte en menú superior colapsable.
- **JavaScript vanilla** para el menú colapsable, las pestañas de la tabla y el resaltado del enlace activo según la sección visible (`IntersectionObserver`).
- Tipografías: **Archivo** (títulos), **Inter** (texto general) e **IBM Plex Mono** (datos como SKUs y cantidades).

## Estructura del proyecto

```
├── index.html
├── styles.css
├── script.js
├── README.md
└── evidencias/
    ├── desktop.png
    ├── tablet.png
    └── mobile.png
```

## Capturas de pantalla

> Agrega aquí las capturas de escritorio, tablet y móvil dentro de la carpeta `/evidencias`, tal como se solicita en la guía de entrega. Puedes generarlas abriendo `index.html` en el navegador y usando las herramientas de desarrollador (modo responsivo) para capturar cada tamaño.

| Escritorio | Tablet | Móvil |
|---|---|---|
| `evidencias/desktop.png` | `evidencias/tablet.png` | `evidencias/mobile.png` |

## Decisiones de diseño y accesibilidad

- **Paleta**: se eligió una paleta oscura tipo "tinta marino" (`#0E1420`, `#1B2432`) con acento ámbar (`#E8A33D`), evocando el ambiente de una bodega/centro logístico en lugar de un dashboard genérico tipo SaaS.
- **Roles ARIA**: `role="navigation"` en el sidebar, `role="main"` en el contenido principal, `role="banner"` en el encabezado y `role="contentinfo"` en el pie de página. El gráfico usa `role="img"` con una descripción textual completa (`aria-label`) para personas que usan lector de pantalla.
- **Contraste**: el texto principal (`#EDF1F7`) sobre fondos oscuros cumple un contraste alto; los estados de la tabla (óptimo/bajo/crítico) combinan color y texto, nunca solo color.
- **Navegación por teclado**: todos los enlaces, botones y campos tienen un estado `:focus-visible` con contorno ámbar claramente visible.
- **Texto alternativo**: los íconos decorativos llevan `aria-hidden="true"`; los elementos informativos (avatar de usuario, badges de proveedor) tienen su texto descriptivo junto al ícono para que el lector de pantalla no dependa solo del símbolo.
- **Responsividad**: en pantallas de escritorio el sidebar es fijo; en tablet se angosta y oculta etiquetas secundarias; en móvil se convierte en un menú superior colapsable mediante un botón de hamburguesa con `aria-expanded`.
