fullname= 'Danh mục trình độ LLCT'
name = 'Trình độ LLCT'
keyword = ['dm', 'tdo','llct']
schema = {
    'MA_LLCT': { 'type': 'text', 'title': 'Mã LLCT'},
    'TEN_TDO_LLCT': { 'type': 'text', 'title': 'Trình độ LLCT'}
};
key = "MA_LLCT"
searchFields = ['TEN_TDO_LLCT'] # Note: only search on text field
repoDirectory = "/home/lap11618/Personal/LuanVan/hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 369 #random.randint(200, 999)
