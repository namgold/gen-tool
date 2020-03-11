import T from "../../view/common/js/common.js";

// Reducer ------------------------------------------------------------------------------------------------------------
const {UPPER_SNAKE}_IN_PAGE = "user:get{UpperCamel}InPage";

export default function {lowerCamel}Reducer(state = null, data) {{
    switch (data.type) {{
        case {UPPER_SNAKE}_IN_PAGE:
            return Object.assign({{}}, state, {{ page: data.page }});

        default:
            return state;
    }}
}}

// Actions ------------------------------------------------------------------------------------------------------------
T.initCookiePage("{lowerCamel}Page", true);
export function get{UpperCamel}InPage(pageNumber, pageSize, pageCondition, done) {{
    const page = T.updatePage("{lowerCamel}Page", pageNumber, pageSize, pageCondition);
    return dispatch => {{
        const url = `/api/{url}/page/${{page.pageNumber}}/${{page.pageSize}}`;
        T.get(url, {{ condition: page.pageCondition ? JSON.parse(page.pageCondition) : {{}} }}, data => {{
            if (data.error) {{
                T.notify("Lấy dữ liệu bị lỗi!", "danger");
                console.error("GET: " + url + ".", data.error);
            }} else {{
                if (page.pageCondition) data.page.pageCondition = JSON.parse(page.pageCondition);
                if (done) done(data.page);
                dispatch({{ type: {UPPER_SNAKE}_IN_PAGE, page: data.page }});
            }}
        }}, error => T.notify("Lấy dữ liệu bị lỗi!", "danger"));
    }}
}}

export function update{UpperCamel}(changes, done) {{
    return dispatch => {{
        const url = "/api/{url}";
        T.put(url, {{ changes }}, data => {{
            if (data.error) {{
                T.notify("Cập nhật dữ liệu bị lỗi!", "danger");
                console.error("PUT: " + url + ".", data.error);
            }} else {{
                done && done(data.item);
                dispatch(get{UpperCamel}InPage());
            }}
        }}, () => T.notify("Cập nhật dữ liệu bị lỗi!", "danger"));
    }}
}}

export function createMulti{UpperCamel}(multi{UpperCamel}, done) {{
    return dispatch => {{
        const url = "/api/{url}/multiple";
        T.post(url, {{ multi{UpperCamel} }}, data => {{
            if (data.error) {{
                T.notify("Cập nhật dữ liệu bị lỗi!", "danger");
                console.error("POST: " + url + ".", data.error);
            }} else
                done && done(data.item);
        }}, () => T.notify("Cập nhật dữ liệu bị lỗi!", "danger"))
    }}
}}

export function create{UpperCamel}({lowerCamel}, done) {{
    return dispatch => {{
        const url = "/api/{url}";
        T.post(url, {{ {lowerCamel} }}, data => {{
            if (data.error) {{
                T.notify(data.error.message ? data.error.message : "Tạo mới bị lỗi!", "danger");
                console.error("POST: " + url + ".", data.error);
            }} else {{
                dispatch(get{UpperCamel}InPage());
                if (done) done(data);
            }}
        }}, error => T.notify("Tạo mới bị lỗi!", "danger"));
    }}
}}

export function delete{UpperCamel}(_id, done) {{
    return dispatch => {{
        const url = "/api/{url}";
        T.delete(url, {{ _id }}, data => {{
            if (data.error) {{
                T.notify("Xóa bị lỗi!", "danger");
                console.error("DELETE: " + url + ".", data.error);
            }} else {{
                T.alert("Xóa thành công!", "success", false, 800);
                dispatch(get{UpperCamel}InPage());
            }}
            done && done();
        }}, error => T.notify("Xóa bị lỗi!", "danger"));
    }}
}}