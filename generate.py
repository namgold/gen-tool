import random, os, json, shutil, importlib, json
from lib.SafeOpen import SafeOpen
from lib.Copytree import Copytree

typeMongoMap = {
    "text": "String",
    "number": "Number",
    "date": "Date",
    "bool": "Boolean"
}

def resetOutputFolder():
    if os.path.exists("./output") and os.path.isdir("./output"):
        shutil.rmtree("./output")
    if os.path.exists("./output_add") and os.path.isdir("./output_add"):
        shutil.rmtree("./output_add")

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
                q = q.format(f'<a href="#" onClick={{e => this.edit(e, item)}}>{{item["{i}"]}}</a>')
            else:
                if schema[i]['type'] == "date":
                    q = q.format(f'{{item["{i}"] ? new Date(item["{i}"]).ddmmyyyy() : ""}}')
                else:
                    q = q.format(f'{{item["{i}"]}}')
        a+=q
    return a

def generate(name, menuNum, fullname, keyword, schema, key, searchFields, ExcelStartRow, repo="", copy=False, isMulti=False):
    # Initing names
    keyword = [i.lower() for i in keyword]
    url = "-".join(keyword)
    UpperCamel = "".join(map(lambda x: x.upper() if x in ["dm", "qt"] else x.capitalize(), keyword))
    lowerCamel = keyword[0].lower() + "".join(map(lambda x: x.capitalize(), keyword[1:]))
    UPPER_SNAKE = "_".join(map(lambda x: x.upper(), keyword))
    lowername = name.lower()
    searchFields = ", ".join('{{ "{}": value }}'.format(i) for i in searchFields )

    # Initing data
    schemaMongo = {i: typeMongoMap[schema[i]["type"]] for i in schema}
    tableHeader = ''.join(f'                            <th style={{{{ minWidth: "30%", whiteSpace: "nowrap" }}}}>{schema[i]["title"]}</th>\n' for i in schema)
    tableBody = createTableBody(key, schema)
    formatItems = {
        "url" : url,
        "UpperCamel" : UpperCamel,
        "lowerCamel" : lowerCamel,
        "menuNum": menuNum,
        "UPPER_SNAKE": UPPER_SNAKE,
        "schemaArray": list(schema.keys()),
        "schema": json.dumps(schema, indent="    "),
        "schemaMongo": json.dumps(schemaMongo, indent=8).replace('}','    }'),
        "name": name,
        "fullname": fullname,
        "lowername": lowername,
        "key": key,
        "ExcelStartRow": ExcelStartRow,
        "searchFields": searchFields,
        "tableHeader": tableHeader,
        'tableBody': tableBody
    }

    mapping = {
        "controller.js":  f"output/src/module/tchc/controller/{lowerCamel}.js",
        "model.js":       f"output/src/module/tchc/model/{lowerCamel}.js",
        "redux.js":       f"output/src/view/redux/{lowerCamel}.jsx",
        "page.jsx":       f"output/src/view/admin/tchc/{UpperCamel}Page.jsx",
        "importpage.jsx": f"output/src/view/admin/tchc/{UpperCamel}ImportPage.jsx",
        "admin.jsx":      "output_add/src/view/admin/admin.jsx"
    }

    if not isMulti:
        resetOutputFolder()
    # Creating files
    for i in mapping:
        SafeOpen(mapping[i], "w", encoding="utf8").write(SafeOpen("template/" + i, "r", encoding="utf8").read().format(**formatItems))

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

    # Copying to repo
    if os.path.isdir(repo):
        for dirpath, dirnames, filenames in os.walk("output"):
            if filenames != [] :
                for i in filenames:
                    if i != ".placeholder":
                        src = os.path.join(dirpath, i)
                        dst = os.path.join(repo, *dirpath.split("\\")[1:], i)
                        if not os.path.exists(dst) or open(src, "rb").read() != open(dst, "rb").read():
                            if copy:
                                shutil.copy(src, dst)
                                print("Copied", src)
                            else:
                                print("Diff found", src)
        if not isMulti:
            addAdmin(formatItems, mapping["admin.jsx"], repo + "/src/view/admin/admin.jsx")

def addAdmin(formatItems, src, dst):
    items = [
        "import {lowerCamel} from '../redux/{lowerCamel}.jsx';".format(**formatItems),
        ", {lowerCamel}".format(**formatItems),
        """            {{ path: "/user/{url}/upload", component: Loadable({{ loading: Loading, loader: () => import("./tchc/{UpperCamel}ImportPage.jsx") }}) }},
            {{ path: "/user/{url}", component: Loadable({{ loading: Loading, loader: () => import("./tchc/{UpperCamel}Page.jsx") }}) }},""".format(**formatItems)
    ]
    dstContent = open(dst, "r", encoding="utf8").read()
    if dstContent.find(items[1]) == -1:
        pos = dstContent.find("\n", dstContent.rfind("redux/"))
        dstContent = dstContent[:pos].rstrip() + "\n" + items[0] + "\n\n" + dstContent[pos:].lstrip()
        print("Appended import to admin.jsx")

    reducerStart = dstContent.find("const reducers =")
    reducerEnd = dstContent.find("};", reducerStart)
    if dstContent.find(f"{formatItems['lowerCamel']}", reducerStart, reducerEnd) == -1:
        dstContent = dstContent[:reducerEnd].rstrip() + items[1] + "\n" + dstContent[reducerEnd:].lstrip()
        print("Appended reducer to admin.jsx")

    if dstContent.find(formatItems["url"]) == -1:
        pos = dstContent.find("{ path: '/user/dm-chucvu', component: Loadable({ loading: Loading, loader: () => import('./tchc/DmChucVuPage.jsx') }) },")
        pos = dstContent.find("\n", pos)
        dstContent = dstContent[:pos] + "\n" + items[2]  + dstContent[pos:]
        print("Appended path to admin.jsx")

    open(dst, "w", encoding="utf8").write(dstContent)

def runAllProfiles(repoDirectory, copyOutputFilesToRepo):
    def run(dir):
        for i in os.listdir(dir+"/"):
            if os.path.isfile(dir+"/"+i):
                content = json.loads(open(dir+"/"+i, encoding="utf8").read())
                generate(content["name"], content["menuNum"], content["fullname"], content["keyword"], content["schema"], content["key"],
                        content["searchFields"], content["ExcelStartRow"], repoDirectory, copyOutputFilesToRepo, True)
                print("Done", content["menuNum"], content["name"])
    q = 0
    resetOutputFolder()
    run('danhmuc')
    run('quatrinh')