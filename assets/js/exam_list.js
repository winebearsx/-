/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-12 14:57:29
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-12 14:57:39
 */
var examList = new Vue({
    el: "#examList",
    data: {
        examListData: []
    },
    created() {
        this.getData();
    },
    methods: {
        getData: function () {
            var sid = localStorage.getItem("sid");
            console.log(sid);
            var Data = this;
            var getExamList = {

                command: "getLoginedExaminatinsList",
                sid: sid,
                page: "1",
                perPage: "10"

            }
            var url = "http://marine.t.bigit.cn/index.php/Iface";
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    data: JSON.stringify(getExamList)
                },
                dataType: "json",
                success: function (data) {
                    if (data.code > 0) {
                        console.log(data.data);
                        Data.examListData = data.data;
                    }
                },
                error: function (res) {
                    console.log('请求错误' + res);
                }
            });
        },
        getExamAnswer:function(event){
            console.log(event);
            location.href = 'exam_answer.html?id='+ event;
        }

    }
})