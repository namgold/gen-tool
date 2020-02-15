fullname= 'Danh mục tỉnh thành phố'
name = 'Tỉnh thành phố'
keyword = ['dm', 'tinh', 'thanh', 'pho']
schema = {
    'MA_TINH': { 'type': 'text', 'title': 'Mã tỉnh / thành phố'},
    'TEN_ TINH/TP': { 'type': 'text', 'title': 'Tên tỉnh / thành phố'},
};
key = "MA_TINH" # If there is no key, type "_id"
searchFields = ['TEN_ TINH/TP', 'MA_TINH'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = True
ExcelStartRow = 2
menuNum = __name__[-3:]
