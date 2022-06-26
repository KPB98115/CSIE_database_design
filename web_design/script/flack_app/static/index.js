function addForm() {
    var element_length = $("#form_gallery").children("div").length;
    var template = `<div class="queryForm" id="form${element_length+1}">
                    <div><button id="cancel_btn${element_length+1}" class="cancelForm_btn" onclick="removeForm(this)">X</button></div>
                    <div id="temp_form">
                        <form method="post">
                            <label for="address" class="form-label">目標地址：</label>
                            <select name="district" style="display: inline-flex; width: 80%;" class="form-select" id="district${element_length+1}" onchange="checkDistrict(this)">
                                <option value="default" selected>請選擇區域</option>
                            </select>
                            <select name="street" style="display: inline-flex; width: 80%;" class="form-select" id="street${element_length+1}">
                                <option value="default" selected>請選擇街道</option>
                            </select>
                            <input name="number" type="text" class="input_no" id="street_no_${element_length+1}" placeholder="請輸入街號()"><span style="background: white;">號</span>
                            <input type="checkbox" name="additional_village" onchange="checkAdditional(this)" id="additional_${element_length+1}"><span>新增里別</span>
                            <label for="range" class="form-label">搜尋範圍：</label>
                            <select name="range" style="display: inline-flex; width: 80%;" class="form-select" id="range${element_length+1}">
                                <option value="default" selected>請選擇距離</option>
                                <option value="1">1公里</option>
                                <option value="3">3公里</option>
                                <option value="5">5公里</option>
                            </select>
                            <div class="form_filter">
                                <h5 style="display: inline;">篩選器</h5>
                                <select name="type_filter" class="form-select" onChange="checkFilter(this)"  id="type_filter_${element_length+1}">
                                    <option value="default">請選擇篩選類型：</option>
                                    <option value="district">以地區篩選</option>
                                    <option value="facility">以設施篩選</option>
                                </select>
                            </div>
                            <input id="submit_btn${element_length+1}" class="btn btn-primary" type="button" value="submit" style="margin-top: 50px;" onclick="submitQuery(this)">
                        </form>
                    </div>
                </div>`;
    $("#addForm").blur();

    if (element_length == 4) {
        $("#gallery").find("#addForm").css("display", "none");
    }
    
    $(`#form${element_length}`).after(template);
    for (var i=0; i<district.length; i++) {
        $("select[name='district']").append(`<option value='${district[i][1]}'>${district[i][0]} ${district[i][1]}</option>`)
    }
}

function removeForm(element) {
    $("#gallery").find("#addForm").css("display", "inline");
    return $(`#${element.id}`).parent().parent().remove();
}

function checkDistrict(element) {
    var street_select_tag = $(`#${element.id}`).next();
    street_select_tag.blur();
    street_select_tag.find("option").not(":first").remove();
    var district = $(`#${element.id} option:selected`).val();
    if (district == "中正區") {
        street[0].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "大同區") {
        street[1].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "中山區") {
        street[2].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "松山區") {
        street[3].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "大安區") {
        street[4].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "萬華區") {
        street[5].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "信義區") {
        street[6].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "士林區") {
        street[7].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "北投區") {
        street[8].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "內湖區") {
        street[9].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "南港區") {
        street[10].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "文山區") {
        street[11].forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
}

function checkFilter(element) {
    const select_element = $(`#${element.id}`);
    const filter = $(`#${element.id} option:selected`).val();

    if (filter == "district") {
        select_element.next().remove();
        //select_element.parent().append(`
        //    <select name="filter_district" class="form-select filter_district">
        //        <option value="default">請選擇地區：</option>
        //    </select>
        //`);
        const selected_district = select_element.parent().parent().parent().find("select[name='district'] option:selected").val();
        select_element.parent().append(`
            <select name="filter_district" class="form-select filter_district">
                <option value=${selected_district} selected>${selected_district}</option>
            </select>`);
        //for (var i=0; i<district.length; i++) {
        //    select_element.next().append(`<option value='${district[i][1]}'>${district[i][0]} ${district[i][1]}</option>`);
        //}
    }
    else if (filter == "facility") {
        select_element.next().remove();
        select_element.parent().append(`
            <select name="filter_facility" class="form-select filter_facility">
                <option value="default">請選擇設施：</option>
            </select>
        `);
        for (var i=0; i<facility.length; i++) {
            select_element.next().append(`<option value='${facility[i]}'>${facility[i]}</option>`);
        }
    }
    else {
        select_element.next().remove();
    }
}

function checkAdditional(element) {
    const checkBox = $(`#${element.id}`);
    const checkBox_state = element.checked;
    if (checkBox_state) {
        checkBox.next().append('<input name="village" type="text" class="input_no" placeholder="請輸入里別..."><span style="background: white;">里</span>');
    }
    else {
        checkBox.parent().find("input[name='village']").next().remove();
        checkBox.parent().find("input[name='village']").remove();
    }
}


//var 松山區 = ["三民路","五常街","健康路","光復北路","光復南路","八德路2段","八德路3段","八德路4段","北寧路","南京東路3段","南京東路4段","南京東路5段","吉祥路","基隆路1段","塔悠路","富錦街","寧安街","寶清街","市民大道4段","市民大道5段","市民大道6段","延吉街","延壽街","復興北路","復興南路1段","慶城街","撫遠街","敦化北路","敦化南路1段","新中街","新東街","東寧路","東興路","松山路","松河街","民族東路","民權東路3段","民權東路4段","民權東路5段","民生東路3段","民生東路4段","民生東路5段","濱江街","興安街","虎林街","長安東路2段","長春路","饒河街"];
//var 信義區 = ['中坡北路', '中坡南路', '仁愛路4段', '信安街', '信義路4段', '信義路5段', '信義路6段', '光復南路', '吳興街', '和平東路3段', '嘉興街', '基隆路1段', '基隆路2段', '大道路', '富陽街', '崇德街', '市府路', '市民大道5段', '市民大道6段', '忠孝東路4段', '忠孝東路5段', '文昌街', '景雲街', '東興路', '松仁路', '松信路', '松勇路', '松勤街', '松壽路', '松山路', '松平路', '松廉路', '松德路', '松智路', '松隆路', '松高路', '林口街', '永吉路', '瑞雲街', '祥雲街', '福德街', '紫雲街', '莊敬路', '菸廠路', '虎林街', '逸仙路', '青雲街'];
//var 大安區 = ['仁愛路3段', '仁愛路4段', '信義路2段', '信義路3段', '信義路4段', '光復南路', '八德路2段', '和平東路1段', '和平東路2段', '和平東路3段', '嘉興街', '四維路', '基隆路2段', '基隆路3段', '基隆路4段', '大安路1段', '大安路2段', '安和路1段', '安和路2段', '安居街', '安東街', '富陽街', '市民大道3段', '市民大道4段', '師大路', '延吉街', '建國南路1段', '建國南路2段', '復興南路1段', '復興南路2段', '忠孝東路3段', '忠孝東路4段', '愛國東路', '敦化南路1段', '敦化南路2段', '敦南街', '文昌街', '新生北路1段', '新生南路1段', '新生南路2段', '新生南路3段', '杭州南路2段', '東豐街', '樂利路', '樂業街', '永康街', '泰順街', '浦城街', '溫州街', '潮州街', '濟南路3段', '瑞安街', '羅斯福路2段', '羅斯福路3段', '羅斯福路4段', '臥龍街', '臨江街', '芳蘭路', '辛亥路1段', '辛亥路2段', '辛亥路3段', '通化街', '通安街', '金山南路2段', '金華街', '長興街', '雲和街', '青田街', '麗水街', '龍泉街'];
//var 中山區 = ['一江街', '中原街', '中山北路1段', '中山北路2段', '中山北路3段', '中山北路4段', '五常街', '伊通街', '內湖路1段', '八德路2段', '劍南路', '北安路', '南京東路1段', '南京東路2段', '南京東路3段', '南京西路', '合江街', '吉林路', '四平街', '基湖路', '堤頂大道2段', '大直街', '天津街', '天祥路', '安東街', '崇實路', '市民大道2段', '市民大道3段', '建國北路1段', '建國北路2段', '建國北路3段', '建國南路1段', '復興北路', '復興南路1段', '德惠街', '撫順街', '敬業一路', '敬業三路', '敬業二路', '敬業四路', '新生北路1段', '新生北路2段', '新生北路3段', '明水路', '朱崙街', '松江路', '林森北路', '植福路', '樂群三路', '樂群二路', '民族東路', '民族西路', '民權東路1段', '民權東路2段', '民權東路3段', '民權西路', '民生東路1段', '民生東路2段', '民生東路3段', '民生西路', '渭水路', '濱江街', '玉門街', '興安街', '華陰街', '農安街', '通北街', '遼寧街', '錦州街', '錦西街', '長安東路1段', '長安東路2段', '長安西路', '長春路', '雙城街', '龍江路'];
//var 中正區 = ['三元街', '中山北路1段', '中山南路', '中華路1段', '中華路2段', '丹陽街', '仁愛路1段', '仁愛路2段', '信義路1段', '信義路2段', '信陽街', '八德路1段', '公園路', '凱達格蘭大道', '北平東路', '北平西路', '南昌路1段', '南昌路2段', '南海路', '南陽街', '博愛路', '同安街', '和平西路1段', '和平西路2段', '大埔街', '天津街', '寧波東街', '寧波西街', '寶慶路', '市民大道1段', '市民大道2段', '市民大道3段', '師大路', '常德街', '廈門街', '廣州街', '延平南路', '徐州路', '忠孝東路1段', '忠孝東路2段', '忠孝西路1段', '思源街', '惠安街', '愛國東路', '愛國西路', '懷寧街', '新生南路1段', '晉江街', '杭州北路', '杭州南路1段', '杭州南路2段', '林森北路', '林森南路', '桃源街', '武昌街1段', '水源路', '永春街', '永綏街', '汀州路1段', '汀州路2段', '汀州路3段', '沅陵街', '泉州街', '泰安街', '湖口街', '漢口街1段', '潮州街', '濟南路1段', '濟南路2段', '牯嶺街', '福州街', '秀山街', '紹興北街', '紹興南街', '羅斯福路1段', '羅斯福路2段', '羅斯福路3段', '羅斯福路4段', '臨沂街', '自強市場第三棟', '莒光路', '衡陽路', '襄陽路', '西藏路', '許昌街', '詔安街', '貴陽街1段', '辛亥路1段', '連雲街', '酉陽街', '重慶南路1段', '重慶南路2段', '重慶南路3段', '金山北路', '金山南路1段', '金華街', '金門街', '銅山街', '鎮江街', '長沙街1段', '開封街1段', '青島東路', '青島西路', '館前路', '齊東街'];
//var 大同區 = ['五原路', '伊寧街', '保安街', '南京西路', '哈密街', '塔城街', '大龍街', '天水路', '太原路', '安西街', '寧夏路', '市民大道1段', '平陽街', '庫倫街', '延平北路1段', '延平北路2段', '延平北路3段', '延平北路4段', '忠孝西路2段', '承德路1段', '承德路2段', '承德路3段', '撫順街', '敦煌路', '昌吉街', '景化街', '歸綏街', '民族西路', '民樂街', '民權西路', '民生西路', '永昌街', '涼州街', '環河北路1段', '環河北路2段', '甘州街', '甘谷街', '興城街', '華亭街', '華陰街', '萬全街', '蘭州街', '西寧北路', '貴德街', '赤峰街', '迪化街1段', '迪化街2段', '通河西街1段', '鄭州路', '酒泉街', '重慶北路1段', '重慶北路2段', '重慶北路3段', '錦西街', '長安西路', '雙連街'];
//var 萬華區 = ['三水街', '中華路1段', '中華路2段', '內江街', '南寧路', '和平西路2段', '和平西路3段', '國興路', '大埔街', '大理街', '富民路', '寶興街', '峨眉街', '康定路', '廣州街', '德昌街', '忠孝西路2段', '成都路', '昆明街', '東園街', '柳州街', '桂林路', '梧州街', '武成街', '武昌街2段', '民和街', '水源路', '永福街', '汀州路1段', '洛陽街', '漢中街', '漢口街2段', '環河南路1段', '環河南路2段', '環河南路3段', '興寧街', '興義街', '艋舺大道', '莒光路', '華西街', '萬大路', '萬青街', '西園路1段', '西園路2段', '西寧南路', '西昌街', '西藏路', '貴陽街2段', '長沙街2段', '長泰街', '長順街', '開封街2段', '隆昌街', '雅江街', '雙和街', '雙園街', '青年路'];
//var 文山區 = ['一壽街', '三福街', '下崙路', '中崙路', '久康街', '仙岩路', '保儀路', '光輝路', '公館街', '和平東路4段', '和興路', '富山路', '忠順街1段', '忠順街2段', '恆光街', '指南路1段', '指南路2段', '指南路3段', '政大一街', '政大三街', '政大二街', '新光路1段', '新光路2段', '景中街', '景仁街', '景後街', '景文街', '景明街', '景福街', '景美街', '景興路', '景華街', '景豐街', '景隆街', '木新路2段', '木新路3段', '木柵路1段', '木柵路2段', '木柵路3段', '木柵路4段', '木柵路5段', '樟新街', '永安街', '汀州路4段', '溪口街', '溪洲街', '福興路', '秀明路1段', '秀明路2段', '羅斯福路4段', '羅斯福路5段', '羅斯福路6段', '老泉街', '育英街', '興德路', '興隆路1段', '興隆路2段', '興隆路3段', '興隆路4段', '興順街', '萬利街', '萬和街', '萬壽路', '萬安街', '萬寧街', '萬慶街', '萬盛街', '萬美街1段', '萬美街2段', '萬芳路', '萬隆街', '試院路', '車前路', '辛亥路4段', '辛亥路5段', '辛亥路6段', '辛亥路７段', '開元街', '集英街'];
//var 南港區 = ['三重路', '中南街', '中坡北路', '中坡南路', '八德路4段', '南深路', '南港路1段', '南港路2段', '南港路3段', '合順街', '同德路', '向陽路', '園區街', '富康街', '市民大道７段', '市民大道８段', '忠孝東路5段', '忠孝東路6段', '忠孝東路７段', '惠民街', '成功路1段', '成福路', '新民街', '昆陽街', '東南街', '東新街', '東明街', '松河街', '永吉路', '港東街', '玉成街', '研究院路1段', '研究院路2段', '研究院路3段', '研究院路4段', '福山街', '福德街', '經園街', '經貿一路', '經貿二路', '興中路', '興南街', '興東街', '興華路', '舊莊街1段', '舊莊街2段', '重陽路'];
//var 內湖區 = ['五分街', '內湖路1段', '內湖路2段', '內湖路3段', '南京東路6段', '基湖路', '堤頂大道1段', '堤頂大道2段', '大湖山莊街', '大湖街', '安康路', '安泰街', '安美街', '康寧路1段', '康寧路3段', '康樂街', '康湖路', '成功路2段', '成功路3段', '成功路4段', '成功路5段', '文德路', '文湖街', '新富街', '新明路', '新湖一路', '新湖三路', '新湖二路', '新豐街', '星雲街', '東湖路', '民善街', '民權東路6段', '永保街', '江南街', '洲子街', '港墘路', '港華街', '潭美街', '瑞光路', '瑞湖街', '環山路1段', '環山路2段', '環山路3段', '石潭路', '碧山路', '舊宗路1段', '舊宗路2段', '行善路', '行忠路', '行愛路', '金湖路', '金莊路', '金豐街', '金龍路', '陽光街', '麗山街'];
//var 士林區 = ['下樹林街', '中山北路4段', '中山北路5段', '中山北路6段', '中山北路７段', '中庸一路', '中庸二路', '中庸五路', '中正路', '中社路1段', '中社路2段', '中興街', '中華路', '仁民路', '仰德大道1段', '仰德大道2段', '仰德大道3段', '仰德大道4段', '倫等街', '光華路', '克強路', '凱旋路', '前港街', '前街', '劍南路', '劍潭路', '力行街', '和平路', '和豐街', '國泰街', '基河路', '士商路', '士東路', '大亨路', '大光街', '大北路', '大南路', '大東路', '大西路', '天母北路', '天母東路', '天母西路', '天玉街', '安平街', '小北街', '小南街', '小東街', '小西街', '平菁街', '幸福街', '延平北路5段', '延平北路6段', '延平北路７段', '延平北路８段', '延平北路９段', '建業路', '後港街', '後街', '德行東路', '德行西路', '志成街', '忠勇街', '忠義街', '忠誠路1段', '忠誠路2段', '愛富一街', '愛富三街', '愛富三街長生巷', '愛富二街', '愛富二街厚生巷', '愛富二街樂生巷', '承德路4段', '承德路5段', '故宮路', '文昌路', '文林路', '新園街', '新安路', '明溪街', '東山路', '格致路', '永公路', '永平街', '環河北路3段', '磺溪街', '社中街', '社子街', '社正路', '福國路', '福壽街', '福德路', '福志路', '福林路', '福榮街', '福港街', '福華路', '竹子湖路', '美崙街', '美德街', '翠山街', '臨溪路', '自祥街', '至善路1段', '至善路2段', '至善路3段', '至誠路1段', '至誠路2段', '芝玉路1段', '芝玉路2段', '莊頂路', '菁山路', '華光街', '華岡路', '華榮街', '華聲街', '華興街', '華齡街', '葫東街', '葫蘆街', '貴富街', '通河東街1段', '通河東街2段', '通河街', '通河西街1段', '通河西街2段', '重慶北路4段', '長春街', '陽明路1段', '陽明路2段', '雙溪街', '雨聲街', '雨農路'];
//var 北投區 = ['一德街', '一心路', '七星街', '三合街1段', '三合街2段', '中和街', '中和街新建巷', '中和街錫安巷', '中央北路1段', '中央北路2段', '中央北路3段', '中央北路4段', '中央南路1段', '中央南路2段', '中山北路７段', '中山路', '中心街', '中正街', '中興路', '中華街', '光明路', '光明路新生巷', '公舘路', '勝利街', '北投路1段', '北投路2段', '吉利街', '同德街', '大同街', '大屯路', '大屯路光華一巷', '大屯路光華三巷', '大屯路光華二巷', '大屯路光華四巷', '大度路', '大度路怡和巷', '大度路3段', '大業路', '大興街', '天母北路', '天母西路', '奇岩路', '奉賢路', '學園路', '宜山路', '富貴一路', '實踐街', '尊賢街', '崇仁路1段', '崇仰一路', '崇仰七路', '崇仰三路', '崇仰九路', '崇仰二路', '崇仰五路', '崇仰六路', '崗山路', '幽雅路', '幽雅路杏林巷', '建國街', '建民路', '復興一路', '復興三路', '復興二路', '復興四路', '懷德街', '承德路6段', '承德路７段', '振興街', '振華街', '文化三路', '文林北路', '新市街', '新民路', '新民路康樂巷', '新民路香丘巷', '新生街', '新興路', '明德路', '杏林一路', '杏林三路', '杏林二路', '東昇路', '東華街1段', '東華街2段', '東陽街', '榮華一路', '榮華三路', '榮華二路', '樹林路', '民族街', '民權街', '永興路1段', '永興路2段', '泉源路', '泉源路華南巷', '洲美街', '清江路', '湖山路1段', '湖山路2段', '湖底路', '溫泉路', '溫泉路天主巷', '溫泉路湯元巷', '溫泉路銀光巷', '珠海路', '登山路', '知行路', '石仙路', '石牌路1段', '石牌路2段', '磺港路', '福美路', '秀山路', '稻香路', '立功街', '立德路', '立賢路', '立農街1段', '立農街2段', '竹子湖路', '紗帽路', '義方街', '義理街', '翠宜路', '翠嶺路', '翠華街', '翠雲街', '聖景路', '育仁路', '自強街', '致遠一路1段', '致遠一路2段', '致遠三路', '致遠二路', '行義路', '裕民一路', '裕民三路', '裕民二路', '裕民六路', '裕民四路', '西園街', '西安街1段', '西安街2段', '豐年路1段', '豐年路2段', '進賢路', '重三路', '長壽路', '開明街', '關渡路', '陽明路1段', '陽明路2段', '雙全街'];

var district;
var street;
var facility;


window.onload = async ()=>{
    try {
        const address = await fetch("http://120.126.17.213:58095/query/address").then(res => {
            return res.json();
        });
        const result = await fetch("http://120.126.17.213:58095/query/facility").then(res => {
            return res.json();
        });
        district = address["district"];
        street = address["street"];
        facility = result;
        for (var i=0; i<district.length; i++) {
            $("select[name='district']").append(`<option value='${district[i][1]}'>${district[i][0]} ${district[i][1]}</option>`)
        }
        console.log(facility);
    }  
    catch(e) {
        console.log(e);
    }
}

//might have to add asyncalize
function submitQuery(element) {
    var target_form = $(`#${element.id}`).parent();
    var query = decodeURI(target_form.serialize());
    var url = "http://120.126.17.213:58095/query?"+query;
    var number_input_id = $(`#${element.id}`).parent().find(".input_no")[0].id;
    var number = parseInt($(`#${number_input_id}`).val());
    
    console.log(query);
    if (query.search("default") != -1) {
        return $(`#${element.id}`).parent().append("<h3 style='color: red;'>所有選項皆不能留空。</h3>");
    }
    else if(!checkNumber(number)) {
        return $(`#${element.id}`).parent().append("<h3 style='color: red;'>需輸入正確的街號。</h3>");
    }
    else {
        $(`#${element.id}`).parent().find("h3").empty();
        $(`#${element.id}`).prop("disabled", true);
        $(`#${element.id}`).prop("value", "Loading...");
        console.log("Fetching data from flask api server\n", url);
        $.getJSON(url, () => {
            console.log("data received.");
        }).done((data) => {
            showResult(data, element);
        }).fail((msg) => {
            $(`#${element.id}`).prop("value", "Submit");
            $(`#${element.id}`).prop("disabled", false);
            alert("connection failed, please try again.");
            //document.location.reload(true);
            console.log(msg);
        }).always(() => {
            getAllData(url, element);
            console.log("Close connection with flask api server");
        });
    }
}

async function getAllData(url, element) {
    try {
        const data = await fetch(url).then(res => {
            return res.json();
        });
        showResult(data, element);
    }
    catch(e) {
        console.log(e);
    }
}

function showResult(data, element) {
    var district_select_id = $(`#${element.id}`).parent().find(".form-select")[0].id;
    var street_select_id = $(`#${element.id}`).parent().find(".form-select")[1].id;
    var number_input_id = $(`#${element.id}`).parent().find(".input_no")[0].id;
    
    var district = $(`#${district_select_id}`).val();
    var street = $(`#${street_select_id}`).val();
    var number = $(`#${number_input_id}`).val();

    const address = district+street+number+"號";

    entertainment = {
        shopping_mall: data[0].shopping_mall.length,
        business_district: data[0].business_district.length,
        outlet: data[0].outlet.length,
        underground_market: data[0].underground_market.length
    }

    traffic = {
        bus_stop: data[1].bus_stop.length,
        metro: data[1].metro.length,
        train: data[1].train.length,
        high_speed_rail: data[1].high_speed_rail.length,
        YouBike: data[1].YouBike.length,

    }

    activity = {
        activity_center: data[2].activity_center.length,
        gymroom: data[2].gymroom.length,
        riverside_park: data[2].riverside_park.length
    }

    catering = {
        green_resteruant: data[3].green_resteruant.length,
        night_market: data[3].night_market.length
    }

    medical = {
        clinic: data[4].ALLclinic.length,
        hospital: data[4].hospital.length
    }

    pet_friendly = {
        pet_hospital: data[5].pet_hospital.length,
        pet_clinic: data[5].pet_clinic.length,
        pet_park: data[5].pet_park.length,
        pet_resteruant: data[5].pet_resteruant.length
    }

    enviorment = {
        park: data[6].park.length,
        sidewalk_tree: data[6].sidewalk_tree.length
    }

    security = {
        crime_bike: data[7].bike.length,
        crime_motor: data[7].motor.length,
        crime_car: data[7].car.length,
        crime_house: data[7].house_burglary.length,
        crime_robbery: data[7].robbery.length,
        crime_burglary: data[7].burglary.length
    }

    garbage = {
        garbageCar_station: data[8].garbage_car[0].length
    }

    totalAmount = data[9]

    const rate = communityRate(entertainment, catering, traffic, activity, enviorment, medical, security, pet_friendly, totalAmount);

    var template = `<div>
        <div>地址：${address}</div>
        <div class="amount_title">
            <p class="amount_entertain">百貨公司：${entertainment.shopping_mall}</p>
            <p class="amount_entertain">商圈：${entertainment.business_district}</p>
            <p class="amount_entertain">大賣場：${entertainment.outlet}</p>
            <p class="amount_entertain">地下商店街：${entertainment.underground_market}</p>
        </div>
        <div class="amount_title">
            <p class="amount_traffic">公車站：${traffic.bus_stop}</p>
            <p class="amount_traffic">捷運站：${traffic.metro}</p>
            <p class="amount_traffic">YouBike站：${traffic.YouBike}</p>
            <p class="amount_traffic">火車站：${traffic.train}</p>
            <p class="amount_traffic">高鐵站：${traffic.high_speed_rail}</p>
        </div>
        <div class="amount_title">
            <p class="amount_activity">區民運動中心：${activity.activity_center}</p>
            <p class="amount_activity">健身房：${activity.gymroom}</p>
            <p class="amount_activity">河濱公園：${activity.riverside_park}</p>
        </div>
        <div class="amount_title">
            <p class="amount_meal">綠色餐廳：${catering.green_resteruant}</p>
            <p class="amount_meal">夜市：${catering.night_market}</p>
        </div>
        <div class="amount_title">
            <p class="amount_medical">醫院：${medical.hospital}</p>
            <p class="amount_medical">診所：${medical.clinic}</p>
        </div>
        <div class="amount_title">
            <p class="amount_enviorment">公園：${enviorment.park}</p>
            <p class="amount_enviorment">行道樹：${enviorment.sidewalk_tree}</p>
        </div>
        <div class="amount_title">
            <p class="amount_petFriendly">寵物醫院：${pet_friendly.pet_hospital}</p>
            <p class="amount_petFriendly">寵物診所：${pet_friendly.pet_clinic}</p>
            <p class="amount_petFriendly">寵物公園：${pet_friendly.pet_park}</p>
            <p class="amount_petFriendly">寵物餐廳：${pet_friendly.pet_resteruant}</p>
        </div>
        <div class="amount_title">
            <p class="amount_public_facility">垃圾車站點：${garbage.garbageCar_station}</p>
        </div>
        <div>社區評分：</div>
        <div class="community_rate">
            <div>娛樂：</div><div class="progress-bar" role="progressbar" style="width: ${rate.entertain}%; background-color: pink;"></div><div>${Math.round(rate.entertain*100)/100}%</div>
            <div>食：</div><div class="progress-bar" role="progressbar" style="width: ${rate.catering}%; background-color: lightblue;"></div><div>${Math.round(rate.catering*100)/100}%</div>
            <div>交通：</div><div class="progress-bar" role="progressbar" style="width: ${rate.traffic}%; background-color: yellow;"></div><div>${Math.round(rate.traffic*100)/100}%</div>
            <div>運動：</div><div class="progress-bar" role="progressbar" style="width: ${rate.activity}%; background-color: rgb(196, 0, 196);"></div><div>${Math.round(rate.activity*100)/100}%</div>
            <div>醫療：</div><div class="progress-bar" role="progressbar" style="width: ${rate.medical}%; background-color: rgb(89, 190, 230);"></div><div>${Math.round(rate.medical*100)/100}%</div>
            <div>綠化：</div><div class="progress-bar" role="progressbar" style="width: ${rate.enviorment}%; background-color: limegreen;"></div><div>${Math.round(rate.enviorment*100)/100}%</div>
            <div>治安：</div><div class="progress-bar" role="progressbar" style="width: ${rate.security}%; background-color: orange;"></div><div>${Math.round(rate.security*100)/100}%</div>
            <div>寵物友善：</div><div class="progress-bar" role="progressbar" style="width: ${rate.pet_friendly}%; background-color: burlywood;"></div><div>${Math.round(rate.pet_friendly*100)/100}%</div>
        </div>
    </div>`

    $(`#${element.id}`).parent().parent().css("margin-top","0");
    $(`#${element.id}`).parent().parent().css("text-align","center");
    $(`#${element.id}`).parent().parent().html(template);

    showDetail(address, data);
}

function communityRate(entertain, catering, traffic, activity, enviorment, medical, security, pet_friendly, total) {
    var entertain_rate;
    var catering_rate;
    var traffic_rate;
    var activity_rate;
    var enviorment_rate;
    var medical_rate;
    var security_rate;
    var pet_friendly_rate;
    
    entertain_current = (parseInt(entertain.shopping_mall, 10)*4) + (parseInt(entertain.business_district, 10)*3) + (parseInt(entertain.outlet, 10)*2) + (parseInt(entertain.underground_market, 10));
    entertain_rate = (entertain_current / parseInt(total.entertain)) * 100;

    catering_current = (parseInt(catering.green_resteruant, 10)*3) + (parseInt(catering.night_market, 10)*7);
    catering_rate = (catering_current / parseInt(total.catering)) * 100;

    traffic_current = (parseInt(traffic.high_speed_rail, 10)*3) + (parseInt(traffic.train, 10)*3) + (parseInt(traffic.metro, 10)*2) + (parseInt(traffic.YouBike, 10)*1.5) + (parseInt(traffic.bus_stop, 10)*0.5);
    traffic_rate = (traffic_current / parseInt(total.traffic)) * 100;
    
    activity_current = (parseInt(activity.activity_center, 10)*2) + (parseInt(activity.gymroom, 10)*4) + (parseInt(activity.riverside_park, 10)*4);
    activity_rate = (activity_current / parseInt(total.activity)) * 100;

    enviorment_current = (parseInt(enviorment.park, 10)*8) + (parseInt(enviorment.sidewalk_tree, 10)*2);
    enviorment_rate = (enviorment_current / parseInt(total.enviorment)) * 100;

    medical_current = (parseInt(medical.clinic, 10)*0.5) + (parseInt(medical.hospital, 10)*6);
    medical_rate = (medical_current / parseInt(total.medical)) * 100;

    security_current = (parseInt(security.crime_bike) + parseInt(security.crime_motor) + parseInt(security.crime_car) + parseInt(security.crime_house) + parseInt(security.crime_robbery) + parseInt(security.crime_burglary));
    security_rate = (security_current / parseInt(total.security)) * 100;

    pet_friendly_current = (parseInt(pet_friendly.pet_clinic, 10)*5) + (parseInt(pet_friendly.pet_park, 10)*3) + (parseInt(pet_friendly.pet_resteruant, 10));
    pet_friendly_rate = (pet_friendly_current / parseInt(total.pet)) * 100;

    console.log(entertain_rate, catering_rate, traffic_rate, activity_rate, enviorment_rate, medical_rate, security_rate, pet_friendly_rate);

    return {
        entertain: entertain_rate,
        catering: catering_rate,
        traffic: traffic_rate,
        activity: activity_rate,
        enviorment: enviorment_rate,
        medical: medical_rate,
        security: security_rate,
        pet_friendly: pet_friendly_rate
    }
}

function showDetail(address, data) {

    var entertainment = [[],[],[],[]];
    var traffic = [[],[],[],[],[]];
    var catering = [[],[]];
    var activity = [[],[],[]];
    var enviorment = [[],[]];
    var medical= [[],[]];
    var pet_friendly = [[],[],[],[]];
    var security = [[],[],[],[],[],[]];
    var garbageCar = [];

    //for (var i=0; i < data[0].shopping_mall.length; i++) {
    //    entertainment.push(data[0].shopping_mall[i]);
    //}

    //console.log(entertainment);

    for (var key in data[0]) {
        if (key == "shopping_mall") {
            for (var j=0; j < data[0][key].length; j++) {
                entertainment[0].push(data[0].shopping_mall[j]);
            }
        }
        else if (key == "business_district") {
            for (var j=0; j < data[0][key].length; j++) {
                entertainment[1].push(data[0].business_district[j]);
            }
        }
        else if (key == "outlet") {
            for (var j=0; j < data[0][key].length; j++) {
                entertainment[2].push(data[0].outlet[j]);
            }
        }
        else if (key == "underground_market") {
            for (var j=0; j < data[0][key].length; j++) {
                entertainment[3].push(data[0].underground_market[j]);
            }
        }
    }

    for (var key in data[1]) {
        if (key == "bus_stop") {
            for (var j=0; j < data[1][key].length; j++) {
                traffic[0].push(data[1].bus_stop[j]);
            }
        }
        else if (key == "metro") {
            for (var j=0; j < data[1][key].length; j++) {
                traffic[1].push(data[1].metro[j]);
            }
        }
        else if (key == "train") {
            for (var j=0; j < data[1][key].length; j++) {
                traffic[2].push(data[1].train[j]);
            }
        }
        else if (key == "high_speed_rail") {
            for (var j=0; j < data[1][key].length; j++) {
                traffic[3].push(data[1].high_speed_rail[j]);
            }
        }
        else if (key == "YouBike") {
            for (var j=0; j < data[1][key].length; j++) {
                traffic[4].push(data[1].YouBike[j]);
            }
        }
    }

    for (var key in data[2]) {
        if (key == "activity_center") {
            for (var j=0; j < data[2][key].length; j++) {
                activity[0].push(data[2].activity_center[j]);
            }
        }
        else if (key == "gymroom") {
            for (var j=0; j < data[2][key].length; j++) {
                activity[1].push(data[2].gymroom[j]);
            }
        }
        else if (key == "riverside_park") {
            for (var j=0; j < data[2][key].length; j++) {
                activity[2].push(data[2].riverside_park[j]);
            }
        }
    }

    for (var key in data[3]) {
        if (key == "green_resteruant") {
            for (var j=0; j < data[3][key].length; j++) {
                catering[0].push(data[3].green_resteruant[j]);
            }
        }
        else if (key == "night_market") {
            for (var j=0; j < data[3][key].length; j++) {
                catering[1].push(data[3].night_market[j]);
            }
        }
    }

    for (var key in data[4]) {
        if (key == "hosptial") {
            for (var j=0; j < data[4][key].length; j++) {
                medical[0].push(data[4].hosptial[j]);
            }
        }
        else if (key == "ALLclinic") {
            for (var j=0; j < data[4][key].length; j++) {
                medical[1].push(data[4].ALLclinic[j]);
            }
        }
    }

    for (var key in data[5]) {
        if (key == "pet_clinic") {
            for (var j=0; j < data[5][key].length; j++) {
                pet_friendly[0].push(data[5].pet_clinic[j]);
            }
        }
        else if (key == "pet_park") {
            for (var j=0; j < data[5][key].length; j++) {
                pet_friendly[1].push(data[5].pet_park[j]);
            }
        }
        else if (key == "pet_resteruant") {
            for (var j=0; j < data[5][key].length; j++) {
                pet_friendly[2].push(data[5].pet_resteruant[j]);
            }
        }
        else if (key == "pet_hospital") {
            for (var j=0; j < data[5][key].length; j++) {
                pet_friendly[3].push(data[5].pet_hospital[j]);
            }
        }
    }

    for (var key in data[6]) {
        if (key == "park") {
            for (var j=0; j < data[6][key].length; j++) {
                enviorment[0].push(data[6].park[j]);
            }
        }
        else if (key == "sidewalk_tree") {
            for (var j=0; j < data[6][key].length; j++) {
                enviorment[1].push(data[6].sidewalk_tree[j]);
            }
        }
    }

    for (var key in data[7]) {
        if (key == "bike") {
            for (var j=0; j < data[7][key].length; j++) {
                security[0].push(data[7].bike[j]);
            }
        }
        else if (key == "motor") {
            for (var j=0; j < data[7][key].length; j++) {
                security[1].push(data[7].motor[j]);
            }
        }
        else if (key == "car") {
            for (var j=0; j < data[7][key].length; j++) {
                security[2].push(data[7].car[j]);
            }
        }
        else if (key == "house") {
            for (var j=0; j < data[7][key].length; j++) {
                security[3].push(data[7].house_burglary[j]);
            }
        }
        else if (key == "robbery") {
            for (var j=0; j < data[7][key].length; j++) {
                security[4].push(data[7].robbery[j]);
            }
        }
        else if (key == "burglary") {
            for (var j=0; j < data[7][key].length; j++) {
                security[5].push(data[7].burglary[j]);
            }
        }
    }

    for (var key in data[7]) {
        if (key == "garbage_car") {
            for (var j=0; j < data[8][key].length; j++) {
                garbageCar[0].push(data[8].garbage_car[j]);
            }
        }
    }

    const template = `<h3>${address}</h3>
    <div class="details">
        <div class="category" id="catering">
            <div id="green_resteruant">
                <table>
                    <thead>
                        <h5>綠色餐廳</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>電話</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="green_resteruant_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="night_market">
                <table>
                    <thead>
                        <h5>夜市</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="night_market_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="category" id="entertainment">
            <div id="shopping_mall">
                <table>
                    <thead>
                        <h5>百貨公司</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>品牌</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="shopping_mall_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="business_district">
                <table>
                    <thead>
                        <h5>購物商圈</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="business_district_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="market">
                <table>
                    <thead>
                        <h5>大賣場</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>品牌</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="market_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="underground_market">
                <table>
                    <thead>
                        <h5>地下購物街</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="underground_market_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="category" id="traffic">
            <div id="busstop">
                <table>
                    <thead>
                        <h5>公車站</h5>
                        <tr>
                            <th>名稱</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="busstop_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="metro">
                <table>
                    <thead>
                        <h5>捷運站</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>路線</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="metro_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="youbike">
                <table>
                    <thead>
                        <h5>YouBike站</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="youbike_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="train">
                <table>
                    <thead>
                        <h5>火車站</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="train_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="highspreedrail">
                <table>
                    <thead>
                        <h5>高鐵站</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="highspeedrail_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="category" id="medical">
            <div id="hospital">
                <table>
                    <thead>
                        <h5>醫院</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>類型</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="hospital_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="clinic">
                <table>
                    <thead>
                        <h5>診所</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>類型</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="clinic_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="category" id="activity">
            <div id="gymroom">
                <table>
                    <thead>
                        <h5>健身房</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>電話</th>
                            <th>營業時間</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="gymroom_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="activity_center">
                <table>
                    <thead>
                        <h5>區民活動中心</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="activity_center_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="riverside_park">
                <table>
                    <thead>
                        <h5>河濱公園</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>河濱</th>
                            <th>停車場</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="riverside_park_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="category" id="enviorment">
            <div id="park">
                <table>
                    <thead>
                        <h5>公園</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="park_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="sidewalk_tree">
                <table>
                    <thead>
                        <h5>行道樹</h5>
                        <tr>
                            <th>地區</th>
                            <th>樹ID</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="sidewalk_tree_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="category" id="pet">
            <div id="pet_hospital">
                <table>
                    <thead>
                    <h5>寵物醫院</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="pet_hospital_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="pet_clinic">
                <table>
                    <thead>
                    <h5>寵物診所</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="pet_clinic_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="pet_park">
                <table>
                    <thead>
                    <h5>寵物公園</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="pet_park_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="pet_resteruant">
                <table>
                    <thead>
                    <h5>寵物餐廳</h5>
                        <tr>
                            <th>地區</th>
                            <th>名稱</th>
                            <th>地址</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="pet_resteruant_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="category" id="crime">
            <div id="case">
                <table>
                    <thead>
                        <h5>案件</h5>
                        <tr>
                            <th>地區</th>
                            <th>類型</th>
                            <th>地址</th>
                            <th>日期</th>
                            <th>時間</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="crime_case_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="category" id="garbage">
            <div id="garbage_route">
                <table>
                    <thead>
                        <h5>垃圾車站點</h5>
                        <tr>
                            <th>里別</th>
                            <th>抵達時間</th>
                            <th>離開時間</th>
                            <th>地點</th>
                            <th>距離(km)</th>
                        </tr>
                    </thead>
                    <tbody id="garbageCar_data">
                        <tr>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `
    $("#result_section").append(template);

    console.log(
        entertainment,
        traffic,
        catering,
        activity,
        enviorment,
        medical,
        pet_friendly,
        security,
        garbageCar
        );


    for (var i=0; i<entertainment[0].length; i++) {
        $("#shopping_mall_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (entertainment[0][i].length) {
            for (var j=0; j<entertainment[0][i].length; j++) {
                $("#shopping_mall_data tr:last").append(`<td>${entertainment[0][i][j]}</td>`);
            }
        }
        else {
            $("#shopping_mall_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<entertainment[1].length; i++) {
        $("#business_district_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (entertainment[1][i].length) {
            for (var j=0; j<entertainment[1][i].length; j++) {
                $("#business_district_data tr:last").append(`<td>${entertainment[1][i][j]}</td>`);
            }
        }
        else {
            $("#business_district_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<entertainment[2].length; i++) {
        $("#market_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (entertainment[2][i].length) {
            for (var j=0; j<entertainment[2][i].length; j++) {
                $("#market_data tr:last").append(`<td>${entertainment[2][i][j]}</td>`);
            }
        }
        else {
            $("#market_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<entertainment[3].length; i++) {
        $("#undergroundmarket__data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (entertainment[3][i].length) {
            for (var j=0; j<entertainment[3][i].length; j++) {
                $("#underground_market_data tr:last").append(`<td>${entertainment[3][i][j]}</td>`);
            }
        }
        else {
            $("#underground_market_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<traffic[0].length; i++) {
        $("#busstop_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (traffic[0][i].length) {
            for (var j=0; j<traffic[0][i].length; j++) {
                $("#busstop_data tr:last").append(`<td>${traffic[0][i][j]}</td>`);
            }
        }
        else {
            $("#busstop_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<traffic[1].length; i++) {
        $("#metro_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (traffic[1][i].length) {
            for (var j=0; j<traffic[1][i].length; j++) {
                $("#metro_data tr:last").append(`<td>${traffic[1][i][j]}</td>`);
            }
        }
        else {
            $("#metro_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<traffic[2].length; i++) {
        $("#train_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (traffic[2][i].length) {
            for (var j=0; j<traffic[2][i].length; j++) {
                $("#train_data tr:last").append(`<td>${traffic[2][i][j]}</td>`);
            }
        }
        else {
            $("#train_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<traffic[3].length; i++) {
        $("#high_speed_rail_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (traffic[3][i].length) {
            for (var j=0; j<traffic[3][i].length; j++) {
                $("#high_speed_rail_data tr:last").append(`<td>${traffic[3][i][j]}</td>`);
            }
        }
        else {
            $("#high_speed_rail_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<traffic[4].length; i++) {
        $("#YouBike_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (traffic[4][i].length) {
            for (var j=0; j<traffic[4][i].length; j++) {
                $("#YouBike_data tr:last").append(`<td>${traffic[4][i][j]}</td>`);
            }
        }
        else {
            $("#YouBike_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<activity[0].length; i++) {
        $("#activity_center_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (activity[0][i].length) {
            for (var j=0; j<activity[0][i].length; j++) {
                $("#activity_center_data tr:last").append(`<td>${activity[0][i][j]}</td>`);
            }
        }
        else {
            $("#activity_center_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<activity[1].length; i++) {
        $("#gymroom_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (activity[1][i].length) {
            for (var j=0; j<activity[1][i].length; j++) {
                $("#gymroom_data tr:last").append(`<td>${activity[1][i][j]}</td>`);
            }
        }
        else {
            $("#gymroom_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<activity[2].length; i++) {
        $("#riverside_park_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (activity[2][i].length) {
            for (var j=0; j<activity[2][i].length; j++) {
                $("#riverside_park_data tr:last").append(`<td>${activity[2][i][j]}</td>`);
            }
        }
        else {
            $("#riverside_park_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<catering[0].length; i++) {
        $("#green_resteruant_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (catering[0][i].length) {
            for (var j=0; j<catering[0][i].length; j++) {
                $("#green_resteruant_data tr:last").append(`<td>${catering[0][i][j]}</td>`);
            }
        }
        else {
            $("#green_resteruant_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<catering[1].length; i++) {
        $("#night_market_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (catering[1][i].length) {
            for (var j=0; j<catering[1][i].length; j++) {
                $("#night_market_data tr:last").append(`<td>${catering[1][i][j]}</td>`);
            }
        }
        else {
            $("#business_district_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<medical[0].length; i++) {
        $("#clinic_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (medical[0][i].length) {
            for (var j=0; j<medical[0][i].length; j++) {
                $("#clinic_data tr:last").append(`<td>${medical[0][i][j]}</td>`);
            }
        }
        else {
            $("#clinic_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<medical[1].length; i++) {
        $("#hospital_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (medical[1][i].length) {
            for (var j=0; j<medical[1][i].length; j++) {
                $("#hospital_data tr:last").append(`<td>${medical[1][i][j]}</td>`);
            }
        }
        else {
            $("#hospital_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<pet_friendly[0].length; i++) {
        $("#pet_clinic_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (pet_friendly[0][i].length) {
            for (var j=0; j<pet_friendly[0][i].length; j++) {
                $("#pet_clinic_data tr:last").append(`<td>${pet_friendly[0][i][j]}</td>`);
            }
        }
        else {
            $("#pet_clinic_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<pet_friendly[1].length; i++) {
        $("#pet_park_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (pet_friendly[1][i].length) {
            for (var j=0; j<pet_friendly[1][i].length; j++) {
                $("#pet_park_data tr:last").append(`<td>${pet_friendly[1][i][j]}</td>`);
            }
        }
        else {
            $("#pet_park_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<pet_friendly[2].length; i++) {
        $("#pet_resteruant_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (pet_friendly[2][i].length) {
            for (var j=0; j<pet_friendly[2][i].length; j++) {
                $("#pet_resteruant_data tr:last").append(`<td>${pet_friendly[2][i][j]}</td>`);
            }
        }
        else {
            $("#pet_resteruant_data").prop("hidden", true);
            break;
        }
    }
    
    for (var i=0; i<security[0].length; i++) {
        $("#crime_case_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (security[0][i].length) {
            for (var j=0; j<security[0][i].length; j++) {
                $("#crime_case_data tr:last").append(`<td>${security[0][i][j]}</td>`);
            }
        }
        else {
            $("#crime_case_data").prop("hidden", true);
            break;
        }
    }

    for (var i=0; i<garbageCar.length; i++) {
        $("#garbageCar_data").append(`<tr id="row${+(parseInt(i)+1)}"></tr>`);
        if (garbageCar[0][i].length) {
            for (var j=0; j<garbageCar[i].length; j++) {
                $("#garbageCar_data tr:last").append(`<td>${garbageCar[i][j]}</td>`);
            }
        }
        else {
            $("#garbageCar_data").prop("hidden", true);
            break;
        }
    }

    $("#market_data").find("tbody").find("tr").append(`<td>YOOOY</td>`);

    
    
    $("#result_section").prop("hidden", false);



}

function checkNumber(x) {

    if(typeof x == 'number' && !isNaN(x)){
    
        if (Number.isInteger(x)) {
            return true;
        }
        else {
            return false;
        }
    
    } else {
        return false;
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

function result_filter(element) {
    var name = $(`#${element.id}`).attr("name");
    if ($(`#${element.id}`).is(":checked")) {
        $(`#${name}`).prop("hidden", true);
    }
    else {
        $(`#${name}`).prop("hidden", false);
    }
}

function selectAll(element) {
    if ($(`#${element.id}`).is(":checked")) {
        $(".filter_btn").prop("checked", true);
        $(".category").prop("hidden", true);
    }
    else {
        $(".filter_btn").prop("checked", false);
        $(".category").prop("hidden", false);
    }
}