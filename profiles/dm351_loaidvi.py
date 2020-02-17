fullname= 'Danh mục phân loại đơn vị'
name = 'Phân loại đơn vị'
keyword = ['dm', 'loai', 'dvi']
schema = {
    'MA_PL': { 'type': 'text', 'title': 'Mã phân loại'},
    'DIEN_GIAI': { 'type': 'text', 'title': 'Diễn giải'}
};
key = "MA_PL"
searchFields = ['MA_PL'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 351 #random.randint(200, 999)
