/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-28 15:42:36
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-28 16:11:42
 */

new Vue({
    el: "#user",
    data: {
        sName: localStorage.getItem("username"),
        sNo: localStorage.getItem("studentId")
    },
    created() {
        this.getData();
    },
    methods: {
        getData: function () {
            if (localStorage.getItem("sid") == null) {
                weui.alert(
                    "",
                    function () {
                        location.href = "login.html";
                    }, {
                        title: "没有登陆,请登录"
                    }
                );
            }
        }
    }
})