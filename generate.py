import random, os, json
from lib.SafeOpen import SafeOpen

def generate(name,schema):
    name = [i.lower() for i in name]
    url = '-'.join(name)
    UpperCamel = ''.join(map(lambda x: x.capitalize(), name))
    lowerCamel = UpperCamel[0].lower() + UpperCamel[1:]
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
        'menuNum': random.randint(200, 999),
        'upperSnake': upperSnake,
        'schemaArray': list(schema.keys()),
        'schema': json.dumps(schemaReact, indent='    '),
        'schemaMongo': json.dumps(schemaMongo, indent=8)
    }

    mapping = {
        "controller.js":  'output/src/module/tchc/controller/{}.js'.format(lowerCamel),
        "model.js":       'output/src/module/tchc/model/{}.js'.format(lowerCamel),
        "redux.js":       'output/src/view/redux/{}.jsx'.format(lowerCamel),
        "page.jsx":       'output/src/view/admin/tchc/{}Page.jsx'.format(UpperCamel),
        "importpage.jsx": 'output/src/view/admin/tchc/{}ImportPage.jsx'.format(UpperCamel),
        "_init.js":       'output_add/src/module/tchc/controller/_init.js',
        "admin.jsx":      'output_add/src/view/admin/tchc/admin.jsx'
    }

    for i in mapping:
        SafeOpen(mapping[i], 'w', encoding="utf8").write(
            SafeOpen('template/' + i, 'r', encoding="utf8").read().format(**formatItems)
        )
    SafeOpen("output/public/download/SampleUpload{}.xlsx".format(UpperCamel), 'w').write('hi')
