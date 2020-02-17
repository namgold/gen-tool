fullname= 'Danh mục chức vụ kiêm nhiệm'
name = 'Chức vụ kiêm nhiệm'
keyword = ['dm', 'chuc', 'vu', 'kiem', 'nhiem']
schema = {
    'SHCC': { 'type': 'text', 'title': 'Số hiệu công chức'},
    'MS_KNHIEM': { 'type': 'text', 'title': 'Mã số kiêm nhiệm'},
    'NGAY_BO_NHIEM': { 'type': 'date', 'title': 'Ngày bổ nhiệm'},
    'SO_KYHIEU_QD_KNHIEM': { 'type': 'text', 'title': 'Số ký hiệu quyết định kiêm nhiệm'},
    'NGAY_QD_KNHIEM': { 'type': 'date', 'title': 'Ngày quyết định kiêm nhiệm'},
    'DON_VI_KNHIEM': { 'type': 'text', 'title': 'Đơn vị kiêm nhiệm'},
    'BO_MON_KNHIEM': { 'type': 'text', 'title': 'Bộ môn kiêm nhiệm'},
    'SO_NGAYQD_THOI_KNHIEM': { 'type': 'text', 'title': 'Số ngày quyết định thôi kiêm nhiệm'},
    'XOA_KNHIEM': { 'type': 'boolean', 'title': 'Xoá kiêm nhiệm'},
    'NGAY_NHAP_HS': { 'type': 'text', 'title': 'Ngày nhập hồ sơ'},
};
key = "SO_KYHIEU_QD_KNHIEM" # If there is no key, type "_id"
searchFields = ['SHCC', 'MS_KNHIEM', 'SO_KYHIEU_QD_KNHIEM', 'BO_MON_KNHIEM'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = True
ExcelStartRow = 2
menuNum = __name__[11:14]
