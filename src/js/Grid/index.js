import _ from 'lodash';
import Cell from '../Cell';

function create(Model) {
	if (!this.size) {
		this.grid = [];

		return this;
	}

	this.grid = _.range(this.rows)
		.map(row => _.range(this.columns)
			.map(column => new Model(row, column)));

	return this;
}

function addNeighbours(cell) {
	const {row, column} = cell;

	cell.north = this.get(row - 1, column);
	cell.south = this.get(row + 1, column);
	cell.east = this.get(row, column + 1);
	cell.west = this.get(row, column - 1);
}

function configure() {
	this.eachCell(addNeighbours.bind(this));

	return this;
}

export class Grid {
	constructor(rows = 0, columns = 0, Model = Cell) {
		this.rows = rows;
		this.columns = columns;

		create.call(this, Model);
		configure.call(this);
	}

	get(row = 0, column = 0) {
		return _.result(this.grid, `[${row}][${column}]`);
	}

	getRandomCell() {
		const
			row = _.random(this.rows - 1),
			column = _.random(this.columns - 1);

		return this.get(row, column);
	}

	get size() {
		return this.rows * this.columns;
	}

	eachRow(cb) {
		_.each(this.grid, cb);

		return this;
	}

	eachCell(cb) {
		this.eachRow(row => _.each(row, cell => cb(cell, this)));

		return this;
	}

	toString() {
		const body = '   ', corner = '+';

		let str = `+${'---+'.repeat(this.columns)}\n`;

		this.eachRow(row => {
			let top = '|', bottom = '+';

			_.each(row, cell => {
				const
					east_boundary = (cell.isLinked(cell.east) ? ' ' : '|'),
					south_boundary = (cell.isLinked(cell.south) ? body : '---');

				top += (body + east_boundary);
				bottom += (south_boundary + corner);
			});

			str += `${top}\n${bottom}\n`;
		});

		return str;
	}
}

export default Grid;