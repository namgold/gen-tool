import T from "../../view/common/js/common.js";

// Reducer ------------------------------------------------------------------------------------------------------------
const DM_KHU_VUC_IN_PAGE = "user:getDMKhuVucInPage";

export default function dmKhuVucReducer(state = null, data) {
    switch (data.type) {
        case DM_KHU_VUC_IN_PAGE:
            return Object.assign({}, state, { page: data.page });
        default:
            return state;
    }
}

// Actions ------------------------------------------------------------------------------------------------------------
T.initCookiePage("dmKhuVucPage", true);
export function getDMKhuVucInPage(pageNumber, pageSize, pageCondition, done) {
    const page = T.updatePage("dmKhuVucPage", pageNumber, pageSize, pageCondition);
    return dispatch => {
        const url = `/api/danh-muc/khu-vuc/page/${page.pageNumber}/${page.pageSize}`;
        T.get(url, { condition: page.pageCondition ? JSON.parse(page.pageCondition) : {} }, data => {
            if (page.pageCondition && data.page) data.page.pageCondition = JSON.parse(page.pageCondition);
            done && done(data.error, data.page);
            if (data.error) console.error("GET: " + url + ".", data.error);
            else dispatch({ type: DM_KHU_VUC_IN_PAGE, page: data.page });
        }, error => done(error));
    }
}

export function updateDMKhuVuc(condition, changes, done) {
    return dispatch => {
        const url = "/api/danh-muc/khu-vuc";
        T.put(url, { condition, changes }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("PUT: " + url + ".", data.error);
            else dispatch(getDMKhuVucInPage());
        }, error => done(error));
    }
}

export function createMultiDMKhuVuc(multiDMKhuVuc, isOverride, done) {
    return dispatch => {
        const url = "/api/danh-muc/khu-vuc/multiple";
        T.post(url, { multiDMKhuVuc, isOverride }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("POST: " + url + ".", data.error);
        }, error => done(error));
    }
}

export function createDMKhuVuc(dmKhuVuc, done) {
    return dispatch => {
        const url = "/api/danh-muc/khu-vuc";
        T.post(url, { dmKhuVuc }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("POST: " + url + ".", data.error);
            else dispatch(getDMKhuVucInPage());
        }, error => done(error));
    }
}

export function deleteDMKhuVuc(ma, done) {
    return dispatch => {
        const url = "/api/danh-muc/khu-vuc";
        T.delete(url, { ma }, data => {
            done && done(data.error);
            if (data.error) console.error("DELETE: " + url + ".", data.error);
            else dispatch(getDMKhuVucInPage());
        }, error => done(error));
    }
}