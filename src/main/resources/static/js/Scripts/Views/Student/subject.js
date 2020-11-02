$(document).ready(function () {
    var subject = new Subject()
})

class Subject  {
    constructor() {
        this.loadData();
        this.initEven();
    }
    initEven() {
        $(document).on('click', 'button.btn-success', this.openDialogSchedule);
        $(document).on('click', '#modal-success > div > div > div.modal-footer > button:nth-child(2)', { jsObj: this }, this.confirmSchedule);
        $(document).on('click', '#modal-default > div > div > div.modal-footer > button.btn.btn-default, #modal-default > div > div > div.modal-header > button', this.closeNotification)

    }
    closeNotification() {
        $('#modal-default').css('display', 'none')
    }
    confirmSchedule() {
        var rowSelected = $('#schedule').find('input:checked');
        if (rowSelected.length != 0) {
            var scheduleID = $($(rowSelected[0]).parent().parent()).data('rowID');
            var studentID = JSON.parse(sessionStorage.getItem('user')).StudentID;
            var pram = [];
            pram.push(studentID);
            pram.push(scheduleID);
            ajaxJSON.post('/subject/insert', pram, true,
                function (data) {
                    $('#modal-success > div > div > div.modal-footer > button.btn.btn-outline.pull-left').trigger('click')
                })
                .fail(function (res) {
                    alert('thất bại')
                });
        }
        else {
            $('#modal-success > div > div > div.modal-footer > button.btn.btn-outline.pull-left').trigger('click')
            $('#modal-default').css('display', 'block')
        }
    }
    openDialogSchedule() {
        $('#modal-success').attr('display', 'block');
        var subjectID = $($(this).parentsUntil('tbody')[3]).data('rowID');
        var studentID = JSON.parse(sessionStorage.getItem('user')).StudentID;
        var ExamID = $('div[ExamID]')[0].getAttribute('ExamID')
        var pram = [];
        pram.push(studentID);
        pram.push(subjectID);
        pram.push(ExamID)
        var scheduleID;
        ajaxJSON.post('/subject/schedulebysubject', pram, false,
            function (data) {
                if (data.length != 0) {
                    scheduleID = data[0].ScheduleID
                }
            })
            .fail(function (res) {
                scheduleID = -1;
            });
        ajaxJSON.post('/subject/schedule', pram, true,
            function (data) {
                if (data) {
                    $('#schedule tbody').empty();
                    $.each(data, function (index, fieldItem) {
                        var fields = $('#schedule').find('thead th')
                        var rowHTML = $('<tr class="grid-row"></tr>').data("rowID", fieldItem['ScheduleID']);
                        var slot
                        ajaxJSON.post('/subject/slot', fieldItem['ScheduleID'], false,
                            function (data) {
                                slot = data[0].Slot;
                            })
                            .fail(function (res) {
                                alert('thất bại')
                            });
                        $.each(fields, function (index, field) {
                            var cellHTML = $('<td class="grid-cell-inner"></td')
                            var fieldName = field.getAttribute('dataindex')
                            var format = field.getAttribute('format')
                            var fieldValue = fieldItem[fieldName]
                            if (fieldName == "SlotSelected") {
                                fieldValue = slot
                            }
                            switch (format) {
                                case "date":
                                    cellHTML.addClass("text-align-center")
                                    fieldValue = new Date(fieldValue)
                                    fieldValue = fieldValue != 'Invalid Date' ? ddmmyyyy(fieldValue) : " "
                                    break;
                                case "radio":
                                    cellHTML.addClass("text-align-center")
                                    if (fieldItem['QuantitySlot'] > slot) {
                                        if (fieldItem['ScheduleID'] == scheduleID) {
                                            var input = '<input type="radio" name="' + subjectID + '" checked/>';
                                            fieldValue = $(input)
                                        }
                                        else {
                                            var input = '<input type="radio" name="' + subjectID + '"/>';
                                            fieldValue = $(input)
                                        }
                                    }
                                    else if (fieldItem['QuantitySlot'] == slot) {
                                        if (fieldItem['ScheduleID'] == scheduleID) {
                                            var input = '<input type="radio" name="' + subjectID + '" checked/>';
                                            fieldValue = $(input)
                                        }
                                    }
                                    break;
                                case "hours":
                                    fieldValue = new Date(fieldValue)
                                    var hs = parseInt(fieldValue.getHours())
                                    var ms = parseInt(fieldValue.getMinutes())
                                    var he = parseInt(fieldItem["TimeToDo"].substring(0, 2));
                                    var me = parseInt(fieldItem["TimeToDo"].substring(3, 5));
                                    fieldValue = hhmm(hs, ms) + '-' + hhmm(he, me);
                                    break;
                                case "center":
                                    cellHTML.addClass("text-align-center");
                                    break;
                            }

                            cellHTML.append(fieldValue)
                            rowHTML.append(cellHTML)
                        })
                        $('#schedule').find('tbody').append(rowHTML);
                    })
                }
            })
            .fail(function (res) {
                alert('thất bại')
            });


    }
    loadData() {
        var studentID = JSON.parse(sessionStorage.getItem('user')).StudentID;
        ajaxJSON.post('/subject', studentID, true,
            function (data) {
                if (data) {
                    $('#subject tbody').empty();
                    $.each(data, function (index, fieldItem) {
                        var condition = true;
                        var fields = $('#subject').find('thead th')
                        var rowHTML = $('<tr class="grid-row"></tr>').data("rowID", fieldItem['SubjectID']);
                        $.each(fields, function (index1, field) {
                            var cellHTML = $('<td class="grid-cell-inner"></td')
                            var fieldName = field.getAttribute('dataindex')
                            var format = field.getAttribute('format')
                            var fieldValue = fieldItem[fieldName]
                            if (fieldName == 'STT') {
                                fieldValue = index + 1;
                            }
                            switch (fieldName) {
                                case "Action":
                                    cellHTML = $('<td><div class="box box-default"><div class="box-body"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#modal-success"> <i class="fa fa-pencil"></i></button></div></div > </td >')
                                    break;
                                default:
                                    break;
                            }
                            switch (format) {
                                case "date":
                                    cellHTML.addClass("text-align-center")
                                    fieldValue = new Date(fieldValue)
                                    fieldValue = fieldValue != 'Invalid Date' ? ddmmyyyy(fieldValue) : " "
                                    break;
                                case "bool":
                                    cellHTML.addClass("text-align-center")
                                    if (fieldValue) {
                                        fieldValue = $('<span class="true">Đủ điều kiện</span>')
                                    }
                                    else {
                                        condition = false;
                                        fieldValue = $('<span class="false">Cấm thi</span>')
                                    }
                                    break;
                                case "center":
                                    cellHTML.addClass("text-align-center");
                                    break;
                            }

                            cellHTML.append(fieldValue)
                            rowHTML.append(cellHTML)
                        })
                        if (!condition) {
                            $(rowHTML).find('div.box-body button').attr('disabled', true)
                        }
                        $('#subject').find('tbody').append(rowHTML);
                    })
                    
                }
                $('#subject').DataTable({
                    "searching": false,
                    "paging": false,
                    "info": false,
                });
            })
            .fail(function (res) {
                alert('thất bại')
            });
        
    }
}
function ddmmyyyy(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    date = day + '-' + month + '-' + year;
    return date;
}