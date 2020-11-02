var mode = 1;

const loadData = () => {
    ajaxJSON.get('/manager/schedule', undefined, true,
        (res) => {
            let table = $('<table id="scheduleTable" class="table table-bordered table-striped"> \
                                 <thead > \
                                    <tr> \
                                        <th>STT</th> \
                                        <th>Kỳ thi</th> \
                                        <th>Môn thi</th> \
                                        <th>Ngày thi</th> \
                                        <th>Giờ bắt đầu</th> \
                                        <th>Giờ kết thúc</th> \
                                        <th>Địa điểm</th> \
                                    </tr> \
                                 </thead > \
                           </table >');
            let tbody = $('<tbody></tbody>');

            $.each(res, (index, item) => {
                let tr = $('<tr> \
                                <td>'+ (index + 1) + '</td> \
                                <td>'+ item.ExamName + " " + item.ExamYear + '</td> \
                                <td>'+ item.SubjectName + '</td> \
                                <td>'+ item.StartTime.split('T')[0].toddmmyyyy() + '</td> \
                                <td>'+ item.StartTime.split('T')[1].slice(0, 5) + '</td> \
                                <td>'+ item.TimeToDo + '</td> \
                                <td>'+ item.RoomName + " " + item.Place + '</td> \
                           </tr > ').data('ID', item.ScheduleID);
                tbody.append(tr);
            });

            table.append(tbody);

            $('.scheduleTable').empty();
            $('.scheduleTable').append(table);

            $('#scheduleTable').DataTable({
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

const loadDataList = (id) => {
    debugger
    ajaxJSON.get(`/manager/schedule-${id}/student`, undefined, true,
        (res) => {
            let table = $('<table id="studentTable" class="table table-bordered table-striped"> \
                                 <thead > \
                                    <tr> \
                                        <th>STT</th> \
                                        <th>Mã sinh viên</th> \
                                        <th>Tên sinh viên</th> \
                                    </tr> \
                                 </thead > \
                           </table >');
            let tbody = $('<tbody></tbody>');

            $.each(res, (index, item) => {
                let tr = $('<tr> \
                                <td>'+ (index + 1) + '</td> \
                                <td>'+ item.StudentCode + '</td> \
                                <td>'+ item.StudentName + '</td> \
                           </tr > ');
                tbody.append(tr);
            });

            table.append(tbody);

            $('.studentTable').empty();
            $('.studentTable').append(table);

            $('#studentTable').DataTable({
                "searching": false,
                "paging": false,
                "info": false,
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


function loadDataModal() {
    ajaxJSON.get('/manager/exam', undefined, true,
        (res) => {
            let list = $('.examList');

            $.each(res, (index, item) => {
                let li = $('<li><a href="#" class="dropdown-item">'
                    + item.ExamName + " " + item.ExamYear +
                    '</a></li>').data('ID', item.ExamID);
                list.append(li);
            });
        });
    ajaxJSON.get('/manager/subject', undefined, true,
        (res) => {
            let list = $('.subjectList');

            $.each(res, (index, item) => {
                let li = $('<li><a href="#" class="dropdown-item">'
                    + item.SubjectName +
                    '</a></li>').data('ID', item.SubjectID);
                list.append(li);
            });
        });
    ajaxJSON.get('/manager/room', undefined, true,
        (res) => {
            let list = $('.roomList');

            $.each(res, (index, item) => {
                let li = $('<li><a href="#" class="dropdown-item">'
                    + item.RoomName + " " + item.Place +
                    '</a></li>').data('ID', item.RoomID);
                list.append(li);
            });
        });
}


loadDataModal();

loadData();


//lưu form
$(document).on('click', '#modal .save', function () {
    let btn = $(this);

    let flag = checkDataInputModal();

    if (flag === 1) {
        if (mode === 1) {
            let ref = {};
            $('[property]').each((index, item) => {
                ref[$(item).attr('property')] = $(item).val();
                ref[$(item).attr('property')] = localStorage.getItem($(item).attr('property')) ? localStorage.getItem($(item).attr('property')) : ref[$(item).attr('property')];
            });
            ref.date = ref.date.toyyyymmdd()

            if (parseInt(ref.time.slice(0, 2)) < 10) ref.time = '0' + ref.time;
            if (parseInt(ref.TimeToDo.slice(0, 2)) < 10) ref.TimeToDo = '0' + ref.TimeToDo;

            let datetime = ref.date + 'T' + ref.time + 'Z';
            ref.StartTime = datetime.toDatetime();

            ajaxJSON.post('/manager/schedule', ref, true,
                (res) => {
                    console.log('done');
                    loadData();
                    clearDataModal();
                    btn.siblings().click();
                    localStorage.clear();
                });
        }
    }
    else {
        flag.forEach(function (item) {
            warningInput(item);
        });
    }
});

$('.datepicker').datepicker({
    autoclose: true,
    format: 'dd-mm-yyyy',
    language: 'vi'
});

$('.timepicker').timepicker({
    showMeridian: false,
});

$(document).on('click', '#scheduleTable tbody tr', function () {
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

$(document).on('dblclick', '#scheduleTable tbody tr', function () {
    debugger
    loadDataList($(this).data('ID'));
    var me = this
    $('#modal-list').modal('show');
    $('span.SubjectName').text($(me).children()[2].innerText)
    $('span.Date').text($(me).children()[3].innerText)
    $('span.Room').text($(me).children()[6].innerText)
})

$(document).on('click', 'button.btn.btn-warning.pull-right', function () {
    var ID = $('tr.Selected').data('ID');

    $('#modal .modal-title').text('CHỈNH SỬA CA THI');

    $('.modal-body [property]').each((index, item) => {
        $(item).val($('tr.Selected').children()[index + 1].innerText)
    })

    mode = 2;
    sessionStorage.setItem('ID', ID);
})

$(document).on('click', 'button.btn.btn-success.pull-right', function () {
    mode = 1;
    $('#modal .modal-title').text('THÊM CA THI');
    clearDataModal()
})
$(document).on('click', '#print', function () {
    $('#studentTable_wrapper > div:nth-child(1)').css('display', 'none')
    $('#studentTable_wrapper > div:nth-child(3)').css('display', 'none')

    var printcontent = document.getElementById('modal-list').innerHTML;
    document.body.innerHTML = printcontent;
    window.print();
    location.reload();
})