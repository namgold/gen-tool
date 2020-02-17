fullname= 'Danh mục đánh giá, phân loại viên chức'
name = 'Đánh giá phân loại viên chức'
keyword = ['dm', 'dgia', 'ploai','vc']
schema = {
    'MA_PLDG': { 'type': 'text', 'title': 'Mã đánh giá phân loại'},
    'TEN_DGIA_PLOAI_VC': { 'type': 'text', 'title': 'Tên đánh giá phân loai'},
    'GHI_CHU': { 'type': 'text', 'title': 'Ghi chú'},
};
key = "MA_PLDG"
searchFields = ['TEN_DGIA_PLOAI_VC','GHI_CHU'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2
menuNum = 358 #random.randint(200, 999)