import React from 'react';
import {{ connect }} from 'react-redux';
import {{ get{UpperCamel}InPage, create{UpperCamel}, update{UpperCamel}, delete{UpperCamel} }} from '../../redux/{lowerCamel}.jsx';
import {{ Link }} from 'react-router-dom';
import Pagination from '../../common/Pagination.jsx';

const width = (100 / 6) + '%';
const schema = {schema};

class EditModal extends React.Component {{
    constructor(props) {{
        super(props);
        this.state = {{ _id: null, isUpdate: true }};
        this.modal = React.createRef();
        Object.keys(schema).forEach(key => this[key] = React.createRef());
    }}

    componentDidMount() {{
        $(document).ready(() => {{
            $(this.modal.current).on('hidden.bs.modal', () => {{
                this.setState({{ _id: null, isUpdate: true }})
            }});
        }})
    }}

    show = (item) => {{
        if (item) {{
            Object.keys(schema).forEach(key => {{
                $(this[key].current).val(item[key] ? item[key] : null);
            }});
            this.setState({{
                _id: item && item._id ? item._id : null,
                isUpdate: true
            }});
        }}
        else {{
            Object.keys(schema).forEach(key => {{
                $(this[key].current).val('');
            }});
            this.setState({{
                _id: null,
                isUpdate: false
            }});
        }}
        $(this.modal.current).modal('show');
    }};

    save = (e) => {{
        e.preventDefault();
        const changes = {{}};
        Object.keys(schema).forEach(key => changes[key] = $(this[key].current).val());
        if (this.state.isUpdate) {{
            this.props.update(this.state._id, changes, () => {{
                T.notify('Cập nhật {lowername} thành công!', 'success');
                $(this.modal.current).modal('hide');
            }});
        }} else {{
            this.props.create(changes, () => {{
                T.notify('Tạo mới {lowername} thành công!', 'success');
                $(this.modal.current).modal('hide');
            }});
        }}
    }};

    render() {{
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={{this.modal}}>
                <form className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>{{this.state.isUpdate ? 'Cập nhật' : "Tạo mới"}} {lowername}</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body row'>
                            {{Object.keys(schema).map((key, index) => (
                                <div key={{index}} className='form-group col-12 col-md-6'>
                                    <label>{{key}}</label>
                                    <input ref={{this[key]}} className='form-control' type={{schema[key].type}} step={{schema[key].step}} placeholder={{schema[key].title}}/>
                                </div>
                            ))}}
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Đóng</button>
                            <button type='submit' className='btn btn-primary' onClick={{this.save}}>Lưu</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }}
}}

class {UpperCamel}Page extends React.Component {{
    constructor(props) {{
        super(props);
        this.state = {{ isSearching: false }};
        this.modal = React.createRef();
    }}

    componentDidMount() {{
        this.props.get{UpperCamel}InPage(1, 50, {{}});
        T.ready();
    }}

    create = (e) => {{
        this.modal.current.show();
        e.preventDefault();
    }};

    edit = (e, item) => {{
        this.modal.current.show(item);
        e.preventDefault();
    }};

    delete = (e, item) => {{
        T.confirm('{name}', 'Bạn có chắc bạn muốn xóa danh mục này?', 'warning', true, isConfirm =>
            isConfirm && this.props.delete{UpperCamel}(item._id));
        e.preventDefault();
    }};

    clearInputSearch = (e) => {{
        $('#searchTextBox').val('');
        this.search(e);
    }}

    search = (e) => {{
        e.preventDefault();
        const condition = {{}};
        let value = $('#searchTextBox').val();
        if (value) {{
            value = {{ $regex: `.*${{value}}.*`, $options: 'i' }};
            condition['$or'] = [
                {searchFields}
            ]
        }}
        this.props.get{UpperCamel}InPage(undefined, undefined, (condition), () => this.setState({{ isSearching: value != '' }}));
    }};

    render() {{
        let {{ pageNumber, pageSize, pageTotal, totalItem, pageCondition, list }} = this.props.{lowerCamel} && this.props.{lowerCamel}.page ?
            this.props.{lowerCamel}.page : {{ pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0, pageCondition: {{}}, list }};
        let table = null;
        if (list && list.length > 0) {{
            table = (
                <table className='table table-hover table-bordered table-responsive' ref={{this.table}}>
                    <thead>
                        <tr>
                            <th style={{{{ width: 'auto', textAlign: 'center' }}}}>#</th>
                            {{Object.keys(schema).map((key, index) => (<th key={{index}} style={{{{ width: width, whiteSpace: 'nowrap' }}}}>{{key}}</th>))}}
                            <th style={{{{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}}}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{list.map((item, index) => (
                            <tr key={{index}}>
                                <td style={{{{ textAlign: 'right' }}}}>{{(pageNumber - 1) * pageSize + index + 1}}</td>
                                {{Object.keys(schema).map((key, index) =>
                                    schema[key].type === 'bool' ?
                                    <td className='toggle' style={{{{ textAlign: 'center' }}}}>
                                        <label>
                                            <input type='checkbox' checked={{item[key].trim().toUpperCase() == 'TRUE'}} onChange={{() => this.changeActive(item, index)}} />
                                            <span className='button-indecator' />
                                        </label>
                                    </td> :
                                    <td key={{index}} style={{{{ width: width }}}}>{{item[key]}}</td>
                                )}}
                                <td>
                                    <div className='btn-group' style={{{{ display: 'flex' }}}}>
                                        <a className='btn btn-primary' href='#' onClick={{e => this.edit(e, item)}}>
                                            <i className='fa fa-lg fa-edit' />
                                        </a>
                                        <a className='btn btn-danger' href='#' onClick={{e => this.delete(e, item)}}>
                                            <i className='fa fa-lg fa-trash' />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}}
                    </tbody>
                </table>
            );
        }} else {{
            table = <p>Không có dữ liệu!</p>;
        }}

        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-user' />{fullname}</h1>
                        <p/>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <form style={{{{ position: 'relative', border: '1px solid #ddd', marginRight: 6 }}}} onSubmit={{e => this.search(e)}}>
                            <input className='app-search__input' id='searchTextBox' type='search' placeholder='Search' />
                            <a href='#' style={{{{ position: 'absolute', top: 6, right: 9 }}}} onClick={{e => this.search(e)}}>
                                <i className='fa fa-search' />
                            </a>
                        </form>
                        {{
                            this.state.isSearching ?
                            <a href='#' onClick={{e => $('#searchTextBox').val('') && this.search(e)}} style={{{{ color: 'red', marginRight: 12, marginTop: 6 }}}}>
                                <i className='fa fa-trash' />
                            </a> :
                            null
                        }}
                    </ul>
                </div>
                <div className='row tile'>{{table}}</div>
                <Pagination name='{lowerCamel}Page' pageNumber={{pageNumber}} pageSize={{pageSize}} pageTotal={{pageTotal}} totalItem={{totalItem}} pageCondition={{pageCondition}}
                    getPage={{this.props.get{UpperCamel}InPage}} />
                <Link to='/user/summary/{url}/upload' className='btn btn-success btn-circle' style={{{{ position: 'fixed', right: '70px', bottom: '10px' }}}}>
                    <i className='fa fa-lg fa-cloud-upload'/>
                </Link>

                <button type='button' className='btn btn-primary btn-circle'
                    style={{{{ position: 'fixed', right: '10px', bottom: '10px' }}}} onClick={{this.create}}>
                    <i className='fa fa-lg fa-plus' />
                </button>

                <EditModal ref={{this.modal}} create={{this.props.create{UpperCamel}}} update={{this.props.update{UpperCamel}}} />
            </main>
        );
    }}
}}

const mapStateToProps = state => ({{ {lowerCamel}: state.{lowerCamel} }});
const mapActionsToProps = {{ get{UpperCamel}InPage, create{UpperCamel}, update{UpperCamel}, delete{UpperCamel} }};
export default connect(mapStateToProps, mapActionsToProps)({UpperCamel}Page);
