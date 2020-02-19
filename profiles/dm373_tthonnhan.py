fullname= 'Danh mục tình trạng hôn nhân'
name = 'Tình trạng hôn nhân'
keyword = ['dm', 'tt','hon','nhan']
schema = {
    'MA_TTHN': { 'type': 'text', 'title': 'Mã tình trạng'},
    'TEN_TT_HON_NHAN': { 'type': 'text', 'title': 'Tên tình trạng hôn nhân'}
};
key = "MA_TTHN"
searchFields = ['TEN_TT_HON_NHAN'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]