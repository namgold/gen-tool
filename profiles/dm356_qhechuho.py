fullname= 'Danh mục quan hệ với chủ hộ'
name = 'Quan hệ với chủ hộ'
keyword = ['dm', 'qhe', 'chuho']
schema = {
    'MA_QUANHE': { 'type': 'text', 'title': 'Mã quan hệ'},
    'TEN_QUANHE': { 'type': 'text', 'title': 'Tên quan hệ'},
};
key = "MA_QUANHE"
searchFields = ['TEN_QUANHE'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]