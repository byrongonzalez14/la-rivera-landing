# La Rivera - Landing Page

Una página web moderna y responsiva para La Rivera, desarrollada con Angular 18. Incluye sistema de reservas, integración con EmailJS y WhatsApp, calculadora de precios, y optimización SEO.

## Características

- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **Sistema de Reservas**: Formulario completo con validación y cálculo de precios
- **Integración EmailJS**: Envío automático de emails de reserva
- **WhatsApp Integration**: Contacto directo y envío de reservas por WhatsApp
- **SEO Optimizado**: Meta tags, structured data y optimización para motores de búsqueda
- **Calculadora de Precios**: Cálculo automático basado en fechas y número de huéspedes
- **Galería de Espacios**: Showcase de los diferentes espacios disponibles
- **Mapa Integrado**: Ubicación con Google Maps embebido

## Tecnologías

- Angular 18 (Standalone Components)
- TypeScript
- SCSS
- EmailJS
- Google Maps
- Vercel (Deployment)

## Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Angular CLI 18+

### Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd la-rivera-landing
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura EmailJS:
   - Edita `src/app/pages/reservar/reservar.ts`
   - Reemplaza los valores en `emailjsConfig`:
     - `serviceId`: Tu Service ID de EmailJS
     - `templateId`: Tu Template ID de EmailJS  
     - `publicKey`: Tu Public Key de EmailJS

4. Configura datos de contacto:
   - Edita `src/app/config/app.config.ts`
   - Actualiza información de contacto, precios y espacios

## Desarrollo

### Servidor de desarrollo
```bash
ng serve
```
Navega a `http://localhost:4200/`

### Build de producción
```bash
ng build --configuration production
```

### Linting
```bash
ng lint
```

## Configuración de EmailJS

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de email (Gmail, Outlook, etc.)
3. Crea un template con las siguientes variables:
   - `{{to_name}}`
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{telefono}}`
   - `{{fecha_entrada}}`
   - `{{fecha_salida}}`
   - `{{huespedes}}`
   - `{{precio_total}}`
   - `{{message}}`

## Despliegue en Vercel

### Automático (Recomendado)
1. Conecta tu repositorio con Vercel
2. Vercel detectará automáticamente la configuración de Angular
3. El despliegue se realizará automáticamente

### Manual
```bash
npm install -g vercel
vercel --prod
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
