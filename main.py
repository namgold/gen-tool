from generate import *

fullname= 'Danh mục loại viên chức'
name = 'Loại viên chức'
keyword = ['dm', 'loai', 'vien', 'chuc']
schema = {
    'MA_LOAIVC': 'text',
    'DIEN_GIAI': 'text',
};
key = "MA_LOAIVC"
searchFields = ['MA_LOAIVC'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = True
ExcelStartRow = 2
menuNum = 301 #random.randint(200, 999)

generate(name, menuNum, fullname, keyword, schema, key, searchFields, ExcelStartRow, repoDirectory, copyOutputFilesToRepo)
print("Done!", end="")