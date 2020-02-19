fullname= 'Danh mục bênh viện KCB'
name = 'Bệnh viện KCB'
keyword = ['dm', 'benh','vien','kcb']
schema = {
    'MA_KCB': { 'type': 'text', 'title': 'Mã KCB'},
    'TEN_CO_SO_KCB': { 'type': 'text', 'title': 'Tên cơ sở KCB'},
    'DIA_CHI': { 'type': 'text', 'title': 'Địa chỉ'}
};
key = "MA_KCB"
searchFields = ['TEN_CO_SO_KCB','DIA_CHI'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]