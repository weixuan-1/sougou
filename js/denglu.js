var user = $('.ipone')[0]
var pass = $('.pass')[0]
var btn = $('.btn1')[0]
btn.onclick = function(){
    var u = user.value
    var p = pass.value
    $.ajax({
        url:'./php/denglu.php',
        type:'POST',
        data:{
            user:u,
            pass:p
        },
        cache:false,
        //接收请求成功的回调函数
        success(data){
            alert(data)
            if(data == '登录成功')location.href = 'index.html'
        },
    })
}