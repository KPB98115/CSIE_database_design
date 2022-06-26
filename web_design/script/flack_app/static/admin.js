window.onload = () => {
    try {
        fetch("http://120.126.17.213:58095/getreport").then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            displayResult(data);
        }).catch(error => {
            console.log(error);
        })
    }
    catch(e) {
        console.log("exception catched", e);
    }

}

function redirect(element) {
    if (element.id = "homePage") {
        window.location = "http://120.126.17.213:58095/index";
    }
    
    if (element.id = "report") {
        window.location = "http://120.126.17.213:58095/report";
    }
}

function displayResult(data) {
    console.log(Object.keys(data).length);
    if (Object.keys(data).length === 0) {
        return $("#content").text("No report yet.");
    }

    for (row in data) {
        $("#content").append(`<tr id="row${+(parseInt(row)+1)}"></tr>`);
        for (element in data[row]) {
            $("#content tr:last").append(`<td>${data[row][element]}</td>`);
            $(`#row${+(parseInt(row)+1)} td`).first().prop("hidden", true);
        }
        $("#content tr:last").append("<input type='checkbox'>");
    };
}

async function submitModify1() {
    const checkedRow = $("input:checked").parent();

    var approveData = {};
    var tempArray = [];

    for (let i=0; i < checkedRow.length; i++) {
        var id = checkedRow[i].id
        for (let j=0; j<6; j++) {
            var element = $(`#${id} td`).eq(j).text();
            tempArray.push(element);
        }
        approveData[i] = tempArray;
        tempArray = [];
    }
    console.log("data: ", approveData);

    if (Object.keys(approveData).length === 0) {
        $("#excption").text("沒有勾選任何欄位");
    }
    else {
        const confirm = alert("Are you sure to remove selected data?");
        
        $("#excption").remove();
        const rowID = approveData[0][0];

        try {
            await fetch("http://120.126.17.213:58095/modify?type=report&rowID="+rowID);
        } catch (error) {
            console.log(error);
            alert("request sent unsuccessfully. Please try again.");
            document.location.reload(true);
        }
        document.location.reload(true);
    }
}

function checkCategory() {
    var category = $("#category option:selected").val();
    
    if (category != "default") {
        $("#method").prop("disabled", false);
    }
    else {
        $("#method").prop("disabled", true);
    }

    if (category == "traffic") {
        $("#type_traffic").prop("hidden", false);
        $("#type_catering").prop("hidden", true);
        $("#type_medical").prop("hidden", true);
        $("#type_pet_friendly").prop("hidden", true);
    }
    else if (category == "catering") {
        $("#type_catering").prop("hidden", false);
        $("#type_traffic").prop("hidden", true);
        $("#type_medical").prop("hidden", true);
        $("#type_pet_friendly").prop("hidden", true);
    }
    else if (category == "medical") {
        $("#type_medical").prop("hidden", false);
        $("#type_traffic").prop("hidden", true);
        $("#type_catering").prop("hidden", true);
        $("#type_pet_friendly").prop("hidden", true);
    }
    else if (category == "pet_friendly") {
        $("#type_pet_friendly").prop("hidden", false);
        $("#type_traffic").prop("hidden", true);
        $("#type_catering").prop("hidden", true);
        $("#type_medical").prop("hidden", true);
    }

}

function checkMethod() {
    var method = $("#method option:selected").val();

    if (method == "add") {
        $("#submit_add_form").prop("hidden", false);
        $("#add_form").prop("hidden", false);
        $("#modify_form").prop("hidden", true);
        $("#del_form").prop("hidden", true);
    }
    else if (method == "modify") {
        $("#submit_modify_form").prop("hidden", false);
        $("#modify_form").prop("hidden", false);
        $("#add_form").prop("hidden", true);
        $("#del_form").prop("hidden", true);
    }
    else if (method == "del") {
        $("#submit_del_form").prop("hidden", false);
        $("#del_form").prop("hidden", false);
        $("#add_form").prop("hidden", true);
        $("#modify_form").prop("hidden", true);
    }
    else if (method == "default") {
        $("#method").prop("disabled", true);
    }
}

function submitAdd() {
    const target_form = $("#add_form");
    var query = decodeURI(target_form.serialize());

    const category = $("#category option:selected").val();
    const type = $("select [name='type'] option:selected").val();

    try {
        alert();
        fetch("http://120.126.17.213:58095/query/add?"+query+"&category="+category+"&type="+type);
    }catch(e) {
        console.log(e);
    }
}

function submitModify() {
    const target_form = $("#modify_form");
    var query = decodeURI(target_form.serialize());

    const category = $("#category option:selected").val();

    try {
        fetch("http://120.126.17.213:58095/query/modify?"+query+"&category="+category+"&type="+type);
    }catch(e) {
        console.log(e);
    }
}

function submitDelete() {
    const target_form = $("#del_form");
    var query = decodeURI(target_form.serialize());

    const category = $("#category option:selected").val();

    try {
        fetch("http://120.126.17.213:58095/query/delete?"+query+"&category="+category+"&type="+type);
    }catch(e) {
        console.log(e);
    }
}
/**
 try {
    const district = approveData[1];
    const table = approveData[2];
    const method = approveData[3];
    const newAddress = approveData[4];
 
    const query = `distric=${district}&table=${table}&address=${newAddress}&method=${method}`
 
    fetch("http://120.126.17.213:58095/modifydb?"+query);
    alert("request sent successfully.");
 } catch (error) {
    console.log(error);
    alert("request sent unsuccessfully. Please try again.");
    document.location.reload(true);
 }
 */