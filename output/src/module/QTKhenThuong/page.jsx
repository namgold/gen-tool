import React from "react";
import { connect } from "react-redux";
import { getQTKhenThuongInPage, createQTKhenThuong, updateQTKhenThuong, deleteQTKhenThuong } from "./redux.js";
import { Link } from "react-router-dom";
import Pagination from "../../view/common/Pagination.jsx";
import EditModal from "./editModal.jsx";

class QTKhenThuongPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isSearching: false };
        this.modal = React.createRef();
    }

    componentDidMount() {
        this.props.getQTKhenThuongInPage(null, null, null, (error, page) => {
            if (!$.isEmptyObject(page.pageCondition)) {
                $("#searchTextBox").val(page.pageCondition.shcc);
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
        T.confirm("Khen thưởng", `Bạn có chắc bạn muốn xóa khen thưởng ${item.shcc ? `<b>${item.shcc}</b>` : 'này'}?`, "warning", true, isConfirm => {
            isConfirm && this.props.deleteQTKhenThuong(item.shcc, error => {
                if (error) T.notify(error.message ? error.message : `Xoá khen thưởng ${item.shcc} bị lỗi!`, "danger");
                else T.alert(`Xoá khen thưởng ${item.shcc} thành công!`, "success", false, 800);
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
            "shcc": value,
            "maKhenThuong": value,
            "danhHieuKhenThuong": value,
            "quyetDinhKhenThuong": value,
            "capKhenThuong": value
        }
        this.props.getQTKhenThuongInPage(undefined, undefined, condition, (error, page) => {
            if (error) T.notify("Lấy dữ liệu bị lỗi!", "danger");
            else this.setState({ isSearching: value != "" });
        });
    };

    changeActive = (item, key) => {
        let change = { shcc: item.shcc, [key]: !item[key]?1:0 };
        this.props.updateQTKhenThuong({ shcc: item.shcc }, change, (error, data) => {
            if (error) T.notify(error.message ? error.message : `Cập nhật khen thưởng ${item.shcc} bị lỗi!`, "danger");
            else T.notify(`Cập nhật khen thưởng ${item.shcc} thành công!`, "success");
        });
    };

    render() {
        const currentPermissions = this.props.system && this.props.system.user && this.props.system.user.permissions ? this.props.system.user.permissions : [],
            readOnly = !currentPermissions.includes('qtKhenThuong:write'),
            permissionDelete = currentPermissions.includes('qtKhenThuong:delete');
        let { pageNumber, pageSize, pageTotal, totalItem, pageCondition, list } = this.props.qtKhenThuong && this.props.qtKhenThuong.page ?
            this.props.qtKhenThuong.page : { pageNumber: 1, pageSize: 50, pageTotal: 1, totalItem: 0, pageCondition: {}, list };
        let table = null;
        if (list && list.length > 0) {
            table = (
                <table className="table table-hover table-bordered table-responsive" ref={this.table}>
                    <thead>
                        <tr>
                            <th style={{ width: "auto", textAlign: "center" }}>#</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Số hiệu công chức</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Số thứ tự</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Mã khen thưởng</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Năm khen thưởng</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Danh hiệu khen thưởng</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Số ký hiệu quyết định khen thưởng</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Ngày quyết định khen thưởng</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Cấp khen thưởng</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Ngày nhập hồ sơ</th>
                            <th style={{ width: "auto", textAlign: "center", whiteSpace: "nowrap" }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: "right" }}>{(pageNumber - 1) * pageSize + index + 1}</td>
                                <td><a href="#" onClick={e => this.edit(e, item)}>{item["shcc"]}</a></td>
                                <td>{item["stt"]}</td>
                                <td>{item["maKhenThuong"]}</td>
                                <td>{item["namKhenThuong"]}</td>
                                <td>{item["danhHieuKhenThuong"]}</td>
                                <td>{item["quyetDinhKhenThuong"]}</td>
                                <td>{item["ngayKhenThuong"] ? new Date(item["ngayKhenThuong"]).ddmmyyyy() : ""}</td>
                                <td>{item["capKhenThuong"]}</td>
                                <td>{item["ngayNhapHoSo"] ? new Date(item["ngayNhapHoSo"]).ddmmyyyy() : ""}</td>
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
                        <h1><i className="fa fa-user" />Quá trình khen thưởng</h1>
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
                <Pagination name="qtKhenThuongPage" pageNumber={pageNumber} pageSize={pageSize} pageTotal={pageTotal} totalItem={totalItem} pageCondition={pageCondition}
                    getPage={this.props.getQTKhenThuongInPage} />
                {
                    !readOnly &&
                    <div>
                        <Link to="/user/qua-trinh/khen-thuong/upload" className="btn btn-success btn-circle" style={{ zIndex: 100, position: "fixed", right: "70px", bottom: "10px" }}>
                            <i className="fa fa-lg fa-cloud-upload"/>
                        </Link>
                        <button type="button" className="btn btn-primary btn-circle" onClick={this.create}
                            style={{ zIndex: 100, position: "fixed", right: "10px", bottom: "10px" }}>
                            <i className="fa fa-lg fa-plus" />
                        </button>
                    </div>
                }
                <EditModal ref={this.modal} readOnly={readOnly} create={this.props.createQTKhenThuong} update={this.props.updateQTKhenThuong} />
            </main>
        );
    }
}

const mapStateToProps = state => ({ system: state.system, qtKhenThuong: state.qtKhenThuong });
const mapActionsToProps = { getQTKhenThuongInPage, createQTKhenThuong, updateQTKhenThuong, deleteQTKhenThuong };
export default connect(mapStateToProps, mapActionsToProps)(QTKhenThuongPage);
