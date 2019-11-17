name = ['ds', 'tap', 'su']

schema = {
    'SHCC': { 'type': 'text' },
    'NAM': { 'type': 'number' },
    'NV1_GIO_CHUAN_D_MUC':  { 'type': 'number' },
    'NV2_GIO_LAM_VIEC_D_MUC': { 'type': 'number' },
    'NV3_GIO_LAM_VIEC_D_MUC': { 'type': 'number' },
    'GHI_CHU': { 'type': 'text' },
};

#-----------------------------------------------------

import random, os, json
def initFolder():
    if not os.path.exists('output'):
        os.makedirs('output')
    if not os.path.exists('output/src'):
        os.makedirs('output/src')
    if not os.path.exists('output/src/controller'):
        os.makedirs('output/src/controller')
    if not os.path.exists('output/src/model'):
        os.makedirs('output/src/model')
    if not os.path.exists('output/src/view'):
        os.makedirs('output/src/view')
    if not os.path.exists('output/src/view/admin'):
        os.makedirs('output/src/view/admin')
    if not os.path.exists('output/src/view/redux'):
        os.makedirs('output/src/view/redux')
initFolder()
name = [i.lower() for i in name]
url = '-'.join(name)
UpperCamel = ''.join(map(lambda x: x.capitalize(), name))
lowerCamel = UpperCamel[0].lower() + UpperCamel[1:]
menuNum = random.randint(200, 999)
upperSnake = '_'.join(map(lambda x: x.upper(), name))

typeMongoMap = {
    'text': "String",
    "number": "Number",
    "date": "Date"
}
schemaMongo = {i: typeMongoMap[schema[i]['type']] for i in schema}
formatItems = {
    'url' : url,
    'UpperCamel' : UpperCamel,
    'lowerCamel' : lowerCamel,
    'menuNum': menuNum,
    'upperSnake': upperSnake,
    'schemaArray': list(schema.keys()),
    'schema': json.dumps(schema, indent='    '),
    'schemaMongo': json.dumps(schemaMongo, indent=8)
}

mapping = {
    "_init.js": "src/controller/_init.js",
    "controller.js": 'src/controller/{}.js'.format(lowerCamel),
    "model.js": 'src/model/{}.js'.format(lowerCamel),
    "redux.js": 'src/view/redux/{}.jsx'.format(lowerCamel),
    "admin.jsx": 'src/view/admin/admin.jsx',
    "page.jsx": 'src/view/admin/{}Page.jsx'.format(UpperCamel),
    "importpage.jsx": 'src/view/admin/{}ImportPage.jsx'.format(UpperCamel),
}

for i in mapping:
    open("output/" + mapping[i], 'w', encoding="utf8").write(open(i, 'r', encoding="utf8").read().format(**formatItems))
