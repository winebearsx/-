// 头部注释
/*
 * @文件名称: 学习资源交互逻辑
 * @Date: 2018-10-30 15:05:35
 * @公司: &公司&
 * @Author: 
 * @lastEditer: 
 * @lastEditTime: 
 */
// 函数注释
/**
 * @名称: 页面加载函数
 * @交互逻辑: &交互逻辑&
 * @日期: &日期&
 */
window.onload = function () {
    onSearchBar();
    onDownLoadFile();
}
/**
 * @名称: 点击搜索框
 * @交互逻辑: 跳转到搜索界面
 * @日期: &日期&
 */
function onSearchBar() {
    let clickSearchBar = document.getElementById('searchBar');
    clickSearchBar.onclick = function(){
        window.location.href='edu_search.html';
    }
}
function onDownLoadFile() {
    let downLoadLink = document.getElementById('downLoadLink');
    downLoadLink.onclick = function () {
        window.open('assets/img/text_graphic_image.pdf');
    }
}
