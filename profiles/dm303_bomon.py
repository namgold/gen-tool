fullname= 'Danh mục bộ môn'
name = 'Bộ môn'
keyword = ['dm', 'bo', 'mon']
schema = {
    'MS_BM': { 'type': 'text', 'title': 'Mã số bộ môn'},
    'TEN_BM': { 'type': 'text', 'title': 'Tên bộ môn'},
    'TEN_TIENG_ANH': { 'type': 'text', 'title': 'Tên tiếng anh'},
    'SO_QD_TLAP': { 'type': 'text', 'title': 'Số quyết định thành lập'},
    'NGAY_QD_TLAP': { 'type': 'text', 'title': 'Ngày quyết định thành lập'},
    'MS_DVI': { 'type': 'text', 'title': 'Mã số đơn vị'},
    'XOA_TEN': { 'type': 'text', 'title': 'Xoá tên'},
    'SO_NGAYQD_XOA_TEN': { 'type': 'text', 'title': 'Số ngày quyết định xoá tên'},
    'GHI_CHU': { 'type': 'text', 'title': 'Ghi chú'},
};
key = "MS_BM" # If there is no key, type "_id"
searchFields = ['MS_BM', 'TEN_BM', 'TEN_TIENG_ANH'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]