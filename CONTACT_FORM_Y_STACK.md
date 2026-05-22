# Formulario de Contacto (Actual) y Stack del Proyecto

## Resumen

El formulario de contacto actual está implementado como un formulario controlado en React dentro de un único componente: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx). No existe un backend real para enviar mensajes: al enviar, el mensaje se guarda en estado y se persiste en `localStorage`, y luego se renderiza en el panel de mensajes.

## Dónde está implementado

- UI del formulario y botón de envío: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L1060-L1145)
- Lógica (handlers y persistencia): [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L253-L367)
- Panel de mensajes (render de `messages`): [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L1149-L1205)

## Estado (useState) relacionado al formulario

En [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L90-L95) se definen estos estados:

- `messages: Message[]`: lista de mensajes “recibidos” (se muestra en el panel).
- `formData`: objeto con los valores del formulario `{ name, company, email, message }`.
- `formSubmitted: boolean`: controla el banner de éxito temporal.
- `formError: string`: mensaje de error a mostrar si la validación falla.

El tipo `Message` está definido en el mismo archivo: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L62-L69).

## Persistencia en localStorage

Se usa la clave:

- `recruiters_messages_v1`

Comportamiento:

- En el primer render se intenta cargar desde `localStorage`. Si existe, se parsea y se usa como fuente de verdad del panel. Si falla el parseo, se inicializa con mensajes por defecto: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L96-L109).
- Al crear/eliminar/resetear mensajes se vuelve a persistir el array completo en `localStorage`: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L253-L367).

## Flujo del envío (qué pasa al pulsar “Emitir Mensaje Auditor”)

El botón es un `type="submit"` dentro del `<form>`: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L1083-L1144). Al enviar se ejecuta `handleContactSubmit`:

1. `preventDefault()` para evitar recarga de página: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L330-L333).
2. Validación básica:
   - Requiere que `name`, `company`, `email`, `message` tengan texto (con `trim()`): [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L334-L337).
   - Valida el email de forma mínima comprobando que incluya `@`: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L339-L342).
3. Construye un objeto `newMessage`:
   - `id` basado en `Date.now()` (p. ej. `msg-...`)
   - `date` formateada como `YYYY-MM-DD HH:mm` usando `toISOString().slice(0, 16)` y reemplazo de `T`: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L345-L352).
4. Inserta el mensaje al principio del feed: `updated = [newMessage, ...messages]`, actualiza estado y persiste: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L354-L357).
5. Resetea los campos del formulario y muestra el banner de éxito por 8 segundos: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L358-L361).

## Panel de mensajes (qué se muestra y qué acciones hay)

El panel (lado derecho) renderiza `messages` y ofrece acciones:

- Lista de mensajes:
  - Si no hay mensajes: muestra un texto “Ningún mensaje…”: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L1172-L1175).
  - Si hay mensajes: itera `messages.map(...)` y pinta nombre, empresa, email, fecha y texto: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L1176-L1199).
- Eliminar un mensaje:
  - Botón con icono de papelera que llama a `deleteMessage(msg.id)`: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L1181-L1187).
  - `deleteMessage` filtra por `id` y vuelve a guardar en `localStorage`: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L363-L367).
- Resetear mensajes:
  - Botón “Resetear” que llama a `initializeDefaultMessages`: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L1160-L1166).
  - `initializeDefaultMessages` carga dos mensajes de ejemplo y persiste: [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L253-L274).

## Limitaciones actuales (útil para “mejoras”)

- No hay envío real (HTTP) a un servidor; todo es local.
- Validación de email muy superficial (solo `includes('@')`).
- No hay estados de “enviando”/“loading” ni manejo de errores de red (porque no hay red).
- El `id` basado en `Date.now()` puede colisionar en escenarios extremos (doble submit muy rápido).

## Stack del proyecto (según package.json y configuración)

### Frontend

- React 19: `react`, `react-dom` (render con `createRoot`): [main.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/main.tsx#L1-L10)
- TypeScript: configuración con `moduleResolution: bundler`, `jsx: react-jsx`: [tsconfig.json](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/tsconfig.json#L1-L25)
- Vite 6: scripts `dev/build/preview` y plugin de React: [package.json](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/package.json#L6-L14), [vite.config.ts](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/vite.config.ts#L1-L18)
- Tailwind CSS v4: integración vía `@tailwindcss/vite` y `@import "tailwindcss";`: [vite.config.ts](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/vite.config.ts#L1-L18), [index.css](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/index.css#L1-L7)
- Iconos: `lucide-react` (múltiples imports en App): [App.tsx](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/src/App.tsx#L1-L34)

### Calidad / tooling

- ESLint + TypeScript ESLint (`lint`, `lint:fix`, `typecheck`): [package.json](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/package.json#L6-L14), config inline en `eslintConfig`: [package.json](file:///d:/Downloads/portfolio-desarrollador-full-stack-junior/package.json#L42-L74)

### Dependencias instaladas pero no usadas directamente en src (a día de hoy)

En el código bajo `src/` no hay imports reales de estas librerías (solo aparecen como texto en snippets dentro del UI):

- `express`, `dotenv`
- `@google/genai`
- `motion`

Esto sugiere que el proyecto está preparado para extenderse (p. ej. agregar un backend o animaciones), pero actualmente el portfolio y el formulario funcionan como frontend puro con persistencia local.

