fullname= 'Danh mục giới tính'
name = 'Giới tính'
keyword = ['dm', 'gioi', 'tinh']
schema = {
    'MA_GTINH': { 'type': 'text', 'title': 'Mã giới tính'},
    'GIOI_TINH': { 'type': 'text', 'title': 'Tên giới tính'}
};
key = "MA_GTINH"
searchFields = ['GIOI_TINH'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]