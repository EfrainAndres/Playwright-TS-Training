import path from "path";
import { readCSV } from "../utils/csvReader";
import { readExcel } from "../utils/excelReader";
import fs from "fs";

export function readData(filePath: string, sheetName?: string) {
    const ext = path.extname(filePath).toLocaleLowerCase();

    switch (ext) {
        case '.csv':
            console.log('Reading CSV file');
            return readCSV(filePath);
        case '.xlsx':
            console.log('Reading Excel file');
            return readExcel(filePath, sheetName || 'Sheet1');
        case '.json':
            console.log('Reading JSON file');
            const JSONData = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(JSONData);
        default:
            throw new Error(`Unsupported file extension: ${ext}`);
    }
}
