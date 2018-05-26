/*
    $.banner({
			animate:”slide|fade”,
			autoPlay:true,
			nextBtn:$(“#next”),
			prevBtn:$(“#prev”)
		})
*/ 
;+function($){
// 绑定原型到$上
    $.banner = function(options){
        // 每一次调用都会创建新的原型指针
        new Banner(options);
    }
    function Banner(options){ 
        this.init(options);
    }
    Banner.prototype = {
        constructor:Banner,
        init:function(options){
            //当前显示的内容;
            this.index = 0;
            //动画模式;
            this.animate = options.animate;
            //具体元素获取;
            this.bannerItem = $(".banner-item");
            this.bannerNum = this.bannerItem.length;
            // 是否自动 
            this.auto = options.autoPlay;
            this.btnPrev = options.prevBtn;
            this.btnNext = options.nextBtn;
            // 按钮点击事件
            this.btnPrev
            .on("click.changeIndex",$.proxy(this.changeIndex_prev,this))
            .on("click.animation",$.proxy(this.animation,this));
            this.btnNext
            .on("click",$.proxy(this.changeIndex_next,this))
            .on("click",$.proxy(this.animation,this));
            this.auto_banner(this.auto);
            
        },
        changeIndex_prev:function(){
            // 储存当前下标；
            this.prev = this.index;
            // 计算下一个坐标
            if(this.index  == 0){
                this.index = this.bannerNum - 1;
            }else{
                this.index --;
            } 
        },
        changeIndex_next:function(){  
            // 储存当前下标；
            this.prev = this.index;
            // 计算下一个坐标
            if(this.index == this.bannerNum - 1){
                this.index = 0;
            }else{
                this.index ++;
            }
        },
        animation:function(event){
            if(this.prev == this.index) return ;
            var animationList = {
                // slide 动画模式
                "slide":function(){
                    animationList.prevItem();
                    this.bannerItem.eq(this.index)
                    .addClass("active")
                    .css({
                        display:"none"
                    })
                    .slideDown("slow")
                    .siblings()
                    .removeClass("active");
                }.bind(this),
                // fade 动画模式
                "fade":function(){
                    animationList.prevItem();
                    this.bannerItem.eq(this.index)
                    .addClass("active")
                    .css({
                        display:"none"
                    })
                    .fadeIn("slow")
                    .siblings()
                    .removeClass("active");           
                }.bind(this),
                // 保留上一张图片 目的：让即将消失的图片层级高于无关元素层级
                "prevItem":function(){
                    this.bannerItem.eq(this.prev)
                    .css({
                        zIndex:1
                    })
                    .siblings()
                    .css({
                        zIndex:""
                    })
                }.bind(this)
            }
            // 根据用户选择执行动画
            animationList[this.animate]();
        },
        // 自动轮播
        auto_banner:function(bool){
            if(!bool) return;
            // 每3秒执行changeIndex_next与animation
            var Go =setInterval(function(){
                this.changeIndex_next();
                this.animation();
            }.bind(this),3000)
        }
    }
  
}(jQuery);