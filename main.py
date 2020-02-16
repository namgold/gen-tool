from generate import *
# from profiles.dm299_ngach import *
# from profiles.dm300_ngachluong import *
# from profiles.dm301_loaivienchuc import *
# from profiles.dm302_dienchinhsach import *
# from profiles.dm303_bomon import *
# from profiles.dm304_tinhthanhpho import *
# from profiles.dm305_chucdanhkh import *
# from profiles.dm306_chucvukiemnhiem import *
# from profiles.dm307_quocgia import *
# from profiles.dm308_chau import *
from profiles.dmkinhphinn_363 import *

generate(name, menuNum, fullname, keyword, schema, key, searchFields, ExcelStartRow, repoDirectory, copyOutputFilesToRepo)
print("Done", menuNum, name, end="")