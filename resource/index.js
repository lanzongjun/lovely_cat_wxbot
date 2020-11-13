function submitForm1(){
	var f1_msg_content = $('#f1_msg_content').val();
	var o_msg = {
		"命令":"群发文案",
		"参数":f1_msg_content
	};
	$('#f1_msg_txt').val(JSON.stringify(o_msg));
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

function submitForm3(){
    var f1_msg_image = $('#f3_msg_image').val();
    var o_msg = {
        "命令":"群发图片",
        "参数":f1_msg_image
    };
    $('#f3_msg_txt').val(JSON.stringify(o_msg));
    $('#f3').form('submit');
}

function clearForm1(){
	$('#f1').form('clear');
}

function clearForm2(){
	$('#f2').form('clear');
}

function clearForm3(){
    $('#f3').form('clear');
}

// 编辑
function showEditWin() {
    var o_row = $("#dg").datagrid('getSelected');
    console.log(o_row);
    if (!o_row || !o_row.id) {
        $.messager.alert('错误', '请选择一条记录后，在进行此操作', 'error');
        return;
    }


    if (parseInt(o_row.post_type) === 1) {
        $('#d_edit_text_task').window('open');
        $('#f_edit_text_task').form('load', {
            id:o_row.id,
            wx_id:o_row.wx_id,
            robot_id:o_row.robot_id,
            send_time:o_row.send_time,
            post_type:o_row.post_type,
            content:$.parseJSON(o_row.content).参数
        });
    }
    if (parseInt(o_row.post_type) === 2) {
        var content = $.parseJSON(o_row.content).参数;
        $('#d_edit_image_text_task').window('open');
        $('#f_edit_image_text_task').form('load', {
            id:o_row.id,
            wx_id:o_row.wx_id,
            robot_id:o_row.robot_id,
            send_time:o_row.send_time,
            post_type:o_row.post_type,
            msg_title:content.链接标题,
            msg_content:content.链接内容,
            msg_url:content.跳转链接,
            msg_pic:content.图片链接
        });
    }
    if (parseInt(o_row.post_type) === 3) {
        $('#d_edit_image_task').window('open');
        $('#f_edit_image_task').form('load', {
            id:o_row.id,
            wx_id:o_row.wx_id,
            robot_id:o_row.robot_id,
            send_time:o_row.send_time,
            post_type:o_row.post_type,
            msg_content:$.parseJSON(o_row.content).参数
        });
    }

}

// 删除
function showRemoveWin() {
    var o_row = $("#dg").datagrid('getSelected');
    if (!o_row || !o_row.id) {
        $.messager.alert('错误', '请选择一条记录后，在进行此操作', 'error');
        return;
    }
    $.messager.confirm('确认', '此操作将删除发送任务，是否进行此操作？', function (r) {
        if (r) {
            $.ajax({
                url: './route.php',
                type: "POST",
                data: {"id": o_row.id, "action": "delete"},
                success: function (data) {
                    var o_response = $.parseJSON(data);
                    if (o_response.state) {
                        $.messager.alert('信息', "受影响记录数:"+o_response.msg, 'info');
                    } else {
                        $.messager.alert('错误', o_response.msg, 'error');
                    }
                    $('#dg').datagrid('reload');
                }
            });
        }
    });
}

function saveEditImageTextForm() {
    $('#f_edit_image_text_task').form('submit');
}

function closeEditImageTextWin() {
    $('#d_edit_image_text_task').window('close');
}

function saveEditTextForm() {
    $('#f_edit_text_task').form('submit');
}

function closeEditTextWin() {
    $('#d_edit_text_task').window('close');
}

function saveEditImageForm() {
    $('#f_edit_image_task').form('submit');
}

function closeEditImageWin() {
    $('#d_edit_image_task').window('close');
}



$(function () {
    $('#btn_edit').bind('click', function () {
        showEditWin();
    });

    $('#btn_remove').bind('click', function () {
        showRemoveWin();
    });

    $('#dg').datagrid({
        method: 'post',
        url: './route.php',
        queryParams: {
            action: 'getList'
        },
        onClickRow: function (index, row) {
            $('#layout_room').layout('expand', 'south');
            $('#detail_content').text(row.content);
        }
    });

    $('#f1').form({
        url: './route.php',
        type: "POST",
        success: function (data) {
            var o_response = $.parseJSON(data);
            if (o_response.state) {
                $.messager.alert('信息-更新成功', o_response.msg, 'info');
            } else {
                $.messager.alert('错误-更新失败', o_response.msg, 'error');
            }
        }
    });

    $('#f2').form({
        url: './route.php',
        type: "POST",
        success: function (data) {
            var o_response = $.parseJSON(data);
            if (o_response.state) {
                $.messager.alert('信息-更新成功', o_response.msg, 'info');
            } else {
                $.messager.alert('错误-更新失败', o_response.msg, 'error');
            }
        }
    });

    $('#f3').form({
        url: './route.php',
        type: "POST",
        success: function (data) {
            var o_response = $.parseJSON(data);
            if (o_response.state) {
                $.messager.alert('信息-更新成功', o_response.msg, 'info');
            } else {
                $.messager.alert('错误-更新失败', o_response.msg, 'error');
            }
        }
    });

    $('#f_edit_image_text_task').form({
        url: './route.php',
        type: "POST",
        success: function (data) {
            var o_response = $.parseJSON(data);
            if (o_response.state) {
                $.messager.alert('信息-更新成功', o_response.msg, 'info');
            } else {
                $.messager.alert('错误-更新失败', o_response.msg, 'error');
            }
            $('#d_edit_image_text_task').window('close');
            $('#dg').datagrid('reload');
        }
    });

    $('#f_edit_text_task').form({
        url: './route.php',
        type: "POST",
        success: function (data) {
            var o_response = $.parseJSON(data);
            if (o_response.state) {
                $.messager.alert('信息-更新成功', o_response.msg, 'info');
            } else {
                $.messager.alert('错误-更新失败', o_response.msg, 'error');
            }
            $('#d_edit_text_task').window('close');
            $('#dg').datagrid('reload');
        }
    });

    $('#f_edit_image_task').form({
        url: './route.php',
        type: "POST",
        success: function (data) {
            var o_response = $.parseJSON(data);
            if (o_response.state) {
                $.messager.alert('信息-更新成功', o_response.msg, 'info');
            } else {
                $.messager.alert('错误-更新失败', o_response.msg, 'error');
            }
            $('#d_edit_image_task').window('close');
            $('#dg').datagrid('reload');
        }
    });
});
