fullname= 'Danh mục nhóm máu'
name = 'Nhóm máu'
keyword = ['dm', 'nhom','mau']
schema = {
    'MA_NM': { 'type': 'text', 'title': 'Mã nhóm máu'},
    'TEN_NHOM_MAU': { 'type': 'text', 'title': 'Tên nhóm máu'}
};
key = "MA_NM"
searchFields = ['TEN_NHOM_MAU'] # Note: only search on text field
repoDirectory = "/home/lap11618/Personal/LuanVan/hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 372 #random.randint(200, 999)
