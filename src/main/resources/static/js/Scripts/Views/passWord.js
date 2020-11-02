var checkLength = 0;
var checkUp = 0;
var checkLow = 0;
var checkNum = 0;
var equal = 0;
$("input[type=password]").keyup(function () {
    var ucase = new RegExp("[A-Z]+");
    var lcase = new RegExp("[a-z]+");
    var num = new RegExp("[0-9]+");

    if ($("#password1").val().length >= 8) {
        $("#8char").removeClass("glyphicon-remove");
        $("#8char").addClass("glyphicon-ok");
        $("#8char").css("color", "#00A41E");
        checkLength = 1;
    } else {
        $("#8char").removeClass("glyphicon-ok");
        $("#8char").addClass("glyphicon-remove");
        $("#8char").css("color", "#FF0004");
        checkLength = 0;
    }

    if (ucase.test($("#password1").val())) {
        $("#ucase").removeClass("glyphicon-remove");
        $("#ucase").addClass("glyphicon-ok");
        $("#ucase").css("color", "#00A41E");
        checkUp = 1;
    } else {
        $("#ucase").removeClass("glyphicon-ok");
        $("#ucase").addClass("glyphicon-remove");
        $("#ucase").css("color", "#FF0004");
        checkUp = 0;
    }

    if (lcase.test($("#password1").val())) {
        $("#lcase").removeClass("glyphicon-remove");
        $("#lcase").addClass("glyphicon-ok");
        $("#lcase").css("color", "#00A41E");
        checkLow = 1;
    } else {
        $("#lcase").removeClass("glyphicon-ok");
        $("#lcase").addClass("glyphicon-remove");
        $("#lcase").css("color", "#FF0004");
        checkLow = 0;
    }

    if (num.test($("#password1").val())) {
        $("#num").removeClass("glyphicon-remove");
        $("#num").addClass("glyphicon-ok");
        $("#num").css("color", "#00A41E");
        checkNum = 1;
    } else {
        $("#num").removeClass("glyphicon-ok");
        $("#num").addClass("glyphicon-remove");
        $("#num").css("color", "#FF0004");
        checkNum = 0;
    }

    if ($("#password1").val() == $("#password2").val()) {
        $("#pwmatch").removeClass("glyphicon-remove");
        $("#pwmatch").addClass("glyphicon-ok");
        $("#pwmatch").css("color", "#00A41E");
        equal = 1;
    } else {
        $("#pwmatch").removeClass("glyphicon-ok");
        $("#pwmatch").addClass("glyphicon-remove");
        $("#pwmatch").css("color", "#FF0004");
        equal = 0;
    }
});
$(document).click('#changePass', function () {
    var check = checkLength * checkLow * checkNum * checkUp * equal;
    if (check) {
        var studentID = JSON.parse(sessionStorage.getItem('user')).StudentID;
        var newPass = $("#password1").val();
        var pram = [];
        pram.push(studentID);
        pram.push(newPass);
        debugger
        ajaxJSON.post('/subject/pass', pram, true,
            function (data) {
                window.location.href = "/views/login.html";
            })
            .fail(function (res) {
                alert('thất bại')
            });
    }
})