/**
 * Created by Winter on 2016/12/12.
 */
angular.module('eleApp',
    ['angularFileUpload',
        'ui.router',
        'ng.ueditor',
        'menu',
        'ele.discussionCircle',
        'pagination',
        'angularTreeView',
        'angularRadiotreeVie',
        'angularCheckboxtreeview'])
    .config(
        ['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider) {
                $stateProvider.state('plateList', {
                    url: '/plateList',
                    templateUrl: '/ele_tom/views/system/plateList.html',
                    controller: 'PlateController'
                }).state('addPlate', {
                    url: '/addPlate',
                    templateUrl: '/ele_tom/views/system/addPlate.html',
                    controller: 'AddPlateController'
                }).state('editPlate', {
                    url: '/editPlate',
                    templateUrl: '/ele_tom/views/system/editPlate.html',
                    controller: 'EditPlateController'
                }).state('detailPlate', {
                    url: '/detailPlate',
                    templateUrl: '/ele_tom/views/system/detailPlate.html',
                    controller: 'EditPlateController'
                }).state('welcomePage', {//欢迎页
                    url: '/welcomePage',
                    templateUrl: '/ele_tom/views/welcomePage.html'
                });
            }]).factory('dialogService', function () {
    var dialog = {
        content: "", //提示内容
        showCancelButton: false,
        showSureButton: true,
        showDialog: false,
        hasNextProcess: false,
        doNextProcess: function () {
        },
        setHasNextProcess: function (status) {
            dislog.hasNextProcess = status;
            return dialog;
        },
        setShowDialog: function (status) {
            dialog.showDialog = status;
            return dialog;
        },
        setShowCancelButton: function (status) {
            dialog.showCancelButton = status;
            return dialog;
        },
        setShowSureButton: function (status) {
            dialog.showSureButton = status;
            return dialog;
        },
        sureButton_click: function () {
            dialog.setShowDialog(false);
            dialog.setShowCancelButton(false);
            dialog.setShowSureButton(true);
            dialog.removeContent();
            if (dialog.hasNextProcess) {
                dialog.doNextProcess();
                dialog.setHasNextProcess(false);
                dialog.doNextProcess = function () {
                };
            }
        },
        cancelButton_click: function () {
            dialog.setShowDialog(false);
            dialog.setShowCancelButton(false);
            dialog.removeConten();
            dialog.setHasNextProcess(false);
            dialog.doNextProcess = function () {
            };
        },
        setContent: function (msg) {
            dialog.content = msg;
            return dialog;
        },
        removeContent: function () {
            dialog.content = "";
        }
    };
    return dialog;
}).factory('loadDialog', function () {
    var loadDialog = {
        showDialog: false,
        loadingItems: [], // 多个加载项
        loading: function () {
            loadDialog.showDialog = true;
            return loadDialog;
        },
        loaded: function () {
            loadDialog.showDialog = false;
            return loadDialog;
        },
        addLoadingItem: function () {
            loadDialog.loadingItems.push(1);
            loadDialog.loading();
        },
        deleteLoadingItem: function () {
            loadDialog.loadingItems.splice(loadDialog.loadingItems.length - 1, 1);
            loadDialog.checkLoadingItems();
        },
        checkLoadingItems: function () {
            if (loadDialog.loadingItems.length == 0) {
                loadDialog.loaded();
            } else {
                loadDialog.loading();
            }
        }
    };
    return loadDialog;
}).factory('saveDialog', function () {
    var saveDialog = {
        showDialog: false,
        saving: function () {
            saveDialog.showDialog = true;
        },
        saved: function () {
            saveDialog.showDialog = false;
        }
    };
    return saveDialog;
}).factory('dialogStatus', function () {
    //控制body元素是否出滚动条
    var dialogStatus = {
        hasShowedDialog: false,
        setHasShowedDialog: function (status) {
            dialogStatus.hasShowedDialog = status;
        }
    };
    return dialogStatus;
}).factory('sessionService', ['$http', 'dialogService', function ($http, dialogService) {
    var sessionService = {
        user: null,
        logoutUrl: "",
        logined: false,
        login: function () {//获取登录人信息
            $http.get('/ele_tom/services/sso/getUser').success(function (data) {
                sessionService.setUser(data);
                sessionService.logined = true;
            }).error(function (data) {
                //登录超时
            })
        },
        logout: function () {
            $http.get('/ele_tom/services/sso/logout').success(function (data) {
                //退出sso url logoutUrl
                if (data != 'error') {
                    sessionService.logoutUrl = data;
                    console.log("logoutUrl:", sessionService.logoutUrl);
                }
            }).error(function (data) {

            })
        },
        setUser: function (user) {
            sessionService.user = user;
        },
        clearUser: function () {
            sessionService.user = null;
            sessionService.logined = false;
        }
    };
    return sessionService;
}]).directive('windowResize', ['$window', 'dialogService', 'loadDialog', 'dialogStatus', function ($window, dialogService, loadDialog, dialogStatus) {
        return function (scope, element) {
            var w = angular.element($window);
            scope.getWindowHeightAndWidth = function () {
                return {
                    'h': w.innerHeight,
                    'w': w.innerWidth
                };
            };
            scope.$watch(scope.getWindowHeightAndWidth, function (newValue, oldValue) {
                    scope.windowHeight = newValue.h;
                    scope.windowWidth = newValue.w;

                    //设置对话框的margin-top
                    scope.setModalDialogStyle = function () {
                        return {
                            'margin-top': (newValue.h <= 200 ? 0 : (newValue.h / 2 - 200) < 0 ? 0 : (newValue.h / 2 - 200)
                            )
                            + 'px',
                            'margin-bottom': '0px'
                        };
                    };
                    scope.setNormalModalDialogStyle = function () {
                        return {
                            'margin-top': (newValue.h <= 200 ? 60 : (newValue.h / 2 - 100) < 0 ? 0 : (newValue.h / 2 - 100)) + 'px',
                            'margin-bottom': '0px'
                        }
                    };
                    //当模态框显示时, 设置body元素overflow = hidden
                    scope.setBodyStyle = function () {
                        if (dialogService.showDialog ||
                        loadDialog.showDialog||
                        dialogStatus.hasShowedDialog) {
                            return {
                                'overflow' : 'hidden'
                            };
                        }else {
                            return {};
                        }
                    };
                //设置评分模态框样式？
                scope.setFullScreenModalDialogStyle = function () {
                    if(newValue.w<1280){
                        return {'margin': '0px auto'};
                    }else{
                        if(newValue.h<635){
                            return {
                                'margin': '0 auto',
                                'width': (newValue.w-30)+'px'
                            };
                        }else{
                            return {
                                'margin': '10px auto',
                                'width': (newValue.w-30)+'px'
                            };
                        }
                    }
                };
                // ？
                scope.setStyle_01 = function () {
                    if(newValue.h<635){
                        return {
                            'overflow-x': 'hidden',
                            'max-height': '510px'
                        }
                    }else{
                        return {
                            'overflow-x': 'hidden',
                            'max-height': (newValue.h-150)+'px',
                        }
                    }
                }

                scope.setStyle_02 = function () {
                    return {
                        'margin': '30px auto'
                    }
                }

                //emp dialog 左、中、右三块高度设置
                scope.setStyle_03 = function () {
                    if(newValue.h>=610){
                        return {
                            'height': newValue.h-185+'px'
                        }
                    }else{
                        return {}
                    }
                }

                //设置统计图位置
                scope.setStyle_04 = function () {
                    if(newValue.h>=635){
                        return {'margin': ((newValue.h-610)<0?0:(newValue.h-610))/2+'px auto'}
                    }else{
                        return {}
                    }
                }

            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        }
}]);