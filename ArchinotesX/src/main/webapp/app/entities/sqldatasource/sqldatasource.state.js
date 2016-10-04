(function () {
    'use strict';
    angular
        .module('archinotesxApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', 'paginationConstants'];

    function stateConfig($stateProvider, paginationConstants) {
        $stateProvider
            .state('sqldatasource', {
                parent: 'entity',
                url: '/sqldatasource?page&sort&search&size',
                data: {
                    authorities: ['ROLE_REFERENCE_ARCHITECT'],
                    pageTitle: 'SQL Datasources'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/_components/entity-list/templates/list-base.html',
                        controller: 'SQLDatasourceController',
                        controllerAs: 'vm'
                    }
                },
                ncyBreadcrumb: {
                    skip: true
                },
                params: {
                    page: {
                        value: '1',
                        squash: true
                    },
                    sort: {
                        value: 'id,asc',
                        squash: true
                    },
                    search: null,
                    size: {
                        value: paginationConstants.itemsPerPage.toString(),
                        squash: true
                    }
                },
                resolve: {
                    pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                        return {
                            page: PaginationUtil.parsePage($stateParams.page),
                            sort: $stateParams.sort,
                            predicate: PaginationUtil.parsePredicate($stateParams.sort),
                            ascending: PaginationUtil.parseAscending($stateParams.sort),
                            search: $stateParams.search,
                            size: parseInt($stateParams.size)
                        };
                    }]
                }
            })
            .state('sqldatasource-detail', {
                parent: 'entity',
                url: '/sqldatasource/{id}',
                data: {
                    authorities: ['ROLE_REFERENCE_ARCHITECT'],
                    pageTitle: 'SQLDatasource'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/sqldatasource/sqldatasource-detail.html',
                        controller: 'SQLDatasourceDetailController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'SQLDatasource', function ($stateParams, SQLDatasource) {
                        return SQLDatasource.get({id: $stateParams.id});
                    }]
                }
            })
            .state('sqldatasource.modal', {
                parent: 'sqldatasource',
                data: {
                    authorities: ['ROLE_REFERENCE_ARCHITECT']
                },
                abstract: true,
                onEnter: ['$stateParams', '$state', '$uibModal', 'EntityModalControllerConfig', function ($stateParams, $state, $uibModal, EntityModalControllerConfig) {
                    this.modalDialog = $uibModal.open({
                        templateUrl: 'app/entities/_components/entity-modal/templates/modal-base.html',
                        controller: 'EntityModalController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'md',
                        resolve: {
                            modalControllerConfig: function () {
                                return new EntityModalControllerConfig('sqldatasource');
                            }
                        }
                    });
                    this.modalDialog.result.then(function () {
                        $state.go('sqldatasource', null, {reload: true});
                    }, function () {
                        $state.go('sqldatasource', null, {});
                    });
                }],
                onExit: function () {
                    this.modalDialog.close();
                    this.modalDialog = null;
                }
            })
            .state('sqldatasource.new', {
                parent: 'sqldatasource.modal',
                url: '/new',
                data: {
                    authorities: ['ROLE_REFERENCE_ARCHITECT']
                },
                views: {
                    'dialog-content@': {
                        templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                        controller: 'SQLDatasourceDialogController',
                        controllerAs: 'vm'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Create a SQL Datasource'
                },
                resolve: {
                    entity: ['SQLDatasource', function (SQLDatasource) {
                        return new SQLDatasource({
                            name: null,
                            host: null,
                            dbName: null,
                            username: null,
                            password: null,
                            port: null
                        });
                    }]
                }
            })
            .state('sqldatasource.edit', {
                parent: 'sqldatasource.modal',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_REFERENCE_ARCHITECT']
                },
                views: {
                    'dialog-content@': {
                        templateUrl: 'app/entities/_components/entity-dialog/templates/dialog-base.html',
                        controller: 'SQLDatasourceDialogController',
                        controllerAs: 'vm'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit a SQL Datasource'
                },
                resolve: {
                    entity: ['$stateParams', 'SQLDatasource', function ($stateParams, SQLDatasource) {
                        return SQLDatasource.get({id: $stateParams.id}).$promise;
                    }]
                }
            })
           /* .state('sqldatasource-confirmation', {
                parent: 'sqldatasource.edit',
                url: '/confirmacion',
                data: {
                    authorities: ['ROLE_REFERENCE_ARCHITECT'],
                    pageTitle: 'SQLDatasource'
                },
                views: {
                    'dialog-content@': {
                        templateUrl: 'app/entities/_components/entity-confirmation/templates/confirmation-base.html',
                        controller: 'InspeccionEntityConfirmationController',
                        controllerAs: 'vm'
                    }
                },
                ncyBreadcrumb: {
                    label: 'confirmación'
                },
                resolve: {
                    controllerConfig: ['EntityConfirmationControllerConfig', 'entity', 'SQLDatasource', function (EntityConfirmationControllerConfig, entity, SQLDatasource) {
                        return new EntityConfirmationControllerConfig({
                            entity: entity,
                            entityService: SQLDatasource,
                            entityName: 'sqldatasource'
                        });
                    }]
                }
            })*/
             .state('sqldatasource.delete', {
                parent: 'sqldatasource',
                url: '/sqldatasource-delete/{id}',
                data: {
                    authorities: ['ROLE_REFERENCE_ARCHITECT'],
                    pageTitle: 'SQL Datasources'
                },
                onEnter: ['$state', '$uibModal', 'SQLDatasource', '$stateParams', function ($state, $uibModal, SQLDatasource, $stateParams) {
                    this.modalDialog = $uibModal.open({
                        templateUrl: 'app/entities/sqldatasource/sqldatasource-delete-dialog.html',
                        controller: 'SQLDatasourceDeleteController',
                        controllerAs: 'vm',
                        backdrop: true,
                        size: 'md',
                        resolve: {
                            entity: function () {
                                return SQLDatasource.get({id: $stateParams.id}).$promise;
                            }
                        }
                    });
                    this.modalDialog.result.then(function () {
                        $state.go('sqldatasource', null, { reload: true });
                    }, function () {
                        $state.go('sqldatasource', null, {});
                    });
                }],
                onExit: function () {
                    this.modalDialog.close();
                    this.modalDialog = null;
                }
            });
    }

})();
