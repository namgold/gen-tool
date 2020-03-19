import React from "react";

export default class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ma: null,
            saving: false,
            isUpdate: false
        };
        this.modal = React.createRef();
        this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
    }

    componentDidMount() {
        $(document).ready(() => {
            $(this.modal.current).on("hidden.bs.modal", () => {
                this.setState({ ma: null, isUpdate: false })
            });
        })
    }

    show = (item) => {
        if (item) this.setState({
            ma: item && item.ma ? item.ma : null,
            isUpdate: true
        })
        else {
            item = {};
            this.setState({
                ma: null,
                isUpdate: false
            })
        }
        $('#inputma').val(item.ma ? item.ma : null);
        $('#inputmoTa').val(item.moTa ? item.moTa : null);
        $('#inputkichHoat').prop('checked', item.kichHoat ? true : false);
        $(this.modal.current).modal("show");
        $("input[auto-focus]").focus();
    };

    save = (e) => {
        e.preventDefault();
        const changes = {
            ma: $('#inputma').val().trim(),
            moTa: $('#inputmoTa').val().trim(),
            kichHoat: $('#inputkichHoat')[0].checked ? 1 : 0
        };
        if (!Object.values(changes).reduce((x, y) => x || y) || !changes['ma']) {
            T.notify("Hãy điền đầy đủ thông tin trước khi lưu!", "danger");
            return;
        }
        this.setState({ saving: true });
        if (this.state.isUpdate) {
            this.props.update({ ma: this.state.ma }, changes, (error, item) => {
                if (error) T.notify(error.message ? error.message : `Cập nhật tăng bảo hiểm xã hội ${changes.ma} bị lỗi!`, "danger");
                else {
                    T.notify(`Cập nhật tăng bảo hiểm xã hội ${changes.ma} thành công!`, "success");
                    $(this.modal.current).modal("hide");
                }
                this.setState({ saving: false });
            });
        } else {
            this.props.create(changes, (error, item) => {
                if (error) T.notify(error.message ? error.message : `Tạo mới tăng bảo hiểm xã hội ${changes.ma} bị lỗi!`, "danger");
                else {
                    T.notify(`Tạo mới tăng bảo hiểm xã hội ${changes.ma} thành công!`, "success");
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
                            <h5 className="modal-title">{this.state.isUpdate ? "Cập nhật" : "Tạo mới"} tăng bảo hiểm xã hội</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body row">
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputma">Mã</label>
                                <input className="form-control" id="inputma" placeholder="Mã" type="text" auto-focus="" maxLength={2} readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputmoTa">Mô tả</label>
                                <input className="form-control" id="inputmoTa" placeholder="Mô tả" type="text" maxLength={200} readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6" style={{ display: "inline-flex", width: "100%" }}>
                                <label htmlFor="inputkichHoat">Kích Hoạt</label>&nbsp;&nbsp;
                                <div className="toggle">
                                    <label>
                                        <input type="checkbox" id="inputkichHoat" disabled={readOnly} />
                                        <span className="button-indecator" />
                                    </label>
                                </div>
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