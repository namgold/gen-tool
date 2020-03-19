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
        $('#inputten').val(item.ten ? item.ten : null);
        $('#inputterritory').val(item.territory ? item.territory : null);
        $('#inputmaChau').val(item.maChau ? item.maChau : null);
        $('#inputkichHoat').prop('checked', item.kichHoat ? true : false);
        $(this.modal.current).modal("show");
        $("input[auto-focus]").focus();
    };

    save = (e) => {
        e.preventDefault();
        const changes = {
            ma: $('#inputma').val().trim(),
            ten: $('#inputten').val().trim(),
            territory: $('#inputterritory').val().trim(),
            maChau: $('#inputmaChau').val().trim(),
            kichHoat: $('#inputkichHoat')[0].checked ? 1 : 0
        };
        if (!Object.values(changes).reduce((x, y) => x || y) || !changes['ma']) {
            T.notify("Hãy điền đầy đủ thông tin trước khi lưu!", "danger");
            return;
        }
        this.setState({ saving: true });
        if (this.state.isUpdate) {
            this.props.update({ ma: this.state.ma }, changes, (error, item) => {
                if (error) T.notify(error.message ? error.message : `Cập nhật khu vực ${changes.ten} bị lỗi!`, "danger");
                else {
                    T.notify(`Cập nhật khu vực ${changes.ten} thành công!`, "success");
                    $(this.modal.current).modal("hide");
                }
                this.setState({ saving: false });
            });
        } else {
            this.props.create(changes, (error, item) => {
                if (error) T.notify(error.message ? error.message : `Tạo mới khu vực ${changes.ten} bị lỗi!`, "danger");
                else {
                    T.notify(`Tạo mới khu vực ${changes.ten} thành công!`, "success");
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
                            <h5 className="modal-title">{this.state.isUpdate ? "Cập nhật" : "Tạo mới"} khu vực</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body row">
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputma">Mã khu vực</label>
                                <input className="form-control" id="inputma" placeholder="Mã khu vực" type="text" auto-focus="" maxLength={3} readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputten">Tên khu vực</label>
                                <input className="form-control" id="inputten" placeholder="Tên khu vực" type="text" readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputterritory">Tên tiếng anh</label>
                                <input className="form-control" id="inputterritory" placeholder="Tên tiếng anh" type="text" readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="inputmaChau">Mã châu</label>
                                <input className="form-control" id="inputmaChau" placeholder="Mã châu" type="text" maxLength={2} readOnly={readOnly}/>
                            </div>
                            <div className="form-group col-12 col-md-6" style={{ display: "inline-flex", width: "100%" }}>
                                <label htmlFor="inputkichHoat">Kích hoạt</label>&nbsp;&nbsp;
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