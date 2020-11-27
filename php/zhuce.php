<?php
header("Content-type:text/html;charset=utf-8");
//连接数据库
$link = mysqli_connect('localhost','root','123456','db2010');
//设置编码
mysqli_set_charset($link,'utf8');

//获取通过post方式发送数据
$u = $_POST['user'];
$p = $_POST['pass'];
//编写操作数据库的语句
//验证注册的账号是否重复，user表格名，username表格字段名
$sql = "select * from `user` where `username` = '$u'";

//执行mysql语句
$result = mysqli_query($link,$sql);
//判断是否有内容
if($row = mysqli_fetch_assoc($result)){
    echo '手机号已注册，请重新输入';
}else{
    $sql1 = "INSERT INTO 'user' VALUES('$u','$p')";
    $result = mysqli_query($link,$sql1);
    echo '注册成功';
}

?>