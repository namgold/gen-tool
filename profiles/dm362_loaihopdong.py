fullname= 'Danh mục loại hợp đồng'
name = 'Loại hợp đồng'
keyword = ['dm', 'loai', 'hop','dong']
schema = {
    'MA_LOAI_HD': { 'type': 'text', 'title': 'Mã loại hợp đồng'},
    'TEN_LOAI_HOP_DONG': { 'type': 'text', 'title': 'Tên loại hợp đồng'},
};
key = "MA_LOAI_HD"
searchFields = ['TEN_LOAI_HOP_DONG'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]