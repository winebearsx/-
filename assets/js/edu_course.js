/*
 * @文件名称: 课程列表
 * @Date: 2018-11-05 22:07:53
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-05 22:08:16
 */

/**
 * @名称: 获取精品课程数据
 * @交互逻辑: &交互逻辑&
 * @Date: Do not edit
 */

new Vue({
    el: "#getLessonsList",
    data: {
        getLessonsData: []
    },
    created: function () {
        this.getData();
    },
    methods: {
        getData: function () {
            var Data = this;
            var url = 'http://marine.t.bigit.cn/index.php/Iface';
            var getLessons = {
                command: "getLessons",
                lessonType: "video",
                page: "1",
                perPage: "10"
            }
            console.log("Request getLessons = " + JSON.stringify(getLessons));
            $.ajax({
                async: true,
                type: "POST",
                url: url,
                data: {
                    data: JSON.stringify(getLessons)
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.code > 0) {
                        Data.getLessonsData = data.data;
                        console.log(Data.getLessonsData)
                    }
                },
                error: function (res) {
                    console.log("请求数据错误");
                }
            });
        }
    }
})