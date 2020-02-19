fullname= 'Danh mục ngạch'
name = 'Ngạch'
keyword = ['dm', 'ngach']
schema = {
    'MA_NGACH': { 'type': 'text', 'title': 'Mã ngạch'},
    'MASO_CDNN': { 'type': 'text', 'title': 'Mã số chức danh nghề nghiệp'},
    'TEN_NGACH/CDNN': { 'type': 'text', 'title': 'Tên ngạch / chức danh nghề nghiệp'},
    'NHOM_NGACH': { 'type': 'text', 'title': 'Nhóm ngạch'}
};
key = "_id" # If there is no key, type "_id"
searchFields = ['MA_NGACH', 'MASO_CDNN', 'TEN_NGACH/CDNN'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]