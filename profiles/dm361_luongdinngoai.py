fullname= 'Danh mục lương đi nước ngoài'
name = 'Lương đi nước ngoài'
keyword = ['dm', 'luong', 'di','nngoai']
schema = {
    'MA_LG_NN': { 'type': 'text', 'title': 'Mã lương'},
    'DIEN_GIAI': { 'type': 'text', 'title': 'Diễn giải'},
    'GHI_CHU': { 'type': 'text', 'title': 'Ghi chú'},
};
key = "MA_LG_NN"
searchFields = ['DIEN_GIAI','GHI_CHU'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]