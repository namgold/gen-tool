module.exports = app => {
    const parentMenu = { index: 4000, title: "Quá trình", icon: "fa-pagelines" },
        menu = {
            parentMenu,
            menus: { 4104: { title: "Khen thưởng", link: "/user/qua-trinh/khen-thuong" } },
        };
    app.permission.add(
        { name: "qtKhenThuong:read", menu: menu },
        { name: "qtKhenThuong:write", menu: menu },
        { name: "qtKhenThuong:delete", menu: menu },
        { name: "qtKhenThuong:upload", menu: menu }
    );

    app.get("/user/qua-trinh/khen-thuong", app.permission.check("qtKhenThuong:read"), app.templates.admin);
    app.get("/user/qua-trinh/khen-thuong/upload", app.permission.check("qtKhenThuong:upload"), app.templates.admin);

    // APIs -----------------------------------------------------------------------------------------------------------------------------------------
    app.get("/api/qua-trinh/khen-thuong/page/:pageNumber/:pageSize", app.permission.check("qtKhenThuong:read"), (req, res) => {
        const pageNumber = parseInt(req.params.pageNumber),
                pageSize = parseInt(req.params.pageSize),
                condition = req.query.condition ? req.query.condition : {};
        app.model.qtKhenThuong.getPage(pageNumber, pageSize, condition, (error, page) => res.send({ error, page }));
    });

    app.delete("/api/qua-trinh/khen-thuong", app.permission.check("qtKhenThuong:delete"), (req, res) =>
        app.model.qtKhenThuong.delete({ shcc: req.body.shcc }, error => res.send({ error })));

    app.post("/api/qua-trinh/khen-thuong", app.permission.check("qtKhenThuong:write"), (req, res) =>
        app.model.qtKhenThuong.create(req.body.qtKhenThuong, (error, item) => res.send({ error, item })));

    app.post("/api/qua-trinh/khen-thuong/multiple", app.permission.check("qtKhenThuong:upload"), (req, res) => {
        const data = req.body.multiQTKhenThuong;
        const isOverride = req.body.isOverride;
        const dataImported = []
        const handleCreate = index => {
            if (index >= data.length) res.send({ data: { message: "Upload success", items: dataImported } })
            else
                app.model.qtKhenThuong.get({ shcc: data[index].shcc }, (error, item) => {
                    if (error) res.send({ error });
                    else if (item) {
                        if (isOverride == 'TRUE')
                            app.model.qtKhenThuong.update({ shcc: data[index].shcc }, data[index], (error, item) => {
                                if (error) res.send({ error });
                                else {
                                    dataImported.push(item);
                                    handleCreate(index + 1);
                                }
                            });
                        else handleCreate(index + 1);
                    }
                    else app.model.qtKhenThuong.create(data[index], (error, item) => {
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

    app.put("/api/qua-trinh/khen-thuong", app.permission.check("qtKhenThuong:write"), (req, res) =>
        app.model.qtKhenThuong.update(req.body.condition, req.body.changes, (error, item) => res.send({error, item})));

    app.uploadHooks.add("qtKhenThuongImportData", (req, fields, files, params, done) =>
        app.permission.has(req, () => qtKhenThuongImportData(req, fields, files, params, done), done, "qtKhenThuong:upload"));

    const qtKhenThuongImportData = (req, fields, files, params, done) => {
        if (fields.userData && fields.userData[0] && fields.userData[0] == "qtKhenThuongImportData" && files.QTKhenThuongFile && files.QTKhenThuongFile.length > 0)
            uploadFile(files.QTKhenThuongFile[0].path, done, 2);
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
                            'shcc': value[1],
                            'stt': value[2],
                            'maKhenThuong': value[3],
                            'namKhenThuong': value[4],
                            'danhHieuKhenThuong': value[5],
                            'quyetDinhKhenThuong': value[6],
                            'ngayKhenThuong': value[7],
                            'capKhenThuong': value[8],
                            'ngayNhapHoSo': value[9]
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