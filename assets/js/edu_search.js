/*
 * @文件名称: 搜索界面交互逻辑
 * @Date: 2018-11-05 13:38:27
 * @公司: 速收科技
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-05 13:38:32
 */
window.onload = function () {
    onSearchResultBar();
}
/*
 * @名称: 搜索结果
 * @交互逻辑: 点击搜索输入关键字
 * 请求数据
 * 返回数据
 * 显示数据
 * @Date: Do not edit
 */
function inputResult() {
    var searchInput = document.getElementById('searchInput');
    var searchClear = document.getElementById('searchClear');
    searchInput.addEventListener("keyup", function () {
        if (this.value.length > 0) {
            searchClear.style = "display:block";
            searchClear.onclick = function () {
                searchInput.value = "";
                searchClear.style = "display:none";
            };
        } else {
            searchClear.style = "display:none";
        }
    })
}


new Vue({
    el: "#searchMedia",
    data: {
        searchResultData: [],
        seen: true
    },
    created: function () {
        this.getData();
    },
    methods: {

        getData: function () {
            var Data = this;
            var searchResult = document.getElementById('searchResult');
            var searchInput = document.getElementById('searchInput');
            var url = 'http://marine.t.bigit.cn/index.php/Iface';
            var searchBg = document.getElementById('searchBg');
            var searchLessons = {
                command: "searchLessons",
                keyword: searchInput.value,
                page: "1",
                perPage: "100"

            }
            console.log("Request searchLesson = " + JSON.stringify(searchLessons));
            if (searchInput.value.length > 0) {
                //请求搜索数据
                $.ajax({
                    async: true,
                    type: "POST",
                    url: url,
                    data: {
                        data: JSON.stringify(searchLessons)
                    },
                    dataType: "json",
                    success: function (data) {
                        if (data.code > 0) {
                            console.log(data);
                            Data.searchResultData = data.data;
                            Data.seen = false;
                        }

                    },
                    error: function (res) {
                        console.log("请求数据错误");
                    }
                });
            } else {
                console.log("请输入关键字");
                searchInput.focus();
            }


        },
        //搜索框交互逻辑
        // onSearchClearBar: function () {
        //     
        // }
    }
})