import { File, Type } from './types';

export function getLastColumnOfSpecifiedRow(
  sheet,
  specifiedRow: number,
): number {
  const rowValues = sheet
    .getRange(specifiedRow, 1, 1, sheet.getLastColumn())
    .getValues()[0];
  return rowValues.filter(String).length;
}

export function convertByTypes(
  types: Type[],
  rowColumn: string | number,
  index: number,
): string | number {
  if (rowColumn === 'NULL') {
    return 'nil';
  }
  if (types[index] === 'bool') {
    if (rowColumn === 0) {
      return 'false';
    } else if (rowColumn === 1) {
      return 'true';
    }
  }
  if (types[index] === 'string') {
    return '"' + rowColumn + '"';
  }
  return rowColumn;
}

export function saveFiles(files: File[]): void {
  // HTMLテンプレートを使って、SpreadSheet上にダウンロードリンク画面を表示させる
  const template = HtmlService.createTemplateFromFile('download');
  template.results = files;
  const html = template
    .evaluate()
    .setHeight(260)
    .setWidth(400);
  SpreadsheetApp.getUi().showModalDialog(html, 'seed ダウンロード');
}
