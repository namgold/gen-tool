fullname= 'Danh mục trình độ QLNN'
name = 'Trình độ QLNN'
keyword = ['dm', 'tdo','qlnn']
schema = {
    'MA_QLNN': { 'type': 'text', 'title': 'Mã QLNN'},
    'TEN_TDO_QLNN': { 'type': 'text', 'title': 'Trình độ QLNN'}
};
key = "MA_QLNN"
searchFields = ['TEN_TDO_QLNN'] # Note: only search on text field
repoDirectory = "/home/lap11618/Personal/LuanVan/hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 368 #random.randint(200, 999)
