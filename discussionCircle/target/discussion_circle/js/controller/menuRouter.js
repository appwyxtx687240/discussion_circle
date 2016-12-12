/**
 * Created by Winter on 2016/12/12.
 */
angular.module('menu', [])
    .controller('mainController', ['$scope', '$http', '$state', '$window', '$timeout', 'dialogService', 'sessionService', 'loadDialog', 'saveDialog', function ($scope, $http, $state, $window, $timeout, dialogService, sessionService, loadDialog, saveDialog) {
        // 自定义会话框
        $scope.dialog = dialogService;
        $scope.loadDialog = loadDialog;
        $scope.saveDialog = saveDialog;
        //登录验证
        $scope.sessionService = sessionService;
        $scope.sessionService.login();
        $scope.sessionService.logout();//获取 退出链接url

        $scope.cm = {pmn: '后台管理', cmn: '欢迎页'};
        //默认欢迎页
        $state.go("welcomePage", null);
        //加载时显示遮罩层
        //接收子作用域中的加载状态
        $scope.$on('isLoading', function (e, flag)
        {
            if (flag) {
                $scope.loadDialog.addLoadingItem();
            } else {
                $scope.loadDialog.deleteLoadingItem();
            }
        }
        )
        ;
        //菜单跳转函数
        $scope.go = function (checkAuthorityUrl, goWhere, param) {
            /*
             * 参数：checkAuthorityUrl   校验权限请求地址
             * 参数：goWhere             路由跳转地址
             * 参数：param               传递参数
             * */
            $http.get("ele_tom/services/page" + checkAuthorityUrl + (param != null ? ("?id=" + param.id) : "")
            ).success(function (response) {
        if (response == "true") {
            if (param == null) {
                $state.go(goWhere, null, {reload: true});
            } else {
                $state.go(goWhere, param);
            }
        } else {
            $state.go("401", null);
        }
    }).error(function (response, state) {
        //没有权限, 配置无权限页面
        if (state == 401) {
            $state.go("401", null);
        } else {

        }
    });
}
}])
//权限不足提示页控制器
.
controller('NoAuthorityController', ['$scope', function ($scope) {
    $scope.$parent.cm = {pmn: '权限提示页', cmn: ''};
}])