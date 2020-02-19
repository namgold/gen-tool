fullname= 'Danh mục quốc gia'
name = 'Quốc gia'
keyword = ['dm', 'quoc', 'gia']
schema = {
    'MA_CODE': { 'type': 'text', 'title': 'Mã code'},
    'TEN_QUOC_GIA': { 'type': 'text', 'title': 'Tên quốc gia'},
    'COUNTRY': { 'type': 'text', 'title': 'Tên tiếng anh'},
    'CODEALPHA': { 'type': 'text', 'title': 'Mã code tiếng anh'},
    'SHORTEN NAME': { 'type': 'text', 'title': 'Tên tiếng anh ngắn'},
    'MA_KVUC': { 'type': 'text', 'title': 'Mã khu vực'},
};
key = "MA_CODE" # If there is no key, type "_id"
searchFields = ['MA_CODE', 'TEN_QUOC_GIA', 'COUNTRY', 'CODEALPHA', 'SHORTEN'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]