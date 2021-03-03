$(document).ready(function () {

    var db_name = sessionStorage.getItem("db_name");
    var database = window.indexedDB.open(db_name);
    var ad_no = sessionStorage.getItem("ad_no");
    $(".school-name").html(db_name);
    $(".admission-number").html(Number(ad_no)+1);
    database.onsuccess = function () {
        var idb = this.result;
        var permission = idb.transaction("about_school", "readwrite");
        var access = permission.objectStore("about_school");
        var chech_data = access.get(db_name);
        chech_data.onsuccess = function () {
            var data = this.result;
            $(".tag-line").html(data.tag_line);
            $(".address-r").html(data.address);
            $(".cell").html("OFFICE CELL :" + data.mobile);
        }
        var s_permission = idb.transaction("admission", "readwrite");
        var s_access = s_permission.objectStore("admission");

        var admission = s_access.get(Number(ad_no)+1);
        admission.onsuccess = function () {
            var data = this.result;

            $(".s-name").html(data.s_name);
             $(".f-name").html(data.f_name);
             $(".m-name").html(data.m_name);
             $(".gender").html(data.gender);
             $(".dob").html(data.dob);
             $(".doa").html(data.doa);
              $(".s-mo-no").html(data.s_mo_no);
              $(".f-mo-no").html(data.f_mo_no);
              $(".choose-class").html(data.choose_class);
              $(".admit-in").html(data.admit_in);
              $(".address").html(data.address);



            var image = new Image();
            image.src = data.pic;
            image.style.width = "100%";
            image.height = "120";
            $(".img").html(image);
        }

    }
});
$(document).ready(function(){
    $(".print-a-recipt").click(function(){

     $(".centerr").addClass("d-none");
     window.print();
        window.location="../success/welcome.html";
    });
});


