fullname= 'Danh mục danh hiệu khen thưởng'
name = 'Danh hiệu khen thưởng'
keyword = ['dm', 'dhieu','kthuong']
schema = {
    'MA_KT': { 'type': 'text', 'title': 'Mã khen thưởng'},
    'DANH_HIEU_KHEN_THUONG': { 'type': 'text', 'title': 'Danh hiệu khen thưởng'}
};
key = "MA_KT"
searchFields = ['DANH_HIEU_KHEN_THUONG'] # Note: only search on text field
repoDirectory = "/home/lap11618/Personal/LuanVan/hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 367 #random.randint(200, 999)
