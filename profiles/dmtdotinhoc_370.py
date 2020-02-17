fullname= 'Danh mục trình độ tin học'
name = 'Trình độ tin học'
keyword = ['dm', 'tdo','tin','hoc']
schema = {
    'MA_TDTH': { 'type': 'text', 'title': 'Mã trình độ tin học'},
    'TEN_TDO_TIN_HOC': { 'type': 'text', 'title': 'Tên trình độ tin học'}
};
key = "MA_TDTH"
searchFields = ['TEN_TDO_TIN_HOC'] # Note: only search on text field
repoDirectory = "/home/lap11618/Personal/LuanVan/hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 370 #random.randint(200, 999)
