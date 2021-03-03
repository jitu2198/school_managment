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
            var image = new Image();
            image.src = data.school_logo;
            image.style.width = "100%";
            image.height = "80px";
            $(".img").html(image);
            $(".tag-line").html(data.tag_line);
            $(".address-r").html(data.address);
            $(".cell").html("OFFICE CELL :" + data.mobile);


            $(".p_img").attr("src",data.principal_signature);


            $(".d_img").attr("src",data.director_signature);
//student infomation
            var ad_no =Number(sessionStorage.getItem("invoice_a_no"));
            $(".admission-number").html("A/No. : " + ad_no);
            var s_permission = idb.transaction("admission", "readwrite");
            var s_access = s_permission.objectStore("admission");
            var admission = s_access.get(Number(ad_no));
            admission.onsuccess = function () {
                var student = this.result;
                $(".s-name").html(student.s_name);
                $(".f-name").html(student.f_name);
                $(".choose-class").html(student.choose_class);
                $(".invoice-date").html(student.invoice[student.invoice.length-1].invoice_date);
                  $(".invoice-no").html(student.invoice[student.invoice.length-1].invoice_no);
                var i;
                for(i=0;i<student.invoice[student.invoice.length-1].course_name.length;i++){

                      document.querySelector(".description").innerHTML+=student.invoice[student.invoice.length-1].course_name[i]+" :-"+"<br>";
                      document.querySelector(".fee-d").innerHTML+=student.invoice[student.invoice.length-1].course_fee[i]+"<br>";
                    var fee=Number(student.invoice[student.invoice.length-1].course_fee[i]);
                    total=total+fee;
                }
                $(".amount").html(total);

            }
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
document.onkeydown=function(event){
    if(event.ctrlKey && event.keyCode==85){
        alert("dandi bat");
        return false;
    }

}
document.onkeydown=function(event){

      if(event.ctrlKey && event.keyCode==73 ){
        alert("dandi bat");
        return false;
    }
}

