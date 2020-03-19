import React from "react";

export default class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shcc: null,
            saving: false,
            isUpdate: false
        };
        this.modal = React.createRef();
        this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            $(this.modal.current).on("hidden.bs.modal", () => {
                this.setState({ shcc: null, isUpdate: false })
            });
        })
    }

    show = (item) => {
        if (item) this.setState({
            shcc: item && item.shcc ? item.shcc : null,
            isUpdate: true
        })
        else {
            item = {};
            this.setState({
                shcc: null,
                isUpdate: false
            })
        }
        $('#inputshcc').val(item.shcc ? item.shcc : null);
        $('#inputstt').val(item.stt ? item.stt : null);
        $('#inputmaKhenThuong').val(item.maKhenThuong ? item.maKhenThuong : null);
        $('#inputnamKhenThuong').val(item.namKhenThuong ? item.namKhenThuong : null);
        $('#inputdanhHieuKhenThuong').val(item.danhHieuKhenThuong ? item.danhHieuKhenThuong : null);
        $('#inputquyetDinhKhenThuong').val(item.quyetDinhKhenThuong ? item.quyetDinhKhenThuong : null);
        $('#inputngayKhenThuong').val(item.ngayKhenThuong ? T.dateToText(item.ngayKhenThuong, 'yyyy-mm-dd') : '');
        $('#inputcapKhenThuong').val(item.capKhenThuong ? item.capKhenThuong : null);
        $('#inputngayNhapHoSo').val(item.ngayNhapHoSo ? T.dateToText(item.ngayNhapHoSo, 'yyyy-mm-dd') : '');
        $(this.modal.current).modal("show");
        $("input[auto-focus]").focus();
    };

    save = (e) => {
        e.preventDefault();
        const changes = {
            shcc: $('#inputshcc').val().trim(),
            stt: $('#inputstt').val().trim(),
            maKhenThuong: $('#inputmaKhenThuong').val().trim(),
            namKhenThuong: $('#inputnamKhenThuong').val().trim(),
            danhHieuKhenThuong: $('#inputdanhHieuKhenThuong').val().trim(),
            quyetDinhKhenThuong: $('#inputquyetDinhKhenThuong').val().trim(),
            ngayKhenThuong: $('#inputngayKhenThuong').val().trim(),
            capKhenThuong: $('#inputcapKhenThuong').val().trim(),
            ngayNhapHoSo: $('#inputngayNhapHoSo').val().trim()
        };
        if (!Object.values(changes).reduce((x, y) => x || y) || !changes['shcc']) {
            T.notify("Hãy điền đầy đủ thông tin trước khi lưu!", "danger");
            return;
        }
        this.setState({ saving: true });
        if (this.state.isUpdate) {
            this.props.update({ shcc: this.state.shcc }, changes, (error, item) => {
                if (error) T.notify(error.message ? error.message : `Cập nhật khen thưởng ${changes.shcc} bị lỗi!`, "danger");
                else {
                    T.notify(`Cập nhật khen thưởng ${changes.shcc} thành công!`, "success");
                    $(this.modal.current).modal("hide");
                }
                this.setState({ saving: false });
            });
        } else {
            this.props.create(changes, (error, item) => {
                if (error) T.notify(error.message ? error.message : `Tạo mới khen thưởng ${changes.shcc} bị lỗi!`, "danger");
                else {
                    T.notify(`Tạo mới khen thưởng ${changes.shcc} thành công!`, "success");
                    $(this.modal.current).modal("hide");
                }
                this.setState({ saving: false });
            });
        }
    };

    handleNumberInputChange = event => {
        let { value, max, id } = event.target;
        value = Number.parseInt(value)
        value = value ? (max ? Math.min(max, value) : value) : '';
        this.setState({ [id]: value });
    };

    render() {
        const readOnly = this.props.readOnly ? true : false;
        return (
            <div className="modal" tabIndex="-1" role="dialog" ref={this.modal}>
                <form className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.state.isUpdate ? "Cập nhật" : "Tạo mới"} khen thưởng</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body row">
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputshcc">Số hiệu công chức</label>
                                <input className="form-control" id="inputshcc" placeholder="Số hiệu công chức" type="text" auto-focus="" maxLength={10} readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputstt">Số thứ tự</label>
                                <input className="form-control" id="inputstt" placeholder="Số thứ tự" type="text" maxLength={3} readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputmaKhenThuong">Mã khen thưởng</label>
                                <input className="form-control" id="inputmaKhenThuong" placeholder="Mã khen thưởng" type="text" maxLength={10} readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputnamKhenThuong">Năm khen thưởng</label>
                                <input className="form-control" id="inputnamKhenThuong" placeholder="Năm khen thưởng" type="text" maxLength={20} readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputdanhHieuKhenThuong">Danh hiệu khen thưởng</label>
                                <input className="form-control" id="inputdanhHieuKhenThuong" placeholder="Danh hiệu khen thưởng" type="text" maxLength={100} readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputquyetDinhKhenThuong">Số ký hiệu quyết định khen thưởng</label>
                                <input className="form-control" id="inputquyetDinhKhenThuong" placeholder="Số ký hiệu quyết định khen thưởng" type="text" maxLength={100} readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputngayKhenThuong">Ngày quyết định khen thưởng</label>
                                <input className="form-control" id="inputngayKhenThuong" placeholder="Ngày quyết định khen thưởng" type="date" readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputcapKhenThuong">Cấp khen thưởng</label>
                                <input className="form-control" id="inputcapKhenThuong" placeholder="Cấp khen thưởng" type="text" maxLength={20} readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputngayNhapHoSo">Ngày nhập hồ sơ</label>
                                <input className="form-control" id="inputngayNhapHoSo" placeholder="Ngày nhập hồ sơ" type="date" readOnly={readOnly}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            {!readOnly && <button type="submit" className="btn btn-primary" onClick={this.save} disabled={this.state.saving}>Lưu</button>}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}