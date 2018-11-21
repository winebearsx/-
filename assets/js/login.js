/*
 * @文件名称: 登陆页面交互逻辑
 * @Date: 2018-10-30 14:22:51
 * @公司: &公司&
 * @Author: 
 * @lastEditer: 
 * @lastEditTime: 
 */

window.onload = function () {
  clearUserName();
  clearPassWord();
  showPassWord();
  checkLoginForm();
  submitLoginForm();
};
/*用户名一键清除功能
 *输入用户名————显示清除按钮
 *点击清除按钮————清空用户名
 */
function clearUserName() {
  let userName = document.getElementById("userName");
  let userNameBtn = document.getElementById("userNameClearBtn");
  userName.addEventListener("keyup", function () {
    if (this.value.length > 0) {
      userNameClearBtn.style = "display:block";
      userNameClearBtn.onclick = function () {
        userName.value = "";
        userNameClearBtn.style = "display:none";
      };
    } else {
      userNameClearBtn.style = "display:none";
    }
  });
}
/*密码一键清除功能
 *输入密码————显示清除按钮
 *点击清除按钮————清空密码
 */
function clearPassWord() {
  let password = document.getElementById("password");
  let passwordClearBtn = document.getElementById("passwordClearBtn");
  let passwordChangeBtn = document.getElementById("passwordChange");

  password.addEventListener("keyup", function () {
    if (this.value.length > 0) {
      passwordClearBtn.style = "display:block";
      passwordClearBtn.onclick = function () {
        password.value = "";
        passwordClearBtn.style = "display:none";
      };
    } else {
      passwordClearBtn.style = "display:none";
    }
  });
}
/*密码一键显示功能
 *输入密码————显示显示按钮
 *点击显示按钮————显示密码
 *再次点击————隐藏密码
 */
function showPassWord() {
  let password = document.getElementById("password");
  let passwordChangeBtn = document.getElementById("passwordChangeBtn");

  // 点击显示或隐藏
  passwordChangeBtn.onclick = function () {
    console.log("点击显示或隐藏");
    if (password.type == "password") {
      password.type = "text";
      passwordChangeBtn.src = "assets/img/login/login_icon_pas_show.png";
    } else {
      password.type = "password";
      passwordChangeBtn.src = "assets/img/login/login_icon_pas_hide.png";
    }
  };
}
/*表单验证
 *点击登录按钮————判断内容是否为空
 *进行提示
 */
function checkLoginForm() {
  let loginBtn = document.querySelector("#loginBtn");
  let userName = document.getElementById("userName");
  let password = document.getElementById("password");

  loginBtn.addEventListener("click", function () {
    if (userName.value.length == 0) {
      // 验证手机号和密码是否为空
      weui.topTips("请输入学号", {
        duration: 2000,
        className: "custom-classname",
        callback: function callback() {
          console.log("请输入学号");
        }
      });
    } else if (userName.value.length != 9) {
      // 学号是否正确（判断长度是否大于9位）
      weui.topTips("请输入正确的学号", {
        duration: 2000,
        className: "custom-classname",
        callback: function callback() {
          console.log("请输入正确学号");
        }
      });
    } else if (password.value.length == 0) {
      weui.topTips("请输入密码", {
        duration: 2000,
        className: "custom-classname",
        callback: function callback() {
          console.log("请输入密码");
        }
      });
    }
  });
}
/**
 *表单提交
 *点击登录按钮
 *接受数据
 *提交数据
 *返回数据
 */
function submitLoginForm() {
  let loginBtn = document.getElementById("loginBtn");

  loginBtn.onclick = function () {
    let username = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    var value = {
      command: "login",
      sNo: username,
      sPass: password
    };
    console.log("Request value = " + JSON.stringify(value));
    $.ajax({
      type: "POST",
      url: "http://marine.t.bigit.cn/index.php/Iface",
      data: {
        data: JSON.stringify(value)
      },
      dataType: "json",
      success: function (data) {
        console.log(data);
        if (data.code > 0) {
          localStorage.setItem("sid",data.data.sid);
          localStorage.setItem("currentUserId",data.data.userId);
          weui.toast("登录成功", {
            duration: 2000,
            className: "bears"
          });
         


          window.location.href = "edu_resource.html";
        } else if (data.code == -3) {
          weui.topTips(data.msg, {
            duration: 2000,
            className: "custom-classname",
            callback: function callback() {
              console.log("密码错误");
            }
          });
        } else if (data.code == -2) {
          weui.topTips(data.msg, {
            duration: 2000,
            className: "custom-classname",
            callback: function callback() {
              console.log("学号不存在");
            }
          });
        }
      },
      error: function (res) {
        console.log("请求数据错误");
      }
    });
  };
}