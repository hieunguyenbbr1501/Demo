
const loadData = () => {
    ajaxJSON.get('/manager/exam', undefined, true,
        (res) => {
            let table = $('<table id="examTable" class="table table-bordered table-striped"> \
                                 <thead > \
                                    <tr> \
                                        <th>STT</th> \
                                        <th>Học kỳ</th> \
                                        <th>Mô tả</th> \
                                        <th>Năm học</th> \
                                        <th>Ngày tạo</th> \
                                        <th>Ngày sửa</th> \
                                    </tr> \
                                 </thead > \
                           </table >');
            let tbody = $('<tbody></tbody>');

            $.each(res, (index, item) => {
                let tr = $('<tr> \
                                <td>'+ (index + 1) + '</td> \
                                <td>'+ item.Name + '</td> \
                                <td>'+ item.Description + '</td> \
                                <td>'+ item.Year + '</td> \
                                <td>'+ item.Created + '</td> \
                                <td>'+ item.Updated + '</td> \
                           </tr > ').data('ID', item.ExamID);
                tbody.append(tr);
            });

            table.append(tbody);

            $('.examTable').empty();
            $('.examTable').append(table);

            $('#examTable').DataTable({
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

//-----------------------------
$(document).on('click', '#examTable tbody tr', function () {
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
var check = 1
$(document).on('click', 'body > div > div > section.content > div.box > div.box-header > span > button.btn.btn-warning.pull-right', function () {
    $('#modal .modal-title').text('CHỈNH SỬA KỲ THI');
    var ExamName = $($($('tr.Selected').find('td'))[1]).html();
    var ExamYear = $($($('tr.Selected').find('td'))[2]).html();
    $('#ExamName').val(ExamName);
    $('#ExamYear').val(ExamYear);
    check = 0;
})

$(document).on('click', '#save-exam', function () {

    let btn = $(this);

    let flag = checkDataInputModal();

    if (flag === 1) {

        var examName = $('#ExamName').val();
        var examYear = $('#ExamYear').val();
        var url = '/manager/exam';
        var pram = [];
        pram.push(examName);
        pram.push(examYear);
        if (check == 0) {
            var ExamID = $('tr.Selected').data('ID');
            pram.push(ExamID)
            ajaxJSON.put(url, pram, true,
                function (data) {
                    loadData();
                    clearDataModal();
                    $('#modal > div > div > div.modal-footer > button.btn.btn-default.pull-left').trigger('click')
                })
            check = 1
        } else {
            ajaxJSON.post(url, pram, true,
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

})

$(document).on('click', 'button.btn.btn-success.pull-right', function () {
    $('#modal .modal-title').text('THÊM KỲ THI');
    //clearDataModal();
})