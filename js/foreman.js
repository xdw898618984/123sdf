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
        "b0x-shadow": "none"
    })
    $(".mask").fadeOut(function () {
        $(".close").css({
            "backgroundColor": "transparent",
            "b0x-shadow": "none"
        })

    });
})

//確認mask
$(".ensure").click(function () {

    $(this).css({
        "backgroundColor": "#3cd3ad",
        "b0x-shadow": " -2px 0 5px #4cb8c4,0 -2px 5px #4cb8c4,0 2px 5px #4cb8c4,2px 0 5px #4cb8c4"
    })
    $(".mask").fadeOut(function () {
        $(".ensure").css({
            "backgroundColor": "transparent",
            "b0x-shadow": " -2px 0 5px transparent,0 -2px 5px transparent,0 2px 5px transparent,2px 0 5px transparent"
        })
    });
})

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
        let str = "" + mydate.getFullYear() + "/";
        str += (mydate.getMonth() + 1) + "/";
        str += mydate.getDate() > 9 ? mydate.getDate() : "0" + mydate.getDate() + " ";
        str += mydate.getHours() > 9 ? mydate.getHours() + ":" : "0" + mydate.getHours() + ":";
        str += mydate.getMinutes() > 9 ? mydate.getMinutes() : "0" + mydate.getMinutes();
        return str;
    }
    //发生时间
    let num4 = show();
    //故障现象
    let num5 = $(".appearance textarea").val();
    //故障原因
    let num6 = $("input:radio[name='cause1']").val();

    //拨测情况
    let num7 = $("input:radio[name='status1']").val();
    //影响范围
    let num8 = $("input:text[name='scope1']").val();
    //处理情况
    let num9 = $("input:text[name='conduct1']").val();

    //投诉情况
    let num10 = $("input:text[name='complain2']").val();
    //投诉量
    let num11 = $("input:text[name='complain3']").val();

    //是否滞后

    let num12= $("input:radio[name='complain1']").val();

    //省监控指挥调度人

    let num13 = $("input:text[name='monitoring1']").val();

    //专业室
    let num14=[];
    $("input:checkbox[name='labs1']:checked").each(function(){
        num14.push($(this).val()); 
    });
    let item = "【新" + num2 + num1 + num3 + num4 + num5 + num6+num7+num8+num9+num10+num11+num12+num13+num14;
    $(".preview").text(item)



})