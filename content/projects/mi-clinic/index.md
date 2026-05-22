---
title: 'MiClinica - Historia Clínica y Presupuestos'
date: '2026-05-01'
location: 'Posadas, Argentina'
coordinates: [-27.3621, -55.9007]
description: 'Software modular instalable en clínicas y consultorios: historia clínica electrónica, diagnóstico auxológico pediátrico y presupuestador con exportación PDF. Reimplementación moderna y multiusuario de los sistemas REP y DAx.'
type: 'salud'
tags: ['salud', 'pediatría', 'historia clínica', 'presupuestos', 'auxología', 'on-premise', 'instalable']
featured: true
authors:
  - name: 'Mistec Capital'
    role: 'Desarrollo Full Stack'
---

## Descripción

MiClinica es un software modular instalable on-premise en clínicas y consultorios. Unifica historia clínica electrónica, diagnóstico auxológico pediátrico y presupuestador en una sola aplicación multiusuario que corre dentro de la red de la clínica.

Reimplementa los sistemas legacy REP y DAx en una arquitectura web moderna.

## Módulos

### Historia Clínica

Gestión de pacientes, profesionales y consultas. Antecedentes, motivos, enfermedad actual, diagnóstico CIE-10, estudios complementarios con adjuntos, tratamientos con vademécum (+13.000 productos) e interconsultas.

### Examen Físico

Signos vitales y antropometría con cálculo automático de percentiles y puntajes Z según OMS. Peso, talla, IMC y perímetro cefálico, con corrección de prematuridad.

### Diagnóstico Auxológico (DAx)

Seguimiento longitudinal del crecimiento. Cálculos de Talla Media Familiar, Índice Ponderal, McLaren, Velocidad de Talla (Tanner-Whitehouse), Predicción de Talla Adulta y Objetivo Parental. Soporte para referencias OMS, NCHS, SAP, CLAP, Sardá y Fundacredesa.

### Gráficos de Crecimiento

11 curvas interactivas (Peso/Edad, Talla/Edad, BMI, CLAP, Sardá, Velocidad de Talla, etc.) con el punto del paciente sobre percentiles. Exportables como imagen o impresión.

### Presupuestos

Módulo central del sistema. Generación rápida de presupuestos a partir de prácticas precargadas, asociados a pacientes y exportables en PDF.

- CRUD de prácticas/productos con código, precio y estado
- Ítems con cantidad, precio, observaciones y ubicación odontológica (pieza, cara, sector)
- Descuentos porcentuales o fijos
- Exportación PDF con logo, datos de la clínica y firma
- Historial por paciente con búsqueda, filtros, duplicación y edición de borradores

### Reportes y Exportación

Reportes PDF de consultas, examen físico e interconsultas filtrables por fecha. Grillas exportables en CSV/TXT con datos neonatales y de controles.

### Configuración

Personalización por clínica: vademécum, diagnósticos personalizados, referencias alternativas al CIE-10, datos comerciales y branding del PDF.

## Diferenciales

- Modular: cada clínica activa los módulos que necesita
- Instalación on-premise: datos y backups dentro de la clínica
- Multiusuario y colaborativo dentro de la red local
- Cálculos auxológicos automáticos según estándares internacionales
- Presupuestador integrado a la historia clínica del paciente
