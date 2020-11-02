/* --------------------------------------------
 * Phương thức định dạng string
 * Created by: NVMANH (03/03/2018)
 */
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
}


/* So sánh 2 object */
if (!Object.compare) {
    Object.compare = function (obj1, obj2) {
        var isDifferent = false;
        for (var property in obj1) {
            if (obj1[property] !== obj2[property]) {
                isDifferent = true;
                break;
            }
        }
        return isDifferent;
    };
}
/* Định dạng ngày tháng năm */
if (!Date.prototype.ddmmyyyy) {
    Date.prototype.ddmmyyyy = function () {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [(dd > 9 ? '' : '0') + dd + '-',
        (mm > 9 ? '' : '0') + mm + '-',
        this.getFullYear()
        ].join('');
    };
}

if (!Date.prototype.yyyymmdd) {
    Date.prototype.yyyymmdd = function () {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [this.getFullYear() + '-', (mm > 9 ? '' : '0') + mm + '-', (dd > 9 ? '' : '0') + dd].join('');
    };
}

//String
if (!String.prototype.toDatetime) {
    String.prototype.toDatetime = function () {
        return new Date(this);
    };
}

if (!String.prototype.toddmmyyyy) {
    String.prototype.toddmmyyyy = function () {
        var parts = this.split("-");
        return parts[2] + "-" + parts[1] + "-" + parts[0];
    };
}

if (!String.prototype.toyyyymmdd) {
    String.prototype.toyyyymmdd = function () {
        var parts = this.split("-");
        return parts[2] + "-" + parts[1] + "-" + parts[0];
    };
}

/* Lấy giờ hiện tại theo định dạng hh:mm:ss */
if (!Date.prototype.time) {
    Date.prototype.time = function () {
        var hh = this.getHours(), // getMonth() is zero-based
            mm = this.getMinutes(),
            ss = this.getSeconds();

        return [(hh > 9 ? '' : '0') + hh + ':',
        (mm > 9 ? '' : '0') + mm + ':',
        (ss > 9 ? '' : '0') + ss
        ].join('');
    };
}

/* Lấy giờ hiện tại*/
if (!Date.prototype.hhmm) {
    Date.prototype.hhmm = function () {
        var hh = this.getHours(), // getMonth() is zero-based
            mm = this.getMinutes();

        return [(hh > 9 ? '' : '0') + hh + ':',
        (mm > 9 ? '' : '0') + mm
        ].join('');
    };
}
if (!Date.prototype.addDays) {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
}

/* Lấy giờ hiện tại*/
if (!Date.prototype.hhmmss) {
    Date.prototype.hhmmss = function () {
        var hh = this.getHours(), // getMonth() is zero-based
            mm = this.getMinutes(),
            ss = this.getSeconds();
        ss = ss < 10 ? '0' + ss : ss;

        return [(hh > 9 ? '' : '0') + hh + ':',
        (mm > 9 ? '' : '0') + mm + ':' + ss
        ].join('');
    };
}

(function ($) {
    $.fn.datepicker.dates['vi'] = {
        days: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
        daysShort: ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
        daysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        monthsShort: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
        today: "Hôm nay",
        clear: "Xóa",
        format: "dd/mm/yyyy"
    };
}(jQuery));