import T from "../../view/common/js/common.js";

// Reducer ------------------------------------------------------------------------------------------------------------
const DM_TANG_BAO_HIEM_XA_HOI_IN_PAGE = "user:getDMTangBaoHiemXaHoiInPage";

export default function dmTangBaoHiemXaHoiReducer(state = null, data) {
    switch (data.type) {
        case DM_TANG_BAO_HIEM_XA_HOI_IN_PAGE:
            return Object.assign({}, state, { page: data.page });
        default:
            return state;
    }
}

// Actions ------------------------------------------------------------------------------------------------------------
T.initCookiePage("dmTangBaoHiemXaHoiPage", true);
export function getDMTangBaoHiemXaHoiInPage(pageNumber, pageSize, pageCondition, done) {
    const page = T.updatePage("dmTangBaoHiemXaHoiPage", pageNumber, pageSize, pageCondition);
    return dispatch => {
        const url = `/api/danh-muc/tang-bao-hiem-xa-hoi/page/${page.pageNumber}/${page.pageSize}`;
        T.get(url, { condition: page.pageCondition ? JSON.parse(page.pageCondition) : {} }, data => {
            if (page.pageCondition && data.page) data.page.pageCondition = JSON.parse(page.pageCondition);
            done && done(data.error, data.page);
            if (data.error) console.error("GET: " + url + ".", data.error);
            else dispatch({ type: DM_TANG_BAO_HIEM_XA_HOI_IN_PAGE, page: data.page });
        }, error => done(error));
    }
}

export function updateDMTangBaoHiemXaHoi(condition, changes, done) {
    return dispatch => {
        const url = "/api/danh-muc/tang-bao-hiem-xa-hoi";
        T.put(url, { condition, changes }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("PUT: " + url + ".", data.error);
            else dispatch(getDMTangBaoHiemXaHoiInPage());
        }, error => done(error));
    }
}

export function createMultiDMTangBaoHiemXaHoi(multiDMTangBaoHiemXaHoi, isOverride, done) {
    return dispatch => {
        const url = "/api/danh-muc/tang-bao-hiem-xa-hoi/multiple";
        T.post(url, { multiDMTangBaoHiemXaHoi, isOverride }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("POST: " + url + ".", data.error);
        }, error => done(error));
    }
}

export function createDMTangBaoHiemXaHoi(dmTangBaoHiemXaHoi, done) {
    return dispatch => {
        const url = "/api/danh-muc/tang-bao-hiem-xa-hoi";
        T.post(url, { dmTangBaoHiemXaHoi }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("POST: " + url + ".", data.error);
            else dispatch(getDMTangBaoHiemXaHoiInPage());
        }, error => done(error));
    }
}

export function deleteDMTangBaoHiemXaHoi(ma, done) {
    return dispatch => {
        const url = "/api/danh-muc/tang-bao-hiem-xa-hoi";
        T.delete(url, { ma }, data => {
            done && done(data.error);
            if (data.error) console.error("DELETE: " + url + ".", data.error);
            else dispatch(getDMTangBaoHiemXaHoiInPage());
        }, error => done(error));
    }
}