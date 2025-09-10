import * as XLSX from 'xlsx';

export const fetchAllSheets = async (filePath) => {
  const response = await fetch(filePath);
  const data = await response.arrayBuffer();
  const workbook = XLSX.read(data);

  const sheets = {};
  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    sheets[sheetName] = XLSX.utils.sheet_to_json(sheet);
  });

  return sheets;
};
