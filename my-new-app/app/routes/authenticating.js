import Ember from 'ember';
import Authenticatored from '../mixins/authenticatored';


export default Ember.Route.extend(Authenticatored, {
  model(){
    return this.authenticator().authenticate();
  },
});