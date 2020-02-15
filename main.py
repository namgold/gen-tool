from generate import *
# from profiles.dmngach_299 import *
# from profiles.dmngachluong_300 import *
# from profiles.loaivienchuc_301 import *
# from profiles.dmdienchinhsach_302 import *
# from profiles.dmbomon_303 import *
from profiles.dmtinhthanhpho_304 import *

generate(name, menuNum, fullname, keyword, schema, key, searchFields, ExcelStartRow, repoDirectory, copyOutputFilesToRepo)
print("Done!", end="")