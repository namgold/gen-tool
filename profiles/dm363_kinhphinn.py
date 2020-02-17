fullname= 'Danh mục kinh phí nước ngoài'
name = 'Kinh phí nước ngoài'
keyword = ['dm', 'kinh', 'phi','nn']
schema = {
    'MA_KPNN': { 'type': 'text', 'title': 'Mã kinh phí nước ngoài'},
    'NOI_DUNG_KINH_PHI': { 'type': 'text', 'title': 'Nội dung kinh phí'},
    'GHI_CHU': { 'type': 'text', 'title': 'Ghi chú'},
};
key = "MA_KPNN"
searchFields = ['NOI_DUNG_KINH_PHI','GHI_CHU'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 363 #random.randint(200, 999)