function redirect(element) {
    if (element.id = "homePage") {
        location.href = "http://120.126.17.213:58095/index";
    }
    else if (element.id = "report") {
        location.herf = "http://120.126.17.213:58095/report";
    }
}

async function getfile() {
    const res = await fetch("http://120.126.17.213:58095/query/test");
    if (!res.ok) {
        return console.log("cant");;
    }
    const result = await res.json();

    console.log(result);
}