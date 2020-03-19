module.exports = app => {
    const parentMenu = { index: 3000, title: "Danh mục", icon: "fa-pagelines" },
        menu = {
            parentMenu,
            menus: { 3380: { title: "Tăng bảo hiểm xã hội", link: "/user/danh-muc/tang-bao-hiem-xa-hoi" } },
        };
    app.permission.add(
        { name: "dmTangBaoHiemXaHoi:read", menu: menu },
        { name: "dmTangBaoHiemXaHoi:write", menu: menu },
        { name: "dmTangBaoHiemXaHoi:delete", menu: menu },
        { name: "dmTangBaoHiemXaHoi:upload", menu: menu }
    );

    app.get("/user/danh-muc/tang-bao-hiem-xa-hoi", app.permission.check("dmTangBaoHiemXaHoi:read"), app.templates.admin);
    app.get("/user/danh-muc/tang-bao-hiem-xa-hoi/upload", app.permission.check("dmTangBaoHiemXaHoi:upload"), app.templates.admin);

    // APIs -----------------------------------------------------------------------------------------------------------------------------------------
    app.get("/api/danh-muc/tang-bao-hiem-xa-hoi/page/:pageNumber/:pageSize", app.permission.check("dmTangBaoHiemXaHoi:read"), (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
                pageSize = parseInt(req.params.pageSize),
                condition = req.query.condition ? req.query.condition : {};
        app.model.dmTangBaoHiemXaHoi.getPage(pageNumber, pageSize, condition, (error, page) => res.send({ error, page }));
    });

    app.delete("/api/danh-muc/tang-bao-hiem-xa-hoi", app.permission.check("dmTangBaoHiemXaHoi:delete"), (req, res) =>
        app.model.dmTangBaoHiemXaHoi.delete({ ma: req.body.ma }, error => res.send({ error })));

    app.post("/api/danh-muc/tang-bao-hiem-xa-hoi", app.permission.check("dmTangBaoHiemXaHoi:write"), (req, res) =>
        app.model.dmTangBaoHiemXaHoi.create(req.body.dmTangBaoHiemXaHoi, (error, item) => res.send({ error, item })));

    app.post("/api/danh-muc/tang-bao-hiem-xa-hoi/multiple", app.permission.check("dmTangBaoHiemXaHoi:upload"), (req, res) => {
        const data = req.body.multiDMTangBaoHiemXaHoi;
        const isOverride = req.body.isOverride;
        const dataImported = []
        const handleCreate = index => {
            if (index >= data.length) res.send({ data: { message: "Upload success", items: dataImported } })
            else
                app.model.dmTangBaoHiemXaHoi.get({ ma: data[index].ma }, (error, item) => {
                    if (error) res.send({ error });
                    else if (item) {
                        if (isOverride == 'TRUE')
                            app.model.dmTangBaoHiemXaHoi.update({ ma: data[index].ma }, data[index], (error, item) => {
                                if (error) res.send({ error });
                                else {
                                    dataImported.push(item);
                                    handleCreate(index + 1);
                                }
                            });
                        else handleCreate(index + 1);
                    }
                    else app.model.dmTangBaoHiemXaHoi.create(data[index], (error, item) => {
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

    app.put("/api/danh-muc/tang-bao-hiem-xa-hoi", app.permission.check("dmTangBaoHiemXaHoi:write"), (req, res) =>
        app.model.dmTangBaoHiemXaHoi.update(req.body.condition, req.body.changes, (error, item) => res.send({error, item})));

    app.uploadHooks.add("dmTangBaoHiemXaHoiImportData", (req, fields, files, params, done) =>
        app.permission.has(req, () => dmTangBaoHiemXaHoiImportData(req, fields, files, params, done), done, "dmTangBaoHiemXaHoi:upload"));

    const dmTangBaoHiemXaHoiImportData = (req, fields, files, params, done) => {
        if (fields.userData && fields.userData[0] && fields.userData[0] == "dmTangBaoHiemXaHoiImportData" && files.DMTangBaoHiemXaHoiFile && files.DMTangBaoHiemXaHoiFile.length > 0)
            uploadFile(files.DMTangBaoHiemXaHoiFile[0].path, done, 2);
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
                            'moTa': value[2],
                            'kichHoat': value[3].toLowerCase() === 'true' ? 1 : 0
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