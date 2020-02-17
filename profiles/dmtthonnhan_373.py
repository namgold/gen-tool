fullname= 'Danh mục tình trạng hôn nhân'
name = 'Tình trạng hôn nhân'
keyword = ['dm', 'tt','hon','nhan']
schema = {
    'MA_TTHN': { 'type': 'text', 'title': 'Mã tình trạng'},
    'TEN_TT_HON_NHAN': { 'type': 'text', 'title': 'Tên tình trạng hôn nhân'}
};
key = "MA_TTHN"
searchFields = ['TEN_TT_HON_NHAN'] # Note: only search on text field
repoDirectory = "/home/lap11618/Personal/LuanVan/hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 373 #random.randint(200, 999)
