fullname= 'Danh mục hình thức kỷ luật kèm theo'
name = 'Hình thức kỷ luật kèm theo'
keyword = ['dm', 'htuc', 'kluat','kem','theo']
schema = {
    'MA_KL': { 'type': 'text', 'title': 'Mã kỷ luật'},
    'DIEN_GIAI': { 'type': 'text', 'title': 'Tên kỷ luật'},
    'GHI_CHU': { 'type': 'text', 'title': 'Ghi chú'},
};
key = "MA_KL"
searchFields = ['DIEN_GIAI','GHI_CHU'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 359 #random.randint(200, 999)