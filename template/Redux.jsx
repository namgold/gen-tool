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
            if (page.pageCondition && data.page) data.page.pageCondition = JSON.parse(page.pageCondition);
            done && done(data.error, data.page);
            if (data.error) console.error("GET: " + url + ".", data.error);
            else dispatch({{ type: {UPPER_SNAKE}_IN_PAGE, page: data.page }});
        }}, error => done(error));
    }}
}}

export function update{UpperCamel}(condition, changes, done) {{
    return dispatch => {{
        const url = "/api/{url}";
        T.put(url, {{ condition, changes }}, data => {{
            done && done(data.error, data.item);
            if (data.error) console.error("PUT: " + url + ".", data.error);
            else dispatch(get{UpperCamel}InPage());
        }}, error => done(error));
    }}
}}

export function createMulti{UpperCamel}(multi{UpperCamel}, isOverride, done) {{
    return dispatch => {{
        const url = "/api/{url}/multiple";
        T.post(url, {{ multi{UpperCamel}, isOverride }}, data => {{
            done && done(data.error, data.item);
            if (data.error) console.error("POST: " + url + ".", data.error);
        }}, error => done(error));
    }}
}}

export function create{UpperCamel}({lowerCamel}, done) {{
    return dispatch => {{
        const url = "/api/{url}";
        T.post(url, {{ {lowerCamel} }}, data => {{
            done && done(data.error, data.item);
            if (data.error) console.error("POST: " + url + ".", data.error);
            else dispatch(get{UpperCamel}InPage());
        }}, error => done(error));
    }}
}}

export function delete{UpperCamel}({key}, done) {{
    return dispatch => {{
        const url = "/api/{url}";
        T.delete(url, {{ {key} }}, data => {{
            done && done(data.error);
            if (data.error) console.error("DELETE: " + url + ".", data.error);
            else dispatch(get{UpperCamel}InPage());
        }}, error => done(error));
    }}
}}