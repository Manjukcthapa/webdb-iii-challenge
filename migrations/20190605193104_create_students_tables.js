
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(students) {
        students.increments();
        students.string('name').notNullable();
        students
            .integer('cohorts_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('cohorts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students')
};
