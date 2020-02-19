fullname= 'Danh mục ngạch lương'
name = 'Ngạch lương'
keyword = ['dm', 'ngach', 'luong']
schema = {
    'MA_NGACH': {'type': 'text', 'title': 'Mã ngạch'},
    'MASO_CDNN': {'type': 'text', 'title': 'Mã số chức danh nghề nghiệp'},
    'HESO_LUONG': {'type': 'text', 'title': 'Hệ số lương'},
    'BAC_LG': {'type': 'text', 'title': 'Bậc lương'},
};
key = "_id" # If there is no key, type "_id"
searchFields = ['MA_NGACH', 'MASO_CDNN'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]