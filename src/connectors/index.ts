let connectors:any[] = [
    'facebook',
    'instagram'
]

async function importConnector(serviceName: string) {
    const connector = await import(`./${serviceName}.ts`).catch(
        function (e) {
            console.log(`Could not find the ${serviceName} connector`);
            return false;
        }
    );
    return connector;
}

export async function buildConfig() {
    for (let i in connectors) {
        let connector = await importConnector(connectors[i]);
        if (connector !== false) {
            connectors[i] = connector;
            console.log(`Imported the ${connectors[i].name} connector.`)
        }
    }
    return connectors
}