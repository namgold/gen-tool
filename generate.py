import random, os, json, shutil, importlib, json
from lib.SafeOpen import SafeOpen
from lib.Copytree import Copytree
from distutils import util


formatItems = {}
outputNames = {}
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
                 f'                                        <input type="checkbox" checked={{item["{i}"]}} onChange={{() => this.changeActive(item, "{i}")}} />\n'
                 f'                                        <span className="button-indecator" />\n'
                 f'                                    </label>\n'
                 f'                                </td>\n')
        else:
            q = '                                <td>{}</td>\n'
            if i == key:
                q = q.format(f'<a href="#" onClick={{e => this.edit(e, index, item)}}>{{item["{i}"]}}</a>')
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
            q = ('                                <div className="form-group col-12 col-md-6" style={{ display: "inline-flex", width: "100%" }}>\n'
                f'                                    <label htmlFor="input{i}">{schema[i]["title"]}</label>&nbsp;&nbsp;\n'
                 '                                    <div className="toggle">\n'
                 '                                        <label>\n'
                f'                                            <input type="checkbox" id="input{i}"/>\n'
                 '                                            <span className="button-indecator" />\n'
                 '                                        </label>\n'
                 '                                    </div>\n'
                 '                                </div>\n')
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
            inputAttributeString = ' '.join([key+"="+inputAttribute[key] for key in inputAttribute])
            q = (f'                                <div className="form-group col-12 col-md-6">\n'
                 f'                                    <label htmlFor="input{i}">{schema[i]["title"]}</label>\n'
                 f'                                    <input className="form-control" {inputAttributeString} />\n'
                 f'                                </div>\n')
        a += q
    return a

def createModalShow(schema):
    a = ''
    for i in schema:
        if schema[i]['type'] == "bool":
            defaultValue = util.strtobool(schema[i]['default']) if 'default' in schema[i] else False
            a += f"        $('#input{i}').prop('checked', item['{i}'] ? item['{i}'] : {'true' if defaultValue else 'false'});\n"
        elif schema[i]['type'] == "date":
            a += f"        $('#input{i}').val(item['{i}'] ? T.dateToText(item['{i}'], 'yyyy-mm-dd') : '');\n"
        elif schema[i]['type'] == "month":
            a += f"        $('#input{i}').val(item['{i}'] ? T.dateToText(item['{i}'], 'yyyy-mm') : '');\n"
        else:
            a += f"        $('#input{i}').val(item['{i}'] ? item['{i}'] : null);\n"
    return a

def createModalSavePage(schema):
    a = ''
    for i in schema:
        if schema[i]['type'] == "bool":
            a += f"        changes['{i}'] = $('#input{i}')[0].checked;\n"
        else:
            a += f"        changes['{i}'] = $('#input{i}').val().trim();\n"
    return a

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

def generate(name, menuNum, fullname, keyword, schema, key, searchFields, ExcelStartRow):
    global formatItems, outputNames
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
    tableHeader = ''.join(f'                            <th style={{{{ minWidth: "30%", whiteSpace: "nowrap" }}}}>{schema[i]["title"]}</th>\n' for i in schema)
    tableBody = createTableBody(key, schema)
    modalBody = createModalBody(key, schema)
    modalShow = createModalShow(schema)
    modalSavePage = createModalSavePage(schema)
    modalSaveCondition = createModalSaveCondition(key)
    modalInitState = createModalInitState(schema)
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
        "ExcelStartRow": ExcelStartRow,
        "searchFields": searchFields,
        "tableHeader": tableHeader,
        'tableBody': tableBody,
        'modalBody': modalBody,
        'modalShow': modalShow,
        'modalSavePage': modalSavePage,
        'modalSaveCondition': modalSaveCondition,
        'modalInitState': modalInitState,
        'menuPrefix': 4 if keyword[0]=='qt' else 3,
        'menuTitle': 'Quá trình' if keyword[0]=='qt' else 'Danh mục',
    }
    outputNames = {
        "Controller.js":  f"output/src/module/{UpperCamel}/Controller.js",
        "EditModal.jsx":  f"output/src/module/{UpperCamel}/EditModal.jsx",
        "ImportPage.jsx": f"output/src/module/{UpperCamel}/ImportPage.jsx",
        "Index.jsx":      f"output/src/module/{UpperCamel}/Index.jsx",
        "Model.js":       f"output/src/module/{UpperCamel}/Model.js",
        "Page.jsx":       f"output/src/module/{UpperCamel}/Page.jsx",
        "Redux.jsx":      f"output/src/module/{UpperCamel}/Redux.jsx",
        "admin.jsx":       "output_add/src/view/admin/admin.jsx",
    }

    # Creating files
    for i in outputNames:
        SafeOpen(outputNames[i], "w", encoding="utf8").write(SafeOpen("template/" + i, "r", encoding="utf8").read().format(**formatItems))

    # Excel
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

    # if not isMulti:

def addAdmin(src, dst):
    global formatItems
    UpperCamel = formatItems['UpperCamel']
    lowerCamel = formatItems['lowerCamel']
    url = formatItems['url']
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
    if os.path.exists("./output_add") and os.path.isdir("./output_add"):
        shutil.rmtree("./output_add")
    print("Cleared output folders")

def copyOutputToRepo(repo, isCopyOutputToRepo):
    if os.path.isdir(repo) and os.path.basename(repo) == 'hcmut':
        for dirpath, dirnames, filenames in os.walk("output"):
            for i in filenames:
                src = os.path.join(dirpath, i)
                dst = os.path.join(repo, os.path.relpath(dirpath, 'output'), i)
                if not os.path.exists(dst) or open(src, "rb").read() != open(dst, "rb").read():
                    if isCopyOutputToRepo:
                        SafeOpen(dst, 'w').close()
                        shutil.copy(src, dst)
                        print("Copied", src)
                    else:
                        print("Diff found", src)
        if isCopyOutputToRepo:
            addAdmin(outputNames["admin.jsx"], os.path.join(repo, os.path.relpath(outputNames["admin.jsx"], 'output_add')))

def generateAllProfiles(repoPath, isCopyOutputToRepo):
    def run(dir):
        for i in os.listdir(dir):
            if os.path.isfile(os.path.join(dir, i)):
                content = json.loads(open(os.path.join(dir, i), encoding="utf8").read())
                generate(content["name"], content["menuNum"], content["fullname"], content["keyword"], content["schema"], content["key"], content["searchFields"], content["ExcelStartRow"])
                if isCopyOutputToRepo:
                    addAdmin(outputNames["admin.jsx"], os.path.join(repoPath, os.path.relpath(outputNames["admin.jsx"], 'output_add')))
                print("Done", content["menuNum"], content["name"])
    resetOutputFolder()
    run('danhmuc')
    run('quatrinh')
    copyOutputToRepo(repoPath, isCopyOutputToRepo)
    print("Done all profiles")

def generateOneProfile(profilePath, repoPath, isCopyOutputToRepo):
    try:
        content = json.loads(open(profilePath, encoding="utf8").read())
    except:
        print("Can not open the file", profilePath)
        return
    resetOutputFolder()
    generate(content["name"], content["menuNum"], content["fullname"], content["keyword"], content["schema"], content["key"], content["searchFields"], content["ExcelStartRow"])
    copyOutputToRepo(repoPath, isCopyOutputToRepo)
    print("Done", content["menuNum"], content["name"])
