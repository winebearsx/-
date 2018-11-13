/*
 * @文件名称: 通知列表
 * @Date: 2018-11-06 10:32:21
 * @公司: &公司&
 * @Author: 
 * @LastEditer: 
 * @LastEditTime: 2018-11-06 10:33:03
 */

/**
 * @名称: &名称&
 * @交互逻辑: &交互逻辑&
 * @Date: Do not edit
 */
new Vue({
    el: "#noticeList",
    data: {
        noticeListData: []
    },
    created: function () {
        this.getNoticeListData();
    },
    methods: {
        getNoticeListData: function () {
            var Data = this;
            var url = 'http://marine.t.bigit.cn/index.php/Iface';
            var getNoticeList = {

                command: "getNotice",
                page: "1",
                perPage: "10"

            }
            $.ajax({
                async: true,
                type: "POST",
                url: url,
                data: {
                    data: JSON.stringify(getNoticeList)
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    console.log(data.data);
                    if (data.code > 0) {
                        Data.noticeListData = data.data;
                        console.log('success');
                    }
                }
            });
        },
        getDetailTap:function(event){
            console.log(event);
            location.href = 'edu_notice_detail.html?id=' + event;
        }
    }
})