module.exports = app => {{
    const parentMenu = {{ index: {menuPrefix}000, title: "{menuTitle}", icon: "fa-pagelines" }},
        menu = {{
            parentMenu,
            menus: {{ {menuPrefix}{menuNum}: {{ title: "{name}", link: "/user/{url}" }} }},
        }};
    app.permission.add(
        {{ name: "{lowerCamel}:read", menu: menu }},
        {{ name: "{lowerCamel}:write", menu: menu }}
    );

    app.get("/user/{url}", app.permission.check("{lowerCamel}:read"), app.templates.admin);
    app.get("/user/{url}/upload", app.permission.check("{lowerCamel}:write"), app.templates.admin);

    // APIs -----------------------------------------------------------------------------------------------------------------------------------------
    app.get("/api/{url}/page/:pageNumber/:pageSize", app.permission.check("{lowerCamel}:read"), (req, res) => {{
        const pageNumber = parseInt(req.params.pageNumber),
                pageSize = parseInt(req.params.pageSize),
                condition = req.query.condition ? req.query.condition : {{}};
        app.model.{lowerCamel}.getPage(pageNumber, pageSize, condition, (error, page) => res.send({{ error, page }}));
    }});

    app.delete("/api/{url}", app.permission.check("{lowerCamel}:write"), (req, res) => app.model.{lowerCamel}.delete(req.body._id, error => res.send({{ error }})));

    app.post("/api/{url}", app.permission.check("{lowerCamel}:write"), (req, res) => {{
        const body = req.body.{lowerCamel};
        app.model.{lowerCamel}.get({{ {key}: body.{key} }}, (error, item) => {{
            if (error) res.send({{ error }});
            else if (item) res.send({{ error: {{ exist: true, message: "{name} " + body.{key} + " đã tồn tại" }}}});
            else app.model.{lowerCamel}.create(body, (error, item) => res.send({{ error, item }}));
        }});
    }});

    app.post("/api/{url}/multiple", app.permission.check("{lowerCamel}:write"), (req, res) => {{
        const handleCreate = index => {{
            if (index >= req.body.multi{UpperCamel}.length) res.send({{ data: "Upload success" }})
            else app.model.{lowerCamel}.updateOrCreate(req.body.multi{UpperCamel}[index]).then(item => handleCreate(index + 1)).catch(error => res.send({{ error }}))
        }};
        handleCreate(0);
    }});

    app.put("/api/{url}", app.permission.check("{lowerCamel}:write"), (req, res) =>
        app.model.{lowerCamel}.update(req.body.changes, (error, item) => res.send({{error, item}})));

    const {lowerCamel}ImportData = (req, fields, files, params, done) => {{
        if (fields.userData && fields.userData[0] && fields.userData[0] == "{lowerCamel}ImportData" && files.{UpperCamel}File && files.{UpperCamel}File.length > 0) {{
            app.uploadTCHCFile(files.{UpperCamel}File[0].path, done, {schemaArray}, {ExcelStartRow});
        }}
    }};

    app.uploadHooks.add("{lowerCamel}ImportData", (req, fields, files, params, done) =>
        app.permission.has(req, () => {lowerCamel}ImportData(req, fields, files, params, done), done, "{lowerCamel}:write"));

}};
