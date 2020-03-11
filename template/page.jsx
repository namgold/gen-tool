import React from "react";
import {{ connect }} from "react-redux";
import {{ get{UpperCamel}InPage, create{UpperCamel}, update{UpperCamel}, delete{UpperCamel} }} from "./Redux.jsx";
import {{ Link }} from "react-router-dom";
import Pagination from "../../view/common/Pagination.jsx";
import EditModal from "./EditModal.jsx";

const schema = {schema};

class {UpperCamel}Page extends React.Component {{
    constructor(props) {{
        super(props);
        this.state = {{ isSearching: false }};
        this.modal = React.createRef();
    }}

    componentDidMount() {{
        this.props.get{UpperCamel}InPage(null, null, null, (page) => {{
            if (!$.isEmptyObject(page.pageCondition)) {{
                let a = page.pageCondition.$or[0]
                $("#searchTextBox").val(a[Object.keys(a)[0]].$regex.slice(2, -2));
                this.setState({{ isSearching: true }});
            }}
        }});
        T.ready();
    }}

    create = (e) => {{
        e.preventDefault();
        this.modal.current.show();
    }};

    edit = (e, item) => {{
        e.preventDefault();
        this.modal.current.show(item);
    }};

    delete = (e, item) => {{
        e.preventDefault();
        T.confirm("{name}", "Bạn có chắc bạn muốn xóa danh mục này?", "warning", true, isConfirm =>
            isConfirm && this.props.delete{UpperCamel}(item._id));
    }};

    clearInputSearch = (e) => {{
        $("#searchTextBox").val("");
        this.search(e);
    }}

    search = (e) => {{
        e.preventDefault();
        const condition = {{}};
        let value = $("#searchTextBox").val();
        if (value) {{
            value = {{ $regex: `.*${{value}}.*`, $options: "i" }};
            condition["$or"] = [
                {searchFields}
            ]
        }}
        this.props.get{UpperCamel}InPage(undefined, undefined, (condition), () => this.setState({{ isSearching: value != "" }}));
    }};

    changeActive = (item, key) => {{
        let change = {{ _id: item._id}}
        change[key] = !item[key];
        this.props.update{UpperCamel}(change, () => {{
            T.notify("Cập nhật {lowername} thành công!", "success");
        }});
    }};


    render() {{
        let {{ pageNumber, pageSize, pageTotal, totalItem, pageCondition, list }} = this.props.{lowerCamel} && this.props.{lowerCamel}.page ?
            this.props.{lowerCamel}.page : {{ pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0, pageCondition: {{}}, list }};
        let table = null;
        if (list && list.length > 0) {{
            table = (
                <table className="table table-hover table-bordered table-responsive" ref={{this.table}}>
                    <thead>
                        <tr>
                            <th style={{{{ width: "auto", textAlign: "center" }}}}>#</th>
{tableHeader}                            <th style={{{{ width: "auto", textAlign: "center", whiteSpace: "nowrap" }}}}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{list.map((item, index) => (
                            <tr key={{index}}>
                                <td style={{{{ textAlign: "right" }}}}>{{(pageNumber - 1) * pageSize + index + 1}}</td>
{tableBody}                                <td>
                                    <div className="btn-group" style={{{{ display: "flex" }}}}>
                                        <a className="btn btn-primary" href="#" onClick={{e => this.edit(e, item)}}>
                                            <i className="fa fa-lg fa-edit" />
                                        </a>
                                        <a className="btn btn-danger" href="#" onClick={{e => this.delete(e, item)}}>
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
                        <h1><i className="fa fa-user" />{fullname}</h1>
                        <p/>
                    </div>
                    <ul className="app-breadcrumb breadcrumb">
                        <form style={{{{ position: "relative", border: "1px solid #ddd", marginRight: 6 }}}} onSubmit={{e => this.search(e)}}>
                            <input className="app-search__input" id="searchTextBox" type="search" placeholder="Search" />
                            <a href="#" style={{{{ position: "absolute", top: 6, right: 9 }}}} onClick={{e => this.search(e)}}>
                                <i className="fa fa-search" />
                            </a>
                        </form>
                        {{
                            this.state.isSearching ?
                            <a href="#" onClick={{e => $("#searchTextBox").val("") && this.search(e)}} style={{{{ color: "red", marginRight: 12, marginTop: 6 }}}}>
                                <i className="fa fa-trash" />
                            </a> :
                            null
                        }}
                    </ul>
                </div>
                <div className="row tile">{{table}}</div>
                <Pagination name="{lowerCamel}Page" pageNumber={{pageNumber}} pageSize={{pageSize}} pageTotal={{pageTotal}} totalItem={{totalItem}} pageCondition={{pageCondition}}
                    getPage={{this.props.get{UpperCamel}InPage}} />
                <Link to="/user/{url}/upload" className="btn btn-success btn-circle" style={{{{ zIndex: 100, position: "fixed", right: "70px", bottom: "10px" }}}}>
                    <i className="fa fa-lg fa-cloud-upload"/>
                </Link>

                <button type="button" className="btn btn-primary btn-circle"
                    style={{{{ zIndex: 100, position: "fixed", right: "10px", bottom: "10px" }}}} onClick={{this.create}}>
                    <i className="fa fa-lg fa-plus" />
                </button>

                <EditModal ref={{this.modal}} create={{this.props.create{UpperCamel}}} update={{this.props.update{UpperCamel}}} />
            </main>
        );
    }}
}}

const mapStateToProps = state => ({{ {lowerCamel}: state.{lowerCamel} }});
const mapActionsToProps = {{ get{UpperCamel}InPage, create{UpperCamel}, update{UpperCamel}, delete{UpperCamel} }};
export default connect(mapStateToProps, mapActionsToProps)({UpperCamel}Page);
