---
title: 'Mistec POS - Punto de Venta para Mostrador'
date: '2026-06-01'
location: 'Posadas, Argentina'
coordinates: [-27.3621, -55.9007]
description: 'Punto de venta para mostrador adaptado a Argentina: cobro real con efectivo (con vuelto), MercadoPago Point, QR/transferencia y tarjeta por POSnet, descuentos y recargos manuales, ventas en espera, arqueo de caja y facturación electrónica AFIP. Comparte el backend Medusa con la tienda online.'
type: 'punto de venta'
tags: ['pos', 'punto de venta', 'medusa', 'sveltekit', 'mercadopago', 'afip', 'arqueo de caja', 'argentina', 'retail']
featured: true
authors:
  - name: 'Mistec Capital'
    role: 'Desarrollo Full Stack'
---

## Descripción

Mistec POS es un punto de venta para mostrador pensado para el comercio argentino. Corre sobre el mismo backend de comercio Medusa que la tienda online, de modo que catálogo, stock, precios y pedidos son una única fuente de verdad: lo que se vende en el local y lo que se vende online comparten el mismo inventario.

La interfaz está optimizada para venta rápida en caja: catálogo por categorías, carrito ágil, selección de medio de pago y emisión de comprobante.

## Funcionalidades

### Cobro Real (Argentina)

Cuatro medios de pago típicos de mostrador, con el medio usado quedando registrado en la orden de Medusa:

- **Efectivo con vuelto en vivo**: input "Paga con $", cálculo del vuelto en pantalla y botón de cobro bloqueado si el monto no alcanza
- **MercadoPago Point** (lector físico): cobro asíncrono confirmado por polling, con modal "esperando al lector" y opción de cancelar
- **QR / transferencia**: con campo opcional de referencia de comprobante
- **Tarjeta por POSnet / Lapos externo**: con número de lote/operación

### Descuentos y Recargos

Ajuste manual sobre el total de la venta, en porcentaje o en pesos, libre y sin tope, como en una caja argentina típica. El ajuste se refleja en el total de la orden, por lo que fluye consistente a caja, factura y recibo.

### Operación de Caja

- Ventas en espera (aparcar y retomar tickets)
- Arqueo de caja: registro de cada venta para apertura, cierre y control
- Login de operador/cajero
- Gestión de cliente asociado a la venta
- Comprobante de venta en pantalla

### Facturación Electrónica

Emisión de factura electrónica AFIP/ARCA con obtención de CAE, armando el total a facturar desde el total de la orden.

## Stack Técnico

- **Medusa** como backend de comercio, compartido con la tienda online
- **SvelteKit** para la interfaz del POS, hablando con la Store API de Medusa
- **Providers de pago custom** en el backend (`manual-pos`, `mp-point`) y subscriber de captura automática del pago al colocar la orden
- **MercadoPago Point** con flag de simulación para probar el flujo completo sin lector físico
- Roadmap **PWA / offline** para seguir vendiendo en efectivo sin conexión y sincronizar al volver la red
- Monorepo **Turborepo** compartido con el backend y el storefront

## Diferenciales

- Mismo backend que la tienda online: stock, precios y pedidos unificados entre local y online
- Cobro real adaptado a Argentina (efectivo, MercadoPago Point, QR, POSnet)
- Descuentos/recargos manuales que impactan caja, factura y recibo de forma consistente
- Operación de mostrador completa: ventas en espera, arqueo y login de cajero
- Facturación electrónica AFIP integrada al flujo de venta
