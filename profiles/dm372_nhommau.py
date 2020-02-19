fullname= 'Danh mục nhóm máu'
name = 'Nhóm máu'
keyword = ['dm', 'nhom','mau']
schema = {
    'MA_NM': { 'type': 'text', 'title': 'Mã nhóm máu'},
    'TEN_NHOM_MAU': { 'type': 'text', 'title': 'Tên nhóm máu'}
};
key = "MA_NM"
searchFields = ['TEN_NHOM_MAU'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]