---
title: 'MiAsistencia - Control de Asistencias y Turnos'
date: '2026-07-01'
location: 'Posadas, Argentina'
coordinates: [-27.3621, -55.9007]
description: 'Plataforma de back-office para RRHH: grilla de turnos, fichadas desde reloj biométrico o kiosco de huella digital, incidencias y reporte de horas trabajadas por sector.'
type: 'recursos-humanos'
tags: ['recursos humanos', 'asistencias', 'turnos', 'biometría', 'ZKTeco', 'huella digital', 'kiosco', 'reportes', 'auditoría']
featured: true
authors:
  - name: 'Mistec Capital'
    role: 'Desarrollo Full Stack'
---

## Descripción

MiAsistencia es una plataforma web de back-office que gestiona la asistencia del personal de una empresa a partir de relojes de control de acceso (biométricos / RFID) y kioscos de fichaje por huella digital. Los empleados son datos, no usuarios: quienes operan el sistema son RRHH, supervisores y administradores.

El ciclo completo: se definen sectores y turnos, se arma la grilla semanal de cada empleado, las fichadas llegan del reloj o del kiosco, las incidencias ajustan minutos con motivo, y el reporte cruza todo para calcular las horas trabajadas.

## Funcionalidades

### Personal y Sectores

Alta y baja de empleados identificados por legajo, organizados por sectores de la empresa. Búsqueda por nombre, documento o legajo, con filtros por sector y estado.

### Turnos y Grilla Semanal

Ventanas horarias reutilizables (Mañana, Tarde, Noche) que se asignan en una grilla semanal por empleado o en lote para todo un sector. Soporte completo de turnos nocturnos que cruzan medianoche: la salida de la madrugada se atribuye al día del turno, no al día calendario. Atajos como "copiar lunes a lun–vie" y "todo franco".

### Fichadas

Marcaciones de entrada y salida con origen trazable (reloj, kiosco o carga manual). Sincronización de fichadas desde relojes biométricos ZKTeco. Vista diaria con totales de entradas, salidas y cargas manuales, filtrable por sector y tipo.

### Kiosco de Fichaje por Huella

Pantalla de fichaje desatendida que corre en cualquier máquina de la LAN con un lector DigitalPersona U.are.U 4500. La captura ocurre en el kiosco y la comparación biométrica (SourceAFIS) en el servidor. El kiosco entra con una cuenta de servicio con un único permiso — fichar — de modo que una máquina comprometida no expone ningún dato del sistema.

### Incidencias

Ajustes manuales de minutos con signo y motivo, con alcance por empleado (permiso gremial, horas extra) o por sector completo (corte de energía, línea detenida).

### Reporte de Asistencias

Cruza la grilla contra las fichadas y las incidencias por sector, rango de fechas, turno o empleado puntual. Calcula horas trabajadas, días completos, incompletos y ausentes, y minutos ajustados. Exportable.

### Usuarios, Roles y Auditoría

Sistema de roles y permisos granulares para los operadores, con registro de auditoría de todos los cambios del sistema.

## Detalles Técnicos

- **Frontend/Backend**: SvelteKit corriendo sobre Bun
- **Base de datos**: MikroORM sobre libSQL, con migraciones y seeders
- **Fechas y horas**: API Temporal (Instant / PlainDate / PlainTime) con zona horaria de la empresa centralizada — sin aritmética manual de husos
- **Biometría**: SDK DigitalPersona para captura, matching server-side con SourceAFIS
- **Relojes de acceso**: sincronización de marcaciones con relojes biométricos ZKTeco
- **Emails transaccionales**: verificación de cuenta y recuperación de contraseña
- **Despliegue**: Docker Compose, instalable on-premise

## Diferenciales

- Modelo de dominio robusto para turnos nocturnos y cálculo de horas
- Kiosco biométrico seguro por diseño: mínimo privilegio para la máquina expuesta
- Incidencias con alcance por sector para eventos que afectan a toda una línea
- Trazabilidad completa: origen de cada fichada y auditoría de cambios
