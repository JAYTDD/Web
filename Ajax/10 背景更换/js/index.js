/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */
document.querySelector('.bg-ipt').addEventListener('change', function(e){
    const fd = new FormData()
    fd.append('img', e.target.files[0])
    axios({
        url: `http://hmajax.itheima.net/api/uploadimg`,
        method: 'post',
        data: fd
    }).then(result => {
        localStorage.setItem('bgUrl', result.data.data.url)
        document.body.style.backgroundImage = `url(${result.data.data.url})`
        
    })
})
    // 页面加载时，获取本地存储的背景图片url，设置body背景
    if(localStorage.getItem('bgUrl')){
        document.body.style.backgroundImage = `url(${localStorage.getItem('bgUrl')})`
    }

