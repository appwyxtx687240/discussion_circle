/**
 * Created by Winter on 2016/12/12.
 */
angular.module('ele.plate', ['ele.admin'])
.controller('PlateController', ['$scope', '$http', 'dialogService', '$timeout', function ($scope, $http, dialogService, $timeout) {
    $scope.$parent.cm = {pmc:'pmc-f', pmn:'系统管理', cmc:'cmc-fi', cmn:'话题分类管理'};
    $scope.url = "/ele_tom/services/plate/findpage?pageNum=";
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 20,
        pageLength: 13,
        perPageOptions: [20, 50, 100, '全部'],
        rememberPerPage: 'perPageItems',
        onChange: function () {
            $scope.$httpUrl = "";
            $scope.$httpParams = "";
            $scope.$emit('isLoading', true);
            if ($scope.name != undefined && $scope.name != null) {
                $scope.$httpParams = $scope.$httpParams + "&name="
                    + $scope.name.replace(/\%/g,"%25").replace(/\#/g,"%23")
                        .replace(/\+/g,"%2B").replace(/\s/g,"%20").replace(/\//g,"%2F")
                        .replace(/\?/g,"%3F").replace(/\&/g,"%26").replace(/\=/g,"%3D");
            }
            $scope.$httpUrl = $scope.url + $scope.paginationConf.currentPage + "&pageSize=" + ($scope.paginationConf.itemsPerPage == "全部" ? -1 : $scope.paginationConf.itemsPerPage) + $scope.$httpParams;
            $http.get($scope.$httpUrl).success(function (response) {
                $scope.$emit('isLoading', false);
                $scope.page = response;
                $scope.paginationConf.totalItems = response.count;
                $scope.paginationConf.itemsPerPage = (response.pageSize == response.count ? "全部" : response.pageSize);
            })
        }
    };
    $scope.search = function () {
        $scope.paginationConf.currentPage = 1;
        $scope.paginationConf.itemsPerPage  = 20;
        $scope.paginationConf.onChange();
    };
    //回车自动查询
    $scope.autoSearch = function ($event) {
        if ($event.keyCode == 13) {
            $scope.search();
        }
    };
    //添加功能
    $scope.doAdd = function () {
        $scope.go('/system/addPlate', 'addPlate', null);
    };
    //编辑
    $scope.doUpdate = function (r) {
        $scope.go('/system/editPlate', 'editPlate', {id:r.id});
    };

    //删除
    $scope.doDelete = function (r) {
        dialogService.setContent("确定删除话题分类:" + r.plateName + "? \n 注意: 删除该分类后, 其下的所有话题也将一并删除!").setHasNextProcess(true).setShowCancelButton(true).setShowDialog(true).doNextProcess = function () {
            $http({
                url: '/ele_tom/services/plate/deleteByPrimaryKey?id=' + r.id,
                method: "DELETE"
            }).success(function (response) {
                dialogService.setContent("删除成功").setShowSureButton(false).setShowDialog(true);
                $timeout(function () {
                    dialogService.sureButton_click();
                    $scope.search();
                }, 2000);
            }).error(function () {
                dialogService.setContent("删除失败请稍后尝试").setShowSureButton(false).setShowDialog(true);
                $timeout(function () {
                    dialogService.sureButton_click();
                }, 2000);
            });
        }
    };

    //高亮显示选中行
    $scope.currHighLightRow = {};
    $scope.highLightCurrRow = function (item) {
        $scope.currHighLightRow.id = item.id;
    }
}])