//判断是否是快讯、内部通报、严重故障
let search = window.location.search.substring(3, 4);
let searchTime = window.location.search.substring(7, 26);
//searchId独有，为了判断在初始化页面点击的是那一条数据
let searchId = window.location.search.substr(30, window.location.search.length);

var typeString;
//缓存
var searchCache;
switch (search) {
    case "1":
        $(".rank1").prop("checked", true);
        typeString = "new";
        searchCache = "newMessageJson"
        break;
    case "2":
        $(".rank2").prop("checked", true);
        typeString = "upgrage";
        searchCache = "upgradeMessageJson"
        break;
    case "3":
        $(".rank3").prop("checked", true);
        typeString = "stage";
        searchCache = "stageMessageJson"
        break;
    case "4":
        $(".rank3").prop("checked", true);
        typeString = "cancel";
        searchCache = "cancelMessageJson"
        break;
}


//缓存赋值
function assignment(a) {
    //赋值
    $("input:text[name='headline']").val(a.faultTitle); //故障标题
    $(".timeStart").val(a.strTime)
    $(".appearance textarea").val(a.faultDes); //故障现象
    $("input:text[name='scope1']").val(a.affectRange); //影响范围
    $("input:text[name='conduct1']").val(a.process); //处理情况
    $("input:text[name='complain2']").val(a.complaints); //投诉情况
    $("input:text[name='complain3']").val(a.complaintsNum) //投诉量
    $("input:text[name='monitoring1']").val(a.monitor); //省监控指挥调度人

    let searchPub = a.publishRange //发布范围
    switch (searchPub) {
        case "pt":
            $(".pub1").prop("checked", true);
            break;
        case "jiak":
            $(".pub2").prop("checked", true);
            break;
        case "jik":
            $(".pub3").prop("checked", true);
            break;
        case "nb":
            $(".pub4").prop("checked", true);
            break;
        case "jiknb":
            $(".pub5").prop("checked", true);
            break;
        case "yz":
            $(".pub6").prop("checked", true);
            break;
        case "vip":
            $(".pub7").prop("checked", true);
            break;
        case "tf":
            $(".pub8").prop("checked", true);
            break;

    }
    let searchCom = a.delayCom; //滞后投诉
    console.log(typeof searchCom)
    switch (searchCom) {
        case 0:
            $(".com2").prop("checked", true);
            break;
        case 1:
            $(".com1").prop("checked", true);
            break;
    }
    let searchCau = a.faultCause; //故障原因
    // console.log(searchCau)
    switch (searchCau) {
        case 0:
            $(".cau2").prop("checked", true);
            break;
        case 1:
            $(".cau1").prop("checked", true);
            break;
    }
    $("input:text[name='cause1']").val(a.faultCauseContent) //故障原因内容
    let searchSta = a.callTest;
    switch (searchSta) {

        case 0:
            $(".sta1").prop("checked", true);
            break;
        case 1:
            $(".sta2").prop("checked", true);
            break;
        case 2:
            $(".sta3").prop("checked", true);
            break;
        case 3:
            $(".sta4").prop("checked", true);
            break;
    }
    $("input:text[name='status1']").val(a.callTestContent) //拨测情况内容
    //专业室的增删改查
    let searchLabses = a.report;
    console.log(searchLabses.length)
    let searchMuban = [];
    searchLabses.forEach(function (index, i) {
        let searchMuban1 = index.substr(0, index.indexOf(":"))
        let searchMuban2 = index.substr(1, 3)
        searchMuban.push(searchMuban2)
        let searchK = index.substr(index.indexOf(":"), index.length);
        let searchKm = searchK.substr(1, searchK.length)
        let searchItemLabses = `<span class="del" style="margin-top:2px"><span class="remove">${ index.substr(0,index.indexOf(":")+1) }</span>
         <input type = "text" name = "object" value=${searchKm}></span>`
        // console.log(itemLabses);
        $(".chamber").append(searchItemLabses);

    })
    // console.log(muban)

    let searchMuban4 = [];
    $("input[name='labs1']").each(function (i, index) {

        searchMuban4.push(this.value)
    })
    // console.log(index, i, $(this).html().indexOf(muban))
    $.each(function (index, i, searchMuban4, searchMuban) {

        console.log(index)
    })

    searchMuban.forEach(function (index, i) {
        console.log(searchMuban4.indexOf(searchMuban[i]))
        console.log($(".labses").children().eq(searchMuban4.indexOf(searchMuban[i])).children().prop("checked", true))

    })


}

// //缓存赋值

if (localStorage.getItem("infos")) {

    let local = JSON.parse(localStorage.infos);
    console.log(local[0][searchId][searchCache])
    if (local[0][searchId][searchCache]) {
        let localTimeOne = JSON.parse(local[0][searchId][searchCache]);
        assignment(localTimeOne)

    } else {
        console.log("新建项目，没有缓存1")
    }

} else {
    console.log("新建项目，没有缓存2")

}
//下拉城市多选初始化
$('#example-multiple-selected').multiselect({

    options: {
        height: 100
    },
    enableClickableOptGroups: true,
    enableCollapsibleOptGroups: true,
    buttonWidth: '110px',
    dropRight: true,
    maxHeight: 200,
});
$("#example-multiple-selected").bind("change", function () {
    let cityArr = [];
    $(".checkbox input:checkbox:checked").each(function (i, value) {
        cityArr.push($(this).val())
        return cityArr;
    })
    //先清空标签，否则会多次重复
    $(".city_content_right").empty();
    for (let i = 0; i < cityArr.length; i++) {
        let linkman = `<div class="city_content_right_content"><span class="contacts">${ cityArr[i]}联系人:</span><input class="contactsOne" type="text"></div>`.trim();
        $(".city_content_right").append(linkman)
    }

    // console.log(linkman)


})
// $("body").on("click", ".detail","minute",function () {
//     $(".mask").fadeIn();
//     alert("gg");

//     console.log("ggg")
 
// });

$(document).on("click",function(){
    $(".mask").fadeIn();
})
$(".mask").click(function () {
    $(this).fadeOut();
})

$(".detail_content").click(function (e) {
    //阻止事件冒泡
    e.stopPropagation();
})
//關閉mask
$(".close").click(function () {

    $(this).css({
        "backgroundColor": "#3cd3ad",
        "box-shadow": "none"
    })
    $(".mask").fadeOut(function () {
        $(".close").css({
            "backgroundColor": "transparent",
            "box-shadow": "none"
        })

    });
})

//確認mask
$(".ensure").click(function () {

    $(this).css({
        "backgroundColor": "#3cd3ad",
        "box-shadow": " -2px 0 5px #4cb8c4,0 -2px 5px #4cb8c4,0 2px 5px #4cb8c4,2px 0 5px #4cb8c4"
    })
    $(".mask").fadeOut(function () {
        $(".ensure").css({
            "backgroundColor": "transparent",
            "box-shadow": " -2px 0 5px transparent,0 -2px 5px transparent,0 2px 5px transparent,2px 0 5px transparent"
        })
    });
})


//鼠标移动上去确认和取消发生变化

function move(key) {

    $(key).mouseover(function () {

        $(this).css({
            "backgroundColor": "#3cd3ad",
            "box-shadow": " -2px 0 5px #4cb8c4,0 -2px 5px #4cb8c4,0 2px 5px #4cb8c4,2px 0 5px #4cb8c4"
        })
        $(this).mouseout(function () {

            $(this).css({
                "backgroundColor": "transparent",
                "box-shadow": " 0 0 0 transparent,0 0 0 transparent,0 0 0 transparent,0 0 0 transparent"
            })
        })

    })

}
move(".ensure")
move(".close")
var a;
$("#date").click(function () {
    a = $("select option:selected").text(); //获取内容的内容；
})
$(".scope_search_content").click(function () {

    var b = $("select option:selected").html() //默认选择显示的时间
    console.log(b)
    a = "undefined" ? b : a; //三元运算符，当没有选择时间的时候，就显示默认的时间
    var search_content = $(".scopeThreeContent").val(); //内容字段
    $(".scopeThreeContent").val("") //让点击之后内容清空
    $(".surveyTwo").children(".sur").remove();
    $(".detail_up").children(".team").remove();
    switch (a) {
        case "最近一个月":
            a = "month";
            break;
        case "最近半年":
            a = "half";
            break;
        case "最近一年":
            a = "year";
            break;
    }

    var dataResContent = "";

    function getSearch() {

        let params = {
            "searchKey": search_content,
            "searchTime": a,
            "searchType": typeString
        }
        $.ajax({
            async: false,
            cache: true,
            type: "Get",
            url: "http://192.168.2.22:8084/MalfunctionSMS/SearchServlet",
            dataType: "json",
            data: params,
            success: function (res) {
                dataResContent = res;
            },
            error: function (err) {
                alert(err + ":返回数据错误")

                console.log(err)
            }

        })

    }
    // getSearch()
    let temp;
    let amkey;

    for (let i = 0; i < dataResContent.length; i++) {

        function dataTemp(i, sur) {
            let am = JSON.parse(dataResContent[i]);
            let am1 = am.messageType; //故障级别
            let amType; //故障级别
            switch (am1) {
                case "0":
                    amType = "快讯";
                    break;
                case "1":
                    amType = "升级";
                    break;
                case "2":
                    amType = "阶段";
                    break;
                case "3":
                    amType = "销";
                    break;
            }
            let am2 = am.callTest; //拨测情况
            let amTest;
            switch (am2) {
                case 0:
                    amTest = "";
                    break;
                case 1:
                    amTest = "其他";
                    break;
                case 2:
                    amTest = "正常";
                    break;
                case 3:
                    amTest = "失败";
                    break;
            }
            let am3 = am.delayCom; //滞后投诉
            let amCom;
            switch (am3) {
                case 0:
                    amCom = ""
                    break;
                case 1:
                    amCom = "(部分为滞后投诉)"
                    break;
            }
            let am4 = am.publishRange;
            let amRange;
            switch (am4) {
                case "pt":
                    amRange = "省网管中心领导和各室经理、市（XX）网络线条领导和各室经理";
                    break;
                case "jiak":
                    amRange = "省网管中心各室经理"
                    break;
                case "jik":
                    amRange = "省政企、省客响、省网管中心领导和各室经理"
                    break;
                case "nb":
                    amRange = "省网管中心领导和各室经理"
                    break;
                case "jiknb":
                    amRange = "省政企、省客响、省网管中心领导和各室经理"
                    break;
                case "vip":
                    amRange = "省网管、无优中心领导和各室经理"
                    break;
                case "yz":
                    amRange = "网络管理中心"
                    break;
                case "tf":
                    amRange = "网络管理中心"
                    break;
            }
            temp = `<p class="sur">【${amType}|${am.serviceHarm}${am.faultLevel} ${am.faultTitle}】${am.faultCause}${am.faultDes}。发生原因:
            ${am.faultCauseContent}。拨测情况:${amTest}${am.callTestContent}。处理情况:${am.process}。投诉情况:省监控与客服确认，截至（固定):${am.faultTime},共收到投诉${am.complaintsNum}宗${amCom}。省监控指挥调度人:
             ${am.monitor},${am.cityReport} 特此汇报。温馨提示:内部信息，未经许可切勿私自传播 “发布范围(${amRange})“</p>`.trim();
            // console.log(temp)
            return temp;

        }

        // dataTemp(i)
        $(".content_case").html(dataTemp(0));

        $(".surveyTwo").append(dataTemp(i));



    }

    //移动到木板上是时显示全部，
    $(".sur").on("mouseover", function () {
        let moveSur = $(this).html();
        this.setAttribute('title', moveSur)
    })
    //动态生成蒙板的内容，根据模板案例进行动态生成
    //将模案例的的内容存放到一个数组中去；

    function survey() {
        let arrNum = [];
        $(".sur").each(function (index, i) {
            arrNum.push($(this).html());
            return arrNum;
        })
        for (let i = 1; i < arrNum.length; i++) {
            let km = ' <textarea name="" id="" cols="30" rows="" readonly="readonly" class="team">' + arrNum[i] + '</textarea>'
            // console.log(index,i)
            $(".detail_up").append(km)

        }


    }
    survey(); //执行

    //蒙版进行选择案例
    function mask() {


        $(".team").on("click", function () {
            $(this).addClass("into").siblings().removeClass("into");

            let text = $(this).html()
            let textOne = $(".sur").eq(0).html();
            $(".ensure").on("click", function () {

                $('.content_case').html(text);
            })
            $('.close').on("click", function () {
                $('.content_case').html(textOne);
            })


        })

    }

    mask();



})






//初始化点击模板显示的是标题故障
$(".headline_content p").on("click", function () {

    let c = $(this).html()
    $("#headline").val(c);

})
var p = "";

function getSevere() {

    $.ajax({
        type: "Get",
        async: false,
        cache: false,
        url: "http://192.168.2.22:8084/MalfunctionSMS/StereoServlet",
        dataType: "text",
        success: function (datas) {
            p = datas
            return p
        },
        error: function (dataes) {

            alert("数据错误" + dataes)

            // console.log(dataes)
        }


    })


}
// getSevere()
// var jsonObj = JSON.parse(p)
// var k = {};
// k.p1 = [];
// k.p2 = [];
// k.p3 = [];
// for (item in jsonObj) {
//     // console.log(item)
//     // console.log(jsonObj[item].faultDesST);
//     k.p1.push(jsonObj[item].faultDesST)
//     k.p2.push(jsonObj[item].preProcessST)
//     k.p3.push(jsonObj[item].titleST)
// }
// //点击故障标题切换故障模板
// $("#title").on("click", function () {

//     $(".stencil").html("故障标题模板");
//     $(".headline_content").children().remove();
//     //故障标题模板
//     k.p3.forEach(function (value, index, array) {
//         var str = "<p>" + index + '.' + value + "</p>";
//         $(".headline_content").append(str);

//     });

//     //点击故障标题的标签自动添加
//     $(".headline_content p").on("click", function () {

//         let b = $(this).html()
//         $("#headline").val(b);

//     })
// })


//点击故障现象切换故障现象模板

$("#appearance").on("click", function () {
    $(".stencil").html("故障现象模板");
    $(".headline_content").children().remove();
    //故障现象模板

    k.p1.forEach(function (value, index, array) {
        var str1 = "<p>" + index + '.' + value + "</p>";
        $(".headline_content").append(str1);
    });

    //点击故障模板的标签自动添加
    $(".headline_content p").on("click", function () {

        let a = $(this).html()
        $("#appearanceTo").val(a);

    })

})






//短信預覽
//全局时间
function show() {
    let mydate = new Date();
    var str = "" + mydate.getFullYear() + "-";
    str += (mydate.getMonth() + 1) > 9 ? (mydate.getMonth() + 1) + "-" : "0" + (mydate.getMonth() + 1) + "-";
    str += mydate.getDate() > 9 ? mydate.getDate() + "/" : " 0" + mydate.getDate() + "/";
    str += mydate.getHours() > 9 ? mydate.getHours() + ":" : "0" + mydate.getHours() + ":";
    str += mydate.getMinutes() > 9 ? mydate.getMinutes() : "0" + mydate.getMinutes();
    str += mydate.getSeconds() > 9 ? ":" + mydate.getSeconds() : ":0" + mydate.getSeconds();
    return str;;
}
//值班长时间
function showTime() {
    let mydates = new Date();
    let strTime = "" + mydates.getFullYear() + "-";
    strTime += (mydates.getMonth() + 1) > 9 ? (mydates.getMonth() + 1) + "-" : "0" + (mydates.getMonth() + 1) + "-";
    strTime += mydates.getDate() > 9 ? mydates.getDate() + " " : " 0" + mydates.getDate() + " ";
    strTime += mydates.getHours() > 9 ? mydates.getHours() + ":" : "0" + mydates.getHours() + ":";
    strTime += mydates.getMinutes() > 9 ? mydates.getMinutes() : "0" + mydates.getMinutes();
    strTime += mydates.getSeconds() > 9 ? ":" + mydates.getSeconds() : ":0" + mydates.getSeconds();
    return strTime;

}

// console.log(showTime())

$(".timeStart").text(showTime()) //故障进入时间


var stra;
$(".produce").click(function () {

    //影响业务
    let num1 = $(" input:radio[name='business1']:checked").val();
    console.log(num1)
    //内部通报
    let num2 = $(" input:radio[name='rank4']:checked").val();
    console.log(num2)
    //故障标题
    let num3 = $("input:text[name='headline']").val();
    //故障进入时间
    let startTime = $(".timeStart").text(showTime()) //故障进入时间
    //发生时间
    let num4 = show();
    //故障现象
    let num5 = $(".appearance textarea").val();
    //故障原因

    let num6 = $("input:radio[name='cause1']:checked").val();
    // console.log(num6)
    let faultCause;
    switch (num6) {
        case "待确定":
            faultCause = 1;
            break;
        case "其他":
            faultCause = 0;
            break;
    }

    console.log(num6, faultCause)
    //故障原因的容容
    let num18 = $("input:text[name='cause1']").val();
    //拨测情况
    let num7 = $("input:radio[name='status1']:checked").val();
    let callTest;
    switch (num7) {
        case "无":
            callTest = 0;
            break;
        case "正常":
            callTest = 1;
            break;
        case "失败":
            callTest = 2;
            break;
        case "其他":
            callTest = 3;
            break;

    }
    //影响范围
    let num8 = $("input:text[name='scope1']").val();
    //处理情况
    let num9 = $("input:text[name='conduct1']").val();

    //投诉情况
    let num10 = $("input:text[name='complain2']").val();
    //投诉量
    let num11 = $("input:text[name='complain3']").val();

    //是否滞后

    let num12 = $("input:radio[name='complain1']:checked").val();
    let delayCom;
    if (num12 == "是") {

        delayCom = 1;
        num12 = "部分为滞后投诉";
    } else {
        delayCom = 0;
        num12 = "";
    }

    //省监控指挥调度人

    let num13 = $("input:text[name='monitoring1']").val();

    //专业室
    let num14 = [];
    $("input:checkbox[name='labs1']:checked").each(function () {
        num14.push($(this).val());
    });

    //城市
    let num15 = $(".city #city").find("option:selected").text();
    console.log(num15)
    //广州联系人
    let num16 = $("input:text[name='city1']").val();
    console.log(num16)
    //发布范围

    let num17 = $("input:radio[name='publish1']:checked").val();
    //专业室联系人的方式处理结果
    let num20 = [];
    $(".remove").each(function () {
        num20.push($(this).html())

    })

    let num21 = [];
    $("input:text[name='object']").each(function () {
        num21.push($(this).val())

    })

    console.log(num21, "num21")
    $.each(num20, function (value, i) {
        console.log(value, i);
        if (i == "") {
            return false;
        }
    })
    let num22 = [];
    for (let k = 0; k < num20.length; k++) {
        //专业室联系人的容错处理
        if (num21[k] == "") {
            alert("内容不完整")
            return false;
        } else {
            num22.push(num20[k] + num21[k])
        }

    }

    // //地市联系人的处理数据
    let num23 = [];
    $(".contacts").each(function () {
        num23.push($(this).html())
    });
    //电话联系人
    let num24 = [];
    $(".contactsOne").each(function () {
        num24.push($(this).val())
    });
    //合并联系人与电话
    let num25 = [];
    for (let i = 0; i < num24.length; i++) {
        //专业室联系人的容错处理
        if (num24[i] == "") {
            alert("内容不完整")
            return false;
        } else {
            num25.push(num23[i] + num24[i])
        }
    }
    let range;
    let puslish2;
    switch (num17) {
        case "普通快讯":
            range = "省网管中心领导和各室经理、市（XX）网络线条领导和各室经理";
            publish2 = "pt";
            break;
        case "家宽快讯":
            range = "省网管中心各室经理"
            publish2 = "jiak";
            break;
        case "集客快讯":
            range = "省政企、省客响、省网管中心领导和各室经理"
            publish2 = "jik";
            break;
        case "内部通报":
            range = "省网管中心领导和各室经理"
            publish2 = "nb";
            break;
        case "集客内部通报":
            range = "省政企、省客响、省网管中心领导和各室经理"
            publish2 = "jiknb";
            break;

        case "VIP内部通报":
            range = "省网管、无优中心领导和各室经理"
            publish2 = "vip";
            break;
        case "严重故障":
            range = "网络管理中心"
            publish2 = "yz";
            break;
        case "突发事件":
            range = "网络管理中心"
            publish2 = "tf";
            break;

    }


    //拨测情况容错处理num7
    let num19 = $("input:text[name='status1']").val();
    console.log(num19)


    if (num3 == " " || num5 == " " || num16 == " " || num8 == " " || num9 == " " || num10 == "" || num11 == " " || num13 == "") {
        alert("内容不完整")
        return false;
    } else {
        console.log(search)
        let item;
        switch (search) {
            case "1":
                item = '【新|' + num1 + '|' + num2 + num3 + '】' + num4 + num5 + "。" + "发生原因:" + num6 + "。" +
                    num7 + "处理情况:" + num9 + "。" + "投诉情况：省监控与客服确认，截止" + num4 + "共收到投诉" + num11 +
                    "宗，" + num12 + "。" + "省监控指挥调度人:" + num13 + "，" + num14 + num22 +
                    "，" + "特此汇报。温馨提示:内部信息，未经许可切勿私自传播。" + " [" + range + "]";
                break;
            case "2":
                item = '【快讯|' + num3 + '】' + num4 + num5 + "。" + "发生原因:" + num6 + "。" +
                    num7 + "处理情况:" + num9 + "。" + "投诉情况：省监控与客服确认，截止" + num4 + "共收到投诉" + num11 +
                    "宗，" + num12 + "。" + "省监控指挥调度人:" + num13 + "，" + num14 + num22 +
                    "，" + "特此汇报。温馨提示:内部信息，未经许可切勿私自传播。" + " [" + range + "]";
                break;
            case "3":
                item = '【阶段|' + num1 + '|' + num2 + num3 + '】' + num4 + num5 + "。" + "发生原因:" + num6 + "。" +
                    num7 + "处理情况:" + num9 + "。" + "投诉情况：省监控与客服确认，截止" + num4 + "共收到投诉" + num11 +
                    "宗，" + num12 + "。" + "省监控指挥调度人:" + num13 + "，" + num14 + num22 +
                    "，" + "特此汇报。温馨提示:内部信息，未经许可切勿私自传播。" + " [" + range + "]";
                break;
            case "4":
                item = '【销|' + num1 + '|' + num2 + num3 + '】' + num4 + num5 + "。" + "发生原因:" + num6 + "。" +
                    num7 + "处理情况:" + num9 + "。" + "投诉情况：省监控与客服确认，截止" + num4 + "共收到投诉" + num11 +
                    "宗，" + num12 + "。" + "省监控指挥调度人:" + num13 + "，" + num14 + num22 +
                    "，" + "特此汇报。温馨提示:内部信息，未经许可切勿私自传播。" + " [" + range + "]";
                break;


        }

        $(".preview_again").text(item)

    }



    stra = {
        messageType: search,
        faultLevel: num2, //故障级别。这个字段是固定的，就为“严重故障”
        serviceHarm: num1, // 0不影响，1影响
        faultTitle: num3, //故障标题
        timeStart: startTime, //故障进入时间
        faultTime: searchTime, //故障发生时间
        faultDes: num5, //故障现象
        faultCause: faultCause, //故障原因
        faultCauseContent: num18, //故障原因
        callTest: callTest, //拨测情况
        callTestContent: num19, //拨测情况内容
        affectRange: num8, //影响范围
        process: num9, //处理情况
        complaints: num10, //投诉情况
        complaintsNum: num11, //投诉量
        delayCom: delayCom, //滞后投诉   0否, 1是
        monitor: num13, //省监控指挥调度人
        report: num22, //专业室
        cityReport:num25, //地市
        publishRange: publish2 //发布范围
    }
    // console.log(stra)




})


//专业室切换checkbox时联系人的变化

$("input[name='labs1']").bind("change", function () {
        if ($(this).is(":checked") == true) {
            let item1 = `<div class="del"> <span class="remove">省${$(this).val()}信息联络人:</span> <input type="text" name="object"></div>`.trim();
            $(".chamber").append(item1)
        } else {
            var a = $(this).val();
            console.log(a)
            c = "省" + a + "信息联络人";
            console.log(c);
            let num = [];
            $(".remove").each(function (i, index) {
                num.push($(this).html())
                // console.log(index, i,$(this).html().indexOf(a))
                if ($(this).html().indexOf(c) != -1) {
                    $(this).parent().remove()
                }
            })

        }
    }


);




//     $("#city1").bind("change", function () {
//         // console.log($("#city1 option:selected").val())
//         if ($("#city1 option:selected").text() != "无") {

//             $(".cityCheck").remove();
//             var check = `<div class="cityCheck">
//    <span> ${$("#city1 option:selected").text()}联系人:</span>
//     <input type="text" name="city1" class="cityThree">
//   </div>`.trim();
//             $(".cityTwo").append(check)

//         } else {
//             $(".cityCheck").remove();
//         }

//     })




//3.审核保存功能,

//将对象转为字符串

$(".save").click(function () {
    console.log(stra)

    function getPush() {
        let straes = JSON.stringify(stra)
        $.ajax({
            type: "Post",
            async: true,
            cache: false,
            url: "http://192.168.2.22:8084/MalfunctionSMS/FaultMsgWeb",
            dataType: "json",
            data: {
                "faultTime": searchTime,
                "typeString": typeString,
                "msgString": straes
            },
            success: function (datas) {
                p = datas;
                console.log(p)
            },
            error: function (err) {

                alert("数据错误" + err)
            }
        })

    }
    getPush()

})





//数据请求




// 新增记录,从上一个界面异步刷新
var urge;

function newAdd() {

    console.log(searchTime)

    function getNewAdd(url) {

        console.log(searchTime)
        $.ajax({
            type: "Get",
            async: false,
            cache: false,
            url: "http://192.168.2.22:8084/MalfunctionSMS/FaultMsgWeb",
            dataType: "json",
            data: {
                "faultTime": searchTime,
                "typeString": typeString,
                "operation": "query"
            },
            success: function (dataes) {
                urge = dataes
                return urge;
            },
            error: function (err) {

                alert("数据错误getNewAdd" + err)
            }

        })
    }
    getNewAdd()
}

newAdd()
console.log(urge)
//转成字符串

if (urge.status == "0") {
    console.log("没有数据")

} else {

    let jsonUrge = JSON.parse(urge);
    // console.log(jsonUrge)

    //清除缓存
    localStorage.clear("infos");
    assignment(jsonUrge)

}
let urgePost;

console.log(searchTime)

function getPost() {


    $.ajax({
        type: "Get",
        async: false,
        cache: false,
        url: "http://192.168.2.22:8084/MalfunctionSMS/PostServlet",
        dataType: "json",
        data: {
            "dataType": searchTime
        },
        success: function (dataPost) {
            urgePost = dataPost
            return urgePost;
        },
        error: function (err) {

            alert("岗位数据错误" + err)
        }

    })
}
getPost()


$(".hx").click(function () {
    self.location = 'post.html?b=1';
    alert("gg")

});