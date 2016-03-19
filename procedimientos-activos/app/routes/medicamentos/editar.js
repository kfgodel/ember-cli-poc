import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';
import MedicamentoRepositoryInjected from '../../mixins/medicamento-repository-injected';

export default Ember.Route.extend(AuthenticatedRoute, MedicamentoRepositoryInjected, {
  model: function(params){
    var medicamentoId = params.medicamento_id;

    return this.promiseWaitingFor(this.repo().getMedicamento(medicamentoId))
      .whenInterruptedAndReauthenticated(()=>{
        this.navigator().navigateToMedicamentoEdit(medicamentoId);
      });
  },
  // PRIVATE
});
