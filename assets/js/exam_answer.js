/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-12 16:19:27
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-28 16:00:14
 /*
 /*
  * @名称: 获取一道题目内容
  * @交互逻辑: ajax请求
  * @Date: Do not edit
  */
function getQuestionByTypeAndId(DataLoad) {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: vm.url,
    data: {
      data: JSON.stringify(DataLoad)
    },
    success: function (data) {
      console.log(data.data);
      if (data.code > 0) {
        vm.question = data.data;

        var radioBox = document.getElementsByName("radioBox");
        var radiotf = document.getElementsByName("true-radioBox");
        var checkBox = document.getElementsByName("checkbox");
        for (let i = 0; i < radioBox.length; i++) {
          radioBox[i].checked = false;
        }
        for (let i = 0; i < checkBox.length; i++) {
          checkBox[i].checked = false;
        }
        for (let i = 0; i < radiotf.length; i++) {
          radiotf[i].checked = false;
        }
        let answerCookie = vm.num + "answer";
        vm.answerCookie = answerCookie;
        if (localStorage.getItem("id") != null) {
          if (vm.id != localStorage.getItem("id")) {
            localStorage.removeItem("" + vm.userID + "");
            localStorage.removeItem("diffstate");
            localStorage.removeItem("" + vm.answerCookie + "");
          }
        }
        var currentUserId = localStorage.getItem("currentUserId");
        if (localStorage.getItem("lastUserId") != null) {
          if (currentUserId != localStorage.getItem("lastUserId")) {
            localStorage.removeItem("" + this.userID + "");
            localStorage.removeItem("diffstate");
            localStorage.removeItem("" + this.answerCookie + "");
          }
        }
        console.log(answerCookie);
        let array = localStorage.getItem("" + answerCookie + "");
        // var a = array[0].split(",");
        var a = new Array(array);
        if (array != null) {
          for (let i = 0; i < a.length; i++) {
            var b = a[i].split(",");
          }
          console.log(b)
          if (vm.type == "multi_choice") {
            for (let i = 0; i < vm.question.answer.length; i++) {
              for (let j = 0; j < b.length; j++) {
                if (vm.question.answer[i].id == b[j]) {
                  checkBox[i].checked = true
                }
              }


            }

          } else if (vm.type == 'one_choice') {
            for (let i = 0; i < vm.question.answer.length; i++) {
              for (let j = 0; j < b.length; j++) {
                if (vm.question.answer[i].id == b[j]) {
                  radioBox[i].checked = true
                }
              }
            }
          }
        } else {
          console.log('没有作答');
        }

        console.log(vm.question);
        if (vm.type == "one_choice" || vm.type == "multi_choice") {
          vm.questionAnswer_A = {
            data: vm.question.answer[0].answer
          }
          vm.questionAnswer_B = {
            data: vm.question.answer[1].answer
          }
          vm.questionAnswer_C = {
            data: vm.question.answer[2].answer
          }
          vm.questionAnswer_D = {
            data: vm.question.answer[3].answer
          }
        } else if (vm.questionType == "true_false") {}
      }
    }
  });
}
/**
 * @名称: 提交一道题的答案
 * @交互逻辑: &交互逻辑&
 * @Date: Do not edit
 */
function submitAQuestion(type) {
  console.log(localStorage.getItem("sid"));

  var submitData = {
    command: "submitAQuestion",
    sid: localStorage.getItem("sid"),
    exId: vm.id,
    paperContentId: vm.paperContentIdData,
    questionType: type,
    questionId: vm.questionIdData,
    sAnswer: vm.sAnswer
  };
  console.log(submitData);
  $.ajax({
    type: "POST",
    url: vm.url,
    data: {
      data: JSON.stringify(submitData)
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
    }
  });
}
/**
 * @名称: 交卷
 * @交互逻辑: &交互逻辑&
 * @Date: Do not edit
 */
function finishUp() {
  var finishUpData = {
    command: "finishUp",
    sid: localStorage.getItem("sid"),
    exId: vm.id
  };
  $.ajax({
    type: "POST",
    url: vm.url,
    data: {
      data: JSON.stringify(finishUpData)
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.code > 0) {
        localStorage.removeItem("" + vm.userID + "");
        localStorage.removeItem("" + vm.answerCookie + "");
        localStorage.removeItem("diffstate");

      }
    }
  });
}
/**
 * @名称: 获取分数
 * @交互逻辑: &交互逻辑&
 * @Date: Do not edit
 */
function getStore() {
  let sid = localStorage.getItem('sid');
  let getStoreData = {
    command: "getScore",
    sid: sid,
    exId: vm.id
  }
  console.log(getStoreData)
  $.ajax({
    type: "POST",
    url: vm.url,
    data: {
      data: JSON.stringify(getStoreData)
    },
    dataType: "json",
    success: function (data) {
      console.log(data.data.score);
      if (data.code > 0) {
        localStorage.setItem("myScore", data.data.score);
        location.href = "exam_finish.html";
      }
    }
  });
}
var vm = new Vue({
  el: "#examQuestion",
  data: {
    examQuestions: [],
    id: [],
    maxtime: [],
    time: [],
    num: [],
    getQuestionsArrData: [],
    url: "http://marine.t.bigit.cn/index.php/Iface",
    questions: [],
    question: [],
    type: [],
    questionAnswer_A: [],
    questionAnswer_B: [],
    questionAnswer_C: [],
    questionAnswer_D: [],
    true_falseData: [],
    questionNumData: [],
    sAnswer: [],
    paperContentIdData: [],
    questionIdData: [],
    userID: [],
    answerCookie: []
  },
  watch: {
    getQuestionsArrData: {
      handler(newData, oldData) {
        for (let i = 0; i < newData.length; i++) {
          $.ajax({
            type: "POST",
            url: vm.url,
            data: {
              data: JSON.stringify(newData[i])
            },
            dataType: "json",
            success: function (data) {

              if (data.code > 0) {
                //倒计时

                var maxtime = vm.maxtime;
                // console.log(maxtime);
                window.setInterval(() => {
                  minutes = Math.floor(maxtime / 60);
                  seconds = Math.floor(maxtime % 60);
                  vm.time =
                    "距离结束还有" +
                    " " +
                    minutes +
                    " " +
                    "分" +
                    " " +
                    seconds +
                    " " +
                    "秒";
                  --maxtime;
                  if (maxtime == 1) {
                    finishUp();
                    weui.alert(
                      "考试时间已到",
                      function () {
                        location.href = "exam_list.html";
                      }, {
                        title: "已自动提交"
                      }
                    );
                  }
                }, 1000);
              }
            }
          });
        }
        // localStorage.clear();
        var diffnum = vm.id + "queNum";
        diffnum.toString();

        this.userID = diffnum;

        var pagestage = localStorage.getItem("diffstate");
        // console.log(localStorage.getItem("diffstate"));
        if (pagestage == null) {
          let num = 0;

          this.type = newData[num].questionType;
          this.questionIdData = vm.questions[num].question_id;
          this.paperContentIdData = vm.questions[num].paperId;
          console.log(vm.questions[num].sAnswer);
          getQuestionByTypeAndId(newData[num]);
          this.questionNumData = num + 1;
          localStorage.setItem("" + diffnum + "", num);
          localStorage.setItem("diffstate", "true");
          console.log(localStorage.getItem("diffstate"));
        }
        if (pagestage == "true") {
          var overBtn = document.getElementById("overBtn");
          var submitBtn = document.getElementById("submitBtn");
          let lastQuestion = document.getElementById("lastQuestion");
          let nextQuestion = document.getElementById("nextQuestion");
          let num = localStorage.getItem("" + diffnum + "");
          // console.log(num);
          console.log(vm.questions[num].sAnswer);
          this.type = newData[num].questionType;
          this.questionIdData = vm.questions[num].question_id;
          this.paperContentIdData = vm.questions[num].paperId;
          getQuestionByTypeAndId(newData[num]);
          this.questionNumData = parseInt(num) + 1;
          localStorage.setItem("" + diffnum + "", num);
          localStorage.setItem("diffstate", "true");
          if (num == vm.questions.length - 1) {
            nextQuestion.style = "display:none";
            lastQuestion.style = "display: block;margin-bottom:10px;";
            overBtn.style = "display:none";
            submitBtn.style = "display:block";
          }
          if (num != 0) {
            lastQuestion.style = "display: block;margin-bottom:10px;";
          }
        }
      },
      immediate: false
    },
    questions: {
      handler(newData, oldData) {
        console.log(newData);
      },
      immediate: true
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData: function () {
      // getQuestionByTypeAndId();
      var Data = this;

      //获取传过来的id
      var obj = {};
      var diffnum = Data.id + "queNum";
      diffnum.toString();
      var arr = window.location.search.slice(1).split("&");
      for (var i = 0, len = arr.length; i < len; i++) {
        var nv = arr[i].split("=");
        obj[unescape(nv[0]).toLowerCase()] = unescape(nv[1]);
      }
      Data.id = obj.id;
      if (localStorage.getItem("id") != null) {
        if (obj.id != localStorage.getItem("id")) {
          localStorage.removeItem("" + this.userID + "");
          localStorage.removeItem("diffstate");
          localStorage.removeItem("" + this.answerCookie + "");
        }
      }
      localStorage.setItem("id", obj.id);
      var sid = localStorage.getItem("sid");
      var currentUserId = localStorage.getItem("currentUserId");
      if (localStorage.getItem("lastUserId") != null) {
        if (currentUserId != localStorage.getItem("lastUserId")) {
          localStorage.removeItem("" + this.userID + "");
          localStorage.removeItem("diffstate");
          localStorage.removeItem("" + this.answerCookie + "");
        }
      }

      localStorage.setItem("lastUserId", currentUserId);
      var maxtime;

      var examList = {
        command: "getQuestionsList",
        sid: sid,
        exId: obj.id
      };
      $.ajax({
        type: "POST",
        url: Data.url,
        data: {
          data: JSON.stringify(examList)
        },
        dataType: "json",
        success: function (data) {
          if (data.code > 0) {
            var beginTime = data.data.beginTime;
            var duration = data.data.duration;
            Data.examQuestions = data.data;
            //所有考试题
            var que = Data.examQuestions.questions;
            //将所有考试题保存
            Data.questions = que;


            //获取所有考题id的数组
            var queIdArr = [];
            //获取所有type的数组
            var queTypeArr = [];
            //获取所有id，type 一对一数组
            var getQuestionsArr = [];
            // var sAnswer = [];
            for (let i = 0; i < que.length; i++) {
              // console.log(sAnswer.push(Data.questions[i].sAnswer));
              queIdArr.push(que[i].question_id);
              queTypeArr.push(que[i].question_type);
            }

            for (let i = 0; i < queIdArr.length; i++) {
              var getQuestions = new Array();
              getQuestions[i] = {
                command: "getQuestionByTypeAndId",
                questionType: queTypeArr[i],
                questionId: queIdArr[i]
              };

              getQuestionsArr.push(getQuestions[i]);
              Data.getQuestionsArrData.push(getQuestionsArr[i]);
            }
            // 开始日期时间戳
            // console.log(data.data.beginTime);
            beginTime = beginTime.substring(0, 19);
            beginTime = beginTime.replace(/-/g, "/");
            var timestamp = new Date(beginTime).getTime();
            var nowTime = parseInt(new Date().getTime()); // 当前时间戳
            //当前时间-开始时间
            var timeDifference = nowTime - timestamp;
            // timeDifference = new Date(timeDifference * 1000); //根据时间戳生成的时间对象

            // console.log(timeDifference);
            var verbTime = duration * 60 - timeDifference / 1000;
            // console.log(verbTime);
            if (verbTime < 0) {
              console.log("未到考试时间");
              location.reload();
            }
            //传入data
            Data.maxtime = verbTime;
          } else if (data.code == -10) {
            weui.alert(
              "请重新登陆 ",
              function () {
                location.href = "login.html";
              }, {
                title: "登陆超时"
              }
            );
          } else if (data.code == -16) {
            weui.alert(
              "",
              function () {
                localStorage.removeItem("time");
                location.href = "exam_list.html";
              }, {
                title: "已经交卷，不能在作答"
              }
            );
          } else if (data.code == -17) {
            weui.alert(
              "",
              function () {
                localStorage.removeItem("time");
                location.href = "exam_list.html";
              }, {
                title: "考试用时已到，考试结束"
              }
            );
          }
        },
        error: function (res) {}
      });
    },
    lastBtn: function () {
      var diffnum = vm.id + "queNum";
      diffnum.toString();
      let num = localStorage.getItem("" + diffnum + "");
      num--;
      this.num = num;
      let newData = this.getQuestionsArrData;
      console.log(newData[num]);
      console.log(vm.questions[num].sAnswer);
      this.type = newData[num].questionType;
      this.questionIdData = vm.questions[num].question_id;
      this.paperContentIdData = vm.questions[num].paperId;
      console.log(this.type);
      console.log(this.question);

      getQuestionByTypeAndId(newData[num]);
      console.log(this.question);
      this.questionNumData = num + 1;
      localStorage.setItem("" + diffnum + "", num);
      if (num == 0) {
        lastQuestion.style = "display: none";
      } else if (num != vm.questions.length - 1) {
        nextQuestion.style = "display:block";
        overBtn.style = "display:block";
        submitBtn.style = "display:none";
      }
    },
    nextBtn: function () {
      var diffnum = vm.id + "queNum";
      diffnum.toString();
      var type = this.type;
      var totalcount = 0;
      let lastQuestion = document.getElementById("lastQuestion");
      let nextQuestion = document.getElementById("nextQuestion");
      var radioBox = document.getElementsByName("radioBox");
      var radiotf = document.getElementsByName("true-radioBox");
      var checkBox = document.getElementsByName("checkbox");
      var overBtn = document.getElementById("overBtn");
      var submitBtn = document.getElementById("submitBtn");
      let pagestage = localStorage.getItem("diffstate");
      if (pagestage == "true") {
        console.log(type);
        lastQuestion.style = "display: block;margin-bottom:10px;";
        let num = localStorage.getItem("" + diffnum + "");
        num++;
        this.num = num;
        let newData = this.getQuestionsArrData;
        console.log(newData[num]);

        this.type = newData[num].questionType;
        this.questionIdData = vm.questions[num].question_id;
        this.paperContentIdData = vm.questions[num].paperId;
        console.log(vm.questions[num].sAnswer);
        // console.log(type);
        // console.log(this.questionIdData);
        // console.log(this.paperContentIdData);
        //点击下一题按钮得到答案
        if (type == "one_choice") {
          let sanswer;
          let count = 0;
          for (let i = 0; i < radioBox.length; i++) {
            if (radioBox[i].checked == true) {
              count++;
              sanswer = this.question.answer[i].id;
            }
          }
          if (count == 0) {
            totalcount++;
            weui.alert(
              "",
              function () {
                location.reload();
              }, {
                title: "请选择答案"
              }
            );
          }
          this.sAnswer = sanswer;
          console.log(this.sAnswer);
          let c = this.sAnswer;
          console.log(c);
          let answerCookie = num - 1 + "answer";
          localStorage.setItem("" + answerCookie + "", c);
        } else if (type == "multi_choice") {
          let sanswer = new Array();
          let count = 0;
          for (let i = 0; i < checkBox.length; i++) {
            if (checkBox[i].checked == true) {
              count++;
              sanswer.push(this.question.answer[i].id);
              var str = sanswer.join("|");

            }
          }
          if (count == 0) {
            totalcount++;
            weui.alert(
              "",
              function () {
                location.reload();
              }, {
                title: "请选择答案"
              }
            );
          }
          this.sAnswer = str;
          console.log(this.sAnswer);
          let c = this.sAnswer.split('|');
          console.log(c);
          let answerCookie = num - 1 + "answer";

          localStorage.setItem("" + answerCookie + "", c);
        } else if (type == "true_false") {
          let sanswer;
          let count = 0;
          if (radiotf[0].checked == true) {
            count++;
            sanswer = 1;
          } else if (radiotf[1].checked == true) {
            count++;
            sanswer = 0;
          }
          if (count == 0) {
            totalcount++;
            weui.alert(
              "",
              function () {
                location.reload();
              }, {
                title: "请选择答案"
              }
            );
          }
          this.sAnswer = sanswer;
          console.log(this.sAnswer);
          let c = this.sAnswer;
          console.log(c);
          let answerCookie = num - 1 + "answer";
          localStorage.setItem("" + answerCookie + "", c);
        }
        console.log(type);
        if (totalcount == 0) {
          submitAQuestion(type);
          getQuestionByTypeAndId(newData[num]);

          for (let i = 0; i < radioBox.length; i++) {
            radioBox[i].checked = false;
          }
          for (let i = 0; i < checkBox.length; i++) {
            checkBox[i].checked = false;
          }
          for (let i = 0; i < radiotf.length; i++) {
            radiotf[i].checked = false;
          }
          this.questionNumData = num + 1;
          localStorage.setItem("" + diffnum + "", num);
          if (num == vm.questions.length - 1) {
            nextQuestion.style = "display:none";
            overBtn.style = "display:none";
            submitBtn.style = "display:block";

            // submitAQuestion(this.type);
            //   console.log(this.type);
            //   console.log(this.questionIdData);
            //   console.log(this.paperContentIdData);
          }
        }
      } else {
        lastQuestion.style = "display: none";
        // localStorage.removeItem(""+diffnum+"");
      }

    },
    overSubmitBtn: function () {
      weui.confirm(
        "没有作答会被记0分",
        function () {
          console.log("yes");
          finishUp();
          getStore();
        },
        function () {
          console.log("no");
        }, {
          title: "是否要提前交卷"
        }
      );
    },
    submitBtn: function () {
      console.log(this.type);
      var radioBox = document.getElementsByName("radioBox");
      var radiotf = document.getElementsByName("true-radioBox");
      var checkBox = document.getElementsByName("checkbox");
      //点击交卷按钮得到最后一题类型，提交最后一题答案并且交卷
      if (this.type == "one_choice") {
        let sanswer;
        let count = 0;
        for (let i = 0; i < radioBox.length; i++) {
          if (radioBox[i].checked == true) {
            count++;
            sanswer = this.question.answer[i].id;
          }
          if (count == 0) {
            weui.alert(
              "",
              function () {
                location.reload();
              }, {
                title: "请选择答案"
              }
            );
          }
        }
        this.sAnswer = sanswer;
        console.log(this.sAnswer);
      } else if (this.type == "multi_choice") {
        let sanswer = new Array();
        let count = 0;
        for (let i = 0; i < checkBox.length; i++) {
          if (checkBox[i].checked == true) {
            count++;
            sanswer.push(this.question.answer[i].id);
            var str = sanswer.join("|");
          }
          if (count == 0) {
            weui.alert(
              "",
              function () {
                location.reload();
              }, {
                title: "请选择答案"
              }
            );
          }
        }
        this.sAnswer = str;
        console.log(this.sAnswer);
      } else if (this.type == "true_false"); {
        let sanswer;
        let count = 0;
        if (radiotf[0].checked == true) {
          sanswer = 1;
          count++;
        } else if (radiotf[1].checked == true) {
          sanswer = 0;
          count++;
        }
        if (count == 0) {
          weui.alert(
            "",
            function () {
              location.reload();
            }, {
              title: "请选择答案"
            }
          );
        }
        this.sAnswer = sanswer;
      }
      submitAQuestion(this.type);
      weui.confirm(
        "是否要提交试卷",
        function () {
          console.log("yes");
          finishUp();
          getStore();
        },
        function () {
          console.log("no");
        }, {
          title: "提交试卷"
        }
      );
    }
  }
});