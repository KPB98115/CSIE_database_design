function checkDistrict() {
    var district = $("#district option:selected").val();
    
    if (district != "default") {
        $("#category").prop("disabled", false);
    }
    else {
        $("#category").prop("disabled", true);
        $("#type").prop("disabled", true);
        $("#comment_title").html("<p style='color: red'>請完成以上的問題</p>")
        return
    }

}

function checkCategory() {
    var category = $("#category option:selected").val();

    if (category != "default") {
        $("#type").prop("disabled", false);
    }
    else {
        $("#type").prop("disabled", true);
        return
    }
}

function checkType() {
    var type = $("#type option:selected").val();

    if (type != "default") {
        $("#comment_area").prop("hidden", false);
        $("#remark").prop("hidden", false);
        if (type == "add") {
            $("#comment_title").text("請輸入希望新增的設施地址：");
        }
        else if (type == "modify") {
            $("#comment_title").text("請輸入希望修改的設施地址：");
        }
        else if (type == "delete") {
            $("#comment_title").text("請輸入希望刪除的設施地址：");
        }
    }
    else {
        $("#comment_title").text("");
        $("#comment_area").prop("hidden", true);
        $("#remark").prop("hidden", true);
        return
    }
}

function checkValidAddress() {
    var address = $("#comment_area").val();
    var regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]/;

    if (address.length == 0 && address == "") {
        $("#submit_btn").prop("hidden", true);
        $("#invalid").html("");
    }
    else {
        if (!regex.test(address)) {
            $("#invalid").html("");
            $("#submit_btn").prop("hidden", false);
        }
        else $("#invalid").html("<p style='color: red'>地址不容許輸入符號和空白鍵</p>");
    }
}

function submit() {
    var address = $("#comment_area").val();
    var temp_remark = $("#remark").val();

    console.log(typeof temp_remark);

    var remark = temp_remark.replaceAll(" ", "_");

    var query = decodeURI($("form").serialize());
    try {
        fetch("http://120.126.17.213:58095/receive?"+query+"&address="+address+"&remark="+remark);
        $("form").html("<h3>已成功發送您的回報！</h3>");

    } catch (error) {
        console.log(error);
    }

}

function redirect(element) {
    if (element.id = "homePage") {
        location.href = "http://120.126.17.213:58095/index";
    }
    else if (element.id = "report") {
        location.herf = "http://120.126.17.213:58095/report";
    }
}