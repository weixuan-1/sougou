//轮播图
//传参 name('.banners','.imgsBox','.pointBox1','.prev1','.next1')
function name(a,b,c,d,e) {
    let bannerBox = document.querySelector(a)

    //承载图片的盒子
    let imgBox = document.querySelector(b)
    //焦点盒子
    let pointBox = document.querySelector(c)
    //上一张按钮
    let prevBtn = document.querySelector(d)
    //下一张按钮
    let nextBtn = document.querySelector(e)
    //根据图片的数量来创建焦点
    let bannerWidth = bannerBox.clientWidth    
    //记录是第几张图片
    let index = 1 //默认是第一张，因为第0张实际上是个假的第一张
    //记录定时器返回器
    let timerId = 0
    //console.log(bannerBox.clientWidth)

    // 2.根据图片数量创建焦点
    setPoint()

    // 3.复制 imgBox 里面的第一个和最后一个元素
    copyEle()

    // 4.自动轮播起来
    autoPlay()

    // 5.移入移出事件
    overOut()

    // 6.左右切换按钮
    leftRight()

    // 7.焦点切换图片
    pointChange()


    function setPoint() {
        let pointNum = imgBox.children.length

        //创建一个文档碎片框
        let frg = document.createDocumentFragment()
        //循环创建li
        for (i = 0; i < pointNum; i++){
            let li = document.createElement('li')
            if (i===0) li.className = 'active'
            //把li都添加到文档碎片框
            frg.appendChild(li)
        }
        //把框里的内容都添加到pointBox里面
        pointBox.appendChild(frg)
        pointBox.style.width = pointNum * 13 * 1.5 + 'px'
    }



    //复制ul下第一个和最后一个li
    function copyEle() {
        //复制第一个li
        let first = imgBox.firstElementChild.cloneNode(true)
        //复制最后一个li
        let last = imgBox.lastElementChild.cloneNode(true)
        //把first添加到ul最后一个li里面
        imgBox.appendChild(first)
        //把last添加到ul里的li最前面
        imgBox.insertBefore(last,imgBox.firstElementChild)

        //获取浏览器窗口不包含滚动条的宽度
        winWidth = bannerBox.clientWidth + 'px'
        for (i = 0; i < imgBox.children.length; i++) {
             imgBox.children[i].style.width = winWidth
        }
        console.log(winWidth)
        //重新设置ul.imgBox的宽度
        imgBox.style.width = imgBox.children.length * 100 + '%'
        //重新调整ul.imgBox的位置
        imgBox.style.left = -bannerWidth + 'px'
    }

 

    //自动轮播的方法
    function autoPlay() {
        timerId = setInterval(function () {
            //通过操作 index 这个变量,让 index++ 来确定是第几张图
            index++
            //通过调用move函数让ul.imgBox走起来
            move(imgBox,{left:-index * bannerWidth},moveEnd)
        },2000)
    }



    //运动结束的函数
    function moveEnd() {
        //判断到达了最后一张
        if (index === imgBox.children.length - 1) {
            //设置 index 变量的值为1,为了下次定时器执行的时候 index++ 继续拿到2
            index = 1
            //瞬间定位到 index 的位置
            imgBox.style.left = -index * bannerWidth + 'px'
        }

        //判断到达了第0张,也就是假的最后一张的位置
        if (index === 0) {
            //设置 index 变量的值为倒数第二张的索引,为了下次定时器的时候,能得到一个正确的值
            index = imgBox.children.length - 2

            //瞬间定位到 index 的位置
            imgBox.style.left = -index * bannerWidth + 'px'
        }

        //让所有焦点都没有类名
        for (let i = 0; i < pointBox.children.length; i++) {
            pointBox.children[i].className = ''
        }
        
        //让和图片配套的焦点 按钮有类名
        pointBox.children[index - 1].className = 'active'
    }



    //移入移出的函数
    function overOut() {
        //移入的时候关闭定时器
        bannerBox.addEventListener('mouseover',() => clearInterval(timerId))

        //移出的时候再开启自动轮播
        bannerBox.addEventListener('mouseout',() => autoPlay())
    }

    //document 的隐藏显示改变事件
    //当你切换到浏览器别的选项卡,或者最小化,或者切换回来的时候会触发
    document.onvisibilitychange = function () {
        if(document.visibilityState == 'hidden'){
            clearInterval(timerId)
        }else if(document.visibilityState == 'visible'){
            autoPlay()
        }
    }



    //左右切换函数
    function leftRight() {
        //给 p.prev 按钮绑定点击事件
        prevBtn.addEventListener('click', () => {
            //console.log(a11)
            if(!a11) return
            index--

            //运动到 index 那一张
            move(imgBox, { left: -index * bannerWidth }, moveEnd)
        })

        //给 p.next 按钮绑定点击事件
        nextBtn.addEventListener('click', () => {
            //console.log(a11)
            //all表示运动过程取消点击效果
            if(!a11) return
            index++

            //运动到 index 那张
            move(imgBox, { left: -index * bannerWidth }, moveEnd)
        })
    }



    //焦点切换的函数
    function pointChange() {
        //循环遍历 pointBox 里面的每一个li
        for (let i = 0; i < pointBox.children.length; i++) {
            //给每一个焦点按钮绑定一个点击事件
            pointBox.children[i].addEventListener('click', () => {
                console.log(all)
                if(!all) return
                //设置 index 的值为焦点对应的索引
                index = i + 1
                //运动到 index 指定的位置
                move(imgBox, { left: -index * bannerWidth }, moveEnd)
            })
        }
    }
}