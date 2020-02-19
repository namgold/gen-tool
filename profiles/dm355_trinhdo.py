fullname= 'Danh mục trình độ'
name = 'Trình độ'
keyword = ['dm', 'trinh', 'do']
schema = {
    'MA_TDO': { 'type': 'text', 'title': 'Mã trình độ'},
    'TEN_TRINH_DO': { 'type': 'text', 'title': 'Tên trình độ'},
};
key = "MA_TDO"
searchFields = ['TEN_TRINH_DO'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]