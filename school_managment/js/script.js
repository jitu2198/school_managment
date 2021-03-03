$(document).ready(function () {

    $("#register-form").submit(function () {
        var check_database = window.indexedDB.databases();
        check_database.then(function (db_list) {
            if (db_list.length == 0) {
                register();
            } else {
                $("#message").removeClass("d-none");
                $("#message").addClass("alert-warning");
                $("#message").append("<b>Resistration failed </b><a href='#'>Purches multi version</a> <span style='cursor:pointer' data-toggle='modal' data-target='#confirm'>Delete current account</span>");

                $("#delete-dbbtn").click(function () {
                    var all_db = window.indexedDB.databases();
                    all_db.then(function (all_db_list) {
                        var verify_delete = window.indexedDB.deleteDatabase(all_db_list);
                        verify_delete.onsuccess = function () {
                            $("#register-form").trigger('reset');
                            $("#message").addClass("d-none");
                            $(".delete-message").html("");
                            $(".d-s-notice").removeClass('d-none');
                            setInterval(function () {
                                $(".d-s-notice").addClass('d-none');
                            }, 2000);
                        }
                    });
                });

            }
        })

        return false;
    });

    function register() {

        var school_name = $("#school-name").val();
        var tag_line = $("#tag-line").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var website = $("#website").val();
        var mobile = $("#mobile").val();


        var address = $("#address").val();
         if(password.length>=8){
        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        //open methed is used for creating and open database
        var database = window.indexedDB.open(school_name);
        database.onsuccess = function () {

            $("#message").removeClass("d-none");
            $("#message").addClass("alert-success");
            $("#message").append("<b>success!</b> dear admin please login");

            setTimeout(function () {
                $("#message").addClass("d-none");
                $("[href='#login']").click();
                $("#register-form").trigger('reset');
            }, 2000);

        }
        database.onerror = function () {
            $("#message").removeClass("d-none");
            $("#message").addClass("alert-warning");
            $("#message").append("<b>Oops!!</b> something wrong please contact 8176042505");
            setTimeout(function () {
                $("#message").addClass("d-none");
                $("#register-form").trigger('reset');
            }, 2000);

        }
        //creating object when database created using onupgredneeded event

        database.onupgradeneeded = function () {

            var data = {
                school_name: school_name,
                email: email,
                password: password,
                tag_line: tag_line,
                website: website,
                mobile: mobile,
                address: address,
                school_logo:"",
                director_signature:"",
                principal_signature:""

            };
            // data insest and fetch from 'idb' object returing by 'result' property of 'indexedDB'
            var idb = this.result;
            //for creating object use createObjectStore methode
            var object = idb.createObjectStore("about_school", {
                keyPath: "school_name"
            });
            idb.createObjectStore("fee", {
                keyPath: "class_name"
            });
            idb.createObjectStore("admission", {
                keyPath: "add_no"
            });
            object.add(data);
        }
        }
        else{
            alert("password length should be more than 8 characters");
        }



    }
});

$(document).ready(function () {
    $("#login-form").submit(function () {
        var lemail = $("#login-email").val();
        var password = $("#login-password").val();
        var login_data = {
            lemail: lemail,
            password: password

        };
        var json_data = JSON.stringify(login_data);
        sessionStorage.setItem("login", json_data);
        if (sessionStorage.getItem("login") != null) {
            //find out database object in browers
            var user_database = window.indexedDB.databases();
            // used 'then' for go in side the user_database
            /* object promise
            1. pendind= object data is missing
            2. fillfull= objecct data is available
            3. rejected= object data restrictic to open
            pendind object is variable type parameter

            */
            user_database.then(function (pendind_obj) {

                var i;
                //number of databases
                for (i = 0; i < pendind_obj.length; i++) {

                    //name of database
                    var db_name = pendind_obj[i].name;
                    sessionStorage.setItem("db_name", db_name);

                    // open db_name database
                    var database = window.indexedDB.open(db_name);
                    database.onsuccess = function () {
                        var idb = this.result;

                        //transaction is used for permission oof reed write operation perform in open database
                        var permission = idb.transaction("about_school", "readwrite");
                        var access = permission.objectStore("about_school");
                        // get methode reture db_name key data in object in json_data if key present
                        var json_data = access.get(db_name);
                        json_data.onsuccess = function () {
                            // db_name key object data gose to user var
                            var user = this.result;
                            if (user) {
                                var db_email = user.email;
                                var db_pass = user.password;
                                var session_data = JSON.parse(sessionStorage.getItem("login"));
                                if (session_data.lemail == db_email) {

                                    if (session_data.password == db_pass) {
                                        window.location = "success/welcome.html";
                                    } else {
                                        $("#login-message").removeClass("d-none");
                                        $("#login-message").addClass("alert-warning");
                                        $("#login-message").append("<b>Oops!!</b> Password wrong");
                                        setTimeout(function () {
                                            $("#login-message").addClass("d-none");
                                            $("#login-form").trigger('reset');
                                        }, 2000);

                                    }


                                } else {
                                    $("#login-message").removeClass("d-none");
                                    $("#login-message").addClass("alert-warning");
                                    $("#login-message").append("<b>Oops!!</b> Email is wrong");
                                    setTimeout(function () {
                                        $("#login-message").addClass("d-none");
                                        $("#login-form").trigger('reset');
                                    }, 2000);

                                }


                            } else {
                                $("#login-message").removeClass("d-none");
                                $("#login-message").addClass("alert-warning");
                                $("#login-message").append("<b>Oops!!</b> User not found");
                                setTimeout(function () {
                                    $("#login-message").addClass("d-none");
                                    $("#login-form").trigger('reset');
                                }, 2000);

                            }
                        }

                    }
                }
            });

        } else {
            $("#login-message").removeClass("d-none");
            $("#login-message").addClass("alert-warning");
            $("#login-message").append("<b>Oops!!</b> session failed");
            setTimeout(function () {
                $("#login-message").addClass("d-none");
                $("#login-form").trigger('reset');
            }, 2000);

        }

        return false;
    });

});

