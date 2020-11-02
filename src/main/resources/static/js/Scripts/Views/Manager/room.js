
const loadData = () => {
    ajaxJSON.get('/manager/room', undefined, true,
        (res) => {
            let table = $('<table id="roomTable" class="table table-bordered table-striped"> \
                                 <thead > \
                                    <tr> \
                                        <th>STT</th> \
                                        <th>Tên phòng thi</th> \
                                        <th>Số lượng chỗ ngồi</th> \
                                        <th>Địa điểm</th> \
                                    </tr> \
                                 </thead > \
                           </table >');
            let tbody = $('<tbody></tbody>');

            $.each(res, (index, item) => {
                let tr = $('<tr> \
                                <td>'+ (index + 1) + '</td> \
                                <td>'+ item.RoomName + '</td> \
                                <td>'+ item.QuantitySlot + '</td> \
                                <td>'+ item.Place + '</td> \
                           </tr > ').data('ID', item.RoomID);
                tbody.append(tr);
            });

            table.append(tbody);

            $('.roomTable').empty();
            $('.roomTable').append(table);

            $('#roomTable').DataTable({
                "language": {
                    "sProcessing": "Đang xử lý...",
                    "sLengthMenu": "Xem _MENU_ mục",
                    "sZeroRecords": "Không tìm thấy dòng nào phù hợp",
                    "sInfo": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
                    "sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 mục",
                    "sInfoFiltered": "(được lọc từ _MAX_ mục)",
                    "sInfoPostFix": "",
                    "sSearch": "Tìm:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "Đầu",
                        "sPrevious": "Trước",
                        "sNext": "Tiếp",
                        "sLast": "Cuối"
                    }
                }
            });
           
        });
};

loadData();

$(document).on('click', '#roomTable tbody tr', function () {
    if ($(this).hasClass('Selected')) {
        $(this).removeClass('Selected')
        $('button.btn.modify').attr('disabled', true); $('button.btn.delete').attr('disabled', true)
    }
    else {
        if ($('tbody tr').hasClass('Selected')) {
            $('tbody tr').removeClass('Selected')
        }
        $(this).addClass('Selected')
        $('button.btn.modify').attr('disabled', false); $('button.btn.delete').attr('disabled', false)
    }
})

$(document).on('click', 'button.btn.btn-warning.pull-right', function () {
    var ID = $('tr.Selected').data('ID');

    $('#modal .modal-title').text('CHỈNH SỬA PHÒNG THI');

    $('.modal-body [property]').each((index, item) => {
        $(item).val($('tr.Selected').children()[index + 1].innerText)
    })

    mode = 2;
    sessionStorage.setItem('ID', ID);
})

$(document).on('click', 'button.btn.btn-success.pull-right', function () {
    mode = 1;
    $('#modal .modal-title').text('THÊM PHÒNG THI');
    //clearDataModal();
})

//lưu form
$(document).on('click', '#modal .save', function () {
    let btn = $(this);

    let flag = checkDataInputModal();

    if (flag === 1) {
        if (mode === 1) {
            debugger
            let ref = {};
            $('[property]').each((index, item) => {
                ref[$(item).attr('property')] = $(item).val();
            });
            ajaxJSON.post('/manager/room', ref, true,
                (res) => {
                    console.log('done');
                    loadData();
                    clearDataModal();
                    btn.siblings().click();
                    localStorage.clear();
                });
        }
        else if (mode === 2) {
            debugger
            let ref = {};
            $('[property]').each((index, item) => {
                ref[$(item).attr('property')] = $(item).val();
            });
            var RoomID = $('tr.Selected').data('ID');
            ref['RoomID'] = RoomID
            ajaxJSON.put('/manager/room', ref, true,
                function (data) {
                    loadData();
                    clearDataModal();
                    $('#modal > div > div > div.modal-footer > button.btn.btn-default.pull-left').trigger('click')
                })
        }
    }
    else {
        flag.forEach(function (item) {
            warningInput(item);
        });
    }
});