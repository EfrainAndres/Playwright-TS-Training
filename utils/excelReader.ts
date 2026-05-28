import * as XLSX from 'xlsx';
import * as path from 'path';

export type LoginData = {
    username: string;
    password: string;
    expected: string;
    run: string;
};

export function readExcel(filePath: string, sheetName: string): LoginData[]{

    const fullPath = path.resolve(filePath);
    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json<LoginData>(sheet, { defval: '' });
    return data;
}
