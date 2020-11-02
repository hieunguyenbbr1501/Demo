

$(document).ready(function () {
    var studentName = JSON.parse(sessionStorage.getItem('user')).StudentName;
    var studentCode = JSON.parse(sessionStorage.getItem('user')).StudentUserName;
    if (studentName) {
        $('.StudentName').text(studentName)
        $('.StudentCode').text(studentCode)
    }
    else {
        var managerName = JSON.parse(sessionStorage.getItem('user')).ManagerName;
        var manegerCode = JSON.parse(sessionStorage.getItem('user')).ManagerCode;
        $('.ManagerName').text(managerName)
        $('.ManagerCode').text(manegerCode)
    }
})
$('div.pull-right').click(function () {
    window.location.href = "/views/login.html";
    sessionStorage.clear();
})
//format giờ phút
function hhmm(h, m) {
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    return h + ':' + m;
}