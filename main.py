import json
from generate import *

repoPath = "C:\\Thesis\\hcmut"
isCopyOutputToRepo = True
runAll = True

if runAll:
    generateAllProfiles(repoPath, isCopyOutputToRepo)
else:
    generateOneProfile("danhmuc/dm303_bomon.json", repoPath, isCopyOutputToRepo)