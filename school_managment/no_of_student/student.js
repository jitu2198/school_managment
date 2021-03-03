window.onload=function(){
    if(sessionStorage.length==0){
        window.location="../index.html";
    }
}
$(document).ready(function () {
    var total=0;
    var db_name = sessionStorage.getItem("db_name");
    var database = window.indexedDB.open(db_name);
    $(".school-name").html(db_name);
    database.onsuccess = function () {
        var idb = this.result;
        var permission = idb.transaction("about_school", "readwrite");
        var access = permission.objectStore("about_school");
        var chech_data = access.get(db_name);
        chech_data.onsuccess = function () {

              var data = this.result;

            $("#img").attr('src',data.school_logo);
            $(".tag-line").html(data.tag_line);

        }


    }
});
//
//$(document).ready(function () {
//    var class_namee=sessionStorage.getItem("class_no");
//
//    $(".show-class").html(class_namee);
//    var db_name = sessionStorage.getItem("db_name");
//    var database = window.indexedDB.open(db_name);
//    database.onsuccess = function () {
//        var idb = this.result;
//
//        var permission = idb.transaction("admission", "readwrite");
//
//        var access = permission.objectStore("admission");
//
//        var get_all_key = access.getAllKeys();
//        get_all_key.onsuccess = function () {
//            var keys = this.result;
//            var i,k=0;
//            //div_tab_pane.setAttribute("id", "ass" + ch);
//
//
//            for (i = 0; i < keys.length; i++) {
//
//                var check_data = access.get(keys[i]);
//                check_data.onsuccess = function () {
//                    var data = this.result;
//
//                    //console.log(this.result);
//                    // array mil jayega console.log(this.result.class_name);
//
//                    if ( data.choose_class==class_namee) {
//
//                                   alert(data.s_name);
//
//
//
//
//
//                    }
//
//                }
//
//            }
//
//
//
//        }
//    }
//
//
//
//
//});
//




$(document).ready(function () {
    var class_namee=sessionStorage.getItem("class_no");

    $(".show-class").html(class_namee);
    var db_name = sessionStorage.getItem("db_name");
    var database = window.indexedDB.open(db_name);
    database.onsuccess = function () {
        var idb = this.result;

        var permission = idb.transaction("admission", "readwrite");

        var access = permission.objectStore("admission");

        var get_all_key = access.getAllKeys();
        get_all_key.onsuccess = function () {
            var keys = this.result;
            var i,j=0;
            //div_tab_pane.setAttribute("id", "ass" + ch);
            for (i = 0; i < keys.length; i++) {

                var check_data = access.get(keys[i]);
                check_data.onsuccess = function () {
                    var data = this.result;

                    //console.log(this.result);
                    // array mil jayega console.log(this.result.class_name);

                    if ( data.choose_class==class_namee) {
                        j++;
                       var st_table=$(".student-table");
                        var tr_d = document.createElement("TR");
                         tr_d.style.border="1px solid black";
                            st_table.append(tr_d);
                           var td_serial_no = document.createElement("TD");
                        td_serial_no.innerHTML = j;
                        var td_s_pic = document.createElement("TD");
                        td_s_pic.style.padding="2px";
                          td_s_pic.style.margin="0";

                          td_s_pic.style.align="auto 0";
                        var imagee = new Image();
                        imagee.src = data.pic;
                        imagee.width = "80";
                        imagee.height = "80";

                        td_s_pic.append(imagee);

                        var td_s_name = document.createElement("TD");
                        td_s_name.innerHTML = data.s_name;
                        var td_s_f_name = document.createElement("TD");
                        td_s_f_name.innerHTML = data.f_name;
                        var td_s_dob = document.createElement("TD");
                        td_s_dob.innerHTML = data.dob;
                            var td_add_no = document.createElement("TD");
                        td_add_no.innerHTML = data.add_no;
                        var td_s_doa = document.createElement("TD");
                        td_s_doa.innerHTML = data.doa;
                        var td_s_mo = document.createElement("TD");
                        td_s_mo.innerHTML = data.s_mo_no;
                        var td_s_f_mo = document.createElement("TD");
                        td_s_f_mo.innerHTML = data.f_mo_no;
                        var td_s_address = document.createElement("TD");
                        td_s_address.innerHTML = data.address;

                        var td_s_edit = document.createElement("TD");
                        td_s_edit.innerHTML = "E";
                        var td_s_delete = document.createElement("TD");
                        td_s_delete.innerHTML = "D";
                           tr_d.append(td_serial_no);
                        tr_d.append(td_s_pic);
                        tr_d.append(td_s_name);
                        tr_d.append(td_s_f_name);
                          tr_d.append(td_add_no);
                        tr_d.append(td_s_dob);
                        tr_d.append(td_s_doa);
                        tr_d.append(td_s_mo);
                        tr_d.append(td_s_f_mo);
                        tr_d.append(td_s_address);
                        tr_d.append(td_s_edit);
                        tr_d.append(td_s_delete);



                    }

                }
            }
        }
    }




});
$(document).ready(function(){
    $(".print-a-recipt").click(function(){
      window.print();
    });
});





//$(document).ready(function () {
//    var db_name = sessionStorage.getItem("db_name");
//    var database = window.indexedDB.open(db_name);
//    database.onsuccess = function () {
//        var idb = this.result;
//        var f_permission = idb.transaction("fee", "readwrite");
//        var f_access = f_permission.objectStore("fee");
//        var f_get_all_key = f_access.getAllKeys();
//        f_get_all_key.onsuccess = function () {
//            var f_keys = this.result;
//            var j;
//            var k = 0;
//            var f_keys_v=0;
//            for (j = 0; j < f_keys.length; j++) {
//
//                var li_class = document.createElement("LI");
//                li_class.className = "nav-item ";
//                var a = document.createElement("A");
//                a.className = "nav-link border border-dark ";
//                var ull = $("#ull");
//
//
//                ull.append(li_class);
//                li_class.append(a);
//
//                a.innerHTML = "class- " + f_keys[j];
//                a.href = "#ass" + k;
//
//
//                $(a).click(function () {
//                    $(this).tab('show');
//                });
//
//                var tab_content = $("#t-c");
//
//                var div_tab_pane = document.createElement("DIV");
//                div_tab_pane.className = "tab-pane ";
//                div_tab_pane.setAttribute("id", "ass" + k);
//                tab_content.append(div_tab_pane);
//
//
//
//
//
//                var table = document.createElement("TABLE");
//                table.className = "table";
//                div_tab_pane.append(table);
//                var tr_h = document.createElement("TR");
//                table.append(tr_h);
//                var th_s_pic = document.createElement("TH");
//                th_s_pic.innerHTML = "pic";
//                var th_s_name = document.createElement("TH");
//                th_s_name.innerHTML = "Student name";
//                var th_s_f_name = document.createElement("TH");
//                th_s_f_name.innerHTML = "Father's name";
//                var th_s_dob = document.createElement("TH");
//                th_s_dob.innerHTML = "Dob";
//                var th_s_doa = document.createElement("TH");
//                th_s_doa.innerHTML = "Doa";
//                var th_s_mo = document.createElement("TH");
//                th_s_mo.innerHTML = "Student Mo. No.";
//                var th_s_f_mo = document.createElement("TH");
//                th_s_f_mo.innerHTML = "Father's Mo. No.";
//                var th_s_address = document.createElement("TH");
//                th_s_address.innerHTML = "Address";
//
//                var th_s_edit = document.createElement("TH");
//                th_s_edit.innerHTML = "Edit";
//                var th_s_delete = document.createElement("TH");
//                th_s_delete.innerHTML = "Delete";
//                tr_h.append(th_s_pic);
//                tr_h.append(th_s_pic);
//                tr_h.append(th_s_name);
//                tr_h.append(th_s_f_name);
//                tr_h.append(th_s_dob);
//                tr_h.append(th_s_doa);
//                tr_h.append(th_s_mo);
//                tr_h.append(th_s_f_mo);
//                tr_h.append(th_s_address);
//                tr_h.append(th_s_edit);
//                tr_h.append(th_s_delete);
//
////                var dbb_name = sessionStorage.getItem("db_name");
////                var databasee = window.indexedDB.open(dbb_name);
////
////                databasee.onsuccess = function () {
////                    var idb = this.result;
////
////                  var ch=f_keys.length-j--;
//
//                    var permission = idb.transaction("admission", "readwrite");
//
//                    var access = permission.objectStore("admission");
//
//                    var get_all_key = access.getAllKeys();
//                    get_all_key.onsuccess = function () {
//                        var keys = this.result;
//                        var i;
//                          //div_tab_pane.setAttribute("id", "ass" + ch);
//                        for (i = 0; i < keys.length; i++) {
//
//                            var key_data = access.get(keys[i]);
//                            key_data.onsuccess = function () {
//                                var data = this.result;
//
//                                //console.log(this.result);
//                                // array mil jayega console.log(this.result.class_name);
//
//                                if (f_keys[] == data.choose_class) {
//
//                                    var tr_d = document.createElement("TR");
//                                    table.append(tr_d);
//                                    var td_s_pic = document.createElement("TD");
//                                    var image = new Image();
//                                    image.src = data.pic;
//                                    image.width = "80";
//                                    image.height = "80";
//                                    td_s_pic.innerHTML = image;
//
//                                    var td_s_name = document.createElement("TD");
//                                    td_s_name.innerHTML = data.s_name;
//                                    var td_s_f_name = document.createElement("TD");
//                                    td_s_f_name.innerHTML = data.f_name;
//                                    var td_s_dob = document.createElement("TD");
//                                    td_s_dob.innerHTML = data.dob;
//                                    var td_s_doa = document.createElement("TD");
//                                    td_s_doa.innerHTML = data.doa;
//                                    var td_s_mo = document.createElement("TD");
//                                    td_s_mo.innerHTML = data.s_mo_no;
//                                    var td_s_f_mo = document.createElement("TD");
//                                    td_s_f_mo.innerHTML = data.f_mo_no;
//                                    var td_s_address = document.createElement("TD");
//                                    td_s_address.innerHTML = data.address;
//
//                                    var td_s_edit = document.createElement("TD");
//                                    td_s_edit.innerHTML = "E";
//                                    var td_s_delete = document.createElement("TD");
//                                    td_s_delete.innerHTML = "D";
//                                    tr_d.append(td_s_pic);
//                                    tr_d.append(td_s_name);
//                                    tr_d.append(td_s_f_name);
//                                    tr_d.append(td_s_dob);
//                                    tr_d.append(td_s_doa);
//                                    tr_d.append(td_s_mo);
//                                    tr_d.append(td_s_f_mo);
//                                    tr_d.append(td_s_address);
//                                    tr_d.append(td_s_edit);
//                                    tr_d.append(td_s_delete);
//
//
//
//                                }
//
//
//                            //}
//
//
//                        }
//                    }
//                }
//
// k++;
//
//            }
//        }
//
//
//
//
//    }
//
//});
//
