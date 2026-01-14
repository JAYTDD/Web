/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
let creator = 'JAY'

function render(){
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'get',
        params: {
            creator
        }
    }).then(result => {
        console.log(result);
        document.querySelector('.list').innerHTML = result.data.data.map((item,index) => {
            return `<tr>
          <td>${index + 1}</td>
          <td>${item.bookname}</td>
          <td>${item.author}</td>
          <td>${item.publisher}</td>
          <td data-id = ${item.id}>
            <span class="del">删除</span>
            <span class="edit">编辑</span>
          </td>
        </tr>`
        }).join('')
    })
}
render()

const add_form = document.querySelector('.add-form')
const addModal = new bootstrap.Modal(document.querySelector('.add-modal'))
document.querySelector('.add-btn').addEventListener('click', function () {
    
    const bookObj = serialize (add_form, {hash: true, empty: true})
    console.log(bookObj);
    
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'POST',
        data: {
            ...bookObj,
            creator
        }
    }).then(result => {
        console.log(result)
        render()
    })
    
    addModal.hide()
})


document.querySelector('.list').addEventListener('click', function (e) {  
    if(e.target.classList.contains('del')){
        let bookId = e.target.parentNode.dataset.id
        console.log(bookId);
        
        axios({
            url: `http://hmajax.itheima.net/api/books/${bookId}`,
            method: 'delete'
        }).then(result => {
            render()
        })
    }
    
})

const edit_form = document.querySelector('.edit-form')
const editModal = new bootstrap.Modal(document.querySelector('.edit-modal'))
document.querySelector('.list').addEventListener('click', function(e){
    if(e.target.classList.contains('edit')){
        editModal.show()
        let bookId = e.target.parentNode.dataset.id
        axios({
        url: `http://hmajax.itheima.net/api/books/${bookId}`,
        }).then(result => {
            // 填充表单包含 id，保证后续修改请求路径正确
            document.querySelector('.edit-form .id').value = result.data.data.id
            document.querySelector('.edit-form .bookname').value = result.data.data.bookname
            document.querySelector('.edit-form .author').value = result.data.data.author
            document.querySelector('.edit-form .publisher').value = result.data.data.publisher
        })
    }
})

document.querySelector('.edit-btn').addEventListener('click', function(){
    const {id, bookname, author, publisher}  = serialize (edit_form, {hash: true, empty: true})
    axios({
        url: `http://hmajax.itheima.net/api/books/${id}`,
        method: 'PUT',
        data: {
            bookname,
            author,
            publisher,
            creator
        }
    }).then(result => {
        render()
        editModal.hide()
    })
})