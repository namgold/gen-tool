import React from "react";
import {{ connect }} from "react-redux";
import {{ Link }} from "react-router-dom";
import FileBox from "../../view/common/FileBox.jsx";
import {{ createMulti{UpperCamel} }} from "./Redux.jsx";
import EditModal from "./EditModal.jsx";

class {UpperCamel}ImportPage extends React.Component {{
    constructor(props) {{
        super(props);
        this.state = {{ data: [], message: "" }};
        this.editModal = React.createRef();
    }}

    componentDidMount() {{
        T.ready("/user/{url}");
    }}

    onSuccess = (response) =>
        this.setState({{
            data: response.data.map((item, index) => Object.assign(item, {{ ImportIndex: index }})),
            message: <p className="text-center" style={{{{ color: "green"}}}}>{{response.data.length}} hàng được tải lên thành công</p>
        }});

    onError = () => T.notify("Upload file bị lỗi!", "danger");

    edit = (e, item) => {{
        e.preventDefault();
        this.editModal.current.show(item);
    }};

    update = (changes, done) => {{
        const index = changes.ImportIndex,
            data = this.state.data,
            updateValue = Object.assign({{}}, data[index], changes);
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

    changeActive = (item, key) => this.update({{[key]: !item[key], ImportIndex: item.ImportIndex}}, () => T.notify("Cập nhật {lowername} thành công!", "success"));

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
                                <td style={{{{ textAlign: "right" }}}}>{{index + 1}}</td>
{tableBody}                                <td>
                                    <div className="btn-group">
                                        <a className="btn btn-primary" href="#" onClick={{e => this.edit(e, item)}}>
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
                                <FileBox ref={{this.fileBox}} postUrl="/user/upload" uploadType="{UpperCamel}File" userData="{lowerCamel}ImportData" style={{{{ width: "100%", backgroundColor: "#fdfdfd" }}}} success={{this.onSuccess}} error={{this.onError}} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
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
                <button type="button" className="btn btn-primary btn-circle" disabled={{!this.state.data.some(x=>x)}} style={{{{ position: "fixed", right: "10px", bottom: "10px" }}}} onClick={{this.save}}>
                    <i className="fa fa-lg fa-save"/>
                </button>
                <EditModal ref={{this.editModal}} update={{this.update}}/>
            </main>
        );
    }}
}}

const mapStateToProps = state => ({{ }});
const mapActionsToProps = {{ createMulti{UpperCamel} }};
export default connect(mapStateToProps, mapActionsToProps)({UpperCamel}ImportPage);
