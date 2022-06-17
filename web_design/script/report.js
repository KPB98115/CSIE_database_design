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
        return
    }
}

function checkValidAddress() {
    var address = $("#comment_area").val();
    var regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (address == "") {
        $("#submit_btn").prop("hidden", true);
        $("#comment: p").remove();
    }
    else if (address != "") {
        if (!regex.test(address)) {
            $("#invalid").html("");
            $("#submit_btn").prop("hidden", false);
        }
        else $("#invalid").html("<p style='color: red'>地址不容許輸入符號</p>");
    }
}

async function submit() {
    var address = $("#comment_area").val();

    var query = decodeURI($("form").serialize());
    try {
        await fetch("http://120.126.17.213:58095/query?"+query+"&address="+address);
        $("form").html("<h3>已成功發送您的回報！</h3>");

    } catch (error) {
        console.log(error);
    }

}