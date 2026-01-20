/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */
async function getData() {
    const pObj = await axios({url: 'http://hmajax.itheima.net/api/province'});

    document.querySelector('.province').innerHTML = '<option value="">省份</option>' + pObj.data.list.map(item => {
        return`<option value="${item}">${item}</option>`
    }).join('') 

    document.querySelector('.province').addEventListener('change', async function() {
        const pname = this.value;
        console.log(pname);
        
        const cObj = await axios({url: 'http://hmajax.itheima.net/api/city', params: {pname}});
        document.querySelector('.city').innerHTML = '<option value="">城市</option>' + cObj.data.list.map(item => {
            return `<option value="${item}">${item}</option>`
        }).join('')

        document.querySelector('.city').addEventListener('change', async function() {
            const cname = this.value;
            const aObj = await axios({url: 'http://hmajax.itheima.net/api/area', params: {pname, cname}});
            document.querySelector('.area').innerHTML = '<option value="">地区</option>' + aObj.data.list.map(item => {
                return `<option value="${item}">${item}</option>`
            }).join('')  
        })
    })
    
    
}
getData()

document.querySelector('.submit').addEventListener('click', async function(){
    const formData = serialize(document.querySelector('.info-form'), {hash: true, empty: true});
    try {
        await axios({
            url: 'http://hmajax.itheima.net/api/feedback',
            method: 'post',
            data: formData
        }).then(result => {
            console.log(result);
            alert(result.data.message);
        })
    } catch (error) {
        console.dir(error);
        alert(error.response.data.message);
    }
})