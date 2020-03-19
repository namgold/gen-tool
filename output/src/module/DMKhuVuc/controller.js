module.exports = app => {
    const parentMenu = { index: 3000, title: "Danh mục", icon: "fa-pagelines" },
        menu = {
            parentMenu,
            menus: { 3354: { title: "Khu vực", link: "/user/danh-muc/khu-vuc" } },
        };
    app.permission.add(
        { name: "dmKhuVuc:read", menu: menu },
        { name: "dmKhuVuc:write", menu: menu },
        { name: "dmKhuVuc:delete", menu: menu },
        { name: "dmKhuVuc:upload", menu: menu }
    );

    app.get("/user/danh-muc/khu-vuc", app.permission.check("dmKhuVuc:read"), app.templates.admin);
    app.get("/user/danh-muc/khu-vuc/upload", app.permission.check("dmKhuVuc:upload"), app.templates.admin);

    // APIs -----------------------------------------------------------------------------------------------------------------------------------------
    app.get("/api/danh-muc/khu-vuc/page/:pageNumber/:pageSize", app.permission.check("dmKhuVuc:read"), (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
                pageSize = parseInt(req.params.pageSize),
                condition = req.query.condition ? req.query.condition : {};
        app.model.dmKhuVuc.getPage(pageNumber, pageSize, condition, (error, page) => res.send({ error, page }));
    });

    app.delete("/api/danh-muc/khu-vuc", app.permission.check("dmKhuVuc:delete"), (req, res) =>
        app.model.dmKhuVuc.delete({ ma: req.body.ma }, error => res.send({ error })));

    app.post("/api/danh-muc/khu-vuc", app.permission.check("dmKhuVuc:write"), (req, res) =>
        app.model.dmKhuVuc.create(req.body.dmKhuVuc, (error, item) => res.send({ error, item })));

    app.post("/api/danh-muc/khu-vuc/multiple", app.permission.check("dmKhuVuc:upload"), (req, res) => {
        const data = req.body.multiDMKhuVuc;
        const isOverride = req.body.isOverride;
        const dataImported = []
        const handleCreate = index => {
            if (index >= data.length) res.send({ data: { message: "Upload success", items: dataImported } })
            else
                app.model.dmKhuVuc.get({ ma: data[index].ma }, (error, item) => {
                    if (error) res.send({ error });
                    else if (item) {
                        if (isOverride == 'TRUE')
                            app.model.dmKhuVuc.update({ ma: data[index].ma }, data[index], (error, item) => {
                                if (error) res.send({ error });
                                else {
                                    dataImported.push(item);
                                    handleCreate(index + 1);
                                }
                            });
                        else handleCreate(index + 1);
                    }
                    else app.model.dmKhuVuc.create(data[index], (error, item) => {
                        if (error) res.send({ error });
                        else {
                            dataImported.push(item);
                            handleCreate(index + 1);
                        }
                    });
                })
        };
        handleCreate(0);
    });

    app.put("/api/danh-muc/khu-vuc", app.permission.check("dmKhuVuc:write"), (req, res) =>
        app.model.dmKhuVuc.update(req.body.condition, req.body.changes, (error, item) => res.send({error, item})));

    app.uploadHooks.add("dmKhuVucImportData", (req, fields, files, params, done) =>
        app.permission.has(req, () => dmKhuVucImportData(req, fields, files, params, done), done, "dmKhuVuc:upload"));

    const dmKhuVucImportData = (req, fields, files, params, done) => {
        if (fields.userData && fields.userData[0] && fields.userData[0] == "dmKhuVucImportData" && files.DMKhuVucFile && files.DMKhuVucFile.length > 0)
            uploadFile(files.DMKhuVucFile[0].path, done, 2);
    };

    uploadFile = (srcPath, sendResponse, index = 2) =>
        app.excel.readFile(srcPath, workbook => {
            if (workbook) {
                const worksheet = workbook.getWorksheet(1), data = [], totalRow = worksheet.lastRow.number;
                const handleUpload = index => {
                    const value = worksheet.getRow(index).values;
                    if (value.length == 0 || index == totalRow + 1) {
                        app.deleteFile(srcPath);
                        sendResponse({ data });
                    } else {
                        data.push({
                            'ma': value[1],
                            'ten': value[2],
                            'territory': value[3],
                            'maChau': value[4],
                            'kichHoat': value[5].toLowerCase() === 'true' ? 1 : 0
                        });
                        handleUpload(index + 1);
                    }
                };
                handleUpload(index);
            } else {
                app.deleteFile(srcPath);
                sendResponse({ error: 'Error' });
            }
        }).catch(error => sendResponse({ error }));
};