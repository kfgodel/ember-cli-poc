import Ember from 'ember';
import DS from 'ember-data';

// This serializers avoid the annoyance of jsonapi (default serializer), forcing the backend to root responses
export default DS.JSONSerializer.extend({
});
