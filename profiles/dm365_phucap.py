fullname= 'Danh mục phụ cấp'
name = 'Phụ cấp'
keyword = ['dm', 'phu','cap']
schema = {
    'MA_PC': { 'type': 'text', 'title': 'Mã phụ cấp'},
    'TEN_PHU_CAP': { 'type': 'text', 'title': 'Tên phụ cấp'}
};
key = "MA_PC"
searchFields = ['TEN_PHU_CAP'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]