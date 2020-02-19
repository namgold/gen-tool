fullname= 'Danh mục hình thức hưởng phụ cấp'
name = 'Hình thức hưởng phụ cấp'
keyword = ['dm', 'hthuc', 'huong','phu','cap']
schema = {
    'MA_HUONG_PC': { 'type': 'text', 'title': 'Mã hưởng phụ cấp'},
    'TEN_HTHUC': { 'type': 'text', 'title': 'Tên hình thức hưởng phụ cấp'}
};
key = "MA_HUONG_PC"
searchFields = ['TEN_HTHUC'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]