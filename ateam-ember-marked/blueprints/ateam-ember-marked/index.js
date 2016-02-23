module.exports = {
  description: '',

  /**
   * Needed to avoid error: "The `ember generate <entity-name>` command requires an entity name to be specified."
   */
  normalizeEntityName: function(entityName) {},

  afterInstall: function(options) {
    // Make host app bower.json depend on marked
    return this.addBowerPackageToProject('marked');
  }
};
