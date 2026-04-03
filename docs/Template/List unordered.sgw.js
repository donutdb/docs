export default function Code(params, { safe }) {
    const keys = Object.keys(params).sort((a, b) => {
        const na = Number(a);
        const nb = Number(b);

        const aIsNum = !Number.isNaN(na);
        const bIsNum = !Number.isNaN(nb);

        if (aIsNum && bIsNum) {
            return na - nb;
        }

        if (aIsNum) return -1;
        if (bIsNum) return 1;

        return a.localeCompare(b);
    });

    const items = keys.map(k => `<li>${safe(params[k])}</li>`);

    return `<ul>${items.join("")}</ul>`;
}
