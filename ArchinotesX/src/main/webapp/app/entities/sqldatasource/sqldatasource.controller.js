(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('SQLDatasourceController', SQLDatasourceController);

    SQLDatasourceController.$inject = ['$filter', 'EntityListControllerFactory', '$scope', 'pagingParams', 'SQLDatasource'];

    function SQLDatasourceController ($filter, EntityListControllerFactory, $scope, pagingParams, SQLDatasource) {
        var EntityListController=EntityListControllerFactory.create($scope, pagingParams, SQLDatasource);
        var controller=new EntityListController({
            title:"SQL Datasources",
            entityName:"sqldatasource",
            sortable:true,
            getColumnsConfig:function(controller){
                return {
                    fields:[
                        {
                            label:"Connection Type",
                            value:function(item){
                                return "PostgreSQL";
                            }
                        },
                        {
                            sortBy:'host',
                            label:"Host",
                            value:function(item){
                                return $filter('date')(item.host, 'medium');
                            }
                        },
                        {
                            sortBy:'dbName',
                            label:"DB Name",
                            value:function(item){
                                return item.dbName;
                            }
                        },
                        {
                            sortBy:'username',
                            label:"Username",
                            value:function(item){
                                return item.username;
                            }
                        },
                    ],
                    detailLink:function(item){
                        return{
                            state:'sqldatasource-detail',
                            stateParams:{id:item.id},
                            roles:'ROLE_REFERENCE_ARCHITECT'
                        };
                    },
                    deleteLink:function(item){
                        return{
                            state:controller.getOptions().entityName+'.edit',
                            stateParams:{id:item.id},
                            isDisabled:function(){
                                return controller.isFinalizedEntity(item);
                            }
                        };
                    }
                };
            }
        });
        return controller;
    }
})();
