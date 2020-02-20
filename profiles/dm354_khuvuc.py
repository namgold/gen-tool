fullname= 'Danh mục khu vực'
name = 'Khu vực'
keyword = ['dm', 'khu', 'vuc']
schema = {
    'MS_KVUC': { 'type': 'text', 'title': 'Mã khu vực'},
    'TEN_KHU_VUC': { 'type': 'text', 'title': 'Tên khu vực'},
    'TERRITORY': { 'type': 'text', 'title': 'Tên tiếng anh'},
    'MS_CHAU': { 'type': 'text', 'title': 'Mã châu'},
};
key = "MS_KVUC"
searchFields = ['TEN_KHU_VUC','TERRITORY'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]