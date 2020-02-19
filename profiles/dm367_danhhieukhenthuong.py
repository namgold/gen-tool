fullname= 'Danh mục danh hiệu khen thưởng'
name = 'Danh hiệu khen thưởng'
keyword = ['dm', 'dhieu','kthuong']
schema = {
    'MA_KT': { 'type': 'text', 'title': 'Mã khen thưởng'},
    'DANH_HIEU_KHEN_THUONG': { 'type': 'text', 'title': 'Danh hiệu khen thưởng'}
};
key = "MA_KT"
searchFields = ['DANH_HIEU_KHEN_THUONG'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]