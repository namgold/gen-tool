import React from "react";
import {{ connect }} from "react-redux";
import {{ Link }} from "react-router-dom";
import FileBox from "../../common/FileBox.jsx";
import {{ createMulti{UpperCamel} }} from "../../redux/{lowerCamel}.jsx";

const width = (100 / 6) + "%";
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
            $(this.modal.current).on("hidden.bs.modal", () => {{
                this.setState({{ index: -1 }})
            }});
        }})
    }}

    show = (index, item) => {{
        Object.keys(schema).forEach(key => {{
            if (schema[key].type === "bool")
                $(this[key].current).prop("checked", schema[key].default ? schema[key].default : false);
            else
                $(this[key].current).val("");

        }});
        Object.keys(schema).forEach(key => {{
            if (item[key]) {{
                if (schema[key].type === "bool")
                    $(this[key].current).prop("checked", item[key]);
                else
                    $(this[key].current).val(item[key] ? item[key] : null);
            }}
        }});
        this.setState({{ index }});
        $(this.modal.current).modal("show");
    }};

    save = (e) => {{
        e.preventDefault();
        const changes = {{}};
        Object.keys(schema).forEach(key => {{
            if (schema[key].type === "bool")
                changes[key] = this[key].current.checked
            else if (schema[key].type === "datetime")
                changes[key] = this[key].val() ? T.formatDate(this[key].val()) : null
            else
                changes[key] = $(this[key].current).val().trim()
        }});
        this.props.update(this.state.index, changes, () => {{
            T.notify("Cập nhật bộ môn thành công!", "success");
            $(this.modal.current).modal("hide");
        }});
    }};

    render() {{
        return (
                <div className="modal" tabIndex="-1" role="dialog" ref={{this.modal}}>
                    <form className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cập nhật {lowername}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body row">
                                {{Object.keys(schema).map((key, index) => (
                                    schema[key].type === "bool" ?
                                    <div key={{index}} className="form-group col-12 col-md-6" style={{{{ display: "inline-flex", width: "100%" }}}}>
                                        <label htmlFor={{key+"CheckBox"}}>{{ schema[key].title }}</label>&nbsp;&nbsp;
                                            <div className="toggle">
                                                <label>
                                                    <input ref={{this[key]}} type="checkbox" id={{key+"CheckBox"}}/>
                                                    <span className="button-indecator" />
                                                </label>
                                            </div>
                                    </div> :
                                    <div key={{index}} className="form-group col-12 col-md-6">
                                        <label>{{schema[key].title}}</label>
                                        <input ref={{this[key]}} className="form-control" type={{schema[key].type}} step={{schema[key].step}} placeholder={{schema[key].title}}/>
                                    </div>
                                ))}}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                <button type="submit" className="btn btn-primary" onClick={{this.save}}>Lưu</button>
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
        this.state = {{ data: [], message: "" }};
        this.editModal = React.createRef();
    }}

    componentDidMount() {{
        T.ready("/user/{url}");
    }}

    onSuccess = (response) => {{
        this.setState({{ data: response.data, message: <p className="text-center" style={{{{ color: "green"}}}}>{{response.data.length}} hàng được tải lên thành công</p> }});
    }};

    showEdit = (e, index, item) => {{
        e.preventDefault();
        this.editModal.current.show(index, item);
    }};

    update = (index, changes, done) => {{
        const data = this.state.data, currentValue = data[index];
        const updateValue = Object.assign({{}}, currentValue, changes);
        data.splice(index, 1, updateValue);
        this.setState({{ data }});
        done && done();
    }};

    delete = (e, index) => {{
        e.preventDefault();
        const data = this.state.data;
        data.splice(index, 1);
        this.setState({{ data }});
    }};

    save = (e) => {{
        e.preventDefault();
        this.props.createMulti{UpperCamel}(this.state.data, () => {{
            T.notify("Cập nhật {lowername} thành công!", "success");
            this.props.history.push("/user/{url}");
        }})
    }};

    changeActive = (index, item, key) => {{
        let change = {{}}
        change[key] = !item[key];
        this.update(index, change, () => {{
            T.notify("Cập nhật bộ môn thành công!", "success");
        }});
    }};

    render() {{
        const {{ data }} = this.state;
        let table = null;
        if (data && data.length > 0) {{
            table = (
                <table className="table table-hover table-bordered table-responsive" style={{{{ maxHeight: "600px", overflow: "auto" }}}}>
                    <thead>
                        <tr>
                            <th style={{{{ width: "auto" }}}}>#</th>
{tableHeader}                            <th style={{{{ width: "auto", textAlign: "center", whiteSpace: "nowrap" }}}}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{data.map((item, index) => (
                            <tr key={{index}}>
                            <td style={{{{ textAlign: "right" }}}}>{{(pageNumber - 1) * pageSize + index + 1}}</td>
{tableBody}                                <td>
                                    <div className="btn-group">
                                        <a className="btn btn-primary" href="#" onClick={{e => this.showEdit(e, index, item)}}>
                                            <i className="fa fa-lg fa-edit" />
                                        </a>
                                        <a className="btn btn-danger" href="#" onClick={{e => this.delete(e, index)}}>
                                            <i className="fa fa-lg fa-trash" />
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
            <main className="app-content">
                <div className="app-title">
                    <div>
                        <h1><i className="fa fa-user" /> Tải lên file cập nhật {lowername}</h1>
                        <p />
                    </div>
                    <ul className="app-breadcrumb breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/user"><i className="fa fa-home fa-lg" /></Link>
                        </li>
                        <li className="breadcrumb-item">Tải lên file cập nhật {lowername}</li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="tile">
                            <div className="tile-body">
                                <FileBox ref={{this.fileBox}} postUrl="/user/upload" uploadType="{UpperCamel}File" userData="{lowerCamel}ImportData" style={{{{ width: "100%", backgroundColor: "#fdfdfd" }}}} success={{this.onSuccess}} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                {{this.state.message}}
                            </div>
                            <div className="tile-footer text-right">
                                <a href="/download/SampleUpload{UpperCamel}.xlsx" className="btn btn-info">Tải xuống file mẫu</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {{data && data.length ? (
                        <div className="tile col-12">
                            {{table}}
                        </div>
                    ) : null}}
                </div>
                <Link to="/user/{url}" className="btn btn-secondary btn-circle" style={{{{ position: "fixed", bottom: "10px" }}}}>
                    <i className="fa fa-lg fa-reply" />
                </Link>
                <button type="button" className="btn btn-primary btn-circle"
                        style={{{{ position: "fixed", right: "10px", bottom: "10px" }}}} onClick={{this.save}}>
                    <i className="fa fa-lg fa-save"/>
                </button>
                <{UpperCamel}Modal ref={{this.editModal}} update={{this.update}}/>
            </main>
        );
    }}
}}

const mapStateToProps = state => ({{ }});
const mapActionsToProps = {{ createMulti{UpperCamel} }};
export default connect(mapStateToProps, mapActionsToProps)({UpperCamel}ImportPage);
