import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categoryLabel, isInDevelopment, yearOf } from '../src/lib/utils/categories.js';

test('categoryLabel traduce los tipos de las fichas', () => {
	assert.equal(categoryLabel('gobierno-digital'), 'Gobierno digital');
	assert.equal(categoryLabel('saas'), 'SaaS');
	assert.equal(categoryLabel('e-commerce'), 'E-commerce');
	assert.equal(categoryLabel('ecommerce'), 'E-commerce');
	assert.equal(categoryLabel('punto de venta'), 'Punto de venta');
	assert.equal(categoryLabel('todos'), 'Todos');
});

test('categoryLabel devuelve el tipo crudo si no lo conoce y "Proyecto" si está vacío', () => {
	assert.equal(categoryLabel('blockchain'), 'blockchain');
	assert.equal(categoryLabel(''), 'Proyecto');
	assert.equal(categoryLabel(undefined), 'Proyecto');
});

test('isInDevelopment detecta "desarrollo" sin importar mayúsculas', () => {
	assert.equal(isInDevelopment('en desarrollo'), true);
	assert.equal(isInDevelopment('En Desarrollo'), true);
	assert.equal(isInDevelopment('entregado'), false);
	assert.equal(isInDevelopment(undefined), false);
});

test('yearOf extrae el año de una fecha ISO', () => {
	assert.equal(yearOf('2025-09-01'), '2025');
	assert.equal(yearOf(undefined), '');
});
