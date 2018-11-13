/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-12 16:19:27
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-12 16:24:06
 */
new Vue({
    el: "#examQuestion",
    data: {
        examQuestions: [],
        time: []
    },
    created() {
        this.getData();
    },
    methods: {
        getData: function () {
            var Data = this;
            //获取传过来的id
            var obj = {};
            var arr = window.location.search.slice(1).split("&");
            for (var i = 0, len = arr.length; i < len; i++) {
                var nv = arr[i].split("=");
                obj[unescape(nv[0]).toLowerCase()] = unescape(nv[1]);
            }
            console.log(obj.id);
            var sid = localStorage.getItem('sid');
            var maxtime;
            var url = "http://marine.t.bigit.cn/index.php/Iface";
            var examList = {
                command: "getQuestionsList",
                sid: sid,
                exId: obj.id
            }
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    data: JSON.stringify(examList)
                },
                dataType: "json",
                success: function (data) {

                    if (data.code > 0) {
                        console.log(data.data);
                        console.log(data.data.beginTime);
                        Data.examQuestions = data.data;
                        console.log(Data.examQuestions);

                        console.log(Data.examQuestions.duration);
                        console.log(localStorage.getItem('time'))
                        if(localStorage.getItem('time') == null){
                            localStorage.setItem("time",Data.examQuestions.duration * 60) ;
                        }
                        else{
                            maxtime = localStorage.getItem('time');
                            window.setInterval(() => {
                                if (maxtime > 0) {
                                    minutes = Math.floor(maxtime / 60);
                                    seconds = Math.floor(maxtime % 60);
                                    Data.time = "剩余时间:" +" "+ minutes +" "+ "分" +" "+ seconds +" "+ "秒";
                                    maxtime--;
                                    localStorage.setItem("time",maxtime)
                                }
                            }, 1000)
                        }
                        
                    } else if (data.code == -10) {
                        weui.alert('请重新登陆 ', function () {
                            location.href = 'login.html';
                        }, {
                            title: '登陆超时'
                        });
                    } else if (data.code == -16) {
                        weui.alert('', function () {
                            localStorage.removeItem('time');
                            location.href = 'login.html';
                        }, {
                            title: '已经交卷，不能在作答'
                        });
                    } else if (data.code == -17) {
                        weui.alert('', function () {
                            localStorage.removeItem('time');
                            location.href = 'login.html';
                        }, {
                            title: '考试用时已到，考试结束'
                        });
                    }
                },
                error: function (res) {

                }
            });
        },

       




    }
})