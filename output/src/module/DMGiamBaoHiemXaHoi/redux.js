import T from "../../view/common/js/common.js";

// Reducer ------------------------------------------------------------------------------------------------------------
const DM_GIAM_BAO_HIEM_XA_HOI_IN_PAGE = "user:getDMGiamBaoHiemXaHoiInPage";

export default function dmGiamBaoHiemXaHoiReducer(state = null, data) {
    switch (data.type) {
        case DM_GIAM_BAO_HIEM_XA_HOI_IN_PAGE:
            return Object.assign({}, state, { page: data.page });
        default:
            return state;
    }
}

// Actions ------------------------------------------------------------------------------------------------------------
T.initCookiePage("dmGiamBaoHiemXaHoiPage", true);
export function getDMGiamBaoHiemXaHoiInPage(pageNumber, pageSize, pageCondition, done) {
    const page = T.updatePage("dmGiamBaoHiemXaHoiPage", pageNumber, pageSize, pageCondition);
    return dispatch => {
        const url = `/api/danh-muc/giam-bao-hiem-xa-hoi/page/${page.pageNumber}/${page.pageSize}`;
        T.get(url, { condition: page.pageCondition ? JSON.parse(page.pageCondition) : {} }, data => {
            if (page.pageCondition && data.page) data.page.pageCondition = JSON.parse(page.pageCondition);
            done && done(data.error, data.page);
            if (data.error) console.error("GET: " + url + ".", data.error);
            else dispatch({ type: DM_GIAM_BAO_HIEM_XA_HOI_IN_PAGE, page: data.page });
        }, error => done(error));
    }
}

export function updateDMGiamBaoHiemXaHoi(condition, changes, done) {
    return dispatch => {
        const url = "/api/danh-muc/giam-bao-hiem-xa-hoi";
        T.put(url, { condition, changes }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("PUT: " + url + ".", data.error);
            else dispatch(getDMGiamBaoHiemXaHoiInPage());
        }, error => done(error));
    }
}

export function createMultiDMGiamBaoHiemXaHoi(multiDMGiamBaoHiemXaHoi, isOverride, done) {
    return dispatch => {
        const url = "/api/danh-muc/giam-bao-hiem-xa-hoi/multiple";
        T.post(url, { multiDMGiamBaoHiemXaHoi, isOverride }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("POST: " + url + ".", data.error);
        }, error => done(error));
    }
}

export function createDMGiamBaoHiemXaHoi(dmGiamBaoHiemXaHoi, done) {
    return dispatch => {
        const url = "/api/danh-muc/giam-bao-hiem-xa-hoi";
        T.post(url, { dmGiamBaoHiemXaHoi }, data => {
            done && done(data.error, data.item);
            if (data.error) console.error("POST: " + url + ".", data.error);
            else dispatch(getDMGiamBaoHiemXaHoiInPage());
        }, error => done(error));
    }
}

export function deleteDMGiamBaoHiemXaHoi(ma, done) {
    return dispatch => {
        const url = "/api/danh-muc/giam-bao-hiem-xa-hoi";
        T.delete(url, { ma }, data => {
            done && done(data.error);
            if (data.error) console.error("DELETE: " + url + ".", data.error);
            else dispatch(getDMGiamBaoHiemXaHoiInPage());
        }, error => done(error));
    }
}