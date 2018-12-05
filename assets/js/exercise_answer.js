/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-07 09:33:56
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-30 09:52:51
 */
var exercise = new Vue({
    el: "#questionId",
    data: {
        questionData: [],
        questionTitle: [],
        questionAnswer_A: [],
        questionAnswer_B: [],
        questionAnswer_C: [],
        questionAnswer_D: [],
        true_falseData: [],
        questionNum: []
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
            if (localStorage.getItem("exerciseid") != null) {
                if (obj.id != localStorage.getItem("exerciseid")) {
                    localStorage.removeItem("text");
                }
            }
            localStorage.setItem("exerciseid", obj.id);
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

                        Data.questionData = data.data;
                        Data.questionTitle = data.data.question[0];
                        if (data.data.questionType == 'one' || data.data.questionType == 'multi') {
                            Data.questionAnswer_A = data.data.answer[0],
                                Data.questionAnswer_B = data.data.answer[1],
                                Data.questionAnswer_C = data.data.answer[2],
                                Data.questionAnswer_D = data.data.answer[3]


                        } else if (data.data.questionType == 'true_false') {
                            Data.true_falseData = data.data.question[0];
                        }
                        if (localStorage.getItem("text") == null) {
                            localStorage.setItem("text", '1');
                        }

                        Data.questionNum = localStorage.getItem("text");
                        console.log(localStorage.getItem("text"));
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
            var radioBox = document.getElementsByName('radioBox');
            var radiotf = document.getElementsByName('true-radioBox');
            var checkBox = document.getElementsByName('checkbox');

            if (questionType == 'one') {

                var oneTotalArr = [];
                var isRight = true;
                for (let i = 0; i < radioBox.length; i++) {
                    oneTotalArr.push(clickData.questionData.answer[i].isRight);
                    for (let i = 0; i < oneTotalArr.length; i++) {
                        var oneRightArr = [];
                        if (oneTotalArr[0] == 1) {
                            var A = 'A';
                        } else {
                            A = '';
                        }
                        if (oneTotalArr[1] == 1) {
                            var B = 'B';
                        } else {
                            B = '';
                        }
                        if (oneTotalArr[2] == 1) {
                            var C = 'C';
                        } else {
                            C = '';
                        }
                        if (oneTotalArr[3] == 1) {
                            var D = 'D';
                        } else {
                            D = '';
                        }
                    }
                    oneRightArr.push(A, B, C, D);

                    if (radioBox[i].checked == true) {
                        let answerType = clickData.questionData.answer[i].isRight;

                        if (answerType == 1) {
                            isTrue = true;
                        } else if (answerType == 0) {
                            isTrue = false;

                        }
                    }


                }
                console.log(oneRightArr);
                if (isTrue == true) {
                    location.reload();
                    exercise.getTextNum();
                } else if (isTrue == false) {
                    for (let i = 0; i < oneRightArr.length; i++) {
                        if (oneRightArr[i] == '' || typeof (oneRightArr[i]) == "undefined") {
                            oneRightArr.splice(i, 1);
                            i = i - 1;
                        }
                    }
                    weui.alert('正确答案为 ' + oneRightArr, function () {
                        console.log('ok')
                    }, {
                        title: '选择错误'
                    });

                }
            } else if (questionType == 'multi') {
                let A, B, C, D;
                var arr = [];
                var totalArr = [];
                var max = 0; //获取正确答案个数
                //判断正确答案个数

                for (let i = 0; i < checkBox.length; i++) {
                    totalArr.push(clickData.questionData.answer[i].isRight);

                    // 判断正确答案的abc
                    for (let i = 0; i < totalArr.length; i++) {
                        var rightArr = [];
                        if (totalArr[0] == 1) {
                            A = 'A';
                        } else {
                            A = '';
                        }
                        if (totalArr[1] == 1) {
                            B = "B";
                        } else {
                            B = '';
                        }
                        if (totalArr[2] == 1) {
                            C = "C";
                        } else {
                            C = '';
                        }
                        if (totalArr[3] == 1) {
                            D = "D";
                        } else {
                            D = '';
                        }
                    }

                    //判断选择了哪个
                    if (checkBox[i].checked == true) {
                        arr.push(clickData.questionData.answer[i].isRight); //生成数组
                        var len = arr.length; //数组长度

                        if (len > 0) {
                            var isTrue = true;
                            var temp = 1;
                            for (let i = 0; i < len; i++) {
                                if (arr[i] != 1) {
                                    console.log('false');
                                    isTrue = false;
                                    break;
                                } else {
                                    isTrue = true;
                                }

                            }
                        }
                    }

                }
                rightArr.push(A, B, C, D);
                for (let i = 0; i < totalArr.length; i++) {
                    if (totalArr[i] == 1) {
                        max++;
                    }
                }
                //弹出提示
                if (isTrue == true && arr.length == max) {
                    exercise.getTextNum();
                    location.reload();
                } else if (isTrue == true && arr.length < max) {
                    console.log('少选,正确答案为' + max + '个');
                    weui.alert('正确答案为' + max + '个', function () {
                        console.log('ok')
                    }, {
                        title: '少选'
                    });

                } else if (isTrue == false) {
                    for (let i = 0; i < rightArr.length; i++) {
                        if (rightArr[i] == '' || typeof (rightArr[i]) == "undefined") {
                            rightArr.splice(i, 1);
                            i = i - 1;
                        }
                    }
                    console.log('选择错误，正确答案为' + rightArr);
                    weui.alert('正确答案为' + rightArr, function () {
                        console.log('ok')
                    }, {
                        title: '选择错误'
                    });
                }
                // console.log(max);
                // console.log('totalArr' + totalArr);
                // console.log('clickArr' + arr);
                // console.log(rightArr);
            } else if (questionType == 'true_false') {
                var true_false = clickData.questionData.question[0].isRight;
                console.log(true_false);
                if (true_false == 1) {
                    if (radiotf[0].checked == true) {
                        exercise.getTextNum();
                        location.reload();
                    } else if (radiotf[1].checked == true) {
                        weui.alert('请重新选择', function () {
                            console.log('ok')
                        }, {
                            title: '选择错误'
                        });
                    }
                } else if (true_false == 0) {
                    if (radiotf[0].checked == true) {
                        weui.alert('请重新选择', function () {
                            console.log('ok')
                        }, {
                            title: '选择错误'
                        });
                    } else if (radiotf[1].checked == true) {
                        location.reload();
                    }
                }


            }
        },
        getTextNum: function () {
            var text_num = localStorage.getItem("text");
            if (text_num == 'NaN') {
                text_num = 1;
                localStorage.setItem("text", text_num);
            } else {
                text_num++;
                localStorage.setItem("text", text_num);
            }

            console.log(localStorage.getItem("text"));
        }

    },
    beforeDestroyed() {
        console.log("leave");
    },
})