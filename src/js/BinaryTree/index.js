import _ from 'lodash';

export class BinaryTree {
	static create(grid) {
		grid.eachCell(cell => {
			const neighbours = [cell.north, cell.east].filter(_.identity);
			cell.link(_.sample(neighbours));
		});

		return grid;
	}
}

export default BinaryTree;