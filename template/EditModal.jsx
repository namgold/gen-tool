import React from "react";

export default class EditModal extends React.Component {{
    constructor(props) {{
        super(props);
        this.state = {{
            _id: null,
            isUpdate: false{modalInitState}
        }};
        this.modal = React.createRef();
        this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
    }}

    componentDidMount() {{
        $(document).ready(() => {{
            $(this.modal.current).on("hidden.bs.modal", () => {{
                this.setState({{ _id: null, isUpdate: false }})
            }});
        }})
    }}

    show = (item) => {{
        if (item) this.setState({{
            _id: item && item._id ? item._id : null,
            ImportIndex: item && typeof item.ImportIndex == 'number' ? item.ImportIndex : null,
            isUpdate: true
        }})
        else {{
            item = {{}};
            this.setState({{
                _id: null,
                ImportIndex: null,
                isUpdate: false
            }})
        }}
{modalShow}        $(this.modal.current).modal("show");
        $("input[auto-focus]").focus();
    }};

    save = (e) => {{
        e.preventDefault();
        const changes = {{}};
{modalSavePage}        if (!Object.values(changes).reduce((x, y) => x || y){modalSaveCondition}) {{
            T.notify("Hãy điền thông tin trước khi lưu!", "danger");
            return;
        }}
        if (this.state.isUpdate) {{
            if (typeof this.state.ImportIndex == 'number') changes.ImportIndex = this.state.ImportIndex;
            else if (this.state._id) changes._id = this.state._id;
            this.props.update(changes, () => {{
                T.notify("Cập nhật {lowername} thành công!", "success");
                $(this.modal.current).modal("hide");
            }});
        }} else {{
            this.props.create(changes, () => {{
                T.notify("Tạo mới {lowername} thành công!", "success");
                $(this.modal.current).modal("hide");
            }});
        }}
    }};

    handleNumberInputChange = event => {{
        let {{ value, max, id }} = event.target;
        value = Number.parseInt(value)
        value = value ? (max ? Math.min(max, value) : value) : '';
        this.setState({{ [id]: value }});
    }};

    render() {{
        return (
            <div className="modal" tabIndex="-1" role="dialog" ref={{this.modal}}>
                <form className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{{this.state.isUpdate ? "Cập nhật" : "Tạo mới"}} {lowername}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body row">
{modalBody}                        </div>
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