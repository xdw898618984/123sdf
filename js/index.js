/**
 * Created by Administrator on 2017/12/22.
 */
/*初始化页面的js文件*/


//1.添加按钮新增记录按钮\
function show() {
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "-";
    str += (mydate.getMonth() + 1) > 9 ? (mydate.getMonth() + 1) + "-" : "0" + (mydate.getMonth() + 1) + "-";
    str += mydate.getDate() > 9 ? mydate.getDate() + "/" : "0" + mydate.getDate() + "/";
    str += mydate.getHours() > 9 ? mydate.getHours() + ":" : "0" + mydate.getHours() + ":";
    str += mydate.getMinutes() > 9 ? mydate.getMinutes() : "0" + mydate.getMinutes();
    str += mydate.getSeconds() > 9 ? ":" + mydate.getSeconds() : ":0" + mydate.getSeconds();
    return str;;
}

function initialize() {


    $(".newAdd").click(function () {
        localStorage.clear("infos")
        var dateNow = show();
        var setmp = '<li  class="setmp setmp2"  style="position: relative">' +
            '<input type="checkbox" name="cut" style="float: left;position: absolute; top: 22px; left:25px; ">' +
            '<div class="click" style=" height: 50px;' +
            'margin-left: 10px;' +
            'border-radius: 10px;' +
            'margin-right: 40px;"> ' +
            '<span class="num1 num11">' + show() + '</span>' +
            ' <span class="num2" contenteditable="true">内部通报</span>' +
            ' <span class="num3" contenteditable="true">待定待定待定待定待定待定待定</span>' +
            '<span class="num4">' +
            '<a class="num"href="./foreman.html?a=1&b=' + show() + '" target="_blank">新</a>' +
            '<a class="num"href="./foreman.html?a=2&b=' + show() + '" target="_blank">升级</a>' +
            '<a class="num"href="./foreman.html?a=3&b=' + show() + '" target="_blank">阶段</a>' +
            '<a href="./foreman.html?a=4&b=' + show() + '" target="_blank">销毁</a>' +
            '</span> ' +
            '<span class="num5">' +
            '<a href="./post.html?b=1&d=' + show() + '" target="_blank">大无线</a>' +
            '<a href="./post.html?b=2&d=' + show() + '" target="_blank">大核心</a>' +

            '</span> ' +
            '<span class="num6 deleteNum">' +


            '<i class="delete" id="delete"></i>' +


            '<p class="deleteTo">删除</p>' +

            '</span> ' +
            '</div>' +
            '</li>';
        $(".results-ul").append(setmp)




    })



}

initialize();




//2全选切换
$("input:checkbox[name='all']").on("change", function () {
    if ($(this).is(":checked") == true) {
        $("input:checkbox[name='cut']").attr("checked", true)
        $("input:checkbox[name='cut']").parent().children(".click").css({
            background: "#defd78",
            borderRadius: 10 + "px",
            overflow: "hidden",
        })

    } else {

        $("input:checkbox[name='cut']").attr("checked", false);
        $("input:checkbox[name='cut']").parent().children(".click").css({
            background: "transparent",
            borderRadius: 10 + "px",
            overflow: "hidden",
        })
    }


})

//3全部删除，删除全部数据


$("#up").on("click", function (e) {
    e.preventDefault()
    // $("input:checkbox[name='cut']:checked").parent().remove();
    setTimeout(function () {
        $("input:checkbox[name='all']").prop('checked', false);

    }, 100)

    if ($("input:checkbox[name='all']:checked").is(":checked") != false) {
        // if ($("input:checkbox[name='all']:checked").is(":checked") != false) {
        $('.up').attr("checked", false)
    }
    // console.log($("input:checkbox[name='all']:checked").parent())

})

//4.单选按钮，改变背景颜色

$(document).on("change", "input:checkbox[name='cut']", function () {


    if ($(this).is(":checked") == true) {
        // console.log($(this).parent().children(".click"))
        $(this).parent().children(".click").css({
            background: "#defd78",
            borderRadius: 10 + "px",
            overflow: "hidden",
        })
        $(this).parent().children(".click").children(".num1")
    } else {
        $(this).parent().children(".click").css({
            background: "transparent",
            borderRadius: 10 + "px",
            overflow: "hidden",
        })
    }
})

//6.搜索按钮

var a;
$("#date").click(function () {

    a = $("select option:selected").text(); //获取内容的内容；

})
$("#search").click(function () {
    $(".setmp2").remove()
    var b = $("select option:selected").html() //默认选择显示的时间
    console.log(b)
    a = "undefined" ? b : a; //三元运算符，当没有选择时间的时候，就显示默认的时间

    var content = $("#content").val(); //内容字段

    console.log(a, content)

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

    var dataRes = "";
    var am = "";

    function getData() {

        let params = {
            "searchKey": content,
            "searchTime": a,
            "searchType": "all"
        }
        $.ajax({
            async: false,
            cache: true,
            type: "Get",
            url: "http://192.168.2.22:8084/MalfunctionSMS/SearchServlet",
            dataType: "text",
            data: params,
            success: function (res) {
                dataRes = JSON.parse(res);

            },
            error: function (err) {
                alert(err + ":搜索数据错误")

            }

        })

    }


    getData()
    let dataResArr = [];
    dataResArr.push(dataRes)
    let dataResKey = JSON.stringify(dataResArr)
 
    if(dataResArr[0].length==0){

        alert("数据库中没有数据！")
    }
    //写入c字段
    window.localStorage.setItem("cache", dataResArr);
    localStorage.setItem("infos", dataResKey);
    dataRes.forEach(function (index, i) {
        var am = JSON.parse(index.newMessageJson);
        var amk = JSON.stringify(am)
        var setmp1 = '<li  class="setmp setmp2"  style="position: relative">' +
            '<input type="checkbox" name="cut" style="float: left;position: absolute; top: 22px; left:25px; ">' +
            '<div class="click" style=" height: 50px;' +
            'margin-left: 10px;' +
            'border-radius: 10px;' +
            'margin-right: 40px;"> ' +
            '<span class="num1 num11">' + am.faultTime + '</span>' +
            '<span class="num2" contenteditable="true">' + am.faultLevel + '' + i + '</span>' +
            '<span class="num3" contenteditable="true">' + am.faultTitle + '</span>' +
            '<span class="num4">' +
            '<a class="num"href="./foreman.html?a=1&b=' + show() + '&id=' + i + '" target="_blank">新</a>' +
            '<a class="num"href="./foreman.html?a=2&b=' + show() + '&id=' + i + '" target="_blank">升级</a>' +
            '<a class="num"href="./foreman.html?a=3&b=' + show() + '&id=' + i + '" target="_blank">阶段</a>' +
            '<a href="./foreman.html?a=4&b=' + show() + '&id=' + i + '" target="_blank">销毁</a>' +
            '</span> ' +
            '<span class="num5">' +
            '<a href="./post.html?b=1&d=' + show() + '" target="_blank">大无线</a>' +
            '<a href="./post.html?b=2&d=' + show() + '" target="_blank">大核心</a>' +
            '</span> ' +
            '<span class="num6 deleteNum">' +
            '<i class="delete" id="delete"></i>' +
            '<p class="deleteTo">删除</p>' +
            '</span> ' +
            '</div>' +
            '</li>';
        $(".results-ul").append(setmp1);
        //清除输入框
        $("#content").val("")
    });
})

$(document).on("click", ".deleteNum", function () {
    let operationDel = "del";
    //5.删除按钮，删除本行数据
    $(this).parent().parent().remove();
    //找到当前的时间
    let idTime = $(this).parent().parent().children().children(".num1").html();
    function getRemove() {
        let params = {
            "faultTime": idTime,
            "operation": operationDel,
        };
        $.ajax({
            async: false,
            cache: true,
            type: "Get",
            url: "http://192.168.2.22:8084/MalfunctionSMS/FaultMsgWeb",
            dataType: "text",
            data: params,
            success: function (res) {
                console.log("删除成功")
            },
            error: function (err) {
                alert(err + ":单删数据错误")

                console.log(err)
            }

        })

    }
    getRemove()

})
//批量删除的功能
$(document).on("click", "#up", function () {
    let arrNum = [];
    if ($("input:checkbox[name='cut']:checked").is(":checked")) {

        let kkArr = $(".setmp2"); //一个伪数组

        kkArr.each(function (index, i) {
            if ($(i).children().eq(0).is(":checked")) {
                arrNum.push($(i).children(".click").children(".num11").text());
                console.log($(i).children(".click").children(".num1").text());

            }

        })


    } else {

        alert("故障短信没有选中")
    }


    //找到当前的时间

    let operationArr = "del";
    let more = "more";

    function getAll() {
        console.log(arrNum)
        // let params = {

        // };

        // params =JSON.stringify(params)
        $.ajax({
            async: false,
            cache: false,
            type: "Get",
            url: "http://192.168.2.22:8084/MalfunctionSMS/FaultMsgWeb",
            dataType: "text",
            // contnet_Type:"application/json",
            data: {
                "faultTime": arrNum,
                "operation": operationArr,
                "typeString": more,
            },
            success: function (res) {
                console.log("删除成功")
            },
            error: function (err) {
                alert(err + "全删数据错误")

                console.log(err)
            }

        })


    }
    getAll()



})