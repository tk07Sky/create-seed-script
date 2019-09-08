import { Entry, File } from './types';
import {
  getLastColumnOfSpecifiedRow,
  convertByTypes,
  saveFiles,
} from './utils';

const NEW_SHEET_MAIN_MESSAGE =
  'B2にモデル名、D2にseedモード(seed or seed_once)、4行目にカラム名、5行目に型、6行目以下にテーブル要素を入力してください';

// ファイルオープン時
function onOpen() {
  // メニューバーにカスタムメニューを追加
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const entries: Entry[] = [
    {
      displayName: 'シート追加',
      functionName: 'addSheet',
    },
    {
      displayName: 'seed出力',
      functionName: 'createSeeds',
    },
  ];
  spreadsheet.addMenu('seed作成コマンド', entries);
}

function addSheet() {
  const template = HtmlService.createTemplateFromFile('create-sheet');
  const html = template
    .evaluate()
    .setHeight(260)
    .setWidth(400);
  SpreadsheetApp.getUi().showModalDialog(html, 'シートの追加');
}

function createNewSheet(sheetName: string): void {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const beforeUpdateSheetsLength = spreadsheet.getSheets().length;
  spreadsheet.insertSheet(sheetName, beforeUpdateSheetsLength);
  const newSheet = spreadsheet.getSheets()[beforeUpdateSheetsLength];
  newSheet.getRange('A1').setValue(NEW_SHEET_MAIN_MESSAGE);
  newSheet.getRange('A2').setValue('ModelName');
  newSheet.getRange('B2').setValue(sheetName);
  newSheet.getRange('C2').setValue('mode');
  newSheet.getRange('D2').setValue('seed');
  newSheet.getRange('A4').setValue('id');
  newSheet.getRange('A5').setValue('int');
}

function createSeeds() {
  const activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = activeSpreadSheet.getSheets();
  const files: File[] = [];
  sheets.forEach(sheet => {
    const lastRowNumber = sheet.getLastRow();
    const lastColNumber = getLastColumnOfSpecifiedRow(sheet, 4);

    // データ部分のみ取得
    const tableName = sheet.getRange('B2').getValue();
    const seedMode = sheet.getRange('D2').getValue();
    const columns = sheet.getRange(4, 1, 1, lastColNumber).getValues()[0];
    const types = sheet.getRange(5, 1, 1, lastColNumber).getValues()[0];
    const range = sheet.getRange(6, 1, lastRowNumber - 5, lastColNumber);
    const values = range.getValues();

    const seeds = values.map(row => {
      let output = '\n';
      output += tableName + '.' + seedMode + ' do |s|\n';
      row.forEach((rowColumn, index) => {
        output +=
          '    s.' +
          columns[index] +
          ' = ' +
          convertByTypes(types, rowColumn, index) +
          '\n';
      });
      output += 'end\n\n';
      return output;
    });

    const file: File = {
      name: tableName,
      output: seeds.join(''),
    };

    files.push(file);
  });
  saveFiles(files);
}
