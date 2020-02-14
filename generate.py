import random, os, json, shutil
from lib.SafeOpen import SafeOpen
from lib.Copytree import Copytree

typeMongoMap = {
    'text': "String",
    "number": "Number",
    "date": "Date"
}

def generate(name, fullname, keyword, schema, key, searchFields, ExcelStartRow, repo="", copy=False):
    # Initing names
    keyword = [i.lower() for i in keyword]
    url = '-'.join(keyword)
    UpperCamel = ''.join(map(lambda x: x.upper() if x in ['dm', 'qt'] else x.capitalize(), keyword))
    lowerCamel = keyword[0].lower() + ''.join(map(lambda x: x.capitalize(), keyword[1:]))
    UPPER_SNAKE = '_'.join(map(lambda x: x.upper(), keyword))
    lowername = name.lower()
    searchFields = ', '.join('{{ {}: value }}'.format(i) for i in searchFields )

    # 
    schemaReact = {i: {'type':schema[i]} for i in schema}
    schemaMongo = {i: typeMongoMap[schema[i]] for i in schema}
    formatItems = {
        'url' : url,
        'UpperCamel' : UpperCamel,
        'lowerCamel' : lowerCamel,
        'menuNum': random.randint(200, 999),
        'UPPER_SNAKE': UPPER_SNAKE,
        'schemaArray': list(schema.keys()),
        'schema': json.dumps(schemaReact, indent='    '),
        'schemaMongo': json.dumps(schemaMongo, indent=8),
        'name': name,
        'fullname': fullname,
        'lowername': lowername,
        'key': key,
        'ExcelStartRow': ExcelStartRow,
        'searchFields': searchFields
    }

    mapping = {
        "controller.js":  f'output/src/module/tchc/controller/{lowerCamel}.js',
        "model.js":       f'output/src/module/tchc/model/{lowerCamel}.js',
        "redux.js":       f'output/src/view/redux/{lowerCamel}.jsx',
        "page.jsx":       f'output/src/view/admin/tchc/{UpperCamel}Page.jsx',
        "importpage.jsx": f'output/src/view/admin/tchc/{UpperCamel}ImportPage.jsx',
        "_init.js":       'output_add/src/controller/_init.js',
        "admin.jsx":      'output_add/src/view/admin/admin.jsx'
    }

    # Creating files
    for i in mapping:
        SafeOpen(mapping[i], 'w', encoding="utf8").write(SafeOpen('template/' + i, 'r', encoding="utf8").read().format(**formatItems))

    # Excel
    excelSrc = f"excel/SampleUpload{UpperCamel}.xlsx"
    excelDst = f"output/public/download/SampleUpload{UpperCamel}.xlsx"
    defaultExcelContent = 'No content.'
    if os.path.isfile(excelSrc):
        if open(excelSrc, 'rb').read() == defaultExcelContent:
            print(f"Excel file {excelSrc} have not edited. Please edit this file!")
            SafeOpen(excelDst, 'w').write(defaultExcelContent)
        else:
            SafeOpen(excelDst, 'w').write(defaultExcelContent)
            shutil.copy(excelSrc, excelDst)
    else:
        SafeOpen(excelDst, 'w').write(defaultExcelContent)
        SafeOpen(excelSrc, 'w').write(defaultExcelContent)
        print(f"Excel file {excelSrc} not found, sample file created.")

    # Copying to repo
    if copy:
        if os.path.isdir(repo):
            Copytree("output\\public", repo+"\\public")
            Copytree("output\\src", repo+"\\src")
            shutil.rmtree("output")
            print(f"Copied output files to {repo}")
