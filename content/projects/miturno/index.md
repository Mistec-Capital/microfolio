---
title: 'MiTurno - Sistema de Gestión de Citas'
date: '2024-09-01'
location: 'Argentina'
coordinates: [-34.6037, -58.3816]
description: 'Sistema integral de gestión de turnos y reservas genérico para múltiples negocios con agenda online, pagos integrados y notificaciones automáticas.'
type: 'software'
tags: ['turnos', 'reservas', 'agenda online', 'pagos', 'SaaS', 'automatización']
authors:
  - name: 'Mistec Capital'
    role: 'Desarrollo Full Stack'
status: 'en desarrollo'
featured: true
---

## Descripción General

MiTurno es una plataforma SaaS completa para la gestión de citas y reservas, diseñada para servir a múltiples negocios simultáneamente. Permite administrar sucursales, recursos, disponibilidades y procedimientos, con una interfaz pública para que los clientes reserven turnos en línea.

## Funcionalidades para Negocios

### Gestión Multiempresa

- Administración de múltiples negocios en una plataforma
- Configuración personalizada por negocio (zona horaria, moneda, idioma)
- Políticas de depósito y cancelación por empresa
- Sistema de roles (Admin, Business Admin, Employee)

### Gestión de Sucursales

- Múltiples sucursales por negocio
- Ubicación geográfica con mapas
- Horarios específicos por sucursal
- Configuración independiente

### Recursos y Disponibilidad

**Grupos de Recursos:**
- Organización de empleados, salas, equipos
- Asignación flexible a procedimientos
- Gestión centralizada

**Recursos Individuales:**
- Horarios de disponibilidad recurrentes
- Configuración por día de la semana
- Excepciones de disponibilidad (vacaciones, feriados)
- Bloqueos temporales

### Tipos de Procedimientos

- Creación de servicios ofrecidos
- Configuración de duración
- Estrategias de precios (fijo, por recurso, por persona)
- Políticas de depósito
- Reglas de cancelación

### Calendario de Citas

- Vista de calendario integrada
- Clasificación de citas (pasadas, actuales, próximas)
- Filtrado por sucursal
- Gestión de citas en tiempo real
- Citas recurrentes

### Panel de Integraciones

- Gestión de servicios externos
- Configuración de pagos
- APIs de terceros

## Funcionalidades para Clientes

### Interfaz Pública de Reserva

**Búsqueda y Selección:**
- Búsqueda de negocios en la plataforma
- Selección de sucursal
- Catálogo de procedimientos disponibles
- Ver disponibilidad en tiempo real

**Proceso de Reserva:**
- Flujo paso a paso intuitivo
- Selección de recursos si disponible
- Elección de fecha y hora
- Confirmación de datos

### Sistema de Pagos Integrado

- **Stripe**: Procesamiento de pagos internacional
- **MercadoPago**: Pagos para Latinoamérica
- Depósitos según políticas del negocio
- Confirmación automática tras pago exitoso
- Comprobantes digitales

### Gestión de Reservas

- Consulta de citas por ID público
- Confirmaciones por correo electrónico
- Recordatorios automatizados
- Cancelación de citas
- Historial de reservas

## Stack Tecnológico

### Backend (NestJS)

- **NestJS**: Framework modular
- **PostgreSQL**: Base de datos relacional
- **MikroORM**: ORM con migraciones
- **Passport**: Autenticación JWT
- **BullMQ**: Sistema de colas
- **React Email**: Plantillas de correo
- API RESTful con Swagger

### Frontend (SvelteKit)

- **SvelteKit 5**: Framework web moderno
- **TailwindCSS 4**: Estilos
- **DaisyUI**: Componentes UI
- **Superforms + Zod**: Formularios validados
- **Leaflet**: Mapas interactivos
- **Event Calendar**: Vista de calendario
- **Shepherd.js**: Tours guiados

## Módulos del Sistema

### Core

- `appointments`: Gestión de citas
- `availabilities`: Horarios de disponibilidad
- `availability-exceptions`: Excepciones
- `branches`: Sucursales
- `businesses`: Empresas
- `users`: Gestión de usuarios

### Servicios

- `procedure-types`: Tipos de procedimientos
- `resource-groups`: Grupos de recursos
- `resources`: Recursos individuales
- `payments`: Procesamiento de pagos
- `external`: Integraciones externas

## Características Avanzadas

### Autenticación y Seguridad

- Sistema de roles multinivel
- Autenticación JWT
- Endpoints públicos y protegidos
- Validación de datos automática

### Notificaciones Automatizadas

- Confirmaciones de citas por email
- Recordatorios programables
- Plantillas personalizables
- Procesamiento asíncrono

### Sistema de Colas

- Procesamiento en background con BullMQ
- Dashboard de monitoreo
- Gestión de trabajos asíncronos
- Reintentos automáticos

### Expiración Automática

- Citas pendientes de confirmación expiran automáticamente
- Liberación de disponibilidad
- Notificaciones de expiración

## Arquitectura

Monorepo con Nx Workspace:
- **apps/back**: API Backend (NestJS)
- **apps/web**: Frontend (SvelteKit)
- Módulos compartidos
- Build y deploy optimizados

## Casos de Uso

MiTurno es ideal para:
- Consultorios médicos y odontológicos
- Peluquerías y salones de belleza
- Centros de estética
- Gimnasios y centros deportivos
- Talleres y servicios técnicos
- Consultoría y servicios profesionales
- Cualquier negocio que maneje citas

## Impacto

La plataforma ofrece:

- **Automatización**: Gestión de turnos 24/7 sin intervención manual
- **Escalabilidad**: Múltiples negocios en una plataforma
- **Profesionalización**: Imagen moderna y digital
- **Eficiencia**: Reducción de no-shows con recordatorios
- **Pagos**: Procesamiento automático de depósitos
- **Accesibilidad**: Reserva online desde cualquier dispositivo
