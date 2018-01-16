$("body").on("click", ".detail", function () {
    $(".mask").fadeIn();
});

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

    // console.log(arrNum)

    $.each(arrNum, function (index, i) {

        // console.log(k)
        let km = ' <textarea name="" id="" cols="30" rows="" readonly="readonly" class="team">' + arrNum[index] + '</textarea>'
        // console.log(index,i)
        $(".detail_up").append(km)

    })


}
survey(); //执行



//蒙版进行选择案例
function mask() {


    $(".team").on("click", function () {
        $(this).addClass("into").siblings().removeClass("into");

        let text = $(this).html()
        let textOne = $(".sur").eq(0).html();
        $(".ensure").on("click", function () {

            $('.content_case').html(text)

        })
        $('.close').on("click", function () {
            $('.content_case').html(textOne)
        })


    })

}

mask();


//初始化点击模板显示的是标题故障
$(".headline_content p").on("click", function () {

    let c = $(this).html()
    $("#headline").val(c);
    console.log(c)


})


//点击故障标题切换故障模板
$("#title").on("click", function () {
    $(".stencil").html("故障标题模板");
    $(".headline_content").html(
        '<p>1.XX地区部分用户无法主/被/主被叫 </p>' +
        '<p>2.XX地区部分用户呼入/呼出异常 </p>' +
        '<p>3.XX地区部分用户2/4G上网使用异常 </p>' +
        '<p>4.XX地区部分用户无法发送/接收短信 </p>' +
        ' <p>5.XX地区2、3、4G基站退服超门限 </p>' +
        '<p>6.XX地区家宽业务使用异常 </p>' +
        '<p>7.XX网元接通率低/高负荷/限呼 </p>' +
        '<p>8.XX干线XX系统倒换/光缆故障/光功率低 </p>' +
        '<p>9.XX地区XX机楼停电保障 10.省内多个地市XX网管长时间无告警上报 </p>' +
        '<p>11.XX 网管系统名称使用异常 12.快讯|客户名称+业务级别+专线类型+故障/阶段/恢复 </p>')



    //点击故障标题的标签自动添加
    $(".headline_content p").on("click", function () {

        let b = $(this).html()
        $("#headline").val(b);
        console.log(b)


    })
})


//点击故障现象切换故障现象模板

$("#appearance").on("click", function () {
    $(".stencil").html("故障现象模板");
    $(".headline_content").html('<p>  1.省监控发现综合监控上报XX告警/省监控接客服报障XX地区XX业务使用异常。 </p>' +
        '<p>2.省监控发现综合监控上报XX告警/省监控接客服报障XX地区XX业务使用异常。</p>' +
        '<p>3.省监控发现综合监控上报XX告警/省监控接客服报障XX地区XX业务使用异常。</p>' +
        '<p>4.省监控发现综合监控上报XX告警/省监控接客服报障XX地区XX业务使用异常。</p>' +
        ' <p> 5.省监控发现综合监控上报XX告警/省监控接客服报障XX地区XX业务使用异常。</p>')

    //点击故障模板的标签自动添加
    $(".headline_content p").on("click", function () {

        let a = $(this).html()
        $("#appearanceTo").val(a);



    })

})



//判断是否是快讯、内部通报、严重故障
var search = window.location.search.substring(3, window.location.search.length)

switch (search) {
    case "1":
        $(".rank1").prop("checked", true);
        break;
    case "2":
        $(".rank2").prop("checked", true);
        break;
    case "3":
        $(".rank3").prop("checked", true);
        break;
    case "4":
        $(".rank3").prop("checked", true);
        break;
}



//短信預覽


$(".produce").click(function () {

    //影响业务
    let num1 = $(" input:radio[name='business1']:checked").val();
    console.log(num1)
    //内部通报
    let num2 = $(" input:radio[name='rank4']:checked").val();
    console.log(num2)
    //故障标题
    let num3 = $("input:text[name='headline']").val();

    function show() {
        let mydate = new Date();
        let str = mydate.getHours() > 9 ? mydate.getHours() + ":" : "0" + mydate.getHours() + ":";
        str += mydate.getMinutes() > 9 ? mydate.getMinutes() : "0" + mydate.getMinutes();
        return str;
    }
    //发生时间
    let num4 = show();
    //故障现象
    let num5 = $(".appearance textarea").val();
    //故障原因
    var num6;
    num6 = $("input:radio[name='cause1']:checked").val();

    //拨测情况
    let num7 = $("input:radio[name='status1']:checked").val();
    //影响范围
    let num8 = $("input:text[name='scope1']").val();
    //处理情况
    let num9 = $("input:text[name='conduct1']").val();

    //投诉情况
    let num10 = $("input:text[name='complain2']").val();
    //投诉量
    let num11 = $("input:text[name='complain3']").val();

    //是否滞后

    let num12 = $("input:radio[name='complain1']").val();

    //省监控指挥调度人

    let num13 = $("input:text[name='monitoring1']").val();

    //专业室
    let num14 = [];
    $("input:checkbox[name='labs1']:checked").each(function () {
        num14.push($(this).val());
    });




    // Array.forEach(function (value, index, num20, num21) {
    //     //   console.log(num20[index])  
    //     //   console.log(num21[index])  
    //     console.log(thisValue)
    // })
    // console.log(num20)
    // console.log(num21)
    //城市
    let num15 = $(".city #city").find("option:selected").text();
    console.log(num15)
    //广州联系人
    let num16 = $("input:text[name='city1']").val();
    console.log(num16)
    //发布范围
    let num17 = [];
    $("input:checkbox[name='publish1']:checked").each(function () {
        num17.push($(this).val());
    });




    //故障原因的容错处理
    let num18 = $("input:text[name='cause1']").val();

    console.log(num18, 18)
    if (num6 == "待确定") {
        num6 = "待确定"
    } else {
        num6 = "其他" + num18;
    }
    //拨测情况容错处理num7
    let num19 = $("input:text[name='status1']").val();

    if (num7 == "无" || num7 == "正常" || num7 == "失败") {
        num7;
    } else {
        num7 = "其他" + num19;
    }










    if (num3 == "" || num5 == "" || num6 == "其他" || num7 == "其他" || num16 == "") {
        alert("内容不完整")
        return false;
    } else {

        //专业室联系人的方式
        let num20 = [];
        $(".remove").each(function () {
            num20.push($(this).html())

        })

        let num21 = [];
        $("input:text[name='object']").each(function () {
            num21.push($(this).val())

        })
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

        let item = '【新|' + num1 + '|' + num2 + num3 + '】' + num4 + num5 + "。" + num6 + "。" + "拨测情况:" + num7 + "。" + num8 +
            "处理情况:" + num9 + "。" + "投诉情况，省监控与客服确认，截止" + num4 + num10 + num11 + num12 + num13 + num14 + num22 + num15 + num16 + "特此汇报。温馨提示:内部信息，未经许可切勿私自传播。" + num17;

        $(".preview_again").text(item)

    }


})


//专业室切换checkbox时联系人的变化
$("input[name='labs1']").bind("change", function () {
    if ($(this).is(":checked") == true) {
        var item1 = '<span class="del" style="margin-top:2px"><span class="remove">省' + $(this).val() + '信息联络人：</span>' +
            '<input type = "text" name = "object" ></span>'
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


});


//3.审核保存功能,
$(".save").click(function () {
    let letter = $(".preview_again").html();

    //添加key-value 数据到 sessionStorage
    localStorage.setItem("demokey", letter);
    //通过key来获取value
    var dt = localStorage.getItem("demokey");
    alert(dt);
    //清空所有的key-value数据。
    //sessionStorage.clear();

    console.log(dt);
})