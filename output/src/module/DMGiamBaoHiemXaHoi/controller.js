module.exports = app => {
    const parentMenu = { index: 3000, title: "Danh mục", icon: "fa-pagelines" },
        menu = {
            parentMenu,
            menus: { 3379: { title: "Giảm bảo hiểm xã hội", link: "/user/danh-muc/giam-bao-hiem-xa-hoi" } },
        };
    app.permission.add(
        { name: "dmGiamBaoHiemXaHoi:read", menu: menu },
        { name: "dmGiamBaoHiemXaHoi:write", menu: menu },
        { name: "dmGiamBaoHiemXaHoi:delete", menu: menu },
        { name: "dmGiamBaoHiemXaHoi:upload", menu: menu }
    );

    app.get("/user/danh-muc/giam-bao-hiem-xa-hoi", app.permission.check("dmGiamBaoHiemXaHoi:read"), app.templates.admin);
    app.get("/user/danh-muc/giam-bao-hiem-xa-hoi/upload", app.permission.check("dmGiamBaoHiemXaHoi:upload"), app.templates.admin);

    // APIs -----------------------------------------------------------------------------------------------------------------------------------------
    app.get("/api/danh-muc/giam-bao-hiem-xa-hoi/page/:pageNumber/:pageSize", app.permission.check("dmGiamBaoHiemXaHoi:read"), (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
                pageSize = parseInt(req.params.pageSize),
                condition = req.query.condition ? req.query.condition : {};
        app.model.dmGiamBaoHiemXaHoi.getPage(pageNumber, pageSize, condition, (error, page) => res.send({ error, page }));
    });

    app.delete("/api/danh-muc/giam-bao-hiem-xa-hoi", app.permission.check("dmGiamBaoHiemXaHoi:delete"), (req, res) =>
        app.model.dmGiamBaoHiemXaHoi.delete({ ma: req.body.ma }, error => res.send({ error })));

    app.post("/api/danh-muc/giam-bao-hiem-xa-hoi", app.permission.check("dmGiamBaoHiemXaHoi:write"), (req, res) =>
        app.model.dmGiamBaoHiemXaHoi.create(req.body.dmGiamBaoHiemXaHoi, (error, item) => res.send({ error, item })));

    app.post("/api/danh-muc/giam-bao-hiem-xa-hoi/multiple", app.permission.check("dmGiamBaoHiemXaHoi:upload"), (req, res) => {
        const data = req.body.multiDMGiamBaoHiemXaHoi;
        const isOverride = req.body.isOverride;
        const dataImported = []
        const handleCreate = index => {
            if (index >= data.length) res.send({ data: { message: "Upload success", items: dataImported } })
            else
                app.model.dmGiamBaoHiemXaHoi.get({ ma: data[index].ma }, (error, item) => {
                    if (error) res.send({ error });
                    else if (item) {
                        if (isOverride == 'TRUE')
                            app.model.dmGiamBaoHiemXaHoi.update({ ma: data[index].ma }, data[index], (error, item) => {
                                if (error) res.send({ error });
                                else {
                                    dataImported.push(item);
                                    handleCreate(index + 1);
                                }
                            });
                        else handleCreate(index + 1);
                    }
                    else app.model.dmGiamBaoHiemXaHoi.create(data[index], (error, item) => {
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

    app.put("/api/danh-muc/giam-bao-hiem-xa-hoi", app.permission.check("dmGiamBaoHiemXaHoi:write"), (req, res) =>
        app.model.dmGiamBaoHiemXaHoi.update(req.body.condition, req.body.changes, (error, item) => res.send({error, item})));

    app.uploadHooks.add("dmGiamBaoHiemXaHoiImportData", (req, fields, files, params, done) =>
        app.permission.has(req, () => dmGiamBaoHiemXaHoiImportData(req, fields, files, params, done), done, "dmGiamBaoHiemXaHoi:upload"));

    const dmGiamBaoHiemXaHoiImportData = (req, fields, files, params, done) => {
        if (fields.userData && fields.userData[0] && fields.userData[0] == "dmGiamBaoHiemXaHoiImportData" && files.DMGiamBaoHiemXaHoiFile && files.DMGiamBaoHiemXaHoiFile.length > 0)
            uploadFile(files.DMGiamBaoHiemXaHoiFile[0].path, done, 2);
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