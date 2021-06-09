const availableConnectors: string[] = [
    'facebook',
    'instagram'
]
let connectors: Array<Connector> = [];

export interface Connector {
    name: string;
    hostname: string;
    requestUrl: string;
    actions: Array<string>;
    check: Function;
    request: Function;
    download: Function;
};

async function importConnector(connectorName: string) {
    const connector = await import(`./${connectorName}.ts`).catch(
        function (e) {
            console.log(`Could not find the ${connectorName} connector`);
            return false;
        }
    );
    return connector;
}

export const buildCon = (async () => {
    for (const c of availableConnectors) {
        const connector = await importConnector(c);
        if (connector !== false) {
            connectors.push(connector);
            console.log(`Imported the ${c} connector.`)
        }
    }
    return connectors;
})();