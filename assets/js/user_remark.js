/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-28 11:04:48
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-28 16:15:33
 */
new Vue({
    el: "#remarkData",
    data: {
        url: "http://marine.t.bigit.cn/index.php/Iface",
        remarkData:[]
    },
    created() {
        this.getData();
    },
    methods: {
        getData: function () {
            var Data = this;
            console.log(localStorage.getItem("sid"))
            if(localStorage.getItem("sid") == null){
                weui.alert(
                    "",
                    function () {
                      location.href = "login.html";
                    }, {
                      title: "没有登陆请登录"
                    }
                  );
            }
            var myRemark = 
                {
                    command: "myScore",
                    sid: localStorage.getItem("sid")
                }
            $.ajax({
                type: "POST",
                url: Data.url,
                data: {
                    data:JSON.stringify(myRemark)
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    console.log(data.data);
                    Data.remarkData = data.data;
                }
            });
            
        }
    }
})