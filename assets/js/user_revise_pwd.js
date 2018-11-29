/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-21 15:25:33
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-28 16:12:01
 */

window.onload = function(){
    console.log(localStorage.getItem("sid"))
    if(localStorage.getItem("sid")== null){
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
function changeWord() {
    var confirmBtn = document.getElementById("confirmBtn");
    var oldPassWord = document.getElementById("oldPassWord");
    var newPassWord = document.getElementById("newPassWord");
    var confirmNewPwd = document.getElementById("confirmNewPwd");

    
        var changeWordData = {
            command: "changePassword",
            sid: localStorage.getItem("sid"),
            oldPassword: oldPassWord.value,
            newPassword: newPassWord.value

        }
        if (oldPassWord.value.length == 0) {
            weui.topTips("请输入旧密码", {
                duration: 2000,
                className: "custom-classname",
                callback: function callback() {}
            });
        }
        if (confirmNewPwd.value != newPassWord.value) {
            weui.topTips("两次输入的密码不一致", {
                duration: 2000,
                className: "custom-classname",
                callback: function callback() {}
            });
        } else {
            $.ajax({
                type: "POST",
                url: "http://marine.t.bigit.cn/index.php/Iface",
                data: {
                    data: JSON.stringify(changeWordData)
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if(data.code > 0){
                        weui.alert(
                            "请重新登陆",
                            function() {
                              location.href = "login.html";
                            },
                            {
                              title: "修改成功"
                            }
                          );
                    }
                    else if(data.code == -10){
                        weui.alert(
                            "请重新登陆",
                            function() {
                              location.href = "login.html";
                            },
                            {
                              title: "登录已过期"
                            }
                          );
                    }
                }
            });
        }
    
}