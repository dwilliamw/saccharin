//tab change
$('.jq22_tabmin div').hover(function () {
    var conBox = $("#jq22_main").find('.conBox');
    $(this).addClass("cur").siblings('.cur').removeClass("cur");
    conBox.find(".jq22_tabcon").eq($(this).index()).show().siblings(':visible').hide();
})

$('.jq23_tabmin div').hover(function () {
    var conBox = $("#jq23_main").find('.conBox');
    $(this).addClass("cur").siblings('.cur').removeClass("cur");
    conBox.find(".jq23_tabcon").eq($(this).index()).show().siblings(':visible').hide();
})

$('.jq24_tabmin div').hover(function () {
    var conBox = $("#jq24_main").find('.conBox');
    $(this).addClass("cur").siblings('.cur').removeClass("cur");
    conBox.find(".jq24_tabcon").eq($(this).index()).show().siblings(':visible').hide();
})