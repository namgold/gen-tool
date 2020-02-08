import T from '../common/js/common';

// Reducer ------------------------------------------------------------------------------------------------------------
const {upperSnake}_IN_PAGE = 'user:get{UpperCamel}InPage';

export default function {lowerCamel}Reducer(state = null, data) {{
    switch (data.type) {{
        case {upperSnake}_IN_PAGE:
            return Object.assign({{}}, state, {{ page: data.page }});

        default:
            return state;
    }}
}}

// Actions ------------------------------------------------------------------------------------------------------------
T.initCookiePage('{lowerCamel}Page', true);
export function get{UpperCamel}InPage(pageNumber, pageSize, done) {{
    const page = T.updatePage('{lowerCamel}Page', pageNumber, pageSize);
    return dispatch => {{
        const url = `/api/{url}/page/${{page.pageNumber}}/${{page.pageSize}}`;
        T.get(url, data => {{
            if (data.error) {{
                T.notify('Lấy dữ liệu bị lỗi!', 'danger');
                console.error('GET: ' + url + '. ' + data.error);
            }} else {{
                if (done) done(data.page);
                dispatch({{ type: {upperSnake}_IN_PAGE, page: data.page }});
            }}
        }}, error => T.notify('Lấy dữ liệu bị lỗi!', 'danger'));
    }}
}}

export function updatePoint(_id, changes, done) {{
    return dispatch => {{
        const url = '/api/{url}';
        T.put(url, {{ _id, changes }}, data => {{
            if (data.error) {{
                T.notify('Cập nhật dữ liệu bị lỗi!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error);
            }} else {{
                done && done(data.item);
                dispatch(get{UpperCamel}InPage());
            }}
        }}, () => T.notify('Cập nhật dữ liệu bị lỗi!', 'danger'));
    }}
}}

export function createMultiPoint(points, done) {{
    return dispatch => {{
        const url = '/api/{url}/multiple';
        T.post(url, {{ points }}, data => {{
            if (data.error && data.error.length) {{
                T.notify('Cập nhật dữ liệu bị lỗi!', 'danger');
                console.error('PUT: ' + url + '. ' + data.error.toString());
            }} else {{
                done && done(data.item);
            }}
        }}, () => T.notify('Cập nhật dữ liệu bị lỗi!', 'danger'))
    }}
}}
