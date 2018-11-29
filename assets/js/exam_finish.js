/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-23 14:03:45
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-28 15:47:46
 */
new Vue({
    el:"#myScore",
    data:{
        score:[],
        sName: localStorage.getItem("username"),
        sNo: localStorage.getItem("studentId")
    },
    created() {
        this.getData();
    },
    methods:{
        getData:function(){
            var Data =this;
            Data.score = localStorage.getItem("myScore")
        }
    }
})