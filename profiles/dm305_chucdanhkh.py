fullname= 'Danh mục chức danh khoa học'
name = 'Chức danh khoa học'
keyword = ['dm', 'chuc', 'danh', 'khoa', 'hoc']
schema = {
    'MA_CD': { 'type': 'text', 'title': 'Mã chức danh khoa học'},
    'TEN_CHUC_DANH': { 'type': 'text', 'title': 'Tên chức danh khoa học'},
};
key = "MA_CD" # If there is no key, type "_id"
searchFields = ['MA_CD', 'TEN_CHUC_DANH'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]