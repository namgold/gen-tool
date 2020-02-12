import random, os, json, shutil
from lib.SafeOpen import SafeOpen
from lib.Copytree import Copytree

typeMongoMap = {
    'text': "String",
    "number": "Number",
    "date": "Date"
}

def generate(name, fullname, keyword, schema, key, repo="", copy=False):
    keyword = [i.lower() for i in keyword]
    url = '-'.join(keyword)
    UpperCamel = ''.join(map(lambda x: x.upper() if x in ['dm', 'qt'] else x.capitalize(), keyword))
    lowerCamel = keyword[0].lower() + ''.join(map(lambda x: x.capitalize(), keyword[1:]))
    UPPER_SNAKE = '_'.join(map(lambda x: x.upper(), keyword))
    lowername = name.lower()

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
        'key': key
    }

    mapping = {
        "controller.js":  'output/src/module/tchc/controller/{}.js'.format(lowerCamel),
        "model.js":       'output/src/module/tchc/model/{}.js'.format(lowerCamel),
        "redux.js":       'output/src/view/redux/{}.jsx'.format(lowerCamel),
        "page.jsx":       'output/src/view/admin/tchc/{}Page.jsx'.format(UpperCamel),
        "importpage.jsx": 'output/src/view/admin/tchc/{}ImportPage.jsx'.format(UpperCamel),
        "_init.js":       'output_add/src/controller/_init.js',
        "admin.jsx":      'output_add/src/view/admin/admin.jsx'
    }

    for i in mapping:
        SafeOpen(mapping[i], 'w', encoding="utf8").write(SafeOpen('template/' + i, 'r', encoding="utf8").read().format(**formatItems))
    excelSrc = "excel/SampleUpload{}.xlsx".format(UpperCamel)
    excelDst = "output/public/download/SampleUpload{}.xlsx".format(UpperCamel)
    if os.path.isfile(excelSrc):
        SafeOpen("output/public/download/SampleUpload{}.xlsx".format(UpperCamel), 'w').write('ahihi')
        shutil.copy(excelSrc,excelDst)
        print("Excel file found")
    else:
        SafeOpen("output/public/download/SampleUpload{}.xlsx".format(UpperCamel), 'w').write('ahihi')

    if copy:
        if os.path.isdir(repo):
            Copytree("output\\public", repo+"\\public")
            Copytree("output\\src", repo+"\\src")
            shutil.rmtree("output")
            print("Copied files to {}".format(repo))
