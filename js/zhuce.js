var form = $('form')[0]
//判断是否正确
var user = $('.ipone')[0]
var pass = $('.pass')[0]
var pass_ = $('.pass2')[0]
var user1 = false
var pass1 = false
var pass2 = false
var verify1 = false
var verify = $('.verify')[0]
user.onblur = function(){
    var val = this.value
    var reg = /^(1|\+861)[3-8]{1}\d{9}$/
    if(reg.test(val)){
        user1 = true
        this.nextElementSibling.innerHTML = '√'
    }else{
        user1 = false
        this.nextElementSibling.innerHTML = '×'
        this.focus()
    }
}  

pass.onblur = function(){
    var val = this.value
    var reg = /^\w{6,16}$/
    if(reg.test(val)){
        pass1 = true
        this.nextElementSibling.innerHTML = '√'
    }else{
        pass1 = false
        this.nextElementSibling.innerHTML = '×'
        this.focus()
    }
}
pass_.onfocus = function(){
    if(!pass1){
        form.pass.focus()
    }
}
pass_.onblur = function(){
    var val = this.value
    //判断是否和密码框相同
    if(val === pass.value){
        pass2 = true
        this.nextElementSibling.innerHTML = '√'
    }else{
        pass2 = false
        this.nextElementSibling.innerHTML = '×'
    } 
}

//console.log(user,pass,pass_,verify)
verify.onchange = function(){
    verify.checked ? verify1 = true : verify1 = false
    //console.log(verify) 
}
$('.btn1').click(function(){
    //如果表单必选内容不满足，提示并终止函数
    if(!(user1 && pass1 && pass2 && verify1)){
        console.log(user1,pass1,pass2,verify1)

        alert('信息输入有误，请重新输入')
        return
    }
        //定义变量接收表单value值
        var u = user.value
        var p = pass.value
        console.log(u,p)
        //发送ajax请求
        $.ajax({
            url:'./php/zhuce.php',
            type:'POST',
            data:{
                user:u,
                pass:p
            },
            cache:false,
            //接收请求成功的回调函数
            success(data){
                alert(data)
                if(data == '注册成功') location.href = 'index.html'
            },
        })
})