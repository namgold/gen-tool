fullname= 'Danh mục trình độ tin học'
name = 'Trình độ tin học'
keyword = ['dm', 'tdo','tin','hoc']
schema = {
    'MA_TDTH': { 'type': 'text', 'title': 'Mã trình độ tin học'},
    'TEN_TDO_TIN_HOC': { 'type': 'text', 'title': 'Tên trình độ tin học'}
};
key = "MA_TDTH"
searchFields = ['TEN_TDO_TIN_HOC'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]