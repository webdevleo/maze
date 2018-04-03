import test from 'ava';
import Grid from './index';
import Cell from '../Cell';

test('should be able to create empty grid', t => {
	t.is(new Grid().size, 0);
	t.is(new Grid(0).size, 0);
	t.is(new Grid(0, 0).size, 0);
	t.is(new Grid(1, 0).size, 0);
	t.is(new Grid(0, 1).size, 0);
	t.is(new Grid(0, 9).size, 0);
	t.is(new Grid(9, 0).size, 0);
	t.is(new Grid(0, 0).size, 0);
});

test('should be able to get object by indexes', t => {
	const grid = new Grid(1, 1);

	t.is(grid.size, 1, 'Should be with size 1');
	t.is(grid.get(1, 2), undefined, 'Should return undefined in case no cell found by provided indexes');
	t.true(grid.get() instanceof Cell, 'Should return Cell object with indexes 0,0 in case indexes wasn\'t passed');
	t.true(grid.get(0, 0) instanceof Cell, 'Should return Cell object by passed indexes');
});

test('should be able to going by each row', t => {
	const grid = new Grid(5, 4);

	let counter = 0;

	grid.eachRow(() => counter++);

	t.is(counter, 5, 'Grid should contain 5 rows');
});

test('should be able to going by each cell', t => {
	const grid = new Grid(5, 5);

	let counter = 0;

	grid.eachCell(() => counter++);

	t.is(counter, grid.size, 'Grid should contain 25 cells');
});

test('should be able to get random cell', t => {
	const grid = new Grid(5, 5);

	t.true(grid.getRandomCell() instanceof Cell, 'Should return Cell object');
});