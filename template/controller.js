module.exports = app => {{
    const parentMenu = {{ index: {menuPrefix}000, title: "{menuTitle}", icon: "fa-pagelines" }},
        menu = {{
            parentMenu,
            menus: {{ {menuPrefix}{menuNum}: {{ title: "{name}", link: "/user/{url}" }} }},
        }};
    app.permission.add(
        {{ name: "{lowerCamel}:read", menu: menu }},
        {{ name: "{lowerCamel}:write", menu: menu }},
        {{ name: "{lowerCamel}:delete", menu: menu }},
        {{ name: "{lowerCamel}:upload", menu: menu }}
    );

    app.get("/user/{url}", app.permission.check("{lowerCamel}:read"), app.templates.admin);
    app.get("/user/{url}/upload", app.permission.check("{lowerCamel}:upload"), app.templates.admin);

    // APIs -----------------------------------------------------------------------------------------------------------------------------------------
    app.get("/api/{url}/page/:pageNumber/:pageSize", app.permission.check("{lowerCamel}:read"), (req, res) => {{
        const pageNumber = parseInt(req.params.pageNumber),
                pageSize = parseInt(req.params.pageSize),
                condition = req.query.condition ? req.query.condition : {{}};
        app.model.{lowerCamel}.getPage(pageNumber, pageSize, condition, (error, page) => res.send({{ error, page }}));
    }});

    app.delete("/api/{url}", app.permission.check("{lowerCamel}:delete"), (req, res) =>
        app.model.{lowerCamel}.delete({{ {key}: req.body.{key} }}, error => res.send({{ error }})));

    app.post("/api/{url}", app.permission.check("{lowerCamel}:write"), (req, res) =>
        app.model.{lowerCamel}.create(req.body.{lowerCamel}, (error, item) => res.send({{ error, item }})));

    app.post("/api/{url}/multiple", app.permission.check("{lowerCamel}:upload"), (req, res) => {{
        const data = req.body.multi{UpperCamel};
        const isOverride = req.body.isOverride;
        const dataImported = []
        const handleCreate = index => {{
            if (index >= data.length) res.send({{ data: {{ message: "Upload success", items: dataImported }} }})
            else
                app.model.{lowerCamel}.get({{ {key}: data[index].{key} }}, (error, item) => {{
                    if (error) res.send({{ error }});
                    else if (item) {{
                        if (isOverride == 'TRUE')
                            app.model.{lowerCamel}.update({{ {key}: data[index].{key} }}, data[index], (error, item) => {{
                                if (error) res.send({{ error }});
                                else {{
                                    dataImported.push(item);
                                    handleCreate(index + 1);
                                }}
                            }});
                        else handleCreate(index + 1);
                    }}
                    else app.model.{lowerCamel}.create(data[index], (error, item) => {{
                        if (error) res.send({{ error }});
                        else {{
                            dataImported.push(item);
                            handleCreate(index + 1);
                        }}
                    }});
                }})
        }};
        handleCreate(0);
    }});

    app.put("/api/{url}", app.permission.check("{lowerCamel}:write"), (req, res) =>
        app.model.{lowerCamel}.update(req.body.condition, req.body.changes, (error, item) => res.send({{error, item}})));

    app.uploadHooks.add("{lowerCamel}ImportData", (req, fields, files, params, done) =>
        app.permission.has(req, () => {lowerCamel}ImportData(req, fields, files, params, done), done, "{lowerCamel}:upload"));

    const {lowerCamel}ImportData = (req, fields, files, params, done) => {{
        if (fields.userData && fields.userData[0] && fields.userData[0] == "{lowerCamel}ImportData" && files.{UpperCamel}File && files.{UpperCamel}File.length > 0)
            uploadFile(files.{UpperCamel}File[0].path, done, {ExcelStartRow});
    }};

    uploadFile = (srcPath, sendResponse, index = 2) =>
        app.excel.readFile(srcPath, workbook => {{
            if (workbook) {{
                const worksheet = workbook.getWorksheet(1), data = [], totalRow = worksheet.lastRow.number;
                const handleUpload = index => {{
                    const value = worksheet.getRow(index).values;
                    if (value.length == 0 || index == totalRow + 1) {{
                        app.deleteFile(srcPath);
                        sendResponse({{ data }});
                    }} else {{
                        data.push({{
{controllerUpload}
                        }});
                        handleUpload(index + 1);
                    }}
                }};
                handleUpload(index);
            }} else {{
                app.deleteFile(srcPath);
                sendResponse({{ error: 'Error' }});
            }}
        }}).catch(error => sendResponse({{ error }}));
}};