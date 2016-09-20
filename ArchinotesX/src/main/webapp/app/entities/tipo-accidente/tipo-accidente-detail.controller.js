(function() {
    'use strict';

    angular
        .module('siccApp')
        .controller('TipoAccidenteDetailController', TipoAccidenteDetailController);

    TipoAccidenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'TipoAccidente'];

    function TipoAccidenteDetailController($scope, $rootScope, $stateParams, entity, TipoAccidente) {
        var vm = this;
        vm.tipoAccidente = entity;
        
        var unsubscribe = $rootScope.$on('siccApp:tipoAccidenteUpdate', function(event, result) {
            vm.tipoAccidente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();