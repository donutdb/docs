export default async function AlertInfo(params, { safe, render }) {
    return `
    <div style="background: var(--background); padding: 1em; border-radius: 0.2em; border-left: 5px solid var(--links); margin-bottom: 5px;">
        ${params.title ? `
        <div style="margin-bottom: 0.5em; font-weight: bold; font-size: 1.1em;">${await render(params.title)}</div>    
        ` : ""}

        ${await render(params.text)}
    </div>
    `;
}
