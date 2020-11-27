function FangDaJin(ele){
    this.ele = ele //最大盒子
    this.box = this.ele.querySelector('.box') //左边大盒子
    this.mark = this.ele.querySelector('.mark') //阴影小盒子
    this.div = this.ele.querySelector('.imgs') //小图片盒子
    this.rightBox = this.ele.querySelector('.rightBox') //右边大盒子
    this.rightImg = this.rightBox.querySelector('img') //右边盒子中的图片
    this.leftImg = this.box.querySelector('img') //左边盒子中图片
    this.imgs = this.div.querySelectorAll('img') //所有小图片

    //初始化方法
    this.init()
}
FangDaJin.prototype.init = function(){
    this.bindClick()
    this.bindmouse()
}
//给所有的小图片绑定点击事件
FangDaJin.prototype.bindClick = function(){
    //把当前this的指向赋值给_thiss
    var _this = this
    //遍历所有小图片对象
    for(let i = 0; i < _this.imgs.length; i++){
        _this.imgs[i].onclick = function(){
            //清空所有小图片的class属性值
            for(let j = 0; j < _this.imgs.length; j++){
                _this.imgs[j].style = 'border-color:#e8e8e8;'
            }
            //给当前选中的小图片添加class属性值

            this.style = 'border-color:red;'
            //获取当前小图片的src属性值
            let src1 = this.getAttribute('src')
            //使用选中的小图片路径替换左右两个大盒子中的图片路径
            _this.leftImg.setAttribute('src',src1)
            _this.rightImg.setAttribute('src',src1)
        }
        
    }
}


//绑定鼠标事件
FangDaJin.prototype.bindmouse = function(){
    var _this = this
    //给左边大盒子绑定鼠标移入事件
    _this.box.onmouseover = function(e){
        var e = e || window.event
        _this.mark.style.display = 'block'
        _this.rightBox.style.display = 'block'
        _this.move(e)
    }
    //绑定鼠标移动事件
    _this.box.onmousemove = function(e){
        var e = e || window.event
        _this.move(e)
    }
    //绑定鼠标移出事件
    _this.box.onmouseout = function(){
        _this.mark.style.display = 'none'
        _this.rightBox.style.display = 'none'
    }
}

//运动函数
FangDaJin.prototype.move = function(e){
    //获取光标相对于当前box对象的偏移位置
    var x = e.clientX - this.ele.offsetLeft - (this.mark.offsetWidth / 2)
    var y = e.clientY - this.ele.offsetTop - (this.mark.offsetHeight / 2)
    //设置边界条件
    let minX = 0,minY = 0
    let maxX = this.box.offsetWidth - this.mark.offsetWidth
    let maxY = this.box.offsetHeight - this.mark.offsetHeight
    //判断边界条件
    if(x <= minX){
        x = minX
    }else if(x >= maxX){
        x = maxX
    }
    //给小盒子设置水平偏移量
    this.mark.style.left = x + 'px'

    if(y <= minY){
        y = minY
    }else if(y >= maxY){
        y = maxY
    }
    //给小盒子设置水平偏移量
    this.mark.style.top = y + 'px'
    //移动右边盒子中图片

    this.rightImg.style.left = -2 * x + 'px'
    this.rightImg.style.top = -2 * y +'px'

}