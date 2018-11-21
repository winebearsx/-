/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-12 16:19:27
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-21 14:33:00
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
    success: function(data) {
      // console.log(data.data);
      if (data.code > 0) {
        vm.question = data.data;
        if (vm.type == "one_choice" || vm.type == "multi_choice") {
          vm.questionAnswer_A = vm.question.answer[0].answer;
          vm.questionAnswer_B = vm.question.answer[1].answer;
          vm.questionAnswer_C = vm.question.answer[2].answer;
          vm.questionAnswer_D = vm.question.answer[3].answer;
        } else if (vm.questionType == "true_false") {
        }
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
    success: function(data) {
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
    success: function(data) {
      console.log(data);
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
    questionIdData: []
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
            success: function(data) {
              // console.log(data);
              console.log(data.data);
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
                      function() {
                        location.href = "exam_list.html";
                      },
                      {
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
        console.log(diffnum);

        var pagestage = localStorage.getItem("diffstate");
        console.log(localStorage.getItem("diffstate"));
        if (pagestage == null) {
          let num = 0;
          console.log(newData[num]);
          this.type = newData[num].questionType;
          this.questionIdData = vm.questions[num].question_id;
          this.paperContentIdData = vm.questions[num].paperId;
          getQuestionByTypeAndId(newData[num]);
          this.questionNumData = num + 1;
          localStorage.setItem("" + diffnum + "", num);
          localStorage.setItem("diffstate", "true");
          console.log(localStorage.getItem("diffstate"));
        }
        if (pagestage == "true") {
          let lastQuestion = document.getElementById("lastQuestion");
          let nextQuestion = document.getElementById("nextQuestion");
          let num = localStorage.getItem("" + diffnum + "");
          console.log(num);
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
          }
          if (num != 0) {
            lastQuestion.style = "display: block;margin-bottom:10px;";
          }
        }
      },
      immediate: false
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData: function() {
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
      console.log(obj.id);
      Data.id = obj.id;
      var sid = localStorage.getItem("sid");
      console.log(localStorage.getItem("currentUserId"));
      var currentUserId = localStorage.getItem("currentUserId");
      console.log(currentUserId);
      console.log(localStorage.getItem("lastUserId"));
      if (localStorage.getItem("lastUserId") != null) {
        if (currentUserId != localStorage.getItem("lastUserId")) {
          localStorage.removeItem("" + diffnum + "");
          localStorage.removeItem("diffstate");
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
        success: function(data) {
          if (data.code > 0) {
            var beginTime = data.data.beginTime;
            var duration = data.data.duration;
            Data.examQuestions = data.data;
            //所有考试题
            var que = Data.examQuestions.questions;
            //将所有考试题保存
            Data.questions = que;
            console.log(Data.questions.length);
            //获取所有考题id的数组
            var queIdArr = [];
            //获取所有type的数组
            var queTypeArr = [];
            //获取所有id，type 一对一数组
            var getQuestionsArr = [];

            for (let i = 0; i < que.length; i++) {
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
              function() {
                location.href = "login.html";
              },
              {
                title: "登陆超时"
              }
            );
          } else if (data.code == -16) {
            weui.alert(
              "",
              function() {
                localStorage.removeItem("time");
                location.href = "exam_list.html";
              },
              {
                title: "已经交卷，不能在作答"
              }
            );
          } else if (data.code == -17) {
            weui.alert(
              "",
              function() {
                localStorage.removeItem("time");
                location.href = "exam_list.html";
              },
              {
                title: "考试用时已到，考试结束"
              }
            );
          }
        },
        error: function(res) {}
      });
    },
    lastBtn: function() {
      var diffnum = vm.id + "queNum";
      diffnum.toString();
      let num = localStorage.getItem("" + diffnum + "");
      num--;
      let newData = this.getQuestionsArrData;
      console.log(newData[num]);
      this.type = newData[num].questionType;
      this.questionIdData = vm.questions[num].question_id;
      this.paperContentIdData = vm.questions[num].paperId;
      getQuestionByTypeAndId(newData[num]);
      this.questionNumData = num + 1;
      localStorage.setItem("" + diffnum + "", num);
      if (num == 0) {
        lastQuestion.style = "display: none";
      } else if (num != vm.questions.length - 1) {
        nextQuestion.style = "display:block";
      }
    },
    nextBtn: function() {
      // console.log(this.question);
      var diffnum = vm.id + "queNum";
      diffnum.toString();
      var type = this.type;
      let lastQuestion = document.getElementById("lastQuestion");
      let nextQuestion = document.getElementById("nextQuestion");
      var radioBox = document.getElementsByName("radioBox");
      var radiotf = document.getElementsByName("true-radioBox");
      var checkBox = document.getElementsByName("checkbox");
      let pagestage = localStorage.getItem("diffstate");
      if (pagestage == "true") {
        console.log(type);
        lastQuestion.style = "display: block;margin-bottom:10px;";
        let num = localStorage.getItem("" + diffnum + "");
        num++;
        let newData = this.getQuestionsArrData;
        console.log(newData[num]);
        this.type = newData[num].questionType;
        this.questionIdData = vm.questions[num].question_id;
        this.paperContentIdData = vm.questions[num].paperId;
        console.log(type);
        console.log(this.questionIdData);
        console.log(this.paperContentIdData);
        //点击下一题按钮得到答案
        if (type == "one_choice") {
          let sanswer;
          for (let i = 0; i < radioBox.length; i++) {
            if (radioBox[i].checked == true) {
              sanswer = this.question.answer[i].id;
            }
          }
          this.sAnswer = sanswer;
          console.log(this.sAnswer);
        } else if (type == "multi_choice") {
          let sanswer = new Array();

          for (let i = 0; i < checkBox.length; i++) {
            if (checkBox[i].checked == true) {
              sanswer.push(this.question.answer[i].id);
              var str = sanswer.join("|");
            }
          }
          this.sAnswer = str;
          console.log(this.sAnswer);
        } else if (type == "true_false") {
          let sanswer;
          if (radiotf[0].checked == true) {
            sanswer = 1;
          } else if (radiotf[1].checked == true) {
            sanswer = 0;
          }
          this.sAnswer = sanswer;
        }
        console.log(type);
        submitAQuestion(type);
        getQuestionByTypeAndId(newData[num]);
        this.questionNumData = num + 1;
        localStorage.setItem("" + diffnum + "", num);
        if (num == vm.questions.length - 1) {
          nextQuestion.style = "display:none";
          submitAQuestion(this.type);
        //   console.log(this.type);
        //   console.log(this.questionIdData);
        //   console.log(this.paperContentIdData);
        }
      } else {
        lastQuestion.style = "display: none";
        // localStorage.removeItem(""+diffnum+"");
      }
    },
    submitBtn: function() {
      finishUp();
    }
  }
});
