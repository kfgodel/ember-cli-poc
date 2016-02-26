import Ember from 'ember';
import MessagerInjectedMixin from '../../../mixins/messager-injected';
import { module, test } from 'qunit';

module('Unit | Mixin | messager injected');

// Replace this with your real tests.
test('it works', function(assert) {
  var MessagerInjectedObject = Ember.Object.extend(MessagerInjectedMixin);
  var subject = MessagerInjectedObject.create();
  assert.ok(subject);
});
