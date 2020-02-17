fullname= 'Danh mục quan hệ gia đình'
name = 'Quan hệ gia đình'
keyword = ['dm', 'qhe','gia','dinh']
schema = {
    'MA_QHGD': { 'type': 'text', 'title': 'Mã QHGD'},
    'TEN_QUAN_HE_GD': { 'type': 'text', 'title': 'Tên QHGD'}
};
key = "MA_QHGD"
searchFields = ['TEN_QUAN_HE_GD'] # Note: only search on text field
repoDirectory = "/home/lap11618/Personal/LuanVan/hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 377 #random.randint(200, 999)
