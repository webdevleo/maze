import _ from 'lodash';

export class Sidewinder {
	static create(grid) {
		grid.eachRow(row => {
			let run = [];

			_.each(row, cell => {
				run.push(cell);

				const
					is_at_eastern_boundary = !cell.east,
					is_at_northern_boundary = !cell.north,
					is_tail_of_coin = _.random(1),
					should_close_out = is_at_eastern_boundary || (!is_at_northern_boundary && is_tail_of_coin);

				if (should_close_out) {
					const member = _.sample(run);
					member.link(member.north);
					run = [];
				}
				else {
					cell.link(cell.east);
				}
			});
		});

		return grid;
	}
}

export default Sidewinder;