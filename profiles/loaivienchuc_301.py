fullname= 'Danh mục loại viên chức'
name = 'Loại viên chức'
keyword = ['dm', 'loai', 'vien', 'chuc']
schema = {
    'MA_LOAIVC': { 'type': 'text', 'title': 'Mã loại viên chức'},
    'DIEN_GIAI': { 'type': 'text', 'title': 'Diễn giải'}
};
key = "MA_LOAIVC"
searchFields = ['MA_LOAIVC'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = True
ExcelStartRow = 2
menuNum = __name__[-3:]