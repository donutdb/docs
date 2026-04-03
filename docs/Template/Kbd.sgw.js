export default function Kbd(params, { safe }) {
    return `
    <kbd>${safe(params.key)}</kbd>
    `;
}
