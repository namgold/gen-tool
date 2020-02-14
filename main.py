from generate import *

fullname= 'Danh mục ngạch lương'
name = 'Ngạch lương'
keyword = ['dm', 'ngach', 'luong']
schema = {
    'STT': 'number',
    'MA_NGACH': 'text',
    'MASO_CDNN': 'text',
    'TEN_NGACH/CDNN': 'text',
    'HESO_LUONG': 'text',
    'BAC_LG': 'text',
    'NHOM_NGACH': 'text',
};
key = "STT"
searchFields = ['MA_NGACH', 'MASO_CDNN'] # Note: only search on text field
repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = False
ExcelStartRow = 2

generate(name, fullname, keyword, schema, key, searchFields, ExcelStartRow, repoDirectory, copyOutputFilesToRepo)
print("Done!", end="")