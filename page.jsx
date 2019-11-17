import React from 'react';
import {{ connect }} from 'react-redux';
import {{ get{UpperCamel}InPage, updatePoint }} from '../redux/{lowerCamel}.jsx';
import {{ Link }} from 'react-router-dom';
import Pagination from '../common/Pagination.jsx';

const schema = {schema};

class PointModal extends React.Component {{
    constructor(props) {{
        super(props);
        this.state = {{ _id: null }};
        this.modal = React.createRef();
        Object.keys(schema).forEach(key => this[key] = React.createRef());
    }}

    componentDidMount() {{
        $(document).ready(() => {{
            $(this.modal.current).on('hidden.bs.modal', () => {{
                this.setState({{ _id: null }})
            }});
        }})
    }}

    show = (item) => {{
        if (item) {{
            Object.keys(schema).forEach(key => {{
                $(this[key].current).val(item[key] ? item[key] : null);
            }});
        }}
        this.setState({{ _id: item && item._id ? item._id : null }});
        $(this.modal.current).modal('show');
    }};

    save = (e) => {{
        e.preventDefault();
        const changes = {{}};
        Object.keys(schema).forEach(key => changes[key] = $(this[key].current).val());
        this.props.updatePoint(this.state._id, changes, () => {{
            T.notify('Cập nhật điểm thành công!', 'success');
            $(this.modal.current).modal('hide');
        }});
    }};

    render() {{
        return (
            <div className='modal' tabIndex='-1' role='dialog' ref={{this.modal}}>
                <form className='modal-dialog modal-lg' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Cập nhật điểm</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body row'>
                            {{Object.keys(schema).map((key, index) => (
                                    <div key={{index}} className='form-group col-12 col-md-6'>
                                        <label>{{key}}</label>
                                        <input ref={{this[key]}} className='form-control' type={{schema[key].type}} step={{schema[key].step}}
                                               placeholder={{key}}/>
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
        this.state = {{ }};

        this.bonusModal = React.createRef();
    }}

    componentDidMount() {{
        this.props.get{UpperCamel}InPage();
        T.ready();
    }}

    edit = (e, item) => {{
        this.bonusModal.current.show(item);
        e.preventDefault();
    }};

    render() {{
        let {{ pageNumber, pageSize, pageTotal, totalItem, list }} = this.props.{lowerCamel} && this.props.{lowerCamel}.page ?
            this.props.{lowerCamel}.page : {{ pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0, list }};
        let table = null;
        if (list && list.length > 0) {{
            table = (
                <table className='table table-hover table-bordered table-responsive' ref={{this.table}}>
                    <thead>
                        <tr>
                            <th style={{{{ width: 'auto', textAlign: 'center' }}}}>#</th>
                            {{/* <th style={{{{ width: 'auto' }}}}>SHCC</th> */}}
                            {{Object.keys(schema).map((key, index) => (<th key={{index}} style={{{{ width: 'auto' }}}}>{{key}}</th>))}}
                            <th style={{{{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}}}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{list.map((item, index) => (
                            <tr key={{index}}>
                                <td style={{{{ textAlign: 'right' }}}}>{{(pageNumber - 1) * pageSize + index + 1}}</td>
                                {{Object.keys(schema).map((key, index) => (<td key={{index}} style={{{{ width: 'auto' }}}}>{{item[key]}}</td>))}}
                                <td>
                                    <div className=''>
                                        <a className='btn btn-primary' href='#' onClick={{e => this.edit(e, item)}}>
                                            <i className='fa fa-lg fa-edit' />
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
                        <h1><i className='fa fa-user' /> Danh sách tập sự</h1>
                        <p/>
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/user'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'> Danh sách tập sự</li>
                    </ul>
                </div>
                <div className='row tile'>{{table}}</div>
                <Pagination name='{lowerCamel}Page' pageNumber={{pageNumber}} pageSize={{pageSize}} pageTotal={{pageTotal}} totalItem={{totalItem}}
                    getPage={{this.props.get{UpperCamel}InPage}} />
                <Link to='/user/summary/{url}/upload' className='btn btn-success btn-circle' style={{{{ position: 'fixed', right: '10px', bottom: '10px' }}}}>
                    <i className='fa fa-lg fa-cloud-upload'/>
                </Link>
                <PointModal ref={{this.bonusModal}} updatePoint={{this.props.updatePoint}} />
            </main>
        );
    }}
}}

const mapStateToProps = state => ({{ {lowerCamel}: state.{lowerCamel} }});
const mapActionsToProps = {{ get{UpperCamel}InPage, updatePoint }};
export default connect(mapStateToProps, mapActionsToProps)({UpperCamel}Page);
