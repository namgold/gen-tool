fullname= 'Danh mục hỗ trợ học phí'
name = 'Hỗ trợ học phí'
keyword = ['dm', 'htro','hoc','phi']
schema = {
    'MA_HTRO': { 'type': 'text', 'title': 'Mã hỗ trợ'},
    'TYLE_HO_TRO_HPHI': { 'type': 'text', 'title': 'Tỷ lệ hỗ trợ học phí'},
    'GHI_CHU': { 'type': 'text', 'title': 'Ghi chú'}
};
key = "MA_HTRO"
searchFields = ['TYLE_HO_TRO_HPHI','GHI_CHU'] # Note: only search on text field
repoDirectory = "/home/lap11618/Personal/LuanVan/hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 375 #random.randint(200, 999)