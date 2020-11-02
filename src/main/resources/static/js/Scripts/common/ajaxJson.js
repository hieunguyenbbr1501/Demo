class AjaxJSON {
    constructor() {
        this.Ajax = {};
    }
    init(method, url, param, async, callback, beforeSend) {
        this.Ajax.method = method;
        this.Ajax.url = url;
        this.Ajax.data = JSON.stringify(param);
        this.Ajax.contentType = 'application/json';
        this.Ajax.async = async === false ? false : true;
        this.Ajax.headers = AjaxJSON.setRequestHeader();
        this.Ajax.beforeSend = beforeSend;
        this.Ajax.callback = callback;
    }

    /**
     * Thực hiện thêm mới các thuộc tính vào Request header
     * Author: NVMANH (04/06/2019)
     * @returns {object} The sum of the two numbers.
     * */
    static setRequestHeader() {
        var tokenKey = 'accessToken';
        var token = sessionStorage.getItem(tokenKey);
        var headers = { 'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS' };
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }
        return headers;
    }

    get(url, param, async, callback, beforeSend) {
        var me = this;
        me.init("GET", url, param, async, callback, beforeSend);
        //(async () => {
        return $.ajax(me.Ajax)
            .done(function (res) {
                me.processSuccessRequest(res, callback);
            })
            .fail(me.processFailRequest.bind(me));
    }

    post(url, param, async, callback, beforeSend) {
        try {
            //commonJS.showMask();
            var me = this;
            me.init("POST", url, param, async, callback, beforeSend);

            return $.ajax(me.Ajax)
                .done(function (res) {
                    me.processSuccessRequest(res, callback);
                })
                .fail(me.processFailRequest.bind(me));
        } catch (e) {
            console.log(e);
        } finally {
            //commonJS.hideMask();
        }

    }
    put(url, param, async, callback, beforeSend) {
        try {
            //commonJS.showMask();
            var me = this;
            me.init("PUT", url, param, async, callback, beforeSend);
            return $.ajax(me.Ajax)
                .done(function (res) {
                    me.processSuccessRequest(res, callback);
                })
                .fail(me.processFailRequest.bind(me));
        } catch (e) {
            console.log(e);
        } finally {
            //commonJS.hideMask();
        }

    }

    patch(url, param, async, callback, beforeSend) {
        try {
            //commonJS.showMask();
            var me = this;
            me.init("PATCH", url, param, async, callback, beforeSend);
            return $.ajax(me.Ajax)
                .done(function (res) {
                    me.processSuccessRequest(res, callback);
                })
                .fail(me.processFailRequest.bind(me));
        } catch (e) {
            console.log(e);
        } finally {
            //commonJS.hideMask();
        }

    }

    delete(url, param, async, callback, beforeSend) {
        try {
            //commonJS.showMask();
            var me = this;
            me.init("DELETE", url, param, async, callback, beforeSend);
            return $.ajax(me.Ajax)
                .done(function (res) {
                    me.processSuccessRequest(res, callback);
                })
                .fail(me.processFailRequest.bind(me));
        } catch (e) {
            console.log(e);
        } finally {
            //commonJS.hideMask();
        }

    }

    /**
     * Hàm xử lý khi Ajax được xử lý thành công
     * Created By: ManhNV (07/07/2019)
     *  @param {object} res the object response from server.
     *  @param {Function} callback The first number
     *  Author: NVMANH (11/07/2019)
     * */
    processSuccessRequest(res, callback) {
        //if (res.Success) {
        //    callback(res.Data);
        //} else {
        //    console.log(res);
        //    alert(res.Data.Message);
        //}

        callback(res);
    }

    /**
     * Hàm xử lý khi Ajax được xử lý thất bại
     *  @param {object} res the object response from server
     *  Author: NVMANH (11/07/2019)
     * Created By: ManhNV (07/07/2019)
     * */
    processFailRequest(res) {
        if (res.status === 401) {
            ajaxJSON.processNotAuthenication();
        }
    }
    /**
     * Hàm xử lý nếu người dùng không có quyền truy cập
     * Created By: ManhNV (07/07/2019)
     * */
    processNotAuthenication() {
        window.location.href = "/views/login.html"
    }
}
ajaxJSON = new AjaxJSON();