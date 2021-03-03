window.onload = function () {
    if (sessionStorage.length == 0) {
        window.location = "../index.html";
    }
}

$(document).ready(function () {
    $(".add-field-btn").click(function () {
        var add_element = '<div class="input-group mb-2"><input class="  course-name form-control" placeholder=" Hostel fee" type="text" name="hostel-fee"><input class="ml-2  course-fee form-control" placeholder="500" type="text" name="course fee"><input class=" ml-2 course-time form-control" placeholder="Monthly/yearly" type="text" name="time"></div>';
        $(".add-field-area").append(add_element);
    });
});


$(document).ready(function () {
    $(".set-fee-btn").click(function () {
        var class_name = $(".class-name").val();
        var course_fee = [];
        var course_name = [];
        var course_time = [];
        var i;
        $(".course-fee").each(function (i) {
            course_fee[i] = $(this).val();
        });
        $(".course-name").each(function (i) {
            course_name[i] = $(this).val();
        });
        $(".course-time").each(function (i) {
            course_time[i] = $(this).val();
        });
        var free_object = {
            class_name: class_name,
            course_fee: course_fee,
            course_name: course_name,
            course_time: course_time
        };
        //store data in database
        var db_name = sessionStorage.getItem("db_name");
        var database = window.indexedDB.open(db_name);
        database.onsuccess = function () {

            var idb = this.result;
            var permission = idb.transaction("fee", "readwrite");
            var access = permission.objectStore("fee");
            //put methode used for update and add data in database
            var fee_ob_store = access.put(free_object);
            fee_ob_store.onsuccess = function () {
                alert("success");
                location.reload();
            }
            fee_ob_store.onerror = function () {
                alert("failed");
                location.reload();
            }


        }
    });
});

$(document).ready(function () {
    $("#check-fee-img").click(function () {
        $("#fee-modal").modal({
            keyboard: false,
            backdrop: false
        });
        $(".cancel-fee-btn").click(function () {
            $("#fee-modal").modal('hide');
            location.reload();

        });
        var db_name = sessionStorage.getItem("db_name");
        var database = window.indexedDB.open(db_name);
        database.onsuccess = function () {
            var idb = this.result;
            var permission = idb.transaction("fee", "readwrite");
            var access = permission.objectStore("fee");
            var get_all_key = access.getAllKeys();
            get_all_key.onsuccess = function () {
                var keys = this.result;
                var i;
                var k = 0;
                for (i = 0; i < keys.length; i++) {
                    var key_data = access.get(keys[i]);
                    key_data.onsuccess = function () {

                        //console.log(this.result);
                        // array mil jayega console.log(this.result.class_name);
                        var fee = this.result;
                        var li_class = document.createElement("LI");
                        li_class.className = "nav-item  w-100 float-right";
                        var a = document.createElement("A");
                        a.className = "nav-link border border-dark ";
                        var ull = $("#ull");


                        ull.append(li_class);
                        li_class.append(a);

                        a.innerHTML = "class- " + fee.class_name;
                        a.href = "#ass" + k;


                        $(a).click(function () {
                            $(this).tab('show');
                        });

                        var tab_content = $("#t-c");

                        var div_tab_pane = document.createElement("DIV");
                        div_tab_pane.className = "tab-pane ";
                        div_tab_pane.setAttribute("id", "ass" + k);
                        tab_content.append(div_tab_pane);
                        k++;




                        var table = document.createElement("TABLE");
                        table.className = "table";
                        div_tab_pane.append(table);
                        var tr_h = document.createElement("TR");
                        table.append(tr_h);
                        var th_fee_name = document.createElement("TH");
                        th_fee_name.innerHTML = "Fee name";
                        var th_fee_price = document.createElement("TH");
                        th_fee_price.innerHTML = "fee";
                        var th_fee_time = document.createElement("TH");
                        th_fee_time.innerHTML = "Time";
                        var th_fee_edit = document.createElement("TH");
                        th_fee_edit.innerHTML = "Edit";
                        var th_fee_delete = document.createElement("TH");
                        th_fee_delete.innerHTML = "Delete";
                        tr_h.append(th_fee_name);
                        tr_h.append(th_fee_price);
                        tr_h.append(th_fee_time);
                        tr_h.append(th_fee_edit);
                        tr_h.append(th_fee_delete);

                        var j;
                        for (j = 0; j < fee.course_name.length; j++) {

                            var tr = document.createElement("TR");
                            table.append(tr);
                            var td_fee_name = document.createElement("TD");
                            td_fee_name.innerHTML = fee.course_name[j];
                            var td_fee_price = document.createElement("TD");
                            td_fee_price.innerHTML = fee.course_fee[j];
                            var td_fee_time = document.createElement("TD");
                            td_fee_time.innerHTML = fee.course_time[j];

                            var td_fee_edit = document.createElement("TD");
                            var i_edit = document.createElement("I");

                            i_edit.className = "far fa-edit";

                            i_edit.style.cursor = "pointer";
                            var span_d = document.createElement("SPAN");

                            var i_delete = document.createElement("I");

                            span_d.innerHTML = k;
                            td_fee_edit.append(span_d);
                            td_fee_edit.append(i_edit);

                            $(i_edit).click(function () {

                                var ul_class_name = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild;
                                var ul_class_name_children = ul_class_name.children;
                                var span_k = this.previousSibling;
                                var k_value = parseInt(span_k.innerHTML);
                                var a_class_name = ul_class_name_children[k_value - 1];
                                var ii = a_class_name.children;
                                var key_num_with_name = ii[0].innerHTML;
                                var key_name = key_num_with_name.split(" ");
                                $(".class-name").val(key_name[1]);


                                var table = this.parentElement.parentElement.parentElement;
                                var tr = table.getElementsByTagName("TR");


                                var course_name = document.getElementsByClassName("course-name");
                                var course_fee = document.getElementsByClassName("course-fee");
                                var course_time = document.getElementsByClassName("course-time");
                                course_name[0].parentElement.remove();


                                var l;
                                var m;
                                for (l = 1; l < tr.length; l++) {

                                    var td = tr[l].getElementsByTagName("TD");

                                    $(".add-field-btn").click();
                                    for (m = 0; m < td.length - 2; m++) {



                                        if (m == 0) {
                                            $(course_name[l - 1]).val(td[m].innerHTML)
                                        }
                                        if (m == 1) {
                                            $(course_fee[l - 1]).val(td[m].innerHTML)
                                        }
                                        if (m == 2) {
                                            $(course_time[l - 1]).val(td[m].innerHTML)
                                        }
                                        $("#fee-modal").modal('hide');

                                    }


                                }
                                $(".edit_data_animate").addClass("animated rubberBand");




                            });

                            var td_fee_delete = document.createElement("TD");
                            var span_e = document.createElement("SPAN");

                            var i_delete = document.createElement("I");
                            i_delete.className = "far fa-trash-alt";
                            span_e.innerHTML = k;
                            td_fee_delete.append(span_e);
                            td_fee_delete.append(i_delete);

                            i_delete.style.cursor = "pointer";
                            $(i_delete).click(function () {
                                var ul_class_name = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild;
                                var ul_class_name_children = ul_class_name.children;
                                var span_k = this.previousSibling;
                                var k_value = parseInt(span_k.innerHTML);




                                var a_class_name = ul_class_name_children[k_value - 1];
                                var ii = a_class_name.children;
                                // alert(this.innerHTML);

                                var key_num_with_name = ii[0].innerHTML;
                                var key_name = key_num_with_name.split(" ");






                                var db_name = sessionStorage.getItem("db_name");
                                var database = window.indexedDB.open(db_name);
                                database.onsuccess = function () {
                                    var idb = this.result;

                                    var permission = idb.transaction("fee", "readwrite");
                                    var access = permission.objectStore("fee");
                                    var get_all_key = access.delete(key_name[1]);
                                    get_all_key.onsuccess = function () {
                                        alert("success");
                                    }

                                    //                                    get_all_key.onsuccess = function (){
                                    //                                        var keys = this.result;
                                    //                                          var key_data = access.get(keys[k_value]);
                                    //                                        key_data.onsuccess = function (){
                                    //                                            var fee = this.result;
                                    //                                            var d_course= access.delete(fee.course_name[0]);
                                    //                                            d_course.onsuccess=function(){
                                    //                                                alert("success");
                                    //                                            }
                                    //
                                    //
                                    //                                        }
                                    //                                    }


                                }



                            });


                            tr.append(td_fee_name);
                            tr.append(td_fee_price);
                            tr.append(td_fee_time);
                            tr.append(td_fee_edit);
                            tr.append(td_fee_delete);


                        }



                    }
                }
            }
        }
    });
});
//choose class
$(document).ready(function () {
    var db_name = sessionStorage.getItem("db_name");
    var database = window.indexedDB.open(db_name);
    database.onsuccess = function () {
        var idb = this.result;
        var permission = idb.transaction("fee", "readwrite");
        var access = permission.objectStore("fee");
        var get_all_key = access.getAllKeys();
        get_all_key.onsuccess = function () {
            var keys = this.result;
            var i;
            for (i = 0; i < keys.length; i++) {
                var option = document.createElement("OPTION");
                option.innerHTML = keys[i];
                $(".choose-class").append(option);

            }
        }
    }
});

//upload pic
$(document).ready(function () {
    $(".upload-photo-btn").click(function () {

        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();
        input.onchange = function () {
            var file = this.files[0];
            var url = URL.createObjectURL(file);
            $(".upload-pic").attr("src", url);
            $(".upload-pic").attr("width", "100%");

            // blob :temporary url -used instantentaly present the pic
            //  'base64' this the datatype of the translation from operating system
            var reader = new FileReader();

            reader.readAsDataURL(file);
            //readAsDataURL is return the incoded string in the form of object of url which is read by the fileReader
            reader.onload = function () {
                sessionStorage.setItem("upload_pic", this.result);
            }
        }
    });
});

//upload logo



//show logo

//
$(document).ready(function () {
    var db_name = sessionStorage.getItem("db_name");
    var database = window.indexedDB.open(db_name);
    $(".school-name").html(db_name);
    database.onsuccess = function () {
        var idb = this.result;
        var permission = idb.transaction("about_school", "readwrite");
        var access = permission.objectStore("about_school");
        var check_data = access.get(db_name);
        check_data.onsuccess = function () {
            var data = this.result;
            $(".tag-line").html(data.tag_line);
            if (data.school_logo != "") {
                $(".upload-logo-btn").remove();
                var logo = data.school_logo;
                $(".upload-logo").attr("src", logo);
            } else {
                $(".upload-logo-btn").click(function () {

                    var input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.click();
                    input.onchange = function () {
                        var file = this.files[0];
                        var url = URL.createObjectURL(file);
                        $(".upload-logo").attr("src", url);
                        setTimeout(function () {
                            $("#confirm").modal();
                            $("#confirm-btn").click(function () {
                                var reader = new FileReader();

                                reader.readAsDataURL(file);
                                //readAsDataURL is return the incoded string in the form of object of url which is read by the fileReader
                                reader.onload = function () {
                                    var logo = this.result;
                                    var db_name = sessionStorage.getItem("db_name");
                                    var database = window.indexedDB.open(db_name);
                                    database.onsuccess = function () {
                                        var idb = this.result;
                                        var permission = idb.transaction("about_school", "readwrite");
                                        var access = permission.objectStore("about_school");
                                        var check_data = access.get(db_name);
                                        check_data.onsuccess = function () {
                                            var data = this.result;

                                            data.school_logo = logo;
                                            var update = access.put(data);
                                            update.onsuccess = function () {

                                                location.reload();
                                            }
                                            update.onerror = function () {
                                                alert("update logo failed");
                                            }

                                        }
                                    }




                                }

                            });
                            $("#cancel-btn").click(function () {

                                location.reload();
                            });

                        }, 500);







                        //                        // blob :temporary url -used instantentaly present the pic
                        //                        //  'base64' this the datatype of the translation from operating system
                    }
                });

            }

        }
    }
});




//take admission student data
$(document).ready(function () {
    $(".take_a_form").submit(function () {
        var add_no = 0,
            i, max = 0;
        var db_name = sessionStorage.getItem("db_name");
        var database = window.indexedDB.open(db_name);
        database.onsuccess = function () {

            var idb = this.result;
            var permission = idb.transaction("admission", "readwrite");
            var access = permission.objectStore("admission");
            var chech_data = access.getAllKeys();
            chech_data.onsuccess = function () {
                var keys_array = this.result;
                if (keys_array.length == 0) {
                    add_no = 1;
                } else {
                    for (i = 0; i < keys_array.length; i++) {
                        var number = Number(keys_array[i]);
                        if (number > max) {
                            max = number;


                        }
                    }

                    add_no = max + 1;

                }


                var date_f = $("#date").val().split("/");
                var date_f_ddmmyyy = date_f[1] + "/" + date_f[0] + "/" + date_f[2];
                var date = new Date(date_f_ddmmyyy);
                var dob_day = date.getDate();
                //getmonth methed index start from '0' index
                var dob_month = date.getMonth() + 1;
                var dob_year = date.getYear();
                var dob = dob_day + "/" + dob_month + "/" + dob_year;

                var date_current = new Date();
                // return date - var doa=date_current.toLocaleDateString();
                var date_current_day = date_current.getDate();
                //getmonth methed index start from '0' index
                var date_current_month = date_current.getMonth() + 1;
                var date_current_year = date_current.getYear();
                var date_of_admission = date_current_day + "/" + date_current_month + "/" + date_current_year;

                if (sessionStorage.getItem("upload_pic") != null) {

                    if ($(".address").val() != "") {


                        var admission = {
                            add_no: add_no,
                            s_name: $(".s-name").val(),
                            f_name: $(".f-name").val(),
                            m_name: $(".m-name").val(),
                            dob: dob,
                            doa: date_of_admission,
                            gender: $(".gender").val(),
                            s_mo_no: $(".s-mo-no").val(),
                            f_mo_no: $(".f-mo-no").val(),
                            choose_class: $(".choose-class").val(),
                            admit_in: $(".admit-in").val(),
                            address: $(".address").val(),

                            pic: sessionStorage.getItem("upload_pic"),
                            invoice: []



                        };
                        sessionStorage.removeItem("upload_pic");
                        var db_name = sessionStorage.getItem("db_name");
                        var database = window.indexedDB.open(db_name);
                        database.onsuccess = function () {
                            var idb = this.result;
                            var permission = idb.transaction("admission", "readwrite");
                            var access = permission.objectStore("admission");
                            var check_addmission = access.add(admission);
                            check_addmission.onsuccess = function () {

                                var alert = '<div class="alert alert-success    mt-1 p-1" id="message"><i class="fas fa-times close " data-dismiss="alert"></i><b>Admission success</b></div>';
                                $(".admit-notice").html(alert);
                                setTimeout(function () {
                                    $(".alert").addClass("d-none");
                                    $(".take_a_form").trigger('reset');
                                    $("#admission-recipt").modal({

                                    });

                                    $(".take_a_form").trigger('reset');
                                    $(".upload-pic").attr("src", "");

                                }, 2000);

                            }
                            $(".s-n-d").html($(".s-name").val());
                            $(".add-noo").html(add_no);
                            $(".cancel-PAR-btn").click(function () {
                                location.reload();
                            });

                            check_addmission.onerror = function () {
                                var alert = '<div class="alert alert-warning    mt-1 p-1" id="message"><i class="fas fa-times close " data-dismiss="alert"></i><b>Admission faild</b></div>';
                                $(".admit-notice").html(alert);
                                admission_number_fun();

                                $(".take_a_form").trigger('reset');


                            }

                        }
                    } else {
                        alert("please fill address field");
                    }




                } else {
                    alert("please upload pic");
                }




            }


        }
        return false;
    });

});

//custom date
$(document).ready(function () {

    $("#date-invoice").datepicker({
        //          dateFormat: 'dd/mm/yy',
        //                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
        //                dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        //                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        //                firstDay: 1,
        //                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        //                monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        //                changeYear: true,
        //                changeMonth: true,
        yearRange: '-100:+0',

        showAnim: "fade",
        changeMonth: true,
        changeYear: true,
        duration: 300,
        dateFormat: 'dd/mm/yy'
    });
});
//custom date
$(document).ready(function () {

    $("#date").datepicker({
        changeMonth: true,
        yearRange: '-100:+0',
        changeYear: true,
        showAnim: "fade",
        duration: 300,
        dateFormat: 'dd/mm/yy'
    });
});
//admission-number
function admission_number_fun() {
    var ad_no = 0;
    var db_name = sessionStorage.getItem("db_name");
    var database = window.indexedDB.open(db_name);
    database.onsuccess = function () {
        var idb = this.result;
        var permission = idb.transaction("admission", "readwrite");
        var access = permission.objectStore("admission");
        var chech_data = access.getAllKeys();
        chech_data.onsuccess = function () {
            var key_array = this.result;
            var i;
            for (i = 0; i < key_array.length; i++) {
                if (key_array[i] > ad_no) {
                    ad_no = key_array[i];
                }
            }
            var ad_num = ad_no + 1;
            sessionStorage.setItem("ad_no", ad_num - 1);
            $(".admission-number").html("A/No: " + ad_num);

        }
    }
}

admission_number_fun();

$(document).ready(function () {

    $(".Find-Student-p").click(function () {

        $("#find-student").modal();
        $(".find-s-btn").click(function () {
            var ad_no = $(".f-ad-no").val();
            sessionStorage.setItem("ad_no", ad_no);
            window.location = "../addmission_recipt/ad_recipt.html";
        });

    });
});


$(document).ready(function () {
    $(".Find-No-of-Student").click(function () {

        $("#find-no-student").modal();
        $(".find-s-no-btn").click(function () {
            var ad_no = $("#chcl").val();
            sessionStorage.setItem("class_no", ad_no);
            window.location = "../no_of_student/student.html";
        });




    });
});


//director
$(document).ready(function () {

    $(".Upload-Signature-p").click(function () {
        $("#upload-signature").modal();
        $("#director").on("change", function () {

            var file = this.files[0];
            var fi_name = file.name;
            $(".up_d").html(fi_name);
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {

                var signature = this.result;
                var db_name = sessionStorage.getItem("db_name");
                var database = window.indexedDB.open(db_name);
                database.onsuccess = function () {
                    var idb = this.result;
                    var permission = idb.transaction("about_school", "readwrite");
                    var access = permission.objectStore("about_school");
                    var check_data = access.get(db_name);
                    check_data.onsuccess = function () {
                        var data = this.result;
                        data.director_signature = signature;
                        var update = access.put(data);
                        update.onsuccess = function () {
                            window.location = location.href;

                        }
                        update.onerror = function () {
                            alert("update faild");
                        }


                    }

                }

            }
        });

        $(".d-sign-del").on("click", function () {
            $("#confirm").modal();
            $("#confirm-btn").click(function () {
                var db_name = sessionStorage.getItem("db_name");
                var database = window.indexedDB.open(db_name);
                database.onsuccess = function () {
                    var idb = this.result;
                    var permission = idb.transaction("about_school", "readwrite");
                    var access = permission.objectStore("about_school");
                    var check_data = access.get(db_name);
                    check_data.onsuccess = function () {
                        var data = this.result;
                        data.director_signature = "";
                        var update = access.put(data);
                        update.onsuccess = function () {
                            location.reload();


                        }
                        update.onerror = function () {
                            alert("update faild");
                        }


                    }

                }

            });
            $("#cancel-btn").click(function () {

                location.reload();
            });


        });


    });
});


//
$(document).ready(function () {
    var db_name = sessionStorage.getItem("db_name");
    var database = window.indexedDB.open(db_name);
    database.onsuccess = function () {
        var idb = this.result;
        var permission = idb.transaction("about_school", "readwrite");
        var access = permission.objectStore("about_school");
        var check_data = access.get(db_name);
        check_data.onsuccess = function () {
            var data = this.result;
            if (data.director_signature == "") {
                $(".d-sign-input").removeClass("d-none");

            } else {
                $(".d-sign-con").removeClass("d-none");
                var signature = data.director_signature;
                var image = new Image();
                image.src = signature;
                image.width = "150";
                image.height = "50";
                $(".d-sign").html(image);
            }
        }
    }
});


//principal
$(document).ready(function () {
    $(".up-p-btn").click(function () {
        location.reload();
    });
});

$(document).ready(function () {

    $(".Upload-Signature-p").click(function () {
        $("#upload-signature").modal();
        $("#principal").on("change", function () {

            var file = this.files[0];
            var fi_name = file.name;
            $(".up_p").html(fi_name);
            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function () {

                var signature = this.result;
                var db_name = sessionStorage.getItem("db_name");
                var database = window.indexedDB.open(db_name);
                database.onsuccess = function () {
                    var idb = this.result;
                    var permission = idb.transaction("about_school", "readwrite");
                    var access = permission.objectStore("about_school");
                    var check_data = access.get(db_name);
                    check_data.onsuccess = function () {
                        var data = this.result;
                        data.principal_signature = signature;
                        var update = access.put(data);
                        update.onsuccess = function () {


                        }
                        update.onerror = function () {
                            alert("update faild");
                        }


                    }

                }

            }
        });

        $(".p-sign-del").on("click", function () {
            $("#confirm").modal();
            $("#confirm-btn").click(function () {
                var db_name = sessionStorage.getItem("db_name");
                var database = window.indexedDB.open(db_name);
                database.onsuccess = function () {
                    var idb = this.result;
                    var permission = idb.transaction("about_school", "readwrite");
                    var access = permission.objectStore("about_school");
                    var check_data = access.get(db_name);
                    check_data.onsuccess = function () {
                        var data = this.result;
                        data.principal_signature = "";
                        var update = access.put(data);
                        update.onsuccess = function () {
                            location.reload();


                        }
                        update.onerror = function () {
                            alert("update faild");
                        }


                    }

                }
            });
              $("#cancel-btn").click(function () {

                location.reload();
            });




        });


    });
});


//show proncipal sign
$(document).ready(function () {
    var db_name = sessionStorage.getItem("db_name");
    var database = window.indexedDB.open(db_name);
    database.onsuccess = function () {
        var idb = this.result;
        var permission = idb.transaction("about_school", "readwrite");
        var access = permission.objectStore("about_school");
        var check_data = access.get(db_name);
        check_data.onsuccess = function () {
            var data = this.result;
            if (data.principal_signature == "") {
                $(".p-sign-input").removeClass("d-none");

            } else {
                $(".p-sign-con").removeClass("d-none");
                var signature = data.principal_signature;
                var image = new Image();
                image.src = signature;
                image.width = "150";
                image.height = "50";
                $(".p-sign").html(image);
            }
        }
    }
});
//get invoice

$(document).ready(function () {

    $(".Get-Invoice-p").click(function () {
        $("#get-invoice").modal();
        $(".get-invoice-btn").click(function () {
            var ad_no = Number($(".g-ad-no").val());
            var date_f = $(".invoice-date").val().split("/");
            var date_f_ddmmyyy = date_f[1] + "/" + date_f[0] + "/" + date_f[2];
            var date = new Date(date_f_ddmmyyy);
            var dob_day = date.getDate();
            //getmonth methed index start from '0' index
            var dob_month = date.getMonth() + 1;
            var dob_year = date.getYear();
            var invoice_date = dob_day + "/" + dob_month + "/" + dob_year;


            var db_name = sessionStorage.getItem("db_name");
            var database = window.indexedDB.open(db_name);
            database.onsuccess = function () {
                var idb = this.result;
                var permission = idb.transaction("admission", "readwrite");
                var access = permission.objectStore("admission");
                var chech_data = access.get(ad_no);
                chech_data.onsuccess = function () {
                    var data = this.result;
                    // if ad_no is not present in database then 'data' is empty means if(data) returns false other wise true
                    if (data) {
                        var class_name = data.choose_class;
                        var fee_permission = idb.transaction("fee", "readwrite");
                        var fee_access = fee_permission.objectStore("fee");
                        var check_fee_data = fee_access.get(class_name);
                        check_fee_data.onsuccess = function () {
                            var fee_data = this.result;
                            if (fee_data) {
                                var invoice_no;
                                if (data.invoice.length == 0) {
                                    invoice_no = 1;
                                } else {
                                    invoice_no = data.invoice.length + 1;
                                }
                                var invoice_data = {
                                    invoice_no: invoice_no,
                                    invoice_date: invoice_date,
                                    course_name: fee_data.course_name,
                                    course_fee: fee_data.course_fee

                                }

                                var update_permission = idb.transaction("admission", "readwrite");
                                var update_access = update_permission.objectStore("admission");
                                var update_check_data = update_access.get(ad_no);
                                update_check_data.onsuccess = function () {
                                    var update_object = this.result;
                                    // push methode is used for inserting data in array type variable
                                    update_object.invoice.push(invoice_data);
                                    var update_invoice = update_access.put(update_object);
                                    update_invoice.onsuccess = function () {
                                        sessionStorage.setItem("invoice_a_no", ad_no);
                                        window.location = "../fee_recipt/invoice_fee_r.html";
                                    }
                                    update_invoice.onerror = function () {
                                        alert("invoice failed");
                                    }
                                }
                            } else {
                                alert("fee is not found");
                            }

                        }
                    } else {
                        alert("student not found");
                    }


                }
            }

        });

    });
});
$(document).ready(function () {
    $(".Set-Class-Fee-p").click(function () {

        $(".edit_data_animate").addClass("animated rubberBand");

    });
    $(".Take-Admission-p").click(function () {

        $(".take_data_animate").addClass("animated rubberBand");

    });
    $(".Check-Class-Fee-p").click(function () {
        $("#check-fee-img").click();

    });



});
//log out code
$(document).ready(function () {
    $(".log-out-school").click(function () {
        sessionStorage.clear();

        window.location = "../index.html";
    });
});
