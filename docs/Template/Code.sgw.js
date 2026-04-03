export default function Code(params, { safe }) {
    return `
    <code>
        ${safe(params.code)}
    </code>
    `;
}
