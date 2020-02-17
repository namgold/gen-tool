fullname= 'Danh mục đối tượng'
name = 'Đối tượng'
keyword = ['dm', 'doi','tuong']
schema = {
    'MA_DTUONG': { 'type': 'text', 'title': 'Mã đối tượng'},
    'TEN_DOI_TUONG': { 'type': 'text', 'title': 'Tên đối tượng'},
    'GHI_CHU': { 'type': 'text', 'title': 'Ghi chú'}
};
key = "MA_DTUONG"
searchFields = ['TEN_DOI_TUONG','GHI_CHU'] # Note: only search on text field
repoDirectory = "/home/lap11618/Personal/LuanVan/hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 374 #random.randint(200, 999)
