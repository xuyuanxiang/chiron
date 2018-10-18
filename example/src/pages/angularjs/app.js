import angular from 'angular';
import styles from './app.less';

const APP = 'myApp';

angular
  .module(APP, [])
  .controller('rootController', [
    '$scope',
    function($scope) {
      console.warn('angular did mount');
      $scope.$styles = styles; // support css modules
      $scope.$on('$destroy', function() {
        console.warn('angular did destroy');
      });
    },
  ])
  .directive('wsApp', function() {
    return {
      template: require('./app.tpl.html'),
      controller: 'rootController',
    };
  });

export default APP;
