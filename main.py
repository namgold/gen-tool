import json
from generate import *

repoDirectory = "C:\\Thesis\\hcmut"
copyOutputFilesToRepo = True
runAll = True

if runAll:
    resetOutputFolder()
    runAllProfiles(repoDirectory, copyOutputFilesToRepo)
    print("Done all profiles")
else:
    content = json.loads(open("danhmuc/dm303_bomon.json", encoding="utf8").read())
    generate(content["name"], content["menuNum"], content["fullname"], content["keyword"], content["schema"], content["key"],
            content["searchFields"], content["ExcelStartRow"], repoDirectory, copyOutputFilesToRepo, True)
    print("Done", content["menuNum"], content["name"])

