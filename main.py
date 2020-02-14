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
key="STT"
searchFields = ['MA_NGACH', 'MASO_CDNN'] # Note: do not search on number field
repo = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = True
ExcelStartRow = 2

generate(name, fullname, keyword, schema, key, searchFields, ExcelStartRow, repo, copyOutputFilesToRepo)
print("Done!", end="")