/**
 * Created by Administrator on 2017/12/22.
 */
/*初始化页面的js文件*/



//添加按钮
function initialize() {
    function show(){
        var mydate = new Date();
        var str = "" + mydate.getFullYear() + "/";
        str += (mydate.getMonth()+1) + "/";
        str += mydate.getDate()>9? mydate.getDate() : "0"+mydate.getDate()+" ";
        str +=mydate.getHours()>9?mydate.getHours() +":" :"0"+mydate.getHours()+":";
        str +=mydate.getMinutes()>9?mydate.getMinutes(): "0"+mydate.getMinutes();
        return str;
       }
 
    $("#add").click(function () {
        var dateNow=show();
        var setmp = '<li  class="setmp"  style="position: relative">' +
            '<input type="checkbox" style="float: left;position: absolute; top: 22px; left:34px;">'+
            '<div class="click"> '+
            '<span class="num1">'+show()+'</span>' +
            ' <span class="num2">内部通报</span>' +
            ' <span class="num3">待定待定待定待定待定待定待定</span>' +
            '<span class="num4">'+
                '<a class="num"href="./foreman.html" target="_blank">新</a>'+
                '<a class="num"href="./foreman.html" target="_blank">升级</a>'+
                '<a class="num"href="./foreman.html" target="_blank">阶段</a>'+
                '<a href="./foreman.html" target="_blank">销毁</a>'+
            '</span> ' +
            '<span class="num5">'+
                '<a href="./post.html" target="_blank">大无线</a>'+
                '<a href="./post.html" target="_blank">大核心</a>'+

            '</span> ' +
            '<span class="num6">'+
            '<i class="delete"></i>'+

            '<!--<a href="./post.html" target="_blank">删除</a>-->'+
           '<p>删除</p>'+

            '</span> ' +
            '</div>'+
            '</li>';
        $(".results-ul").append(setmp)

    })


}
initialize();
//点击全选，check和背景颜色
$("#down").click(function () {
$(".results-ul li .click").css({
    background:"#defd78",
    borderRadius:10+"px",
    overflow:"hidden",
})
    var input=$("input")
    for (var i = 0; i < input.length; i++) {
        input[i].checked = true;
    }
})

//搜索按钮
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
        var setmp = '<li>' +
            '<span class="num1">6</span>' +
            '<span class="num2">广州大学</span>' +
            ' <span class="num3">6.9</span>' +
            ' <span class="num4"> <a href="./foreman.html" target="_blank">值班长</a></span> ' +
            '<span class="num5"><a href="./post.html" target="_blank">岗位</a></span> ' +
            '</li>';
        $(".results-ul").append(setmp)

    })
    content = ""; //请求之后让内容重新为空；
}

search();

function getData(url,scope,content) {
    $.ajax({
        url: url,
        data: {
             "范围":scope,
             "内容":content

        },
        success: function (res) {
            console.log(res)
        },
        error: function (err) {
            alert(err + ":返回数据错误")
        }





    })

}