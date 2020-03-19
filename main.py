import json
from generate import *

repoPath = "C:\\Thesis\\hcmut"
# repoPath = "/Users/mac/Documents/GIT/hcmut"

isCopyOutputToRepo = False
runAll = True

if runAll:
    generateAllProfiles(repoPath, isCopyOutputToRepo)
else:
    generateOneProfile("danhmuc/dm304_tinhthanhpho.json", repoPath, isCopyOutputToRepo)