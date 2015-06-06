(function (){
    var app = angular.module('app', []);

    app.controller('mainController', function ($http) {
        var vm = this,
            url = 'https://mandrillapp.com/api/1.0/messages/send.json';

        this.sended = false;
        this.formError = false;
        this.sendedAttend = false;
        this.formAttendError = false;
        this.isAttendLoading = false;
        this.isLoading = false;
        this.registration = {};
        this.attending = {};

        var message = {
            key: '4tnC2mMThDfqG-27kNi09g',
            message: {
                text: 'ERROR registration',
                subject: 'Inschrijving',
                from_email: 'info@creuni.com',
                from_name: 'Creuni.com',
                to: [{
                        email: "info@creuni.com",
                        name: "Creuni Inschrijvingen",
                        type: "to"
                }]
            }
        };

        this.resetLock = function () {
            this.formError = false;
        };

        this.sendAttendMail = function () {
            vm.sendMail(vm.attending, vm.isAttendLoading)
                .success(function() {
                    vm.sendedAttend = true;
                    vm.isAttendLoading = false;
                })
                .error(function() {
                    vm.formAttendError = true;
                    vm.isAttendLoading = false;
                });
        };

        this.sendRegistrationMail = function () {
            vm.sendMail(vm.registration, vm.isLoading)
                .success(function() {
                    vm.sended = true;
                    vm.isLoading = false;
                })
                .error(function() {
                    vm.formError = true;
                    vm.isLoading = false;
                });
        };

        this.sendMail = function (arr, loader) {
            var str = "";
            angular.forEach(arr, function(value, key) {
                str += key + ': ' + value + '\n';
            });
            message.message.text = str;

            loader = true;

            return $http.post(url, message);
        };
    });
})();