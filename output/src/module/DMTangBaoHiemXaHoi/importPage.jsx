import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FileBox from "../../view/common/FileBox.jsx";
import { createMultiDMTangBaoHiemXaHoi } from "./redux.js";
import EditModal from "./editModal.jsx";

class DMTangBaoHiemXaHoiImportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], message: "", saving: false };
        this.editModal = React.createRef();
    }

    componentDidMount() {
        T.ready("/user/danh-muc/tang-bao-hiem-xa-hoi");
    }

    onSuccess = (response) =>
        this.setState({ data: response.data, message: <p className="text-center" style={{ color: "green"}}>{response.data.length} hàng được tải lên thành công</p>});

    onError = () => T.notify("Upload file bị lỗi!", "danger");

    edit = (e, item) => {
        e.preventDefault();
        this.editModal.current.show(item);
    };

    update = (condition, changes, done) => {
        const data = JSON.parse(JSON.stringify(this.state.data));
        for (var i = 0; i < data.length; i++)
            if (data[i].ma == condition.ma) {
                data[i] = Object.assign({}, data[i], changes)
                this.setState({ data });
                done && done(null, data[i]);
                return;
            }
        done && done("Item not found")
    };

    delete = (e, index) => {
        e.preventDefault();
        const ten = this.state.data[index].ten;
        T.confirm("Tỉnh/thành phố", `Bạn có chắc bạn muốn xóa tỉnh/thành phố ${ten ? `<b>${ten}</b>` : 'này' }?`, "warning", true, isConfirm => {
            if (isConfirm) {
                const data = this.state.data;
                data.splice(index, 1);
                this.setState({ data });
                T.alert(`Xoá tỉnh/thành phố ${ten} thành công!`, "success", false, 800);
            }
        });
    };

    save = (e) => {
        var doSave = (isOverride) => {
            var data = JSON.parse(JSON.stringify(this.state.data));
            this.setState({ saving: true });
            this.props.createMultiDMTangBaoHiemXaHoi(data, isOverride, (error, data) => {
                if (error) T.notify("Cập nhật dữ liệu bị lỗi!", "danger");
                else {
                    T.notify(`Cập nhật ${data && data.items ? data.items.length + ' ': ''}tăng bảo hiểm xã hội thành công!`, "success");
                    this.props.history.push("/user/danh-muc/tang-bao-hiem-xa-hoi");
                }
                this.setState({ saving: false });
            })
        }
        e.preventDefault();
        T.confirm3("Cập nhật dữ liệu", "Bạn có muốn <b>ghi đè</b> dữ liệu đang có bằng dữ liệu mới không?<br>Nếu không rõ, hãy chọn <b>Không ghi đè</b>!", "warning", "Ghi đè", "Không ghi đè", isOverride => {
            if (isOverride !== null) {
                if (isOverride)
                    T.confirm("Ghi đè dữ liệu", "Bạn có chắc chắn muốn ghi đè dữ liệu?", "warning", true, isConfirm => {
                        if (isConfirm) doSave('TRUE');
                    })
                else doSave('FALSE');
            }
        })
    };

    changeActive = (item, key) => this.update({ma: item.ma}, {[key]: !item[key]}, () => T.notify("Cập nhật tăng bảo hiểm xã hội thành công!", "success"));

    render() {
        const { data } = this.state, readOnly = false;
        let table = null;
        if (data && data.length > 0) {
            table = (
                <table className="table table-hover table-bordered table-responsive" style={{ maxHeight: "600px", overflow: "auto" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "auto" }}>#</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Mã</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Mô tả</th>
                            <th style={{ width: "auto", whiteSpace: "nowrap" }}>Kích Hoạt</th>
                            <th style={{ width: "auto", textAlign: "center", whiteSpace: "nowrap" }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: "right" }}>{index + 1}</td>
                                <td><a href="#" onClick={e => this.edit(e, item)}>{item["ma"]}</a></td>
                                <td>{item["moTa"]}</td>
                                <td className="toggle" style={{ textAlign: "center" }}>
                                    <label>
                                        <input type="checkbox" checked={item.kichHoat ? true : false} onChange={() => !readOnly && this.changeActive(item, "kichHoat")} />
                                        <span className="button-indecator" />
                                    </label>
                                </td>
                                <td>
                                    <div className="btn-group">
                                        <a className="btn btn-primary" href="#" onClick={e => this.edit(e, item)}>
                                            <i className="fa fa-lg fa-edit" />
                                        </a>
                                        <a className="btn btn-danger" href="#" onClick={e => this.delete(e, index)}>
                                            <i className="fa fa-lg fa-trash" />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            table = <p>Không có dữ liệu!</p>;
        }

        return (
            <main className="app-content">
                <div className="app-title">
                    <div>
                        <h1><i className="fa fa-user" /> Tải lên file cập nhật tăng bảo hiểm xã hội</h1>
                        <p />
                    </div>
                    <ul className="app-breadcrumb breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/user"><i className="fa fa-home fa-lg" /></Link>
                        </li>
                        <li className="breadcrumb-item">Tải lên file cập nhật tăng bảo hiểm xã hội</li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="tile">
                            <div className="tile-body">
                                <FileBox ref={this.fileBox} postUrl="/user/upload" uploadType="DMTangBaoHiemXaHoiFile" userData="dmTangBaoHiemXaHoiImportData" style={{ width: "100%", backgroundColor: "#fdfdfd" }} success={this.onSuccess} error={this.onError} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                {this.state.message}
                            </div>
                            <div className="tile-footer text-right">
                                <a href="/download/SampleUploadDMTangBaoHiemXaHoi.xlsx" className="btn btn-info">Tải xuống file mẫu</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {data && data.length ? (
                        <div className="tile col-12">
                            {table}
                        </div>
                    ) : null}
                </div>
                <Link to="/user/danh-muc/tang-bao-hiem-xa-hoi" className="btn btn-secondary btn-circle" style={{ position: "fixed", bottom: "10px" }}>
                    <i className="fa fa-lg fa-reply" />
                </Link>
                <button type="button" className="btn btn-primary btn-circle" disabled={!this.state.data.some(x=>x) || this.state.saving} style={{ position: "fixed", right: "10px", bottom: "10px" }} onClick={this.save}>
                    <i className="fa fa-lg fa-save" />
                </button>
                <EditModal ref={this.editModal} update={this.update}/>
            </main>
        );
    }
}

const mapStateToProps = state => ({ });
const mapActionsToProps = { createMultiDMTangBaoHiemXaHoi };
export default connect(mapStateToProps, mapActionsToProps)(DMTangBaoHiemXaHoiImportPage);
