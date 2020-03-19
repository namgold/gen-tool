import random, os, json, shutil, importlib, json
from threading import Thread
from lib.SafeOpen import SafeOpen
from lib.Copytree import Copytree
from distutils import util


typeMongoMap = {
    "text": "String",
    "number": "Number",
    "date": "Date",
    "month": "Date",
    "year": "Number",
    "bool": "Boolean"
}

def createTableBody(key, schema):
    a = ''
    for i in schema:
        q = ''
        if schema[i]['type'] == "bool":
            q = (f'                                <td className="toggle" style={{{{ textAlign: "center" }}}}>\n'
                 f'                                    <label>\n'
                 f'                                        <input type="checkbox" checked={{item.{i} ? true : false}} onChange={{() => !readOnly && this.changeActive(item, "{i}")}} />\n'
                 f'                                        <span className="button-indecator" />\n'
                 f'                                    </label>\n'
                 f'                                </td>\n')
        else:
            q = '                                <td>{}</td>\n'
            if i == key:
                q = q.format(f'<a href="#" onClick={{e => this.edit(e, item)}}>{{item["{i}"]}}</a>')
            else:
                if schema[i]['type'] == "date":
                    q = q.format(f'{{item["{i}"] ? new Date(item["{i}"]).ddmmyyyy() : ""}}')
                elif schema[i]['type'] == "month":
                    q = q.format(f'{{item["{i}"] ? new Date(item["{i}"]).mmyyyy() : ""}}')
                else:
                    q = q.format(f'{{item["{i}"]}}')
        a += q
    return a

def createModalBody(key, schema):
    a = ''
    autofocused = False
    for pi, i in enumerate(schema):
        if schema[i]['type'] == "bool":
            q = ('                            <div className="form-group col-12 col-md-6" style={{ display: "inline-flex", width: "100%" }}>\n'
                f'                                <label htmlFor="input{i}">{schema[i]["title"]}</label>&nbsp;&nbsp;\n'
                 '                                <div className="toggle">\n'
                 '                                    <label>\n'
                f'                                        <input type="checkbox" id="input{i}" disabled={{readOnly}} />\n'
                 '                                        <span className="button-indecator" />\n'
                 '                                    </label>\n'
                 '                                </div>\n'
                 '                            </div>\n')
        else:
            inputAttribute = {
                "id": f'"input{i}"',
                "placeholder": f'"{schema[i]["title"]}"'
            }
            if schema[i]['type'] == "year":
                inputAttribute["type"] = '"text"'
                inputAttribute["max"] = '"2099"' if 'max' not in schema[i] else f'"{schema[i]["max"]}"'
                inputAttribute["value"] = f'{{this.state.input{i}}}'
                inputAttribute["onChange"] = '{this.handleNumberInputChange}'
            elif schema[i]['type'] == 'number':
                inputAttribute["type"] = '"text"'
                if 'max' in schema[i]: inputAttribute["max"] = f'"{schema[i]["max"]}"'
                inputAttribute["value"] = f'{{this.state.input{i}}}'
                inputAttribute["onChange"] = '{this.handleNumberInputChange}'
            else:
                inputAttribute["type"] = f'"{schema[i]["type"]}"'
            if 'step' in schema[i]: inputAttribute["step"] = f'{{{schema[i]["step"]}}}'
            if pi == 0: inputAttribute["auto-focus"] = '""'
            if 'maxLength' in schema[i]: inputAttribute["maxLength"] = f'{{{schema[i]["maxLength"]}}}'
            inputAttributeString = ' '.join([key+"="+inputAttribute[key] for key in inputAttribute])
            q = (f'                            <div className="form-group col-12 col-md-6">\n'
                 f'                                <label htmlFor="input{i}">{schema[i]["title"]}</label>\n'
                 f'                                <input className="form-control" {inputAttributeString} readOnly={{readOnly}}/>\n'
                 f'                            </div>\n')
        a += q
    return a

def createModalShow(schema):
    a = []
    for i in schema:
        if schema[i]['type'] == "bool":
            defaultValue = util.strtobool(schema[i]['default']) if 'default' in schema[i] else False
            a.append(f"        $('#input{i}').prop('checked', item.{i} ? true : false);")
        elif schema[i]['type'] == "date":
            a.append(f"        $('#input{i}').val(item.{i} ? T.dateToText(item.{i}, 'yyyy-mm-dd') : '');")
        elif schema[i]['type'] == "month":
            a.append(f"        $('#input{i}').val(item.{i} ? T.dateToText(item.{i}, 'yyyy-mm') : '');")
        else:
            a.append(f"        $('#input{i}').val(item.{i} ? item.{i} : null);")
    return '\n'.join(a)

def createModalSavePage(schema):
    a = []
    for i in schema:
        if schema[i]['type'] == "bool":
            a.append(f"            {i}: $('#input{i}')[0].checked ? 1 : 0")
        else:
            a.append(f"            {i}: $('#input{i}').val().trim()")
    return ',\n'.join(a)

def createModalSaveCondition(key):
    return '' if key == '_id' else f" || !changes['{key}']"

def createModalInitState(schema):
    a = ''
    for i in schema:
        if schema[i]['type'] == "year":
            default = 'new Date().getFullYear()'
            if 'default' in schema[i]: default = schema[i]["default"]
            a += f',\n            input{i}: {default}'
        elif schema[i]['type'] == "number":
            if 'default' in schema[i]:
                a += f',\n            input{i}: {schema[i]["default"]}'
    return a

def createBomonHeader():
    return '''                            <th style={{minWidth: "30%", whiteSpace: "nowrap"}}>MS bộ môn</th>
                            <th style={{minWidth: "30%", whiteSpace: "nowrap"}}>Tên bộ môn</th>
                            <th style={{minWidth: "20%", whiteSpace: "nowrap"}}>Tên tiếng anh</th>
                            <th style={{minWidth: "20%", whiteSpace: "nowrap"}}>Quyết định thành lập</th>
                            <th style={{minWidth: "auto",textAlign: "left", whiteSpace: "nowrap"}}>Mã đơn vị</th>
                            <th style={{minWidth: "16.6667%", textAlign: "center", whiteSpace: "nowrap"}}>Xoá tên</th>\n'''

def createBomonBody():
    return '''                                <td>
                                    <a href="#" onClick={e => this.edit(e, item)}>{item["MS_BM"]}</a> 
                                </td>
                                <td>{item["TEN_BM"]}</td>
                                <td>{item["TEN_TIENG_ANH"]}</td>
                                <td>{item["SO_QD_TLAP"]} <br/>{item["NGAY_QD_TLAP"]?'('+new Date(item["NGAY_QD_TLAP"]).ddmmyyyy()+')':null}</td>
                                <td style={{ textAlign: "left" }}>{item["MS_DVI"]}</td>
                                <td className="toggle" style={{ textAlign: "center" }}>
                                        <label>
                                            <input type="checkbox" checked={item["XOA_TEN"]} onChange={() => this.changeActive(item, "XOA_TEN")} />
                                            <span className="button-indecator" />
                                        </label>
                                        {item["SO_QD_XOA_TEN"] ? (<br/>,item["SO_QD_XOA_TEN"]) : ''}
                                        {item["NGAY_QD_XOA_TEN"] ? (<br/>,item["NGAY_QD_XOA_TEN"]) : ''}
                                    </td>
'''
def createSearchCondition(searchFields):
    return ','.join([f'\n            "{i}": value' for i in searchFields])

def createControllerUpload(schema):
    abc = []
    for pi, i in enumerate(schema):
        if schema[i]['type'] == 'bool':
            abc.append(f"                            '{i}': value[{pi+1}].toLowerCase() === 'true' ? 1 : 0")
        else:
            abc.append(f"                            '{i}': value[{pi+1}]")
    return ',\n'.join(abc)

def generate(content, isCopyOutputToRepo, repo):
    (fullname, name, keyword, schema, key, represent, searchFields, ExcelStartRow, menuNum) = content.values()
    # Initing names
    keyword = [i.lower() for i in keyword]
    url = ('danh-muc/' if keyword[0]=='dm' else 'qua-trinh/') + "-".join(keyword[1:])
    UpperCamel = "".join(map(lambda x: x.upper() if x in ["dm", "qt"] else x.capitalize(), keyword))
    lowerCamel = keyword[0].lower() + "".join(map(lambda x: x.capitalize(), keyword[1:]))
    UPPER_SNAKE = "_".join(map(lambda x: x.upper(), keyword))
    lowername = name.lower()
    searchFields = ", ".join('{{ "{}": value }}'.format(i) for i in searchFields )
    # Initing data
    schemaMongo = {i: typeMongoMap[schema[i]["type"]] for i in schema}
    tableHeader = ''.join(f'                            <th style={{{{ width: "{schema[i]["width"]}", whiteSpace: "nowrap" }}}}>{schema[i]["title"]}</th>\n' for i in schema)
    tableBody = createTableBody(key, schema)
    modalBody = createModalBody(key, schema)
    modalShow = createModalShow(schema)
    modalSavePage = createModalSavePage(schema)
    modalSaveCondition = createModalSaveCondition(key)
    modalInitState = createModalInitState(schema)
    bomonHeader = createBomonHeader()
    bomonBody = createBomonBody()
    controllerUpload = createControllerUpload(schema)
    searchCondition = createSearchCondition(content['searchFields'])
    formatItems = {
        "url" : url,
        "UpperCamel" : UpperCamel,
        "lowerCamel" : lowerCamel,
        "menuNum": menuNum,
        "UPPER_SNAKE": UPPER_SNAKE,
        "schemaArray": list(schema.keys()),
        "schema": json.dumps(schema, indent="    "),
        "schemaMongo": json.dumps(schemaMongo, indent=8).replace('}', '    }'),
        "name": name,
        "fullname": fullname,
        "lowername": lowername,
        "key": key,
        "represent": represent,
        "ExcelStartRow": ExcelStartRow,
        "searchFields": searchFields,
        "tableHeader": tableHeader,
        'tableBody': tableBody,
        'modalBody': modalBody,
        'modalShow': modalShow,
        'searchCondition': searchCondition,
        'modalSavePage': modalSavePage,
        'modalSaveCondition': modalSaveCondition,
        'controllerUpload': controllerUpload,
        'modalInitState': modalInitState,
        'menuPrefix': 4 if keyword[0]=='qt' else 3,
        'menuTitle': 'Quá trình' if keyword[0]=='qt' else 'Danh mục',
    }
    if name == 'Bộ môn':
        formatItems['tableHeader'] = bomonHeader
        formatItems['tableBody'] = bomonBody
    outputNames = {
        "controller.js":  f"output/src/module/{UpperCamel}/controller.js",
        "editModal.jsx":  f"output/src/module/{UpperCamel}/editModal.jsx",
        "importPage.jsx": f"output/src/module/{UpperCamel}/importPage.jsx",
        "index.jsx":      f"output/src/module/{UpperCamel}/index.jsx",
        # "model.js":       f"output/src/module/{UpperCamel}/model.js",
        "page.jsx":       f"output/src/module/{UpperCamel}/page.jsx",
        "redux.jsx":      f"output/src/module/{UpperCamel}/redux.js",
    }

    # Creating files
    for i in outputNames:
        SafeOpen(outputNames[i], "w", encoding="utf8").write(SafeOpen("template/" + i, "r", encoding="utf8").read().format(**formatItems))
    # Creating excel
    excelSrc = f"excel/SampleUpload{UpperCamel}.xlsx"
    excelDst = f"output/public/download/SampleUpload{UpperCamel}.xlsx"
    defaultExcelContent = "No content."
    if os.path.isfile(excelSrc):
        if open(excelSrc, "rb").read() == defaultExcelContent:
            print(f"Excel file {excelSrc} have not edited. Please edit this file!")
            SafeOpen(excelDst, "w").write(defaultExcelContent)
        else:
            SafeOpen(excelDst, "w").write(defaultExcelContent)
            shutil.copy(excelSrc, excelDst)
    else:
        SafeOpen(excelDst, "w").write(defaultExcelContent)
        SafeOpen(excelSrc, "w").write(defaultExcelContent)
        print(f"Excel file {excelSrc} not found, sample file created.")

    # Copying output
    copyOutputToRepo(url, lowerCamel, UpperCamel, repo, isCopyOutputToRepo)
    print("Done", menuNum, name)

def addAdmin(url, lowerCamel, UpperCamel, dst):
    items = [
        f"\nimport {lowerCamel} from '../../module/{UpperCamel}/index.jsx';\n",
        f", {lowerCamel}\n",
    ]
    dstContent = open(dst, "r", encoding="utf8").read()
    originalDstContent = dstContent[:]
    if f"module/{UpperCamel}/index.jsx" not in dstContent:
        pos = dstContent.find("\n", dstContent.rfind("module/"))
        dstContent = dstContent[:pos].rstrip() + items[0] + dstContent[pos:].lstrip()
        print(f"Appended import {lowerCamel} to admin.jsx")

    reducerStart = dstContent.find("const modules")
    reducerEnd = dstContent.find("];", reducerStart)
    if dstContent.find(f"{lowerCamel},", reducerStart, reducerEnd) == -1 \
    and dstContent.find(f"{lowerCamel} ", reducerStart, reducerEnd) == -1 \
    and dstContent.find(f"{lowerCamel}\n", reducerStart, reducerEnd) == -1:
        dstContent = dstContent[:reducerEnd].rstrip() + items[1] + dstContent[reducerEnd:].lstrip()
        print(f"Appended modules {lowerCamel} to admin.jsx")
    if originalDstContent != dstContent:
        open(dst, "w", encoding="utf8").write(dstContent)

def resetOutputFolder():
    if os.path.exists("./output") and os.path.isdir("./output"):
        shutil.rmtree("./output")
    print("Cleared output folders")

def copyOutputToRepo(url, lowerCamel, UpperCamel, repo, isCopyOutputToRepo):
    def copyFile(src, dst):
        if not os.path.exists(dst) or open(src, "rb").read() != open(dst, "rb").read():
            if isCopyOutputToRepo:
                SafeOpen(dst, 'w').close()
                shutil.copy(src, dst)
                print("Copied", src)
            else:
                print("Diff found", src)

    if os.path.isdir(repo) and os.path.basename(repo) == 'hcmut':
        dirpath = os.path.join('src', 'module', UpperCamel)
        dirpathOutput = os.path.join('output', 'src', 'module', UpperCamel)
        for filename in os.listdir(dirpathOutput):
            if os.path.isfile(os.path.join(dirpathOutput, filename)):
                src = os.path.join('output', dirpath, filename)
                dst = os.path.join(repo, dirpath, filename)
                copyFile(src, dst)
            ExcelSrc = os.path.join('output', 'public', 'download', f'SampleUpload{UpperCamel}.xlsx')
            ExcelDst = os.path.join(repo, 'public', 'download', f'SampleUpload{UpperCamel}.xlsx')
            copyFile(ExcelSrc, ExcelDst)
    if isCopyOutputToRepo:
        addAdmin(url, lowerCamel, UpperCamel, os.path.join(repo, 'src', 'view', 'admin', 'admin.jsx'))

def generateAllProfiles(repoPath, isCopyOutputToRepo):
    threadPool = []
    def run(dir):
        for i in os.listdir(dir):
            if os.path.isfile(os.path.join(dir, i)):
                content = json.loads(open(os.path.join(dir, i), encoding="utf8").read())
                threadPool.append(Thread(target=generate, args=(content, isCopyOutputToRepo, repoPath)))
    resetOutputFolder()
    run('profiles/danhmuc')
    run('profiles/quatrinh')
    [i.start() for i in threadPool]
    [i.join() for i in threadPool]
    print("Done all profiles")

def generateOneProfile(profilePath, repoPath, isCopyOutputToRepo):
    try:
        content = json.loads(open(profilePath, encoding="utf8").read())
    except:
        print("Can not open the file", profilePath)
        return
    resetOutputFolder()
    generate(content, isCopyOutputToRepo, repoPath)