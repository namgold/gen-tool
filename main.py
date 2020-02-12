from generate import *

fullname= 'Danh mục ngạch lương'
name = 'Ngạch lương'
keyword = ['dm', 'ngach', 'luong']
schema = {
    'MA_NGACH': 'text',
    'MASO_CDNN': 'text',
    'TEN_NGACH/CDNN': 'text',
    'HESO_LUONG': 'text',
    'BAC_LG': 'text',
    'NHOM_NGACH': 'text',
};
key="MA_NGACH"
repo = "C:\\Thesis\\hcmut"
copyFilesToRepo = True
generate(name, fullname, keyword, schema, key, repo, copyFilesToRepo)
print("Generated!")