define(["jquery"], function() {
    function renderPage(url,main_selector){
        if(!url || !main_selector) return;
        this.url = url;
        this.main_ele = $(main_selector);
        this.init();
    }
    renderPage.prototype = {
        constructor:renderPage,
        init(){
            // 加载数据
            this.load_data()
            .then(function(res){
                //数据加载成功后渲染页面
                this.json = res.data.list;
                this.render_page();
            }.bind(this))
            .fail(function(def,type,err_msg){
                // 数据加载失败给出信息
                this.load_err();
            })

        },
        load_data(){
            // 配置AjAX参数
            this.opt = {
                url:this.url,
                dataType:"jsonp"
            };
            return $.ajax(this.opt)
        },
        render_page(){
            //拼接字符串!;
            this.html = "<ul>";
            this.json.forEach(function(item){
                this.html +=   `<div class="main_box">
                                    <a class="pic_box"><img src=${item.image}></a>
                                    <div class="main_box_bottom">
                                        <div class="part">
                                            <div class="price">￥${item.discountPrice}</div>
                                            <div class="collect">
                                               ${item.itemSale}
                                            </div>
                                        </div>
                                        <a class="title"><i class="icon_select" data-id=${item.itemLikes}>按钮</i>${item.title}</a>
                                    </div>
                                </div>`
            }.bind(this))
            this.html += "</ul>";
            // 渲染页面
            this.main_ele.html(this.main_ele.html() + this.html);
            
        },
        load_err(){
            alert("对不起报错了!");
        }
    }
    return renderPage;
});