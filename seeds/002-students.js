
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'manju', cohorts_id: '6'},
        {name: 'sanju', cohorts_id: '6'},
        {name: 'ganju', cohorts_id: '6'}
      ]);
    });
};
