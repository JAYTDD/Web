/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = 'JAY' //用户标识
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'get',
    params: {
        creator
    }
}).then(result => {
    console.log(result)
    const data = result.data.data
    //把获取的对象属性名转成数组
    Object.keys(data).forEach(key => {
        if(key === 'avatar'){
            document.querySelector('.prew').src = data[key]
        }else if(key === 'gender'){
            const genderArr = document.querySelectorAll('.gender') //获取到一个伪数组
            genderArr[data[key]].checked = true
        }else{
            document.querySelector(`.${key}`).value = data[key]
        }
    })
    }
)

//头像修改
document.querySelector('.upload').addEventListener('change', function(e){
    const file = e.target.files[0]
    const fd = new FormData()
    fd.append('avatar', file)
    fd.append('creator', creator)
    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'put',
        data: fd
    }).then(result => {
        console.log(result);
        document.querySelector('.prew').src = result.data.data.avatar
    })
})

//操作成功后的提示
const toastSuccess = new bootstrap.Toast(document.querySelector('.my-toast'))

//用户信息修改 提交到服务器保存
document.querySelector('.submit').addEventListener('click', function(){
    const userForm = serialize(document.querySelector('.user-form'), {hash: true, empty: true})
    userForm.gender = +userForm.gender  //把字符串转成数字
    userForm.creator = creator  //追加用户标识
    console.log(userForm);
    
    axios({
        url: 'http://hmajax.itheima.net/api/settings',
        method: 'put',
        data: userForm
    }).then(result => {
        toastSuccess.show()
    })
})

