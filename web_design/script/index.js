

function addForm() {
    var element_length = $("#form_gallery").children("div").length;
    var template = `<div class="queryForm" id="form${element_length+1}">
                    <div><button id="cancel_btn${element_length+1}" class="cancelForm_btn" onclick="removeForm(this)">X</button></div>
                    <div id="temp_form">
                        <form action="" method="post">
                            <label for="address" class="form-label">目標地址：</label>
                            <select name="district" style="display: inline-flex; width: 80%;" class="form-select" id="district${element_length+1}" onchange="checkDistrict(this)">
                                <option value="default" selected>請選擇區域</option>
                                <option value="中正區">中正區</option>
                                <option value="大同區">大同區</option>
                                <option value="中山區">中山區</option>
                                <option value="松山區">松山區</option>
                                <option value="大安區">大安區</option>
                                <option value="萬華區">萬華區</option>
                                <option value="信義區">信義區</option>
                                <option value="士林區">士林區</option>
                                <option value="北投區">北投區</option>
                                <option value="內湖區">內湖區</option>
                                <option value="南港區">南港區</option>
                                <option value="文山區">文山區</option>
                            </select>
                            <select name="street" style="display: inline-flex; width: 80%;" class="form-select" id="street${element_length+1}">
                                <option value="default" selected>請選擇街道</option>
                            </select>
                            <input name="number" type="text" class="input_no" id="street_no_${element_length+1}" placeholder="請輸入街號">
                            <label for="range" class="form-label">搜尋範圍：</label>
                            <select name="range" style="display: inline-flex; width: 80%;" class="form-select" id="range${element_length+1}">
                                <option value="default" selected>請選擇距離</option>
                                <option value="1">1公里</option>
                                <option value="3">3公里</option>
                                <option value="5">5公里</option>
                            </select>
                            <input id="submit_btn${element_length+1}" class="btn btn-primary" type="button" value="submit" style="margin-top: 50px;" onclick="submitQuery(this)">
                        </form>
                    </div>
                </div>`;
    $("#addForm").blur();

    if (element_length == 4) {
        $("#gallery").find("#addForm").css("display", "none");
    }
    return $(`#form${element_length}`).after(template);
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
    if (district == "松山區") {
        松山區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "信義區") {
        信義區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "大安區") {
        大安區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "中山區") {
        中山區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "中正區") {
        中正區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "大同區") {
        大同區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "萬華區") {
        萬華區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "文山區") {
        文山區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "南港區") {
        南港區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "內湖區") {
        內湖區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "士林區") {
        士林區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
    else if (district == "北投區") {
        北投區.forEach(element => {
            street_select_tag.append(`<option value='${element}'>${element}</option>`);
        });
    }
}

var 松山區 = ["三民路","五常街","健康路","光復北路","光復南路","八德路２段","八德路３段","八德路４段","北寧路","南京東路３段","南京東路４段","南京東路５段","吉祥路","基隆路１段","塔悠路","富錦街","寧安街","寶清街","市民大道４段","市民大道５段","市民大道６段","延吉街","延壽街","復興北路","復興南路１段","慶城街","撫遠街","敦化北路","敦化南路１段","新中街","新東街","東寧路","東興路","松山路","松河街","民族東路","民權東路３段","民權東路４段","民權東路５段","民生東路３段","民生東路４段","民生東路５段","濱江街","興安街","虎林街","長安東路２段","長春路","饒河街"];
var 信義區 = ['中坡北路', '中坡南路', '仁愛路４段', '信安街', '信義路４段', '信義路５段', '信義路６段', '光復南路', '吳興街', '和平東路３段', '嘉興街', '基隆路１段', '基隆路２段', '大道路', '富陽街', '崇德街', '市府路', '市民大道５段', '市民大道６段', '忠孝東路４段', '忠孝東路５段', '文昌街', '景雲街', '東興路', '松仁路', '松信路', '松勇路', '松勤街', '松壽路', '松山路', '松平路', '松廉路', '松德路', '松智路', '松隆路', '松高路', '林口街', '永吉路', '瑞雲街', '祥雲街', '福德街', '紫雲街', '莊敬路', '菸廠路', '虎林街', '逸仙路', '青雲街'];
var 大安區 = ['仁愛路３段', '仁愛路４段', '信義路２段', '信義路３段', '信義路４段', '光復南路', '八德路２段', '和平東路１段', '和平東路２段', '和平東路３段', '嘉興街', '四維路', '基隆路２段', '基隆路３段', '基隆路４段', '大安路１段', '大安路２段', '安和路１段', '安和路２段', '安居街', '安東街', '富陽街', '市民大道３段', '市民大道４段', '師大路', '延吉街', '建國南路１段', '建國南路２段', '復興南路１段', '復興南路２段', '忠孝東路３段', '忠孝東路４段', '愛國東路', '敦化南路１段', '敦化南路２段', '敦南街', '文昌街', '新生北路１段', '新生南路１段', '新生南路２段', '新生南路３段', '杭州南路２段', '東豐街', '樂利路', '樂業街', '永康街', '泰順街', '浦城街', '溫州街', '潮州街', '濟南路３段', '瑞安街', '羅斯福路２段', '羅斯福路３段', '羅斯福路４段', '臥龍街', '臨江街', '芳蘭路', '辛亥路１段', '辛亥路２段', '辛亥路３段', '通化街', '通安街', '金山南路２段', '金華街', '長興街', '雲和街', '青田街', '麗水街', '龍泉街'];
var 中山區 = ['一江街', '中原街', '中山北路１段', '中山北路２段', '中山北路３段', '中山北路４段', '五常街', '伊通街', '內湖路１段', '八德路２段', '劍南路', '北安路', '南京東路１段', '南京東路２段', '南京東路３段', '南京西路', '合江街', '吉林路', '四平街', '基湖路', '堤頂大道２段', '大直街', '天津街', '天祥路', '安東街', '崇實路', '市民大道２段', '市民大道３段', '建國北路１段', '建國北路２段', '建國北路３段', '建國南路１段', '復興北路', '復興南路１段', '德惠街', '撫順街', '敬業一路', '敬業三路', '敬業二路', '敬業四路', '新生北路１段', '新生北路２段', '新生北路３段', '明水路', '朱崙街', '松江路', '林森北路', '植福路', '樂群三路', '樂群二路', '民族東路', '民族西路', '民權東路１段', '民權東路２段', '民權東路３段', '民權西路', '民生東路１段', '民生東路２段', '民生東路３段', '民生西路', '渭水路', '濱江街', '玉門街', '興安街', '華陰街', '農安街', '通北街', '遼寧街', '錦州街', '錦西街', '長安東路１段', '長安東路２段', '長安西路', '長春路', '雙城街', '龍江路'];
var 中正區 = ['三元街', '中山北路１段', '中山南路', '中華路１段', '中華路２段', '丹陽街', '仁愛路１段', '仁愛路２段', '信義路１段', '信義路２段', '信陽街', '八德路１段', '公園路', '凱達格蘭大道', '北平東路', '北平西路', '南昌路１段', '南昌路２段', '南海路', '南陽街', '博愛路', '同安街', '和平西路１段', '和平西路２段', '大埔街', '天津街', '寧波東街', '寧波西街', '寶慶路', '市民大道１段', '市民大道２段', '市民大道３段', '師大路', '常德街', '廈門街', '廣州街', '延平南路', '徐州路', '忠孝東路１段', '忠孝東路２段', '忠孝西路１段', '思源街', '惠安街', '愛國東路', '愛國西路', '懷寧街', '新生南路１段', '晉江街', '杭州北路', '杭州南路１段', '杭州南路２段', '林森北路', '林森南路', '桃源街', '武昌街１段', '水源路', '永春街', '永綏街', '汀州路１段', '汀州路２段', '汀州路３段', '沅陵街', '泉州街', '泰安街', '湖口街', '漢口街１段', '潮州街', '濟南路１段', '濟南路２段', '牯嶺街', '福州街', '秀山街', '紹興北街', '紹興南街', '羅斯福路１段', '羅斯福路２段', '羅斯福路３段', '羅斯福路４段', '臨沂街', '自強市場第三棟', '莒光路', '衡陽路', '襄陽路', '西藏路', '許昌街', '詔安街', '貴陽街１段', '辛亥路１段', '連雲街', '酉陽街', '重慶南路１段', '重慶南路２段', '重慶南路３段', '金山北路', '金山南路１段', '金華街', '金門街', '銅山街', '鎮江街', '長沙街１段', '開封街１段', '青島東路', '青島西路', '館前路', '齊東街'];
var 大同區 = ['五原路', '伊寧街', '保安街', '南京西路', '哈密街', '塔城街', '大龍街', '天水路', '太原路', '安西街', '寧夏路', '市民大道１段', '平陽街', '庫倫街', '延平北路１段', '延平北路２段', '延平北路３段', '延平北路４段', '忠孝西路２段', '承德路１段', '承德路２段', '承德路３段', '撫順街', '敦煌路', '昌吉街', '景化街', '歸綏街', '民族西路', '民樂街', '民權西路', '民生西路', '永昌街', '涼州街', '環河北路１段', '環河北路２段', '甘州街', '甘谷街', '興城街', '華亭街', '華陰街', '萬全街', '蘭州街', '西寧北路', '貴德街', '赤峰街', '迪化街１段', '迪化街２段', '通河西街１段', '鄭州路', '酒泉街', '重慶北路１段', '重慶北路２段', '重慶北路３段', '錦西街', '長安西路', '雙連街'];
var 萬華區 = ['三水街', '中華路１段', '中華路２段', '內江街', '南寧路', '和平西路２段', '和平西路３段', '國興路', '大埔街', '大理街', '富民路', '寶興街', '峨眉街', '康定路', '廣州街', '德昌街', '忠孝西路２段', '成都路', '昆明街', '東園街', '柳州街', '桂林路', '梧州街', '武成街', '武昌街２段', '民和街', '水源路', '永福街', '汀州路１段', '洛陽街', '漢中街', '漢口街２段', '環河南路１段', '環河南路２段', '環河南路３段', '興寧街', '興義街', '艋舺大道', '莒光路', '華西街', '萬大路', '萬青街', '西園路１段', '西園路２段', '西寧南路', '西昌街', '西藏路', '貴陽街２段', '長沙街２段', '長泰街', '長順街', '開封街２段', '隆昌街', '雅江街', '雙和街', '雙園街', '青年路'];
var 文山區 = ['一壽街', '三福街', '下崙路', '中崙路', '久康街', '仙岩路', '保儀路', '光輝路', '公館街', '和平東路４段', '和興路', '富山路', '忠順街１段', '忠順街２段', '恆光街', '指南路１段', '指南路２段', '指南路３段', '政大一街', '政大三街', '政大二街', '新光路１段', '新光路２段', '景中街', '景仁街', '景後街', '景文街', '景明街', '景福街', '景美街', '景興路', '景華街', '景豐街', '景隆街', '木新路２段', '木新路３段', '木柵路１段', '木柵路２段', '木柵路３段', '木柵路４段', '木柵路５段', '樟新街', '永安街', '汀州路４段', '溪口街', '溪洲街', '福興路', '秀明路１段', '秀明路２段', '羅斯福路４段', '羅斯福路５段', '羅斯福路６段', '老泉街', '育英街', '興德路', '興隆路１段', '興隆路２段', '興隆路３段', '興隆路４段', '興順街', '萬利街', '萬和街', '萬壽路', '萬安街', '萬寧街', '萬慶街', '萬盛街', '萬美街１段', '萬美街２段', '萬芳路', '萬隆街', '試院路', '車前路', '辛亥路４段', '辛亥路５段', '辛亥路６段', '辛亥路７段', '開元街', '集英街'];
var 南港區 = ['三重路', '中南街', '中坡北路', '中坡南路', '八德路４段', '南深路', '南港路１段', '南港路２段', '南港路３段', '合順街', '同德路', '向陽路', '園區街', '富康街', '市民大道７段', '市民大道８段', '忠孝東路５段', '忠孝東路６段', '忠孝東路７段', '惠民街', '成功路１段', '成福路', '新民街', '昆陽街', '東南街', '東新街', '東明街', '松河街', '永吉路', '港東街', '玉成街', '研究院路１段', '研究院路２段', '研究院路３段', '研究院路４段', '福山街', '福德街', '經園街', '經貿一路', '經貿二路', '興中路', '興南街', '興東街', '興華路', '舊莊街１段', '舊莊街２段', '重陽路'];
var 內湖區 = ['五分街', '內湖路１段', '內湖路２段', '內湖路３段', '南京東路６段', '基湖路', '堤頂大道１段', '堤頂大道２段', '大湖山莊街', '大湖街', '安康路', '安泰街', '安美街', '康寧路１段', '康寧路３段', '康樂街', '康湖路', '成功路２段', '成功路３段', '成功路４段', '成功路５段', '文德路', '文湖街', '新富街', '新明路', '新湖一路', '新湖三路', '新湖二路', '新豐街', '星雲街', '東湖路', '民善街', '民權東路６段', '永保街', '江南街', '洲子街', '港墘路', '港華街', '潭美街', '瑞光路', '瑞湖街', '環山路１段', '環山路２段', '環山路３段', '石潭路', '碧山路', '舊宗路１段', '舊宗路２段', '行善路', '行忠路', '行愛路', '金湖路', '金莊路', '金豐街', '金龍路', '陽光街', '麗山街'];
var 士林區 = ['下樹林街', '中山北路４段', '中山北路５段', '中山北路６段', '中山北路７段', '中庸一路', '中庸二路', '中庸五路', '中正路', '中社路１段', '中社路２段', '中興街', '中華路', '仁民路', '仰德大道１段', '仰德大道２段', '仰德大道３段', '仰德大道４段', '倫等街', '光華路', '克強路', '凱旋路', '前港街', '前街', '劍南路', '劍潭路', '力行街', '和平路', '和豐街', '國泰街', '基河路', '士商路', '士東路', '大亨路', '大光街', '大北路', '大南路', '大東路', '大西路', '天母北路', '天母東路', '天母西路', '天玉街', '安平街', '小北街', '小南街', '小東街', '小西街', '平菁街', '幸福街', '延平北路５段', '延平北路６段', '延平北路７段', '延平北路８段', '延平北路９段', '建業路', '後港街', '後街', '德行東路', '德行西路', '志成街', '忠勇街', '忠義街', '忠誠路１段', '忠誠路２段', '愛富一街', '愛富三街', '愛富三街長生巷', '愛富二街', '愛富二街厚生巷', '愛富二街樂生巷', '承德路４段', '承德路５段', '故宮路', '文昌路', '文林路', '新園街', '新安路', '明溪街', '東山路', '格致路', '永公路', '永平街', '環河北路３段', '磺溪街', '社中街', '社子街', '社正路', '福國路', '福壽街', '福德路', '福志路', '福林路', '福榮街', '福港街', '福華路', '竹子湖路', '美崙街', '美德街', '翠山街', '臨溪路', '自祥街', '至善路１段', '至善路２段', '至善路３段', '至誠路１段', '至誠路２段', '芝玉路１段', '芝玉路２段', '莊頂路', '菁山路', '華光街', '華岡路', '華榮街', '華聲街', '華興街', '華齡街', '葫東街', '葫蘆街', '貴富街', '通河東街１段', '通河東街２段', '通河街', '通河西街１段', '通河西街２段', '重慶北路４段', '長春街', '陽明路１段', '陽明路２段', '雙溪街', '雨聲街', '雨農路'];
var 北投區 = ['一德街', '一心路', '七星街', '三合街１段', '三合街２段', '中和街', '中和街新建巷', '中和街錫安巷', '中央北路１段', '中央北路２段', '中央北路３段', '中央北路４段', '中央南路１段', '中央南路２段', '中山北路７段', '中山路', '中心街', '中正街', '中興路', '中華街', '光明路', '光明路新生巷', '公舘路', '勝利街', '北投路１段', '北投路２段', '吉利街', '同德街', '大同街', '大屯路', '大屯路光華一巷', '大屯路光華三巷', '大屯路光華二巷', '大屯路光華四巷', '大度路', '大度路怡和巷', '大度路３段', '大業路', '大興街', '天母北路', '天母西路', '奇岩路', '奉賢路', '學園路', '宜山路', '富貴一路', '實踐街', '尊賢街', '崇仁路１段', '崇仰一路', '崇仰七路', '崇仰三路', '崇仰九路', '崇仰二路', '崇仰五路', '崇仰六路', '崗山路', '幽雅路', '幽雅路杏林巷', '建國街', '建民路', '復興一路', '復興三路', '復興二路', '復興四路', '懷德街', '承德路６段', '承德路７段', '振興街', '振華街', '文化三路', '文林北路', '新市街', '新民路', '新民路康樂巷', '新民路香丘巷', '新生街', '新興路', '明德路', '杏林一路', '杏林三路', '杏林二路', '東昇路', '東華街１段', '東華街２段', '東陽街', '榮華一路', '榮華三路', '榮華二路', '樹林路', '民族街', '民權街', '永興路１段', '永興路２段', '泉源路', '泉源路華南巷', '洲美街', '清江路', '湖山路１段', '湖山路２段', '湖底路', '溫泉路', '溫泉路天主巷', '溫泉路湯元巷', '溫泉路銀光巷', '珠海路', '登山路', '知行路', '石仙路', '石牌路１段', '石牌路２段', '磺港路', '福美路', '秀山路', '稻香路', '立功街', '立德路', '立賢路', '立農街１段', '立農街２段', '竹子湖路', '紗帽路', '義方街', '義理街', '翠宜路', '翠嶺路', '翠華街', '翠雲街', '聖景路', '育仁路', '自強街', '致遠一路１段', '致遠一路２段', '致遠三路', '致遠二路', '行義路', '裕民一路', '裕民三路', '裕民二路', '裕民六路', '裕民四路', '西園街', '西安街１段', '西安街２段', '豐年路１段', '豐年路２段', '進賢路', '重三路', '長壽路', '開明街', '關渡路', '陽明路１段', '陽明路２段', '雙全街'];

function submitQuery(element) {
    var target_form = $(`#${element.id}`).parent();
    var query = decodeURI(target_form.serialize());
    var url = "http://120.126.17.213:58095/query?"+query;
    console.log(query);
    console.log(query.search("default"));
    if (query.search("default") != -1) {
        return $(`#${element.id}`).parent().append("<h3 style='color: red;'>所有選項皆不能留空。</h3>")
    }
    else {
        $(`#${element.id}`).parent().children().last().remove();
        $.getJSON(url, () => {
            console.log("Fetching data from flask api server");
        }).done((data) => {
            showResult(data); //pass data to function to extract and display information 
        }).fail((msg) => {
            console.log(msg);
        }).always(() => {
            console.log("Close connection with flask api server");
        });
    }
}

function showResult(data) {
    var hospital_amount;
    var clinic_amount;
    
    var pat_hospital_amount;
    var cosmetic_amount;
    var pet_grooming_amount;
    var pet_resteruant_amount;
    var pet_park_amount;

    var metro_station_amount;
    var train_station_amount;
    var highSpeedRail_station_amount;
    var youbike_station;
    var carpark_amount;

    var park_amount;
    var sidewalk_tree_amount;

    var resteruant_amount;
    var night_market_amount;
    var green_resteruant_amount;
    var shopping_mall_amount;
    
    var police_station_amount;
    var crime_scene_location_amount;

    var gymroom_amount;
    var riverside_park_amount;
    var activity_center_amount;


    var garbageCar_station_amount;

    var petFriendy_rate;
    var sport_rate;
    var entertainment_rate;
    var food_rate;
    var traffic_rate;
    var grennENV_rate;
    
    try {
        
    }
    catch(e) {}
}

/**
 * <div class="category">
                    <div id="rate_public_security">治安(罪案數目)：</div>
                    <p class="amount">自行車竊盜：{{ bike_crime_amount }}</p>
                    <p class="amount">機車竊盜：{{ motor_crime_amount }}</p>
                    <p class="amount">汽車竊盜：{{ car_crime_amount }}</p>
                    <p class="amount">住宅竊盜：{{ house_burglary_crime_amount }}</p>
                    <p class="amount">隨機強盜：{{ robbery_crime_amount }}</p>
                    <p class="amount">隨機搶奪：{{ burglary_amount }}</p>
                </div>
                <div class="category">
                    <div id="rate_pet_friendly">寵物友善：</div>
                    <p class="amount">寵物餐廳：{{ pet_resteruant_amount }}</p>
                    <p class="amount">寵物美容：{{ pet_grooming_amount }}</p>
                    <p class="amount">寵物公園：{{ pet_park_amount }}</p>
                    <p class="amount">動物醫院：{{ pet_hospital_amount }}</p>
                </div>
                <div class="category">
                    <div id="rate_entertainment">飲食與生活消費：</div>
                    <p class="amount"></p>
                </div>
                <div class="category">
                    <div id="entertainment" class="category">
                    <h2 class="name"></h2>
                    <p class="amount"></p>
                </div>
 */

function getCoordinates(address){
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address+'&key='+API_KEY)
        .then(response => response.json())
        .then(data => {
        const latitude = data.results.geometry.location.lat;
        const longitude = data.results.geometry.location.lng;
        console.log({latitude, longitude})
        })
    }