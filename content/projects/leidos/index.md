---
title: 'Leidos - BookMarket'
date: '2025-07-01'
location: 'Posadas, Misiones, Argentina'
coordinates: [-27.3671, -55.8961]
description: 'Marketplace de compra y venta de libros usados con sistema de sucursales de retiro, billetera virtual integrada y pagos online.'
type: 'e-commerce'
tags: ['marketplace', 'e-commerce', 'libros', 'economía circular', 'sucursales', 'billetera', 'mercadopago', 'cultura']
authors:
  - name: 'Mistec Capital'
    role: 'Desarrollo Full Stack'
status: 'en desarrollo'
featured: true
---

## Descripción General

Leidos es un marketplace de compra y venta de libros usados que combina la comodidad del comercio electrónico con la confianza de las librerías físicas. Los vendedores publican sus libros y los compradores los reservan online para retirarlos en una de las sucursales del sistema, que verifican el estado de cada ejemplar antes de la entrega. La plataforma incorpora una billetera virtual con saldo bloqueado y disponible, pagos integrados por MercadoPago y un panel administrativo completo para librerías y administradores.

## Funcionalidades para Compradores

- Búsqueda avanzada por título, autor, género y precio
- Reserva en sucursales cercanas
- Pagos integrados: MercadoPago, billetera virtual y efectivo
- Seguimiento de órdenes en tiempo real
- Notificaciones de estado de órdenes
- Carrito de compras y proceso de checkout
- Código único de retiro

## Funcionalidades para Vendedores

- Publicación de libros con fotos y descripción
- Gestión de stock por sucursal
- Panel de ventas con historial completo
- Confirmación de órdenes y retiros
- Perfil público de vendedor
- Notificación automática de ventas

## Sistema de Sucursales

- Sucursales físicas configurables como puntos de retiro
- Verificación de estado de los libros antes de la entrega
- Validación de códigos de retiro
- Inventario distribuido por sucursal
- Geolocalización para sucursales cercanas

## Detalles Técnicos

- SvelteKit 2 + Svelte 5 con Runes en frontend
- TypeScript end-to-end
- Tailwind CSS 4 + DaisyUI
- PostgreSQL 18 + PostGIS para geoespacial
- MikroORM 6 para acceso a datos
- Minio (S3-compatible) para storage de imágenes
- Graphile Worker para background jobs
- MercadoPago SDK para pagos online
- Notificaciones push en tiempo real

## Impacto Social y Cultural

Leidos democratiza el acceso a libros usados y devuelve protagonismo a las librerías físicas:

- **Democratiza** el acceso a la cultura con precios accesibles
- **Fortalece** librerías independientes con un nuevo canal digital
- **Fomenta** la economía circular y la segunda vida de los libros
- **Reduce** el desperdicio cultural y ambiental
- **Conecta** a la comunidad lectora con sucursales locales
