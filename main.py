from generate import *

name = ['ngach', 'luong']

schema = {
    'SHCC': 'text',
    'NAM': 'number',
    'NV1_GIO_CHUAN_D_MUC': 'number',
    'NV2_GIO_LAM_VIEC_D_MUC': 'number',
    'NV3_GIO_LAM_VIEC_D_MUC': 'number',
    'GHI_CHU': 'text',
};

generate(name, schema)
print("Done")