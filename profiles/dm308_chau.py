fullname= 'Danh mục châu'
name = 'Châu'
keyword = ['dm', 'chau']
schema = {
    'MA_CHAU': { 'type': 'text', 'title': 'Mã châu'},
    'TEN_CHAU': { 'type': 'text', 'title': 'Tên châu'},
    'TERRITORY': { 'type': 'date', 'title': 'Tên tiếng anh'},
};
key = "SO_KYHIEU_QD_KNHIEM" # If there is no key, type "_id"
searchFields = ['SHCC', 'MS_KNHIEM', 'SO_KYHIEU_QD_KNHIEM', 'BO_MON_KNHIEM'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]