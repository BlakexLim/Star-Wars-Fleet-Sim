'use strict';
const $hero = document.querySelector('.hero');
const $fleet = document.querySelector('.fleet');
const $shipList = document.querySelector('.ship-list');
const $starShip = document.querySelector('.starships');
const $rundown = document.querySelector('.rundown');
const $add = document.querySelector('.fa-plus');
const $toFleet = document.querySelector('.to-fleet');
const $fleetList = document.querySelector('.fleet-list');
if (!$hero) throw new Error('$hero query failed');
if (!$fleet) throw new Error('$fleet query failed');
if (!$shipList) throw new Error('$shipList query failed');
if (!$starShip) throw new Error('$starShip query failed');
if (!$rundown) throw new Error('$rundown query failed');
if (!$add) throw new Error('$recruit query failed');
if (!$toFleet) throw new Error('$toFleet query failed');
if (!$fleetList) throw new Error('$fleetList query failed');
const apiUrl = 'https://www.swapi.tech/api/starships/';
// fetch api data for starship
async function getStarShip() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`${response.status} failed to fetch data`);
    }
    const data = await response.json();
    data.results.forEach((starship) => {
      $starShip?.appendChild(getShipName(starship));
    });
    data.results.forEach((starship) => {
      getShipData(starship);
    });
  } catch (error) {
    console.error('Error fetching data');
    throw error;
  }
}
getStarShip();
// render starship name on webpage
function getShipName(starship) {
  const $shipName = document.createElement('li');
  $shipName.setAttribute('class', 'ship-name');
  $shipName.setAttribute('data-uid', starship.uid);
  $shipName.textContent = starship.name;
  return $shipName;
}
// render starship data on webpage
function getShipData(starship) {
  const $shipContainer = document.createElement('li');
  $shipContainer.setAttribute('class', 'ship-data');
  $shipContainer.setAttribute('data-uid', starship.uid);
  const $shipModel = document.createElement('p');
  $shipModel.textContent = `Model: ${starship.model}`;
  const $shipManufacturer = document.createElement('p');
  $shipManufacturer.textContent = `Manufacturer: ${starship.manufacturer}`;
  const $shipClass = document.createElement('p');
  $shipClass.textContent = `Class: ${starship.starship_class}`;
  const $shipMaxSpd = document.createElement('p');
  $shipMaxSpd.textContent = `Max Atmospheric Speed: ${starship.max_atmosphering_speed}`;
  const $shipHypDrive = document.createElement('p');
  $shipHypDrive.textContent = `HyperDrive Rating: ${starship.hyperdrive_rating}`;
  const $shipCost = document.createElement('p');
  $shipCost.textContent = `Cost: ${starship.cost_in_credits}`;
  // listen for click event to add starships to fleet page
  const $fleetBtn = document.createElement('button');
  $fleetBtn.addEventListener('click', (event) => {
    const $eventTarget = event.target;
    if ($eventTarget.tagName === 'BUTTON') {
      const $recList = document.createElement('li');
      $recList.setAttribute('class', 'fleet-rec');
      $recList.textContent = data.currentShip;
      $fleetList?.appendChild($recList);
      // storedFleet.push();
    }
  });
  $fleetBtn.setAttribute('class', 'add-to-fleet');
  $fleetBtn.textContent = 'Add to fleet';
  $shipContainer.appendChild($shipModel);
  $shipContainer.append($shipManufacturer);
  $shipContainer.append($shipClass);
  $shipContainer.append($shipMaxSpd);
  $shipContainer.append($shipHypDrive);
  $shipContainer.append($shipCost);
  $shipContainer.append($fleetBtn);
  return $shipContainer;
}
// fetch data for specific ship
async function selectShip(uid) {
  const shipApi = `https://www.swapi.tech/api/starships/${uid}`;
  try {
    const response = await fetch(shipApi);
    if (!response.ok) {
      throw new Error(`Failed to fetch property with ID ${uid}`);
    }
    const propertyData = await response.json();
    $rundown?.appendChild(getShipData(propertyData.result.properties));
  } catch (error) {
    console.error('Error fetching property data');
  }
}
// Clicking Starship name will render data on the Rundown section
$starShip.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  const $ships = document.querySelectorAll('.ship-name');
  const $data = document.querySelectorAll('.ship-data');
  if (!$ships) throw new Error('$ships query failed');
  if (!$data) throw new Error('$data query failed');
  if ($eventTarget.tagName === 'LI') {
    const eventAttr = $eventTarget.getAttribute('data-uid');
    if (!eventAttr) return;
    selectShip(eventAttr);
    // Change text color of selected ship to yellow
    for (let i = 0; i < $ships.length; i++) {
      if ($ships[i] === $eventTarget) {
        $ships[i].className = 'ship-name show-clicked';
        data.currentShip = $ships[i].textContent;
      } else {
        $ships[i].className = 'ship-name';
      }
    }
    // Show hide Rundown data
    for (let i = 0; i < $data.length; i++) {
      if ($data[i] === $eventTarget) {
        $data[i].className = 'ship-data';
      } else {
        $data[i].className = 'ship-data hidden';
      }
    }
  }
});
// show landing page when clicking + button on fleet page, hide fleet page
$add.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if ($eventTarget.tagName === 'I') {
    $fleet.className = 'fleet hidden';
    $hero.className = 'hero view';
    $shipList.className = 'ship-list view';
  }
});
// show fleet page when clicking fleet book on landing page, hide landing page
$toFleet.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  console.log($eventTarget.tagName);
  if ($eventTarget.tagName === 'I') {
    $hero.className = 'hero hidden';
    $shipList.className = 'ship-list hidden';
    $fleet.className = 'fleet view';
  }
});
