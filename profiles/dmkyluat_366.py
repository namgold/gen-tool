fullname= 'Danh mục kỷ luật'
name = 'Kỷ luật'
keyword = ['dm', 'ky','luat']
schema = {
    'MA_KL': { 'type': 'text', 'title': 'Mã kỷ luật'},
    'HTHUC_KY_LUAT': { 'type': 'text', 'title': 'Hình thức kỷ luật'}
};
key = "MA_KL"
searchFields = ['HTHUC_KY_LUAT'] # Note: only search on text field
repoDirectory = "/home/lap11618/Personal/LuanVan/hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 366 #random.randint(200, 999)
