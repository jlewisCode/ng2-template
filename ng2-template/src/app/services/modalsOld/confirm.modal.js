import '../modals';
const ConfirmModalHtml = require('./confirm.modal.html');

class ConfirmModalController {
  /*@ngInject*/
  constructor(Modal) {
    //create local references for this modal's instance, data, and promise.
    this.$modal = Modal.confirm.instance;
    this.data = Modal.confirm.data || {};
    _.defaults(this.data, {
      title: 'Confirm',
      body: 'Are you sure?',
      okText: 'Ok',
      cancelText: 'Cancel',
    });
    this.promise = Modal.confirm.result;

  }

  //reject the results promise from the service and destroy the modal.
  //configure reject to determine what to send back to the ctrl that called.
  cancel() {
    this.promise.reject('cancel');
    this.$modal.destroy();
  }

  //resolve the results promise from the service and destroy the modal.
  //configure resolve to determine what to send back to the ctrl that called.
  ok() {
    this.promise.resolve(this.data);
    this.$modal.destroy();
  }
}

function ConfirmModalDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'ConfirmModalController',
    controllerAs: 'ConfirmModalCtrl',
    templateUrl: ConfirmModalHtml
  };
}

angular.module('modals.confirm', ['modals'])
  .controller('ConfirmModalController', ConfirmModalController)
  .directive('confirmModal', ConfirmModalDirective);
