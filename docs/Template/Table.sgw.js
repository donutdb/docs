export default async function Table(params, { safe, render }) {
    let maxRow = 0;
    let maxCol = 0;

    const headers = {};
    const parsed = {};

    for (const [key, value] of Object.entries(params)) {
        const [rowStr, colStr] = key.split("/");

        const col = parseInt(colStr, 10);

        // Header handling
        if (rowStr === "h") {
            if (isNaN(col)) continue;
            headers[col] = value;
            if (col > maxCol) maxCol = col;
            continue;
        }

        // Normal row handling
        const row = parseInt(rowStr, 10);
        if (isNaN(row) || isNaN(col)) continue;

        if (!parsed[row]) parsed[row] = {};
        parsed[row][col] = value;

        if (row > maxRow) maxRow = row;
        if (col > maxCol) maxCol = col;
    }

    let html = `<table>\n`;

    if (Object.keys(headers).length > 0) {
        html += `<thead>\n<tr>\n`;
        for (let c = 1; c <= maxCol; c++) {
            const cellValue = headers[c] ?? "";
            html += `<th>${await render(cellValue)}</th>\n`;
        }
        html += `</tr>\n</thead>\n`;
    }

    html += `<tbody>\n`;

    for (let r = 1; r <= maxRow; r++) {
        html += `<tr>\n`;

        for (let c = 1; c <= maxCol; c++) {
            const cellValue = parsed[r]?.[c] ?? "";
            html += `<td>${await render(cellValue)}</td>\n`;
        }

        html += `</tr>\n`;
    }

    html += `</tbody>\n</table>`;

    return html;
}
