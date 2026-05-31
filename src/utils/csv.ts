const UTF8_BOM = String.fromCharCode(0xfeff); // UTF-8 BOM (U+FEFF) — 엑셀이 한글을 깨짐 없이 읽게 함
const CSV_DELIMITER = ',';
const CSV_LINE_BREAK = '\r\n';

function escapeCsvField(value: string | number): string {
  const str = String(value);
  if (/["\r\n,]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCsv(fileName: string, headers: string[], rows: (string | number)[][]): void {
  const lines = [headers, ...rows].map((row) => row.map(escapeCsvField).join(CSV_DELIMITER));
  const content = UTF8_BOM + lines.join(CSV_LINE_BREAK);
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
