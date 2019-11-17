    app.upload{UpperCamel}File = (req, srcPath, sendResponse) => {{
        app.excel.readFile(srcPath, workbook => {{
            if (workbook) {{
                const worksheet = workbook.getWorksheet(1), points = [], totalRow = worksheet.lastRow.number;
                const handleUpload = (index = 2) => {{
                    const value = worksheet.getRow(index).values;
                    if (value.length == 0 || index == totalRow + 1) {{
                        app.deleteFile(srcPath);
                        sendResponse({{ points }});
                    }} else {{
                        const element = {{}};
                        {schemaArray}.forEach((key, index) => {{
                            element[key] = value[index + 1];
                        }});
                        points.push(element);
                        handleUpload(index + 1);
                    }}
                }};
                handleUpload();
            }} else {{
                app.deleteFile(srcPath);
                sendResponse({{ error: 'Error' }});
            }}
        }});
    }};
