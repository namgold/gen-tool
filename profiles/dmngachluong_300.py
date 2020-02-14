fullname= 'Danh mục ngạch lương'
name = 'Ngạch lương'
keyword = ['dm', 'ngach', 'luong']
schema = {
    'STT': {'type': 'number', 'title': 'Số thứ tự'},
    'MA_NGACH': {'type': 'text', 'title': 'Mã ngạch'},
    'MASO_CDNN': {'type': 'text', 'title': 'Mã số chức danh nghề nghiệp'},
    'TEN_NGACH/CDNN': {'type': 'text', 'title': 'Tên ngạch / chức danh nghề nghiệp'},
    'HESO_LUONG': {'type': 'text', 'title': 'Hệ số lương'},
    'BAC_LG': {'type': 'text', 'title': 'Bậc lương'},
    'NHOM_NGACH': {'type': 'text', 'title': 'Nhóm ngạch'},
};
key = "STT"
searchFields = ['MA_NGACH', 'MASO_CDNN'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = True
ExcelStartRow = 2
menuNum = 300 #random.randint(200, 999)