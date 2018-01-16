$(".save").on("click", function () {

    //告警情况的文本值
    let post1 = $("input:text[name='number']").val();

    //预处理情况的文本值
    let post2 = $("#oneT").val();
    let post3 = $("#twoT").val();
    let post4 = $("#threeT").val();

    //故障时限
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
        post19 ="正常"+ $("input:text[name='nameOne']").val();
        break;
        case "失败":
        post19 ="失败"+ $("input:text[name='nameTwo']").val();
    }

console.log(post19)

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
        })
        //电话联系人
        let post16 = [];
        $(".contactsOne").each(function () {
            post16.push($(this).val())
        })
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


        let board = post1 + post2 + post3 + post4 + post5 + post6 + post7 + post8 + post9 + post10 + post14 + post17+post19;

        console.log(board)
    }


})

//专业室切换checkbox时联系人的变化
$("input[name='case']").bind("change", function () {
    if ($(this).is(":checked") == true) {

        var item1 = '<div class="del"> <span class="postOne"> 省' + $(this).val() + '信息联络人: </span>' +
            '<input type = "text" name = "post" style="width:130px;height:24px"></div>'
        $(".case_down").append(item1)
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
    $(".linkman").empty();
    for (let i = 0; i < cityArr.length; i++) {

        var linkman = '<span><span class="contacts">' + cityArr[i] + '联系人:</span ><input class="contactsOne" type="text" style="min-width:100px;height:24px"></span>'
        console.log(linkman)
        if (cityArr[i]) {

        }
        $(".linkman").append(linkman)


    }

    console.log(linkman)


})