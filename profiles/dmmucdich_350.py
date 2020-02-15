fullname= 'Danh mục mục đích nước ngoài'
name = 'Mục đích nước ngoài'
keyword = ['dm', 'muc', 'dich']
schema = {
    'MA_MD': { 'type': 'text', 'title': 'Mã mục đích'},
    'DIEN_GIAI': { 'type': 'text', 'title': 'Diễn giải'}
};
key = "MA_MD"
searchFields = ['MA_MD'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 350 #random.randint(200, 999)
