$("body").on("click",".detail",function () {
    alert(123);
    //console.log($(".mask"));
    $(".mask").fadeIn();

    var parent = $(this).parent();
    var index = parent.data("xmg");
    var item = itemArray[index];
    currentIndex = index;

    $(".detail_header .title").text(item.title);
    $(".detail_body textarea").val(item.detailInfo);
    $("#dateTime").val(item.time)

});

$(".mask").click(function () {
    $(this).fadeOut();
})

$(".detail_content").click(function (e) {
    //阻止事件冒泡
    e.stopPropagation();
})

$(".close").click(function () {
    $(".mask").fadeOut();
})

/*
* 08 更新详细信息
* 001 监听更新按钮的点击事件
* 002 获取当前弹出框中指定标签对应的值，并且设置给数组
* 003 更新本地的缓存
* 004 关闭蒙版
* */
$(".update").click(function () {
    var item = itemArray[currentIndex];

    item.title = $(".detail_header .title").text();
    console.log("====",$(".detail_body textarea"));
    item.detailInfo = $(".detail_body textarea").val();
    item.time = $("#dateTime").val()
    itemArray[currentIndex] = item;
    console.log("+++++");
    console.log(itemArray);
    //更新缓存
    store.set("itemArray",itemArray);

    $(".mask").fadeOut();

});