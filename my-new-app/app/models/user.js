import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  login: DS.attr('string'),
  password: DS.attr('string'),
  creation: DS.attr('string'),
  modification: DS.attr('string')
});
