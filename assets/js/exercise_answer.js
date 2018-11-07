/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-07 09:33:56
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-07 09:34:01
 */
new Vue({
    el: "#questionId",
    data: {
        questionData: [],
        questionTitle: [],
        questionAnswer_A: [],
        questionAnswer_B: [],
        questionAnswer_C: [],
        questionAnswer_D: [],
        true_falseData: []
    },
    created() {

        this.getData();

    },
    methods: {
        getData: function () {
            //获取传过来的id
            var obj = {};
            var arr = window.location.search.slice(1).split("&");
            for (var i = 0, len = arr.length; i < len; i++) {
                var nv = arr[i].split("=");
                obj[unescape(nv[0]).toLowerCase()] = unescape(nv[1]);
            }
            console.log(obj.id);
            var Data = this;
            var url = 'http://marine.t.bigit.cn/index.php/Iface';
            var getQuestionsData = {
                command: "getExercise",
                subjectId: obj.id
            }
            //请求数据
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    data: JSON.stringify(getQuestionsData)
                },
                dataType: "json",
                success: function (data) {
                    if (data.code > 0) {
                        console.log(data.data);
                        Data.questionData = data.data;
                        Data.questionTitle = data.data.question[0];
                        if (data.data.questionType == 'one' || data.data.questionType == 'multi') {
                            Data.questionAnswer_A = data.data.answer[0];
                            Data.questionAnswer_B = data.data.answer[1];
                            Data.questionAnswer_C = data.data.answer[2];
                            Data.questionAnswer_D = data.data.answer[3];
                        } else if (data.data.questionType == 'true_false') {
                            Data.true_falseData = data.data.question[0];
                        }

                    }
                },
                error: function (res) {
                    console.log('请求错误' + res);
                }
            });
        },
        nextQuestion: function () {
            var clickData = this;
            var questionType = clickData.questionData.questionType;
            console.log('success');
            var radioBox = document.getElementsByName('radioBox');
            var checkBox = document.getElementsByName('checkbox');
            var radioBoxValue = document.getElementsByName('radioBoxValue');
            var checkBoxValue = document.getElementsByName('checkBoxValue');
            if (questionType == 'one' || questionType == 'true_false') {
                for (let i = 0; i < radioBox.length; i++) {
                    if (radioBox[i].checked == true) {
                        console.log(radioBox[i]);
                    }
                }
            }
            else if(questionType == 'multi'){
                for (let i = 0; i < checkBox.length; i++) {
                    if (checkBox[i].checked == true) {
                        console.log(checkBox[i]);
                    }
                }
            }
        }

    }
})