import React from 'react';
import {{ connect }} from 'react-redux';
import {{ Link }} from 'react-router-dom';
import FileBox from '../common/FileBox.jsx';
import {{ createMulti{UpperCamel} }} from '../redux/{lowerCamel}.jsx';

const schema = {schema};

class {UpperCamel}Modal extends React.Component {{
    constructor(props) {{
        super(props);

        this.state = {{ index: -1 }};
        this.modal = React.createRef();

        Object.keys(schema).forEach(key => this[key] = React.createRef());
    }}

    componentDidMount() {{
        $(document).ready(() => {{
            $(this.modal.current).on('hidden.bs.modal', () => {{
                this.setState({{ index: -1 }})
            }});
        }})
    }}


    show = (index, item) => {{
        Object.keys(schema).forEach(key => {{
           $(this[key].current).val(item[key] ? item[key] : null);
        }});
        this.setState({{ index }});
        $(this.modal.current).modal('show');
    }};

    save = (e) => {{
        e.preventDefault();
        const changes = {{}};
        Object.keys(schema).forEach(key => changes[key] = $(this[key].current).val());
        this.props.update(this.state.index, changes, () => {{
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

class {UpperCamel}ImportPage extends React.Component {{
    constructor(props) {{
        super(props);
        this.state = {{ points: [], message: '' }};

        this.editModal = React.createRef();
    }}

    componentDidMount() {{
        T.ready('/user/ds-giam-dinh-muc');
    }}

    onSuccess = (response) => {{
        this.setState({{ points: response.points, message: <p className='text-center' style={{{{ color: 'green'}}}}>{{response.points.length}} hàng được tải lên thành công</p> }});
    }};

    showEdit = (e, index, item) => {{
        e.preventDefault();
        this.editModal.current.show(index, item);
    }};

    update = (index, changes, done) => {{
        const points = this.state.points, currentValue = points[index];
        const updateValue = Object.assign({{}}, currentValue, changes);
        points.splice(index, 1, updateValue);
        this.setState({{ points }});
        done && done();
    }};

    delete = (e, index) => {{
        e.preventDefault();
        const points = this.state.points;
        points.splice(index, 1);
        this.setState({{ points }});
    }};

    save = (e) => {{
        e.preventDefault();
        this.props.createMultiPoint(this.state.points, () => {{
            T.notify('Cập nhật điểm thành công!', 'success');
            this.props.history.push('/user/summary/{url}');
        }})
    }};

    render() {{
        const {{ points }} = this.state;
        let table = null;
        if (points && points.length > 0) {{
            table = (
                <table className='table table-hover table-bordered table-responsive' style={{{{ maxHeight: '600px', overflow: 'scroll' }}}}>
                    <thead>
                        <tr>
                            <th style={{{{ width: 'auto' }}}}>#</th>
                            {{Object.keys(schema).map((key, index) => (
                                <th key={{index}} style={{{{ width: 'auto', textAlign: 'center' }}}}>{{key}}</th>
                            ))}}
                            <th style={{{{ width: 'auto', textAlign: 'center', whiteSpace: 'nowrap' }}}}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{points.map((item, index) => (
                            <tr key={{index}}>
                                <td style={{{{ textAlign: 'right' }}}}>{{index + 1}}</td>
                                {{Object.keys(schema).map((key, i) => (
                                    <td key={{i}}>{{key == 'shcc' ? <a href='#' onClick={{e => this.showEdit(e, index, item)}}>{{item[key]}}</a> : item[key]}}</td>
                                ))}}
                                <td>
                                    <div className='btn-group'>
                                        <a className='btn btn-primary' href='#' onClick={{e => this.showEdit(e, index, item)}}>
                                            <i className='fa fa-lg fa-edit' />
                                        </a>
                                        <a className='btn btn-danger' href='#' onClick={{e => this.delete(e, index)}}>
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
            table = <p>Không có người dùng!</p>;
        }}

        return (
            <main className='app-content'>
                <div className='app-title'>
                    <div>
                        <h1><i className='fa fa-user' /> Tải lên file cập nhật điểm</h1>
                        <p />
                    </div>
                    <ul className='app-breadcrumb breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/user'><i className='fa fa-home fa-lg' /></Link>
                        </li>
                        <li className='breadcrumb-item'>Tải lên file cập nhật điểm</li>
                    </ul>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-6 offset-md-3'>
                        <div className='tile'>
                            <div className='tile-body'>
                                <FileBox ref={{this.fileBox}} postUrl='/user/upload' uploadType='PointFile' userData='{lowerCamel}ImportData' style={{{{ width: '100%', backgroundColor: '#fdfdfd' }}}} success={{this.onSuccess}}/>
                                {{this.state.message}}
                            </div>
                            <div className='tile-footer text-right'>
                                <a href='/download/SampleUpload{UpperCamel}.xlsx' className='btn btn-info'>Tải xuống file mẫu</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    {{points && points.length ? (
                        <div className='tile col-12'>
                            {{table}}
                        </div>
                    ) : null}}
                </div>
                <Link to='/user/summary/{url}' className='btn btn-secondary btn-circle' style={{{{ position: 'fixed', bottom: '10px' }}}}>
                    <i className='fa fa-lg fa-reply' />
                </Link>
                <button type='button' className='btn btn-primary btn-circle'
                        style={{{{ position: 'fixed', right: '10px', bottom: '10px' }}}} onClick={{this.save}}>
                    <i className='fa fa-lg fa-save'/>
                </button>
                <{UpperCamel}Modal ref={{this.editModal}} update={{this.update}}/>
            </main>
        );
    }}
}}

const mapStateToProps = state => ({{ }});
const mapActionsToProps = {{ createMultiPoint }};
export default connect(mapStateToProps, mapActionsToProps)({UpperCamel}ImportPage);
