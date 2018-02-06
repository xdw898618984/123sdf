console.log(window.location.search)
let quarters = window.location.search.substring(3, 4);
let quartersType;
switch (quarters) {
    case "1":
        quartersType = "wx";
        break;
    case "2":
        quartersType = "hx";
        break;


}
let quartersTime = window.location.search.substring(7, window.location.search.length)
console.log(quartersTime)



quarters == 1 ? $(".quarters_content").text("大无线岗位信息上报工具") : $(".quarters_content").text("大核心岗位信息上报工具");

function boce() {

    $(".run").bind("change", function () {

        console.log($(this).val())
        if ($(this).val() == "正常") {

            $("input:text[name='nameTwo']").val("")
        } else if ($(this).val() == "失败") {

            $("input:text[name='nameOne']").val("")

        }

    })
}
boce();


$(".save").on("click", function () {

    //告警情况的文本值
    let post1 = $("input:text[name='number']").val();

    //预处理情况的文本值
    let post2 = $("#oneT").val();
    let post3 = $("#twoT").val();
    let post4 = $("#threeT").val();

    //故障原因
    let post5 = $("input:text[name='reason']").val()

    //是否有故障时限
    let post6 = $("input:radio[name='timer']:checked").val();

    //故障时限
    let post7 = $("#timeT").val();

    //投诉情况
    let post8 = $("input:text[name='complain']").val();


    //处理情况
    let post9 = $("input:text[name='dispose']").val();


    //工程核查
    let post10 = $("input:radio[name='project']:checked").val();

    let post11 = $("input:text[name='projectTwo']").val()
    if (post10 == "无") {
        post10 = "无"

    } else {

        if (post11 == "") {
            post10 = '';
            alert("内容不完整")

        } else {
            post10 = "有" + post11;

        }

    }

    //拨测结果
    let post18 = $("input:radio[name='result']:checked").val();

    let post19;
    switch (post18) {
        case "正常":
            post19 = $("input:text[name='nameOne']").val();
            break;
        case "失败":
            post19 = $("input:text[name='nameTwo']").val();
    }


    //专业室联系人的方式
    let post20 = [];
    $(".postOne").each(function () {
        post20.push($(this).html())

    })

    let post21 = [];
    $("input:text[name='post']").each(function () {
        post21.push($(this).val())

    })
    $.each(post21, function (value, i) {

        if (i == "") {
            return false;
        }
    })
    let post22 = [];
    for (let k = 0; k < post20.length; k++) {
        //专业室联系人的容错处理
        if (post21[k] == "") {
            alert("内容不完整")
            return false;
        } else {
            post22.push(post20[k] + post21[k])
        }

    }

    //地市联系人的处理数据
    let post23 = [];
    $(".contacts").each(function () {
        post23.push($(this).html())
    });
    //电话联系人
    let post24 = [];
    $(".contactsOne").each(function () {
        post24.push($(this).val())
    });
    //合并联系人与电话
    let post25 = [];
    for (let i = 0; i < post24.length; i++) {
        //专业室联系人的容错处理
        if (post24[i] == "") {
            alert("内容不完整")
            return false;
        } else {
            post25.push(post23[i] + post24[i])
        }

    }


     

    if (post1 == "" || post2 == "" || post3 == "" || post4 == "" || post5 == "" || post6 == "" || post7 == "" || post8 == "" || post9 == "") {
        alert("数据不完整")
    } else {



        //专业室联系人的方式
        let post12 = [];
        $(".postOne").each(function () {
            post12.push($(this).html())

        })
        console.log(post12)
        let post13 = [];
        $("input:text[name='post']").each(function () {
            post13.push($(this).val())

        })
        $.each(post12, function (value, i) {
            console.log(value, i);
            if (i == "") {
                return false;
            }
        })
        let post14 = [];
        for (let k = 0; k < post12.length; k++) {
            //专业室联系人的容错处理
            if (post13[k] == "") {
                alert("内容不完整")
                return false;
            } else {
                post14.push(post12[k] + post13[k])
            }

        }

        //地市联系人的处理数据
        let post15 = [];
        $(".contacts").each(function () {
            post15.push($(this).html())
        });
        //电话联系人
        let post16 = [];
        $(".contactsOne").each(function () {
            post16.push($(this).val())
        });
        //合并联系人与电话
        let post17 = [];
        for (let i = 0; i < post15.length; i++) {
            //专业室联系人的容错处理
            if (post16[i] == "") {
                alert("内容不完整")
                return false;
            } else {
                post17.push(post15[i] + post16[i])
            }

        }

        let board = post1 + post2 + post3 + post4 + post5 + post6 + post7 + post8 + post9 + post10 + post14 + post17 + post19;

    }
    let postType;

    switch (quarters) {
        case "1":
            postType = "wx";
            break;
        case "2":
            postType = "hx";
            break;


    }


    wx_hx = {
        positType: postType, //岗位类型，大无线
        alarm: post1, //告警情况
        preProcess: {
            p1: post2,
            p2: post3,
            p3: post4,
        }, //预处理情况，对应3个预处理框
        wReason: post5, //故障原因
        wFaultTL: post6, //0或1,  //是否有故障时限,0代表否,1代表是
        FaultTL: post7, //具体的故障时限内容
        complaints: post8, //投诉情况内容
        process: post9, //处理情况内容
        enginCheck: post10, //工程核查，0代表无，后面的字符串可以为空；1代表有，字符串也可为空
        enginCheckContent: post11, //工程核查内容
        report: post22, //专业室报障情况，字典里只存放有勾选的科室及相应联系人，没有勾选的则不写在字典里
        cityReport: post25, //地市报障情况，字典里只存放有勾选的地市及相应联系人，没有勾选的则不写在字典里
        callTest: post18, //拨测结果，
        callTestContent: post19, //拨测结果内容
    }

    console.log(wx_hx)

   

    // console.log(wx_hx1)

    function getPush() {
        //  wx_hx= JSON.stringify(wx_hx);
        let param = {
            faultTime: quartersTime,
            typeString: quartersType,
            msgString: wx_hx,
        };

        // param = JSON.stringify(param)
    
        $.ajax({
            type: "Post",
            async: true,
            cache: false,
            url:"http://192.168.2.22:8084/MalfunctionSMS/PostServlet",
            dataType:"text",
            // contentType:"application/json",
            data: param,
            success: function (datas) {

                console.log("ff")
            },
            error: function (err) {

                alert("模板数据错误" + err)
            }




        })




    }
    getPush()

})

//专业室切换checkbox时联系人的变化
$("input[name='case']").bind("change", function () {
    if ($(this).is(":checked") == true) {

        // var item1 = '<div class="del"> <span class="postOne"> 省' + $(this).val() + '信息联络人: </span>' +
        //     '<input type = "text" name = "post" style="width:130px;height:24px"></div>'

        var item1 = `<div class="del">
            <span class="postOne">省${$(this).val()}信息联络人:</span>
            <input type="text" name="post">
           </div>`;
        $(".matter9").append(item1)
    } else {
        var m = $(this).val();
        console.log(m)
        n = "省" + m + "信息联络人";
        console.log(n);
        let km = [];

        console.log($(".post"))
        $(".postOne").each(function (i, index) {
            km.push($(this).html())
            console.log(index, i, $(this).html().indexOf(n))
            if ($(this).html().indexOf(n) != -1) {
                console.log($(this).parent())
                $(this).parent().remove()
            }
        })


    }


});
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


        var linkman = `<div class="city_content_right_content">
         <span class="contacts">${ cityArr[i]}联系人:</span>
         <input class="contactsOne" type="text">
     </div>`.trim()



        $(".city_content_right").append(linkman)


    }

    console.log(linkman)


})




//数据请求
var muDatas = "";
var datas = "";

function getMu() {
    $.ajax({
        type: "Get",
        async: false,
        cache: false,
        url: "http://192.168.2.22:8084/MalfunctionSMS/StereoServlet",
        // dataType: "json",
        success: function (datas) {
            muDatas = datas
            return muDatas
        },
        error: function (err) {

            alert("模板数据错误" + err)
        }




    })

}

getMu();

let pretreament = JSON.parse(muDatas);
pretreamentData = [];
for (item in pretreament) {
    pretreamentData.push(pretreament[item].preProcessST);
}
$(".right_content").children().remove();
var str;
pretreamentData.forEach(function (index, i) {
    str = `<p> ${index}</p>`.trim();
    $(".right_content").append(str)
})