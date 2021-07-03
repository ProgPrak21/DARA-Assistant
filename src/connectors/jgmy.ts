import * as con from ".";


export const jgmd = async () => {
  const connectors = Object.values(con);

  const url = "https://raw.githubusercontent.com/justgetmydata/jgmd/master/_data/sites.json"
  let response = await fetch(url).then(response => response.json())

  response.forEach((element: any) => {
    element.description = element.notes_en;
    element.requestUrl = element.url;
    element.hostname = element.url;
    element.actions = [];
  });

  const merge = (arr1: Array<any>, arr2: Array<any>, prop: string) =>
    arr1.filter(
      elArr1 => !arr2.find(
        elArr2 => elArr1[prop].toUpperCase() === elArr2[prop].toUpperCase()
      )
    ).concat(arr2).sort((a, b) => a.name.localeCompare(b.name));

  const merged = merge(response, connectors, "name");
  console.log("Response:", response);
  console.log("Merge:", merge(response, connectors, "name"));

  return merged;
}