import _ from 'lodash';

export class Cell {
	constructor(row, column) {
		if (!_.isFinite(row) || !_.isFinite(column)) {
			throw new Error('row and column fields are required!');
		}

		this.row = row;
		this.column = column;

		this.north = null;
		this.south = null;
		this.east = null;
		this.west = null;

		this.linksMap = new Map();
	}

	link(cell, bidirectional = true) {
		if(!_.isObject(cell)){
			return this;
		}

		this.linksMap.set(cell, true);

		if (bidirectional) {
			cell.link(this, false);
		}

		return this;
	}

	unlink(cell, bidirectional = true) {
		this.linksMap.delete(cell);

		if (bidirectional) {
			cell.unlink(this, false);
		}

		return this;
	}

	isLinked(cell) {
		return this.linksMap.has(cell);
	}

	get links() {
		return [...this.linksMap.keys()];
	}

	get neighbours() {
		return _.at(this, 'north', 'south', 'east', 'west').filter(_.identity);
	}
}

export default Cell;