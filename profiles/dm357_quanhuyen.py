fullname= 'Danh mục quận huyện'
name = 'Quận - Huyện'
keyword = ['dm', 'quan', 'huyen']
schema = {
    'MA_QUAN_HUYEN': { 'type': 'text', 'title': 'Mã quận huyện'},
    'MA_TINH_TP': { 'type': 'text', 'title': 'Mã tỉnh-thành phố'},
    'TEN_QUAN_HUYEN': { 'type': 'text', 'title': 'Tên quận huyện'},
    'TEN_TINH_TP': { 'type': 'text', 'title': 'Tên tỉnh-thành phố'},
};
key = "MA_QUAN_HUYEN"
searchFields = ['TEN_QUAN_HUYEN','TEN_TINH_TP'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 357 #random.randint(200, 999)