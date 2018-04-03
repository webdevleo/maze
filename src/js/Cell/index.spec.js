import _ from 'lodash';
import test from 'ava';
import Cell from './index';

let	cell1, cell2, cell3;

test.beforeEach(t => {
	cell1 = new Cell(0, 0);
	cell2 = new Cell(0, 0);
	cell3 = new Cell(0, 0);
});

test.afterEach(t => {
	cell1 = undefined;
	cell2 = undefined;
	cell3 = undefined;
});

test('should make bidirectional link', t => {
	cell1.link(cell2);

	t.true(cell1.links instanceof Array, 'Links should be an array');
	t.true(cell2.links instanceof Array, 'Links should be an array');

	t.is(_.size(cell1.links), 1, 'Links should contain one item');
	t.is(_.size(cell2.links), 1, 'Links should contain one item');

	t.is(_.first(cell1.links), cell2, 'First link should be equal to first linked object');
	t.is(_.first(cell2.links), cell1, 'First link should be equal to first linked object');
});

test('should make bidirectional unlink', t => {
	cell1.link(cell2);
	cell2.unlink(cell1);

	t.is(_.size(cell1.links), 0, 'Links should be an empty array');
	t.is(_.size(cell2.links), 0, 'Links should be an empty array');
});

test('should be able to link few cells', t => {
	cell1.link(cell2);
	cell1.link(cell3);

	t.is(_.size(cell1.links), 2, 'Cell1 should have 2 links');
	t.is(_.size(cell2.links), 1, 'Cell2 should have 1 link');
	t.is(_.size(cell3.links), 1, 'Cell3 should have 1 link');
});

test('should throw Error in case row or column wasn\'t provided to constructor', t => {
	t.throws(() => new Cell(), Error);
	t.throws(() => new Cell(1), Error);
	t.throws(() => new Cell(''), Error);
	t.throws(() => new Cell(NaN), Error);
	t.throws(() => new Cell(undefined), Error);
	t.throws(() => new Cell(null, 0), Error);
	t.throws(() => new Cell(1, null), Error);
	t.throws(() => new Cell(null, null), Error);
	t.throws(() => new Cell('', 2), Error);
	t.throws(() => new Cell(2, ''), Error);
});

test('should be able to check for linked objects', t => {
	t.false(cell1.isLinked(cell2), 'Cell shouldn\'t contain cell2 object');

	cell1.link(cell2);

	t.true(cell1.isLinked(cell2), 'Cell shouldn\'t contain cell2 object');
});

test('should be able to get neighbours', t => {
	t.true(cell1.neighbours instanceof Array, 'Neighbours should be an array');

	t.is(_.size(cell1.neighbours), 0, 'Neighbours length should be 0');

	cell1.north = cell2;

	t.is(_.size(cell1.neighbours), 1, 'Neighbours length should be 0');
});