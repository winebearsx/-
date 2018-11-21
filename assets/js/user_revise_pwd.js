/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-21 15:25:33
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-21 17:21:26
 */
window.onload = function () {
    changeWord();
}

function changeWord() {
    let confirmBtn = document.getElementById("confirmBtn");
    let oldPassWord = document.getElementById("oldPassWord");
    let newPassWord = document.getElementById("newPassWord");
    let confirmNewPwd = document.getElementById("confirmNewPwd");
    var changeWordData = {
        
            command: "changePassword",
            sid: localStorage.getItem("sid"),
            oldPassword: oldPassWord.value,
            newPassword: newPassWord.value
        
    }
    confirmBtn.onclick = function () {
        if(oldPassWord.value.length == 0){
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
                    data:JSON.stringify(changeWordData)
                },
                dataType: "dataType",
                success: function (data) {
                    console.log(data);
                }
            });
        }
    }
}