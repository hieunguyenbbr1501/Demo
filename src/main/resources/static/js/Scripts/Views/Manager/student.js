
const loadData = () => {
    ajaxJSON.get('/student', undefined, true,
        (res) => {
            let table = $('<table id="studentTable" class="table table-bordered table-striped"> \
                                 <thead > \
                                    <tr> \
                                        <th>STT</th>\
                                        <th>First Name</th>\
                                        <th>Last Name</th>\
                                        <th>Student code</th>\
                                        <th>Email</th>\
                                        <th>Phone</th>\
                                        <th>Major</th>\
                                        <th>Role</th>\
                                    </tr> \
                                 </thead > \
                           </table >');
            let tbody = $('<tbody></tbody>');
            $.each(res, (index, item) => {
                let tr = $('<tr> \
                                <td>'+ (index + 1) + '</td> \
                                <td>'+ item.last_name + '</td> \
                                <td>'+ item.first_name + '</td> \
                                <td>'+ item.student_code + '</td> \
                                <td>'+ item.email + '</td> \
                                <td>'+ item.phone + '</td> \
                                <td>'+ item.major_id + '</td> \
                                <td>'+ item.role_id + '</td> \
                           </tr > ').data('ID', item.id);
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
    var ID = $('tr.Selected').data('id');
    sessionStorage.setItem('ID', ID);
    $('#StudentCode').attr('readonly', true)
    mode = 2;
    $('#modal .modal-title').text('CHỈNH SỬA THÔNG TIN SINH VIÊN');
    $('.modal-body [property]').each((index, item) => {
        $(item).val($('tr.Selected').children()[index + 1].innerText)
    })

})
$(document).on('keyup', '#StudentCode', function () {
    $('#StudentUserName').val($('#StudentCode').val())

})
$(document).on('click', '#save-student', function () {

    let btn = $(this);

    let flag = checkDataInputModal();

    if (flag === 1) {
        var student_code = $('#student_code').val();
        var last_name = $('#last_name').val();
        var first_name = $('#first_name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var major_id = $('#major_id').val();
        var role_id = $('#role_id').val();
        var url = '/student';
        if (mode == 2) {
            var StudentID = sessionStorage.getItem('ID');
            var pram = {
                id: StudentID,
                student_code : student_code,
                last_name: last_name,
                first_name: first_name,
                email: email,
                phone:phone,
                major_id: major_id,
                role_id:role_id
            };
            console.log('Sua')
            console.log( pram);
            ajaxJSON.put(url, pram, true,
                function (data) {
                    loadData();
                    clearDataModal();
                    $('#modal > div > div > div.modal-footer > button.btn.btn-default.pull-left').trigger('click')
                })
        } else {
            var pram1 = {
                student_code : student_code,
                last_name: last_name,
                first_name: first_name,
                email: email,
                phone:phone,
                major_id: major_id,
                role_id:role_id
            };
            console.log('Them')
            console.log(pram1);
            ajaxJSON.post(url, pram1, true,
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