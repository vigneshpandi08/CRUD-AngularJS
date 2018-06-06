app.controller("EditStudentController", function ($scope, $http, $location, ShareData, SPACRUDService) {

    $scope.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];

    $scope.multipleDemo = {};
    $scope.multipleDemo.colors = ['Blue', 'Red'];
    $scope.multipleDemo.colors2 = ['Black', 'White'];

    $scope.log = [];

    $scope.loadNames = function (query) {
        return $http.get('/MyJs/name.json', { cache: true }).then(function (response) {
            var countries = response.data;
            return countries.filter(function (country) {
                return country.text.toLowerCase().indexOf(query.toLowerCase()) != -1;
            });
        });
    };

    $scope.tagRemoved = function (tag) {
        $scope.log.push('Removed: ' + tag.text);
    };

    debugger;
    loadAllCityListsRecords();

    function loadAllCityListsRecords() {
        alert('Welcome to edit');

        var promiseGetCityList = SPACRUDService.getcityLists();

        promiseGetCityList.then(function (response) {
            $scope.CityLists = response.data
            console.log($scope.CityLists);
        },
            function (errorPl) {
                debugger;
                $scope.error = errorPl;
            });
    }

    loadAllQualificationsRecords();

    function loadAllQualificationsRecords() {

        var promiseGetQualification = SPACRUDService.getQualifications();

        promiseGetQualification.then(function (response) {
            $scope.qualifications = response.data
            console.log($scope.qualifications);
        },
            function (errorPl) {
                debugger;
                $scope.error = errorPl;
            });
    }

    loadAllRolesRecords();

    function loadAllRolesRecords() {
        debugger;
        var promiseGetRole = SPACRUDService.getRoles();
        promiseGetRole.then(function (response) {
            debugger;
            $scope.roles = response.data;
            $scope.roles.forEach(function (r) {
                if (ShareData.value.role != undefined && ShareData.value.role != null) {
                    var roleSeletced = ShareData.value.role.split(',');
                    for (var i = 0; i < roleSeletced.length; i++) {
                        if (roleSeletced[i] == r.name) {
                            r.Selected = true;
                        }
                    }
                }
            })
            console.log($scope.roles);
        },
            function (errorPl) {
                debugger;
                $scope.error = errorPl;
            });
    }


    function getStudent() {
        debugger;
        var promiseGetStudent = SPACRUDService.getStudent(ShareData.value.studentID);
        promiseGetStudent.then(function (pl) {
            $scope.students = pl.data;
        },
            function (errorPl) {
                $scope.error = 'failure loading Student', errorPl;
            });
    }

    getStudent();

    //$scope.checkAll = function () {
    //    if ($scope.Student.selectedAll) {
    //        $scope.Student.selectedAll = true;
    //    } else {
    //        $scope.Student.selectedAll = false;
    //    }
    //    angular.forEach($scope.roles, function (r) {
    //        r.Selected = $scope.Student.selectedAll;
    //    });

    //};

    $scope.save = function () {
        debugger;
        var optionsCSV = '';
        $scope.roles.forEach(function (r) {
            if (r.id = r.Selected) {

                if (optionsCSV) {
                    optionsCSV += ','
                }
                optionsCSV += r.name;
                $scope.students.role = optionsCSV;
            }
        })


        var students = {
            StudentID: $scope.students.studentID,
            Name: $scope.students.name,
            City: $scope.students.city,
            DOB: $scope.students.dob,
            Gender: $scope.students.gender,
            Mark: $scope.students.mark,
            MobileNo: $scope.students.mobileNo,
            Resume: $scope.students.resume,
            Role: $scope.students.role,
            Tag: $scope.students.Tag.toString(),
            Color: $scope.students.multipleDemo.colors.toString(),
            Color2: $scope.students.multipleDemo.colors2.toString(),
            Qualification: $scope.students.qualification.toString()
        };

        var promisePutStudent = SPACRUDService.put($scope.students.studentID, students);
        promisePutStudent.then(function (pl) {
            alert("Saved Successfully.");
            $location.path("/showstudents");
        },
            function (errorPl) {
                $scope.error = 'failure loading Student', errorPl;
            });
    };

});