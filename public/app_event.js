//rendering data
function renderEvents(doc){
    let dttm = doc.data().datetime.replace("T", " ");
    let cnt = doc.data().content;
    let fnsh = doc.data().finished;
    let tr = $('<tr id="'+ doc.id +'"></tr>');
    let td1 = $('<td></td>').text(cnt);
    let td2 = $('<td></td>').text(dttm);
    let td3 = $('<td></td>')
    let del = $('<div class="del" style="color: red"></div>')
    let icon = $('<i class="far fa-trash-alt"></i>')
    let radio1 = $('<input type="radio" name="finished'+doc.id+'" value="false"'+ (fnsh=="false"?'checked':'') + '>未完成<br>')
    let radio2 = $('<input type="radio" name="finished'+doc.id+'" value="true"'+ (fnsh=="true"?'checked':'') + '>完成<br>')
    let radio3 = $('<input type="radio" name="finished'+doc.id+'" value="pending"'+ (fnsh=="pending"?'checked':'') + '>延後<br>')
    del.append(icon);
    td3.append(del, radio1, radio2, radio3);
    tr.append(td1, td2, td3);
    $('#eve-table').append(tr);

    // deleting data
    del.on('click', function(e){
        let del_cnfm = confirm('確定刪除發生在' + dttm + '的「'+ cnt +'」活動嗎？')
        e.stopPropagation();
        let id = $(this).closest('tr').attr('id');
        if (del_cnfm){
            console.log(id);
            db.collection('Events').doc(id).delete();
            alert('成功刪除！');
            setTimeout(()=>window.location.reload(), 300)
        }
    })

    // updating data
    $.each([radio1, radio2, radio3],function(index, value){
        value.on('click',function(e){
            e.stopPropagation();
            let id = $(this).closest('tr').attr('id');
            let fnsh = $(this).val();
            db.collection('Events').doc(id).set({
                finished: fnsh,
            }, {merge: true});
        })
    })
}

//adding data
$('#add_event').click((e)=>{
    e.preventDefault();
    let cnt = $('input[name=content]').val();
    let dttm = $('input[name=datetime]').val();
    if (cnt == ''){
        alert('請填寫活動內容！');
    } else if (dttm == ''){
        alert('請填寫日期時間！');
    } else {
        db.collection('Events').add({
            content: cnt,
            datetime: dttm,
            finished: "false"
        })
    }
    setTimeout(()=>window.location.reload(), 300)
})

// getting data 
db.collection('Events').get().then(data => {
    data.docs.forEach(doc => {
        $("#loading").remove()
        renderEvents(doc);
        //console.log("id="+doc.id);
    });
});