$(document).ready(function () {
    var commonjs = new CommonJS();
})
var table = {
    //Quản lý sinh viên
    student_management: "StudentCode,StudentName,StudentUserName,StudentPass,Note",
    //Quản lý môn học
    subject_management: "SubjectCode,SubjectName,Credit,ScheduleNumber,StartTime,RoomName",
    //Môn đã học
    subject_learned: "SubjectCode,SubjectName,Credit,Score",
    //Đăng ký môn học
    exam_registration: "SubjectCode,SubjectName,Credit,ScheduleNumber,StartTime,RoomName, Registration",
}
class CommonJS {
    constructor() {
        this.InitEven()
    }

    /**
     * Bắt sự kiện chung
     * CreatedBy : NVHUY(13/11/2019)
     * */
    InitEven() {
        $(document).on('click', 'div.content table tbody tr', this.rowOnClick);
        $('div.menu-item').on('click', { 'ObjectJs': this }, this.selectItem);
        $('button.print').on('click', this.print);
        $('i.delete').on('click', this.deleteRow)
    }
    /**
     * Xóa dòng được chọn khi click button
     * 
     * */
    deleteRow() {
        var me = this;
        $(me).parent().parent().remove()
        debugger
    }
    /**
     * In thông tin đnăg ký thi
     * CreatedBy: NVHUY(21/11/2019)
     * 
     * */
    print() {
        var printContents = $('div.content').innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }
    /**
     * Xử lý khi click vào 1 dòng
     * CreatedBy: NVHUY(13/11/2019)
     * */
    rowOnClick() {
        if (event.ctrlKey) {
            if ($(this).hasClass('rows-selected')) {
                $(this).removeClass('rows-selected');
            }
            else {
                $(this).addClass('rows-selected');
            };
            if ($('tr').hasClass('rowSelected')) {
                $('tr').removeClass('rowSelected');
            };
        }
        else {
            if ($(this).hasClass('rowSelected')) {
                $(this).removeClass('rowSelected');
            } else {
                $('tr').removeClass('rowSelected');
                $('tr').removeClass('rows-selected');
                $(this).addClass('rowSelected');
            };
        }
    }
    /**
     * Chọn 1 mục quản lý
     * CreatedBy: NVHUY(16/11/2019)
     * */
    selectItem(event) {
        var me = event.data['ObjectJs'];
        $('div.menu-item').removeClass('bg-menu-item');
        $(this).addClass('bg-menu-item');
        $('div.title-grid').text($(this).text());
        if ($(this).hasClass('student_management')) {
            me.addTable(table.student_management);
        }
        else if ($(this).hasClass('subject_management')) {
            me.addTable(table.subject_management);
        }
        else if ($(this).hasClass('subject_learned')) {
            me.addTable(table.subject_learned);
        }
        else if ($(this).hasClass('exam_registration')) {
            me.addTable(table.exam_registration);
        }
    }
    /**
     * Thực hiện thêm bảng dữ liệu
     * CreatedBy: NVHUY(17/11/2019)
     */
    addTable(tableColls) {
        debugger
        $('div.content table thead').empty();
        var rowHTML = $('<tr ></tr>')
        var dataindexs = tableColls.split(',');
        $.each(dataindexs, function (index, dataindex) {
            var cellHTML = '<th dataindex="' + dataindex + '"></th'
            cellHTML = $(cellHTML)
            //var value = '<input value="' + dataindex + '"/>';
            switch (dataindex) {
                case 'StudentCode': dataindex = "Mã sinh viên"; break;
                case 'StudentName': dataindex = "Họ và tên"; break;
                case 'StudentUserName': dataindex = "Tên đăng nhập"; break;
                case 'StudentPass': dataindex = "Mật khẩu"; break;
                case 'Note': dataindex = "Ghi chú"; break;
                case 'SubjectCode': dataindex = "Mã môn học"; break;
                case 'SubjectName': dataindex = "Tên môn học"; break;
                case 'Credit': dataindex = "Số tín chỉ"; break;
                case 'ScheduleNumber': dataindex = "Ca thi"; break;
                case 'StartTime': dataindex = "Thời gian thi"; break;
                case 'RoomName': dataindex = "Phòng thi"; break;
                case 'Score': dataindex = "Điểm thi"; break;
                case 'Registration': dataindex = "Đăng ký"; break;
                default: break;
            };
            cellHTML.append(dataindex)
            rowHTML.append(cellHTML)
        });
        var cellHTML = '<th dataindex="Action">Action</th';
        rowHTML.append(cellHTML);
        $('thead').append(rowHTML);
    }

}

//clear data modal
function clearDataModal() {
    $('.modal-body input').each((index, item) => {
        $(item).val('');
        $(item).removeClass('warning-field');
        $(item).parent().removeClass('warning-field');

        $('.timepicker').val('0:00')
    });
}

//validate form
function checkDataInputModal() {
    let flag = 1;
    let objNull = [];
    $('.modal-body input').each((index, item) => {
        if ($(item).val() === '') {
            flag = 0;
            objNull.push($(item).attr('property'));
        }
    });
    if (flag === 1) return flag;
    return objNull;
}

function warningInput(prop) {
    $('[property="' + prop + '"]').addClass('warning-field');
    $('[property="' + prop + '"]').parent().addClass('warning-field');
}

$(document).on('keyup change', '.modal-body input', function () {
    if ($(this).val() === '') {
        $(this).addClass('warning-field');
        $(this).parent().addClass('warning-field');
    }
    else {
        $(this).removeClass('warning-field');
        $(this).parent().removeClass('warning-field');
    }
});

//dropdown
$(document).on('click', '.dropdown-menu li', function () {
    let input = $(this).parent().siblings('input');
    input.val($(this).text());
    input.removeClass('warning-field');
    input.parent().removeClass('warning-field');
    localStorage.setItem(input.attr('property'), $(this).data('ID'));
});

//sự kiện click input
$(document).on('click', '.modal-body input', function () {
    $(this).siblings('button').click();
    $(this).focus();
});

$('#modal-delete .modal-footer .btn.save').click(function () {
    let ref = sessionStorage.getItem('ref');
    let id = $('tr.Selected').data('ID');
    ajaxJSON.delete(`/manager/${ref}/${id}`, undefined, true,
        function () {
            loadData()
        })
})

$('.modal-dialog .modal-footer .btn.save').click(function () {
    $('button.btn.modify').attr('disabled', true);
    $('button.btn.delete').attr('disabled', true);

})

$('button.btn.delete').click(function () {
    sessionStorage.setItem('ref', $(this).attr('ref'))
})