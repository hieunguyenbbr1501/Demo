$(document).ready(function () {
    var contest = new contestCard()
})
class contestCard {
    constructor() {
        this.loadData()
        this.initEven()
    }
    initEven() {
        $(document).on('click', '#print', this.print)

    }
    print() {
        window.print('height=400,width=400')
    }
    loadData() {
        var studentID = JSON.parse(sessionStorage.getItem('user')).StudentID;
        ajaxJSON.post('/subject/examreg', studentID, true,
            function (data) {
                if (data) {
                    $('#examreg tbody').empty();
                    $.each(data, function (index, fieldItem) {
                        var fields = $('#examreg').find('thead th')
                        var rowHTML = $('<tr class="grid-row"></tr>').data("rowID", fieldItem['ScheduleID']);
                        $.each(fields, function (index1, field) {
                            var cellHTML = $('<td class="grid-cell-inner"></td')
                            var fieldName = field.getAttribute('dataindex')
                            var format = field.getAttribute('format')
                            var fieldValue = fieldItem[fieldName]
                            if (fieldName == 'STT') {
                                fieldValue = index + 1;
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
                                    var he = parseInt(fieldItem["TimeToDo"].substring(0, 2)) + hs;
                                    var me = parseInt(fieldItem["TimeToDo"].substring(3, 5)) + ms;
                                    fieldValue = hhmm(hs, ms) + '-' + hhmm(he, me);
                                    break;
                            }

                            cellHTML.append(fieldValue)
                            rowHTML.append(cellHTML)
                        })
                        $('#examreg').find('tbody').append(rowHTML);
                    })
                }
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