fullname= 'Danh mục diện chính sách'
name = 'Diện chính sách'
keyword = ['dm', 'dien', 'chinh', 'sach']
schema = {
    'MA_CS': { 'type': 'text', 'title': 'Mã chính sách'},
    'TEN_CHINH_SACH': { 'type': 'text', 'title': 'Tên chính sách'}
};
key = "MA_CS" # If there is no key, type "_id"
searchFields = ['MA_CS', 'TEN_CHINH_SACH'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]