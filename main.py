from generate import *
from profiles.dm303_bomon import *

repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = True

generate(name, menuNum, fullname, keyword, schema, key, searchFields, ExcelStartRow, repoDirectory, copyOutputFilesToRepo)
print("Done", menuNum, name, end="")
