
const loadData = () => {
    debugger
    ajaxJSON.get('/manager/student', undefined, true,
        (res) => {
            let table = $('<table id="studentTable" class="table table-bordered table-striped"> \
                                 <thead > \
                                    <tr> \
                                        <th>STT</th> \
                                        <th>Mã sinh viên</th> \
                                        <th>Tên sinh viên</th> \
                                        <th>Ngày sinh</th> \
                                        <th>Email</th> \
                                        <th>Chuyên ngành</th> \
                                        <th>Ngày tạo</th> \
                                        <th>Ngày sửa</th> \
                                    </tr> \
                                 </thead > \
                           </table >');
            let tbody = $('<tbody></tbody>');

            $.each(res, (index, item) => {
                let tr = $('<tr> \
                                <td>'+ (index + 1) + '</td> \
                                <td>'+ item.StudentCode + '</td> \
                                <td>'+ item.StudentName + '</td> \
                                <td>'+ item.StudentUserName + '</td> \
                                <td>'+ item.StudentPass + '</td> \
                           </tr > ').data('ID', item.StudentID);
                tbody.append(tr);
            });

            table.append(tbody);

            $('.studentTable').empty();
            $('.studentTable').append(table);

            $('#studentTable').DataTable({
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

//
loadData();

$(document).on('click', '#studentTable tbody tr', function () {
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
    $('#modal .modal-title').text('THÊM SINH VIÊN');
    clearDataModal();
    $('#StudentCode').removeAttr('placeholder');
    $('#StudentCode').attr('readonly', false)
})
$(document).on('click', 'button.btn.btn-warning.pull-right', function () {
    var ID = $('tr.Selected').data('ID');

    $('#modal .modal-title').text('CHỈNH SỬA THÔNG TIN SINH VIÊN');
    $('.modal-body [property]').each((index, item) => {
        $(item).val($('tr.Selected').children()[index + 1].innerText)
    })

    mode = 2;
    sessionStorage.setItem('ID', ID);
    $('#StudentCode').attr('readonly', true)
})
$(document).on('keyup', '#StudentCode', function () {
    $('#StudentUserName').val($('#StudentCode').val())

})
$(document).on('click', '#save-student', function () {

    let btn = $(this);

    let flag = checkDataInputModal();

    if (flag === 1) {

        var studentCode = $('#StudentCode').val();
        var studentName = $('#StudentName').val();
        var studentPass = $('#StudentPass').val();
        var url = '/manager/student';
        if (mode == 2) {
            debugger
            var StudentID = $('tr.Selected').data('ID');
            var pram = [];
            pram.push(studentName);
            pram.push(studentPass);
            pram.push(StudentID)
            ajaxJSON.put(url, pram, true,
                function (data) {
                    loadData();
                    clearDataModal();
                    $('#modal > div > div > div.modal-footer > button.btn.btn-default.pull-left').trigger('click')
                })
        } else {
            var pram = [];
            pram.push(studentCode);
            pram.push(studentName);
            pram.push(studentPass);
            debugger
            ajaxJSON.post(url, pram, true,
                function (data) {
                    if (data == '0') {
                        $('#StudentCode').val('')
                        $('#StudentCode').attr('placeholder', 'Mã sinh viên bị trùng')
                    }
                    else {
                        loadData();
                        clearDataModal();
                        $('#modal > div > div > div.modal-footer > button.btn.btn-default.pull-left').trigger('click')
                    }
                })
        }

    }
    else {
        flag.forEach(function (item) {
            warningInput(item);
        });
    }

})

$('#DSSV').change(function (evt) {
    var me = $(this);
    var selectedFile = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var data = event.target.result;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        workbook.SheetNames.forEach(function (sheetName) {
            if (sheetName == 'Student') {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                ajaxJSON.post('/manager/students', XL_row_object, true,
                    function (data) {
                        loadData()
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

$('#dsdk').change(function (evt) {
    var me = $(this);
    var selectedFile = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var data = event.target.result;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        workbook.SheetNames.forEach(function (sheetName) {
            if (sheetName == 'Student_Subject') {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                ajaxJSON.post('/manager/list-condition', XL_row_object, true,
                    function (data) {

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

$('.file-cus').click(function () {
    $(this).find('label').click();
})

$('.file-cus label').click(function (e) {
    e.stopPropagation();
})
$(document).on('dblclick', '#studentTable tbody tr', function () {
    loadDataList($(this).data('ID'));
    var me = this
    $('#modal-list').modal('show');
})
const loadDataList = (id) => {
    debugger
    ajaxJSON.get(`/manager/subject-${id}/student`, undefined, true,
        (res) => {
            let table = $('<table id="subjectTable" class="table table-bordered table-striped"> \
                                 <thead > \
                                    <tr> \
                                        <th>STT</th> \
                                        <th>Mã môn học</th>\
                                        <th>Môn học</th> \
                                        <th>Điều kiện</th> \
                                    </tr> \
                                 </thead > \
                           </table >');
            let tbody = $('<tbody></tbody>');

            $.each(res, (index, item) => {
                var span;
                if (item.Condition) {
                    span = $('<span class="true">Đủ điều kiện</span>')
                }
                else {
                    span = $('<span class="false">Cấm thi</span>')
                }
                var td = $('<td></td>');
                td.append(span);
                let tr = $('<tr> \
                                <td>'+ (index + 1) + '</td> \
                                <td>'+ item.SubjectCode + '</td> \
                                <td>'+ item.SubjectName + '</td> \
                           </tr > ').data('ID', item.SubjectID);
                tr.append(td);
                tbody.append(tr);
            });

            table.append(tbody);

            $('.subjectTable').empty();
            $('.subjectTable').append(table);

        });
};