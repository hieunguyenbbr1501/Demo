
const loadData = () => {
    ajaxJSON.get('/manager/subject', undefined, true,
        (res) => {
            let table = $('<table id="subjectTable" class="table table-bordered table-striped"> \
                                 <thead > \
                                    <tr> \
                                        <th>STT</th> \
                                        <th>Mã môn học</th> \
                                        <th>Tên môn học</th> \
                                        <th>Major</th> \
                                    </tr> \
                                 </thead > \
                           </table >');
            let tbody = $('<tbody></tbody>');

            $.each(res, (index, item) => {
                let tr = $('<tr> \
                                <td>'+ (index + 1) + '</td> \
                                <td>'+ item.Code + '</td> \
                                <td>'+ item.Name + '</td> \
                                <td>'+ item.Major + '</td> \
                           </tr > ').data('ID', item.Code);
                tbody.append(tr);
            });

            table.append(tbody);

            $('.subjectTable').empty();
            $('.subjectTable').append(table);

            $('#subjectTable').DataTable({
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

$('#DSMH').change(function (evt) {
    var me = $(this);
    var selectedFile = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var data = event.target.result;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        workbook.SheetNames.forEach(function (sheetName) {
            if (sheetName == 'Subject') {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                ajaxJSON.post('/manager/subjects', XL_row_object, true,
                    function (data) {
                        loadData();
                    })
            }

        })
    };
    reader.onerror = function (event) {
        console.error(event.target.error.code);
    };
    reader.readAsBinaryString(selectedFile);
    me.val(undefined);
});

//
loadData();
$(document).on('click', '#subjectTable tbody tr', function () {
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

var mode = 1
$(document).on('click', 'button.btn.btn-success.pull-right', function () {
    mode = 1;
    $('#modal .modal-title').text('THÊM MÔN HỌC');
    clearDataModal();
    $('#SubjectCode').removeAttr('placeholder');
})
$(document).on('click', 'button.btn.btn-warning.pull-right', function () {
    var ID = $('tr.Selected').data('ID');

    $('#modal .modal-title').text('CHỈNH SỬA THÔNG TIN MÔN HỌC');
    $('.modal-body [property]').each((index, item) => {
        $(item).val($('tr.Selected').children()[index + 1].innerText)
    })

    mode = 2;
    sessionStorage.setItem('ID', ID);
})

$(document).on('click', '#save-subject', function () {

    let btn = $(this);

    let flag = checkDataInputModal();

    if (flag === 1) {
        var student = {
        }

        if (mode == 2) {
            var id = $('tr.Selected').data('id');
            student = {
                id: id,
                code: $('#code').val(),
                name: $('#name').val(),
                major: $('#major').val()
            }
            ajaxJSON.put('/subject/update', student, true,
                function (data) {
                    window.location.replace('/subject');
                })
        } else {
            student = {
                code: $('#code').val(),
                name: $('#name').val(),
                major: $('#major').val()
            }
            ajaxJSON.post('/subject/insert', student, function () {
                window.location.replace('/subject');
            })
        }

    }
    else {
        flag.forEach(function (item) {
            warningInput(item);
        });
    }

})