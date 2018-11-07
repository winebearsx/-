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
}
/**
 * @名称: 点击搜索框
 * @交互逻辑: 跳转到搜索界面
 * @日期: &日期&
 */
function onSearchBar() {
    let clickSearchBar = document.getElementById('searchBar');
    clickSearchBar.onclick = function () {
        window.location.href = 'edu_search.html';
    }
}
/**
 * @名称: 获取数据
 * @交互逻辑: 利用ajax获取数据
 * @Date: Do not edit
 */


new Vue({
    el: "#noticeMedia",
    data: {
        noticeData: [],
        classicLessonsData: [],
        videoLessonsData: [],
        audioLessonsData: [],
        documentLessonsData: []
    },
    created: function () {
        this.getData();
    },
    methods: {

        getData: function () {
            var Data = this;
            var i = 0;
            var notice = {
                command: "getNotice",
                page: "1",
                perPage: "10"
            };
            var classicLessons = {
                command: "getClassicLessons",
                page: "1",
                perPage: "10"
            }
            var videoLessons = {
                command: "getLessons",
                lessonType: "video",
                page: "1",
                perPage: "10"
            }
            var audioLessons = {
                command: "getLessons",
                lessonType: "audio",
                page: "1",
                perPage: "10"
            }
            var documentLessons = {
                command: "getLessons",
                lessonType: "document",
                page: "1",
                perPage: "10"
            }
            console.log("Request getNotice = " + JSON.stringify(notice));
            console.log("Request getNotice = " + JSON.stringify(classicLessons));
            console.log("Request getNotice = " + JSON.stringify(videoLessons));
            console.log("Request getNotice = " + JSON.stringify(audioLessons));
            console.log("Request getNotice = " + JSON.stringify(documentLessons));
            var url = "http://marine.t.bigit.cn/index.php/Iface";
            //请求通知数据
            $.ajax({
                async: true,
                type: "POST",
                url: url,
                data: {
                    data: JSON.stringify(notice)
                },
                dataType: "json",
                success: function (data) {
                    if (data.code > 0) {
                        console.log(data);
                        Data.noticeData = data.data;
                    }

                },
                error: function (res) {
                    console.log("请求数据错误");
                }
            });
            //请求精品课程
            $.ajax({
                async: true,
                type: "POST",
                url: url,
                data: {
                    data: JSON.stringify(classicLessons)
                },
                cache: false,
                dataType: "json",
                success: function (data) {
                    if (data.code > 0) {
                        //成功后的内容
                        console.log(data);
                        Data.classicLessonsData = data.data;
                    } else {
                        //失败返回内容
                        console.log("数据返回失败");

                    }
                },
                error: function (res) {
                    console.log('请求数据错误');
                }

            });
            //请求精品课程（视频）列表
            $.ajax({
                async: true,
                type: "POST",
                url: url,
                data: {
                    data: JSON.stringify(videoLessons)
                },
                dataType: "json",
                success: function (data) {
                    // if (data.code > 0) {
                    console.log(data);
                    Data.videoLessonsData = data.data;


                },
                error: function (res) {
                    console.log("请求数据错误");
                }
            });
            //请求精品课程（音频）列表
            $.ajax({
                async: true,
                type: "POST",
                url: url,
                data: {
                    data: JSON.stringify(audioLessons)
                },
                dataType: "json",
                success: function (data) {
                    // if (data.code > 0) {
                    console.log(data);
                    Data.audioLessonsData = data.data;


                },
                error: function (res) {
                    console.log("请求数据错误");
                }
            });
            //请求精品课程（文档）列表
            $.ajax({
                async: true,
                type: "POST",
                url: url,
                data: {
                    data: JSON.stringify(documentLessons)
                },
                dataType: "json",
                success: function (data) {
                    // if (data.code > 0) {
                    console.log(data);
                    Data.documentLessonsData = data.data;


                },
                error: function (res) {
                    console.log("请求数据错误");
                }
            });
        }
    }
})