import React from "react";
import { connect } from "react-redux";
import { getDMKhuVucInPage, createDMKhuVuc, updateDMKhuVuc, deleteDMKhuVuc } from "./redux.js";
import { Link } from "react-router-dom";
import Pagination from "../../view/common/Pagination.jsx";
import EditModal from "./editModal.jsx";

class DMKhuVucPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isSearching: false };
        this.modal = React.createRef();
    }

    componentDidMount() {
        this.props.getDMKhuVucInPage(null, null, null, (error, page) => {
            if (!$.isEmptyObject(page.pageCondition)) {
                $("#searchTextBox").val(page.pageCondition.ma);
                this.setState({ isSearching: true });
            }
        });
        T.ready();
    }

    create = (e) => {
        e.preventDefault();
        this.modal.current.show();
    };

    edit = (e, item) => {
        e.preventDefault();
        this.modal.current.show(item);
    };

    delete = (e, item) => {
        e.preventDefault();
        T.confirm("Khu vực", `Bạn có chắc bạn muốn xóa khu vực ${item.ten ? `<b>${item.ten}</b>` : 'này'}?`, "warning", true, isConfirm => {
            isConfirm && this.props.deleteDMKhuVuc(item.ma, error => {
                if (error) T.notify(error.message ? error.message : `Xoá khu vực ${item.ten} bị lỗi!`, "danger");
                else T.alert(`Xoá khu vực ${item.ten} thành công!`, "success", false, 800);
            })
        });
    };

    clearInputSearch = (e) => {
        $("#searchTextBox").val("");
        this.search(e);
    }

    search = (e) => {
        e.preventDefault();
        const value = $("#searchTextBox").val();
        let condition = {};
        if (value !== '') condition = {
            "ma": value,
            "ten": value,
            "territory": value,
            "maChau": value
        }
        this.props.getDMKhuVucInPage(undefined, undefined, condition, (error, page) => {
            if (error) T.notify("Lấy dữ liệu bị lỗi!", "danger");
            else this.setState({ isSearching: value != "" });
        });
    };

    changeActive = (item, key) => {
        let change = { ma: item.ma, [key]: !item[key]?1:0 };
        this.props.updateDMKhuVuc({ ma: item.ma }, change, (error, data) => {
            if (error) T.notify(error.message ? error.message : `Cập nhật khu vực ${item.ten} bị lỗi!`, "danger");
            else T.notify(`Cập nhật khu vực ${item.ten} thành công!`, "success");
        });
    };

    render() {
        const currentPermissions = this.props.system && this.props.system.user && this.props.system.user.permissions ? this.props.system.user.permissions : [],
            readOnly = !currentPermissions.includes('dmKhuVuc:write'),
            permissionDelete = currentPermissions.includes('dmKhuVuc:delete');
        let { pageNumber, pageSize, pageTotal, totalItem, pageCondition, list } = this.props.dmKhuVuc && this.props.dmKhuVuc.page ?
            this.props.dmKhuVuc.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0, pageCondition: {}, list };
        let table = null;
        if (list && list.length > 0) {
            table = (
                <table className="table table-hover table-bordered table-responsive" ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: "auto", textAlign: "center" }}>#</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Mã khu vực</th>
                            <th style={{ width: "50%", whiteSpace: "nowrap" }}>Tên khu vực</th>
                            <th style={{ width: "50%", whiteSpace: "nowrap" }}>Tên tiếng anh</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Mã châu</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Kích hoạt</th>
                            <th style={{ width: "auto", textAlign: "center", whiteSpace: "nowrap" }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: "right" }}>{(pageNumber - 1) * pageSize + index + 1}</td>
                                <td><a href="#" onClick={e => this.edit(e, item)}>{item["ma"]}</a></td>
                                <td>{item["ten"]}</td>
                                <td>{item["territory"]}</td>
                                <td>{item["maChau"]}</td>
                                <td className="toggle" style={{ textAlign: "center" }}>
                                    <label>
                                        <input type="checkbox" checked={item.kichHoat ? true : false} onChange={() => !readOnly && this.changeActive(item, "kichHoat")} />
                                        <span className="button-indecator" />
                                    </label>
                                </td>
                                <td>
                                    <div className="btn-group" style={{ display: "flex" }}>
                                        <a className="btn btn-primary" href="#" onClick={e => this.edit(e, item)}>
                                            <i className="fa fa-lg fa-edit" />
                                        </a>
                                        {
                                            permissionDelete &&
                                            <a className="btn btn-danger" href="#" onClick={e => this.delete(e, item)}>
                                                <i className="fa fa-lg fa-trash" />
                                            </a>
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else table = <p>Không có dữ liệu!</p>;
        return (
            <main className="app-content">
                <div className="app-title">
                    <div>
                        <h1><i className="fa fa-user" />Danh mục khu vực</h1>
                        <p/>
                    </div>
                    <ul className="app-breadcrumb breadcrumb">
                        <form style={{ position: "relative", border: "1px solid #ddd", marginRight: 6 }} onSubmit={e => this.search(e)}>
                            <input className="app-search__input" id="searchTextBox" type="search" placeholder="Search" />
                            <a href="#" style={{ position: "absolute", top: 6, right: 9 }} onClick={e => this.search(e)}>
                                <i className="fa fa-search" />
                            </a>
                        </form>
                        {
                            this.state.isSearching ?
                            <a href="#" onClick={e => $("#searchTextBox").val("") && this.search(e)} style={{ color: "red", marginRight: 12, marginTop: 6 }}>
                                <i className="fa fa-trash" />
                            </a> :
                            null
                        }
                    </ul>
                </div>
                <div className="row tile">{table}</div>
                <Pagination name="dmKhuVucPage" pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem} pageCondition={pageCondition}
                    getPage={this.props.getDMKhuVucInPage} />
                {
                    !readOnly &&
                    <div>
                        <Link to="/user/danh-muc/khu-vuc/upload" className="btn btn-success btn-circle" style={{ zIndex: 100, position: "fixed", right: "70px", bottom: "10px" }}>
                            <i className="fa fa-lg fa-cloud-upload"/>
                        </Link>
                        <button type="button" className="btn btn-primary btn-circle" onClick={this.create}
                            style={{ zIndex: 100, position: "fixed", right: "10px", bottom: "10px" }}>
                            <i className="fa fa-lg fa-plus" />
                        </button>
                    </div>
                }
                <EditModal ref={this.modal} readOnly={readOnly} create={this.props.createDMKhuVuc} update={this.props.updateDMKhuVuc} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ system: state.system, dmKhuVuc: state.dmKhuVuc });
const mapActionsToProps = { getDMKhuVucInPage, createDMKhuVuc, updateDMKhuVuc, deleteDMKhuVuc };
export default connect(mapStateToProps, mapActionsToProps)(DMKhuVucPage);
