module.exports = app => {{
    const parentMenu = {{ index: 8000, title: 'Tổng kết', icon: 'fa-pagelines' }},
        menu{menuNum} = {{
            parentMenu,
            menus: {{ 8{menuNum}: {{ title: '{upperSnake}', link: '/user/summary/{url}' }} }},
        }};
    app.permission.add(
        {{ name: 'point:select', menu: menu{menuNum} }}
    );

    app.get('/user/summary/{url}', app.permission.check('point:select'), app.templates.admin);
    app.get('/user/summary/{url}/upload', app.permission.check('point:select'), app.templates.admin);

    // APIs -----------------------------------------------------------------------------------------------------------------------------------------
    app.get('/api/{url}/page/:pageNumber/:pageSize', app.permission.check('point:select'), (req, res) => {{
        const pageNumber = parseInt(req.params.pageNumber),
                pageSize = parseInt(req.params.pageSize),
                condition = req.query.condition ? req.query.condition : {{}};
        app.model.{lowerCamel}.getPage(pageNumber, pageSize, condition, (error, page) => res.send({{ error, page }}));
    }});

    app.post('/api/{url}/multiple', app.permission.check('point:select'), (req, res) => {{
        const points = req.body.points, errorList = [];
        for (let i = 0; i <= points.length; i++) {{
            if (i == points.length) {{
                res.send({{error: errorList}});
            }} else {{
                const currentPoint = points[i];
                app.model.{lowerCamel}.create(currentPoint, (error, _) => {{
                    if (error) errorList.push(error);
                }});
            }}
        }}
    }});

    app.put('/api/{url}', app.permission.check('point:select'), (req, res) => {{
        const changes = req.body.changes, _id = req.body._id;
        app.model.{lowerCamel}.update(_id, changes, (error, item) => {{
            res.send({{error, item}});
        }});
    }});

    const {lowerCamel}ImportData = (req, fields, files, params, done) => {{
        if (fields.userData && fields.userData[0] && fields.userData[0] == '{lowerCamel}ImportData' && files.PointFile && files.PointFile.length > 0) {{
            app.upload{UpperCamel}File(req, files.PointFile[0].path, done);
        }}
    }};

    app.uploadHooks.add('{lowerCamel}ImportData', (req, fields, files, params, done) =>
            app.permission.has(req, () => {lowerCamel}ImportData(req, fields, files, params, done), done, 'point:select'));

}};
