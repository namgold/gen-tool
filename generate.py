# name = ['ds', 'tap', 'su']

# schema = {
#     'SHCC': 'text',
#     'NAM': 'number',
#     'NV1_GIO_CHUAN_D_MUC': 'number',
#     'NV2_GIO_LAM_VIEC_D_MUC': 'number',
#     'NV3_GIO_LAM_VIEC_D_MUC': 'number',
#     'GHI_CHU': 'text',
# };

name = ['qt', 'tap', 'su']

schema = {
    'SHCC': 'text',
    'NAM': 'number',
    'NV1_GIO_CHUAN_D_MUC': 'number',
    'NV2_GIO_LAM_VIEC_D_MUC': 'number',
    'NV3_GIO_LAM_VIEC_D_MUC': 'number',
    'GHI_CHU': 'text',
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
    if not os.path.exists('output/public'):
        os.makedirs('output/public')
    if not os.path.exists('output/public/download'):
        os.makedirs('output/public/download')
    if not os.path.exists('output_add'):
        os.makedirs('output_add')
    if not os.path.exists('output_add/src'):
        os.makedirs('output_add/src')
    if not os.path.exists('output_add/src/controller'):
        os.makedirs('output_add/src/controller')
    if not os.path.exists('output_add/src/view'):
        os.makedirs('output_add/src/view')
    if not os.path.exists('output_add/src/view/admin'):
        os.makedirs('output_add/src/view/admin')

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
schemaReact = {i: {'type':schema[i]} for i in schema}
schemaMongo = {i: typeMongoMap[schema[i]] for i in schema}
formatItems = {
    'url' : url,
    'UpperCamel' : UpperCamel,
    'lowerCamel' : lowerCamel,
    'menuNum': menuNum,
    'upperSnake': upperSnake,
    'schemaArray': list(schema.keys()),
    'schema': json.dumps(schemaReact, indent='    '),
    'schemaMongo': json.dumps(schemaMongo, indent=8)
}

mapping = {
    "_init.js": "output_add/src/controller/_init.js",
    "controller.js": 'output/src/controller/{}.js'.format(lowerCamel),
    "model.js": 'output/src/model/{}.js'.format(lowerCamel),
    "redux.js": 'output/src/view/redux/{}.jsx'.format(lowerCamel),
    "admin.jsx": 'output_add/src/view/admin/admin.jsx',
    "page.jsx": 'output/src/view/admin/{}Page.jsx'.format(UpperCamel),
    "importpage.jsx": 'output/src/view/admin/{}ImportPage.jsx'.format(UpperCamel),
}

for i in mapping:
    open(mapping[i], 'w', encoding="utf8").write(open('template/' + i, 'r', encoding="utf8").read().format(**formatItems))
open("output/public/download/SampleUpload{}.xlsx".format(UpperCamel), 'w').write('hi')