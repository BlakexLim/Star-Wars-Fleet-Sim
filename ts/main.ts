async function apiData(): Promise<void> {
  const response = await fetch('https://www.swapi.tech/api/starships/2');
  const data = await response.json();
  console.log(data);
}
apiData();
