function submitForm1(){
	var f1_msg_content = $('#f1_msg_content').val();
	var o_msg = {
		"命令":"群发文案",
		"参数":f1_msg_content
	};
	$('#f1_msg_txt').val(JSON.stringify(o_msg));
	console.log(JSON.stringify(o_msg));
	$('#f1').form('submit');
}

function submitForm2(){
	var f2_msg_title = $('#f2_msg_title').val();
	var f2_msg_content = $('#f2_msg_content').val();
	var f2_msg_url = $('#f2_msg_url').val();
	var f2_msg_pic = $('#f2_msg_pic').val();
	var o_msg = {
		"命令":"群发图文",
		"参数":{
			"链接标题":f2_msg_title,
			"链接内容":f2_msg_content,
			"跳转链接":f2_msg_url,
			"图片链接":f2_msg_pic
		}
	};
	$('#f2_msg_txt').val(JSON.stringify(o_msg));
	$('#f2').form('submit');
}

function clearForm1(){
	$('#f1').form('clear');
}

function clearForm2(){
	$('#f2').form('clear');
}