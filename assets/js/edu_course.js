/*
 * @文件名称: 课程列表
 * @Date: 2018-11-05 22:07:53
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-12-03 09:28:42
 */

/**
 * @名称: 获取精品课程数据
 * @交互逻辑: &交互逻辑&
 * @Date: Do not edit
 */

new Vue({
    el: "#getLessonsList",
    data: {
        getLessonsData: [],
        type:[]
    },
    created: function () {
        this.getData();
    },
    methods: {
        getData: function () {
            var Data = this;
            var url = 'http://marine.t.bigit.cn/index.php/Iface';
            var obj = [];
            var arr = window.location.search.slice(1).split("&");
            for (var i = 0, len = arr.length; i < len; i++) {
                var nv = arr[i].split("=");
                obj[unescape(nv[0]).toLowerCase()] = unescape(nv[1]);
            }
            console.log(obj.type);
            Data.type = obj.type;
            var getLessons;
            if (obj.type == "jingpinLessons") {
                getLessons = {
                    command: "getClassicLessons",
                    page: "1",
                    perPage: "10"
                }
            } else {
                getLessons = {
                    command: "getLessons",
                    lessonType: obj.type,
                    page: "1",
                    perPage: "10"
                }
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
        },
        onPlayTap: function (id) {
            console.log(id);
            var downLoadData = {
                command: "downloadLesson",
                lessonId: id
            }
            $.ajax({
                async: true,
                type: "POST",
                url: "http://marine.t.bigit.cn/index.php/Iface",
                data: {
                    data: JSON.stringify(downLoadData)
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.code > 0) {
                        // window.open(data.data.url);
                        location.href = "assets/music/Video Of People Walking.mp4";
                    }
                }
            });
        },
        onDownloadTap: function (id) {
            console.log(id);

            var downLoadData = {
                command: "downloadLesson",
                lessonId: id
            }
            $.ajax({
                async: true,
                type: "POST",
                url: "http://marine.t.bigit.cn/index.php/Iface",
                data: {
                    data: JSON.stringify(downLoadData)
                },
                dataType: "json",
                success: function (data) {
                    console.log(data.data);
                    if (data.code > 0) {
                        var confirm = document.getElementById('confirm');
                        var confirmText = document.getElementById('confirmText');
                        var sure = document.getElementById('sure');
                        var cancel = document.getElementById('cancel');
                        confirm.style = "display:block";
                        confirmText.value = "http://marine.t.bigit.cn" + data.data.url;
                        sure.onclick = function () {
                            // confirm.style = "display:none";
                            var clipboard = new ClipboardJS('#sure');
                            clipboard.on('success', function (e) {
                                weui.toast('复制成功', {
                                    duration: 2000,
                                    className: "bears"
                                });

                                e.clearSelection();
                            });
                            clipboard.on('error', function (e) {
                                alert('复制失败');
                            });
                            // confirm.style = "display:none";
                        }

                        cancel.onclick = function () {
                            confirm.style = "display:none";
                        }

                    } else if (data.code == -14) {
                        weui.topTips(data.msg, {
                            duration: 2000,
                            className: "custom-classname",
                            callback: function callback() {}
                        });
                    }
                }
            });
        }
    }
})