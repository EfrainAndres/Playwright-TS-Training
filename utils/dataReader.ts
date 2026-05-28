import path from "path";
import { readCSV } from "../utils/csvReader";
import { readExcel } from "../utils/excelReader";
import fs from "fs";

export function readData(filePath: string, sheetName?: string) {
    const ext = path.extname(filePath).toLocaleLowerCase();

    switch (ext) {
        case '.csv':
            return readCSV(filePath);
        case '.xlsx':
            return readExcel(filePath, sheetName || 'Sheet1');
        case '.json':
            const JSONData = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(JSONData);
        default:
            throw new Error(`Unsupported file extension: ${ext}`);
    }
}
