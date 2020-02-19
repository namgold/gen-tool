fullname= 'Danh mục nghỉ công tác'
name = 'Nghỉ công tác'
keyword = ['dm', 'nghi', 'ctac']
schema = {
    'MS_NGHI': { 'type': 'text', 'title': 'Mã nghỉ'},
    'DIEN_GIAI': { 'type': 'text', 'title': 'Diễn giải'}
};
key = "MS_NGHI"
searchFields = ['MA_PL','DIEN_GIAI'] # Note: only search on text field
ExcelStartRow = 2
menuNum = __name__[11:14]