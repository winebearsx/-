/*
 * @文件名称: &文件名称&
 * @Date: 2018-11-13 14:31:25
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-13 14:31:29
 */
new Vue({
    el: "#noticeDetail",
    data: {
        getDetailData: []
    },
    created() {
        this.getData();
    },
    methods: {
        getData: function () {
            var Data = this;
            var obj = {};
            var arr = window.location.search.slice(1).split("&");
            for (var i = 0, len = arr.length; i < len; i++) {
                var nv = arr[i].split("=");
                obj[unescape(nv[0]).toLowerCase()] = unescape(nv[1]);
            }
            console.log(obj.id);
            var url = 'http://marine.t.bigit.cn/index.php/Iface';
            var detailData = {
                
                    command: "getNoticeDetailById",
                    noticeId: obj.id
                
            }
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    data:JSON.stringify(detailData)
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    console.log(data.data);
                    if(data.code > 0){
                        console.log('请求成功')
                        console.log(data.data);
                        Data.getDetailData = data.data;
                    }
                }
            });
        }
    }

})