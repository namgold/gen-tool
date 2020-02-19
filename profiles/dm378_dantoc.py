fullname= 'Danh mục dân tộc'
name = 'Dân tộc'
keyword = ['dm', 'dan','toc']
schema = {
    'MA_DAN_TOC': { 'type': 'text', 'title': 'Mã dân tộc'},
    'TEN_DAN_TOC': { 'type': 'text', 'title': 'Tên dân tộc'}
};
key = "MA_DAN_TOC"
searchFields = ['TEN_DAN_TOC'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]