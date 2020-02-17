fullname= 'Danh mục ngoại ngữ'
name = 'Ngoại ngữ'
keyword = ['dm', 'ngoai', 'ngu']
schema = {
    'MA_NNGU': { 'type': 'number', 'title': 'Mã ngoại ngữ'},
    'TEN_NGOAI_NGU': { 'type': 'text', 'title': 'Tên ngoại ngữ'}
};
key = "MA_NNGU"
searchFields = ['TEN_NGOAI_NGU'] # Note: only search on text field
repoDirectory = "/home/lap11618/Personal/LuanVan/hcmut"
copyOutputFilesToRepo = True
ExcelStartRow = 2
menuNum = 352 #random.randint(200, 999)
