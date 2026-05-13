---
title: 'CAPTADE - Sistema de Captación de Talento Deportivo'
date: '2025-03-01'
location: 'Posadas, Misiones, Argentina'
coordinates: [-27.3671, -55.8961]
description: 'Plataforma de evaluación educativa con tests físicos y evaluaciones psicológicas para la detección y seguimiento de talento deportivo escolar, con app offline para trabajo en campo.'
type: 'gobierno-digital'
tags: ['evaluación educativa', 'deportes', 'talento deportivo', 'gobierno', 'offline-first', 'mobile', 'PDF']
authors:
  - name: 'Mistec Capital'
    role: 'Desarrollo y arquitectura'
status: 'activo'
featured: true
---

## Descripción General

CAPTADE es un sistema de evaluación educativa que permite gestionar escuelas, estudiantes y sesiones de evaluación con dos flujos paralelos: tests físicos (mediciones de rendimiento) y evaluaciones psicológicas. Incluye roles diferenciados (admin, supervisor, evaluador) con permisos granulares, dashboards estadísticos, exportación de resultados y generación de informes en PDF. Cuenta además con una aplicación móvil offline que permite a los evaluadores tomar mediciones en campo sin conexión y sincronizar los datos al servidor cuando vuelven a tener internet.

## Funcionalidades Principales

- Gestión integral de escuelas, estudiantes y sesiones de evaluación
- Flujo de tests físicos con mediciones de rendimiento
- Flujo paralelo de evaluaciones psicológicas
- Roles diferenciados: admin, supervisor y evaluador
- Permisos granulares por institución y por sesión
- Dashboards estadísticos por escuela, zona y disciplina
- Exportación de resultados en múltiples formatos
- Generación automática de informes en PDF
- App móvil offline-first para evaluación en campo
- Sincronización automática al recuperar conectividad

## Detalles Técnicos

- Plataforma web administrativa con roles y permisos
- App móvil offline-first con persistencia local
- Motor de sincronización con resolución de conflictos
- Base de datos relacional con auditoría completa
- Generación server-side de PDFs con baremos ministeriales
- Dashboards reactivos con agregaciones en tiempo real
- API REST versionada con autenticación por roles

## Beneficios

- Evaluación integral: dimensión física y psicológica
- Trabajo en campo sin depender de conectividad
- Detección temprana de talentos deportivos a nivel provincial
- Trazabilidad institucional completa de cada evaluación
- Reducción significativa del tiempo de carga manual
- Informes listos para revisión técnica y ministerial
