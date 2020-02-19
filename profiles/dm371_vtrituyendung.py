fullname= 'Danh mục vị trí tuyển dụng'
name = 'Vị trí tuyển dụng'
keyword = ['dm', 'vtri','tuyen','dung']
schema = {
    'MA_VTTD': { 'type': 'text', 'title': 'Mã vị trí'},
    'TEN_VTRI_TUYEN_DUNG': { 'type': 'text', 'title': 'Tên vị trí tuyển dụng'}
};
key = "MA_VTTD"
searchFields = ['TEN_VTRI_TUYEN_DUNG'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]