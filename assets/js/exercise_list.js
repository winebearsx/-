/*
 * @文件名称: 练习题列表
 * @Date: 2018-11-06 13:54:49
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-06 13:55:04
 */


/**
 * @名称: vue
 * @交互逻辑: &交互逻辑&
 * @Date: Do not edit
 */
var vuedata = new Vue({
    el: "#exerciseList",
    data: {
        exerciseListData: []
    },
    created() {
        this.getExerciseData();
    },
    methods: {
        getExerciseData: function () {
            var Data = this;
            var url = 'http://marine.t.bigit.cn/index.php/Iface';
            var exerciseData = {
                command: "getSubjects",
                page: "1",
                perPage: "10"
            }
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    data: JSON.stringify(exerciseData)
                },
                dataType: "json",
                success: function (data) {
                    if (data.code > 0) {
                        console.log(data.data);
                        Data.exerciseListData = data.data;
                    }
                }
            });
        },
        exerciseTap: function (event) {
            console.log(event);
            window.location = "exercise_answer.html?id="+event;
            
        }
    }

})
