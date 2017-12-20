
// steamid user 1
// steamid user 2
// date and time

exports.up = function(knex, Promise) {
	return knex.scheme.createTable('testtable', (table) => {
		table.increments();
		table.text('sid1').notNullable();
		table.text('sid2').notNullable();
		table.datetime('date').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('testtable');
};
