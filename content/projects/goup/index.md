---
title: 'GoUP - Plataforma de Movilidad y Delivery'
date: '2026-06-01'
location: 'Posadas, Argentina'
coordinates: [-27.3621, -55.9007]
description: 'Plataforma white-label de ride-hailing y delivery: apps de pasajero y conductor, panel de administración, despacho en tiempo real, ruteo, pagos con MercadoPago y precios por zona y reglas. Monorepo Nx con frontends Flutter y APIs Node.'
type: 'movilidad'
tags: ['movilidad', 'ride-hailing', 'delivery', 'flutter', 'graphql', 'tiempo real', 'mercadopago', 'geolocalización', 'white-label']
status: 'descontinuado'
featured: true
authors:
  - name: 'MisTec'
    role: 'Desarrollo Full Stack'
---

## Descripción

GoUP es una plataforma de movilidad y delivery tipo ride-hailing desplegada sobre una base white-label. Conecta pasajeros y conductores en tiempo real, calcula tarifas y rutas, gestiona pagos y permite a un administrador controlar precios, zonas y operaciones sin tocar código.

El sistema se organiza en un ecosistema multi-rol con interfaces dedicadas para pasajero, conductor y administración, sobre un backend compartido en monorepo.

## Aplicaciones

### App de Pasajero

Solicitud de viajes con estimación de tarifa y tiempo de llegada antes de confirmar, seguimiento en vivo del conductor, chat in-app, métodos de pago (efectivo, billetera y MercadoPago), códigos promocionales y valoraciones al finalizar el viaje.

### App de Conductor

Recepción de ofertas de viaje en tiempo real, navegación y ruteo optimizado, estado de disponibilidad, historial de viajes y ganancias, y gestión de billetera. Optimizada para uso en movimiento.

### Panel de Administración

Control total de la operación: usuarios, conductores, viajes, zonas y configuración. Personalización sin código de marca, estructura de tarifas y áreas de servicio con geocercas.

## Funcionalidades

### Tiempo Real y Despacho

- Seguimiento en vivo vía WebSocket para conductores y pasajeros
- Estimación automática de tarifa y ETA previa a la confirmación
- Modelo de despacho por broadcast a conductores disponibles
- Geocercas para configuración y disponibilidad por zona
- Ruteo y optimización de recorrido (OSRM)

### Pricing por Reglas

Cada "servicio" (Económico, Confort, XL, etc.) define qué tipos de viaje cubre, en qué regiones aplica y cómo se calcula el precio. Multiplicadores configurables y acumulables:

- Por hora del día (rangos horarios)
- Por distancia (tramos de metros)
- Por día de la semana
- Por rango de fechas (ej. feriados)
- Multiplicador por flota/zona de origen

Precios previsibles y configurables, definidos por reglas fijas (sin surge pricing reactivo).

### Pagos y Promociones

- Efectivo, billetera y tarjeta
- Integración con MercadoPago para recarga de billetera (top-up vía Checkout API)
- Códigos promocionales y gift cards

### Comunicación

- Chat in-app entre conductor y pasajero
- Notificaciones push de estado de viaje, pagos y novedades
- OTP por SMS (AWS)

## Stack Técnico

- **Monorepo Nx** con frontends y APIs en un solo repositorio
- **Flutter** para las apps de pasajero, conductor y panel de administración (web/móvil)
- **APIs Node.js** separadas por rol (rider, driver, admin) y servicio de pasarelas de pago
- **GraphQL** como capa de API
- **OSRM** para ruteo y cálculo de distancias
- **Firebase** para notificaciones, **AWS** para SMS
- **Docker** para despliegue del backend

## Diferenciales

- White-label: marca, colores, nombres de app y tarifas configurables sin código
- Multi-rol con apps nativas independientes sobre un backend unificado
- Tiempo real de punta a punta (despacho, tracking y chat)
- Pricing flexible por reglas (hora, distancia, día, fecha y zona)
- Pagos locales integrados con MercadoPago
