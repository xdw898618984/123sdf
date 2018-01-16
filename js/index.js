/**
 * Created by Administrator on 2017/12/22.
 */
/*初始化页面的js文件*/


//1.添加按钮新增记录按钮
function initialize() {
    function show() {
        var mydate = new Date();
        var str = "" + mydate.getFullYear() + "/";
        str += (mydate.getMonth() + 1) + "/";
        str += mydate.getDate() > 9 ? mydate.getDate() : "0" + mydate.getDate() + "/";
        str += mydate.getHours() > 9 ? mydate.getHours() + ":" : "0" + mydate.getHours() + " :";
        str += mydate.getMinutes() > 9 ? mydate.getMinutes() : "0" + mydate.getMinutes();
        return str;
    }

    $(".newAdd").click(function () {
        var dateNow = show();
        var setmp = '<li  class="setmp setmp2"  style="position: relative">' +
            '<input type="checkbox" name="cut" style="float: left;position: absolute; top: 22px; left:25px; ">' +
            '<div class="click"> ' +
            '<span class="num1">' + show() + '</span>' +
            ' <span class="num2">内部通报</span>' +
            ' <span class="num3">待定待定待定待定待定待定待定</span>' +
            '<span class="num4">' +
            '<a class="num"href="./foreman.html?a=1" target="_blank">新</a>' +
            '<a class="num"href="./foreman.html?a=2" target="_blank">升级</a>' +
            '<a class="num"href="./foreman.html?a=3" target="_blank">阶段</a>' +
            '<a href="./foreman.html?a=4" target="_blank">销毁</a>' +
            '</span> ' +
            '<span class="num5">' +
            '<a href="./post.html" target="_blank">大无线</a>' +
            '<a href="./post.html" target="_blank">大核心</a>' +

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
        $("input:checkbox[name='cut']").parent().css({
            background: "#defd78",
            borderRadius: 10 + "px",
            overflow: "hidden",
        })

    } else {

        // $(this).attr("checked",false);
        $("input:checkbox[name='cut']").attr("checked", false);
        $("input:checkbox[name='cut']").parent().css({
            background: "transparent",
            borderRadius: 10 + "px",
            overflow: "hidden",
        })
    }


})

//3全部删除，删除全部数据


$("#up").on("click", function (e) {
    e.preventDefault()
    $("input:checkbox[name='cut']:checked").parent().remove();
    setTimeout(function () {
        $("input:checkbox[name='all']").prop('checked', false);
      
    }, 100)
   console.log( $("input:checkbox[name='all']:checked").is(":checked"))
    if ($("input:checkbox[name='all']:checked").is(":checked") != false) {
    // if ($("input:checkbox[name='all']:checked").is(":checked") != false) {
        $('.up').attr("checked", false)
    }
    console.log($("input:checkbox[name='all']:checked").parent())

})

//4.单选按钮，改变背景颜色

$(document).on("change", "input:checkbox[name='cut']", function () {


    if ($(this).is(":checked") == true) {

        $(this).parent().css({
            background: "#defd78",
            borderRadius: 10 + "px",
            overflow: "hidden",
        })
    } else {
        $(this).parent().css({
            background: "transparent",
            borderRadius: 10 + "px",
            overflow: "hidden",
        })
    }
})

//5.删除按钮，删除本行数据
$(document).on("click", ".deleteNum", function () {
    //一直找到li标签的位置。
    $(this).parent().parent().remove();
})




//6.搜索按钮
function search() {
    var a;
    $("#date").click(function () {
        a = $("select option:selected").text(); //获取内容的内容；

    })



    $("#search").click(function () {

        var b = $("select option:selected").html() //默认选择显示的时间

        var c = a != "undefined" ? b : a; //三元运算符，当没有选择时间的时候，就显示默认的时间

        var content = $("#content").val(); //内容字段


        //进行数据请求，参数是URL， 范围字段 ，内容字段
        //    function getData();
        var setmp1 = '<li  class="setmp setmp2"  style="position: relative">' +
            '<input type="checkbox" name="cut" style="float: left;position: absolute; top: 22px; left:25px;">' +
            '<div class="click"> ' +
            '<span class="num1">' + 1222 + '</span>' +
            ' <span class="num2">内部通报</span>' +
            ' <span class="num3">待定待定待定待定待定待定待定</span>' +
            '<span class="num4">' +
            '<a class="num"href="./foreman.html" target="_blank">新</a>' +
            '<a class="num"href="./foreman.html" target="_blank">升级</a>' +
            '<a class="num"href="./foreman.html" target="_blank">阶段</a>' +
            '<a href="./foreman.html" target="_blank">销毁</a>' +
            '</span> ' +
            '<span class="num5">' +
            '<a href="./post.html" target="_blank">大无线</a>' +
            '<a href="./post.html" target="_blank">大核心</a>' +

            '</span> ' +
            '<span class="num6 deleteNum">' +


            '<i class="delete" id="delete"></i>' +


            '<p class="deleteTo">删除</p>' +

            '</span> ' +
            '</div>' +
            '</li>';
        $(".results-ul").append(setmp1);
        //清除输入框
        $("#content").val("");

    })

}

search();




function getData(url, scope, content) {
    $.ajax({
        url: url,
        data: {
            "范围": scope,
            "内容": content

        },
        success: function (res) {
            console.log(res)
        },
        error: function (err) {
            alert(err + ":返回数据错误")
        }





    })

}