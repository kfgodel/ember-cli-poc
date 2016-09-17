import Ember from "ember";

/**
 * Esta clase permite convertir la respuesta de un request del formato json (objeto JS) a un objeto ember
 * que es bindeable y colabora bien con otros objetos del framework.
 *
 * Este objeto recibe una clase ember en su creación de la cual creara una instancia por objeto json recibido.
 * Permite obtener un promise, a partir de otro, que transformara la respuesta al ser recibida
 */
export default Ember.Object.extend({
  /**
   * Clase utilizada para instancer la version emberizada de cada objeto
   */
  claseEmber: Ember.Object,

  /**
   * Crea una version "emberizada" del objeto pasado. Utilizando el tipo de to indicado
   * para representar a cada instancia de recurso. Este metodo se llama
   * recursivamente cuando se pasa un array
   * @param jsonResult El objeto json recibido como respuesta
   * @returns {*} La version emberizada de la respuesta
   */
  emberize: function (jsonResult) {
    if (jsonResult instanceof Array) {
      // Emberizamos cada elemento recursivamente
      return Ember.A(jsonResult)
        .map(Ember.run.bind(this, this.emberize));
    } else if (jsonResult instanceof Object) {
      // Emberizamos cada propiedad
      Ember.$.each(jsonResult, (key, value) => {
        jsonResult[key] = this.emberize(value);
      });
      // Ojo que este create (al ser anidado) usa la misma clase para todos los objetos anidados, y eso no esta bien
      // Las propiedades internas debería crearlas con un ember object comun, o usar un mapeo
      return this._claseEmber().create(jsonResult);
    }
    // In any other case use it as given
    return jsonResult;
  },
  /**
   * Devuelve un promise que se encadena con el pasado para conviertir su resultado en una version emberizada.
   * De esta manera el resultado del promise devuelto es consumible por el fwk.
   * @param promise El promise cuyo resultado se debe emberizar
   * @returns {Promise.<TResult>} Un promise con el resultado original emberizado
   */
  emberizing: function (promise) {
    return promise
      .then(Ember.run.bind(this, this.emberize));
  },

  _claseEmber(){
    return this.get('claseEmber');
  },
});