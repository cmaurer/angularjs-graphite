window.ngGraphite = {};
window.ngGraphite.i18n = {};

var ngGraphiteProviders = angular.module('ngGraphite.providers', []),
    ngGraphiteFactories = angular.module('ngGraphite.factories', []),
    ngGraphiteServices = angular.module('ngGraphite.services', []);
//var ngGraphiteDirectives = angular.module('ngGraphite.directives', []);
//var ngGraphiteFilters = angular.module('ngGraphite.filters', []);

angular.module('ngGraphite', ['ngGraphite.providers', 'ngGraphite.factories', 'ngGraphite.services']); //, 'ngGraphite.directives', 'ngGraphite.filters'
