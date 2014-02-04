window.ngGraphite = {};
window.ngGraphite.i18n = {};

var ngGraphiteProviders = angular.module('ngGraphite.providers', []);
//var ngGraphiteServices = angular.module('ngGraphite.services', []);
//var ngGraphiteDirectives = angular.module('ngGraphite.directives', []);
//var ngGraphiteFilters = angular.module('ngGraphite.filters', []);

angular.module('ngGraphite', ['ngGraphite.providers', 'ngGraphite.services', 'ngGraphite.directives', 'ngGraphite.filters']);
