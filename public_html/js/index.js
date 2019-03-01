"use strict";
var page;

$(document).ready(function () {
    $('.sidenav').sidenav();
    page = new page_engine()
});

$(".wiki[trigger]").on("click",()=> page.swapBits("wiki","/bits/wiki.html") )
$(".listener[trigger]").on("click",()=> page.swapBits("listener","/bits/listener.html") )
$(".home[trigger]").on("click",()=> page.swapBits("home","/bits/home.html") )