---
title: 'Mistec Store - Ecommerce Headless'
date: '2026-06-01'
location: 'Posadas, Argentina'
coordinates: [-27.3621, -55.9007]
description: 'Tienda online headless construida sobre Medusa y SvelteKit: catálogo multi-región, carrito con promociones, checkout multi-paso con envío y pago, cuentas de cliente con historial de pedidos. Backend de comercio compartido con el POS.'
type: 'ecommerce'
tags: ['ecommerce', 'headless', 'medusa', 'sveltekit', 'multi-región', 'checkout', 'carrito', 'stripe']
featured: true
authors:
  - name: 'Mistec Capital'
    role: 'Desarrollo Full Stack'
---

## Descripción

Mistec Store es una tienda online headless: un storefront desacoplado que consume la Store API de un backend de comercio Medusa. El catálogo, inventario, precios y pedidos viven en un único backend, que también alimenta el POS de mostrador, manteniendo una sola fuente de verdad para toda la operación comercial.

El frontend está construido con SvelteKit, con detección automática de país y soporte multi-región para vender en distintas monedas y zonas de envío.

## Funcionalidades

### Catálogo

- Navegación por categorías y colecciones
- Página de producto con selección de variantes (talle, color, etc.)
- Listados con precios y disponibilidad por región
- Detección automática de país y ruteo por `countryCode`

### Carrito y Promociones

- Carrito persistente con manejo de cantidades
- Aplicación de códigos de promoción y descuentos
- Cálculo de totales por región y moneda

### Checkout Multi-paso

- Datos de envío y selección de método de fulfillment
- Selección de método de pago (integración con Stripe opcional)
- Confirmación y colocación del pedido

### Cuentas de Cliente

- Registro e inicio de sesión
- Historial de pedidos y detalle de cada compra
- Gestión de direcciones
- Transferencia de pedidos entre cuentas

## Stack Técnico

- **Medusa** como backend de comercio (catálogo, inventario, carritos, pedidos, regiones)
- **SvelteKit** para el storefront, con carga de datos server-side por ruta
- **Arquitectura headless**: el frontend habla con la Store API de Medusa
- **Multi-región** con monedas y zonas de envío configurables
- **Stripe** como pasarela de pago (opcional)
- Monorepo **Turborepo** compartido con el backend y el POS

## Diferenciales

- Headless: el storefront es independiente y reemplazable sin tocar el backend
- Backend de comercio único compartido con el POS (stock, precios y pedidos unificados)
- Multi-región y multi-moneda con detección automática de país
- Catálogo con variantes y promociones nativas de Medusa
- Server-side rendering con SvelteKit para buena performance y SEO
