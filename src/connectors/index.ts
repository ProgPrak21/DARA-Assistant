type cconfig = {
    name: string;
    hostname: string;
    requestUrl: string;
  };  

let connectors:any[] = [
    'facebook',
    'instagram'
]

async function importConnector(serviceName: string) {
    const connector = await import(`${serviceName}.ts`).catch(
        function (e) {
            console.log("Could not find connector");
            return false;
        }
    );
    return connector;
}

//const cconfig:Object[]=[];


export async function buildConfig() {
    for (let i in connectors) {
        let connector = await importConnector(connectors[i]);
        if (connector !== false) {
            connectors[i] = connector;
            //cconfig.push(connector.cconfig)
            //export connector as connector.name;
            // export * as connector.cconfig.name from `${entry}.ts`;
            // export {connector} ;
        }
    }
    return connectors
}

//export * as facebook from './facebook';