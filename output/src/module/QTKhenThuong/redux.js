import T from "../../view/common/js/common.js";

// Reducer ------------------------------------------------------------------------------------------------------------
const QT_KHEN_THUONG_IN_PAGE = "user:getQTKhenThuongInPage";

export default function qtKhenThuongReducer(state = null, data) {
    switch (data.type) {
        case QT_KHEN_THUONG_IN_PAGE:
            return Object.assign({}, state, { page: data.page });
        default:
            return state;
    }
}

// Actions ------------------------------------------------------------------------------------------------------------
T.initCookiePage("qtKhenThuongPage", true);
export function getQTKhenThuongInPage(pageNumber, pageSize, pageCondition, done) {
    const page = T.updatePage("qtKhenThuongPage", pageNumber, pageSize, pageCondition);
    return dispatch => {
        const url = `/api/qua-trinh/khen-thuong/page/${page.pageNumber}/${page.pageSize}`;
        T.get(url, { condition: page.pageCondition ? JSON.parse(page.pageCondition) : {} }, data => {
            if (page.pageCondition && data.page) data.page.pageCondition = JSON.parse(page.pageCondition);
            done && done(data.error, data.page);
            if (data.error) console.error("GET: " + url + ".", data.error);
            else dispatch({ type: QT_KHEN_THUONG_IN_PAGE, page: data.page });
        }, error => done(error));
    }
}

export function updateQTKhenThuong(condition, changes, done) {
    return dispatch => {
        const url = "/api/qua-trinh/khen-thuong";
        T.put(url, { condition, changes }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("PUT: " + url + ".", data.error);
            else dispatch(getQTKhenThuongInPage());
        }, error => done(error));
    }
}

export function createMultiQTKhenThuong(multiQTKhenThuong, isOverride, done) {
    return dispatch => {
        const url = "/api/qua-trinh/khen-thuong/multiple";
        T.post(url, { multiQTKhenThuong, isOverride }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("POST: " + url + ".", data.error);
        }, error => done(error));
    }
}

export function createQTKhenThuong(qtKhenThuong, done) {
    return dispatch => {
        const url = "/api/qua-trinh/khen-thuong";
        T.post(url, { qtKhenThuong }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("POST: " + url + ".", data.error);
            else dispatch(getQTKhenThuongInPage());
        }, error => done(error));
    }
}

export function deleteQTKhenThuong(shcc, done) {
    return dispatch => {
        const url = "/api/qua-trinh/khen-thuong";
        T.delete(url, { shcc }, data => {
            done && done(data.error);
            if (data.error) console.error("DELETE: " + url + ".", data.error);
            else dispatch(getQTKhenThuongInPage());
        }, error => done(error));
    }
}