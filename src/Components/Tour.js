import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const PokemonTourSteps = [
  {
    id: "1",
    title: "Show Selected Pokemon",
    text: "On Clicking, Shows the details of the selected pokemon",
    position: "right",
    elementId: "show-one",
  },
  {
    id: "2",
    title: "Select Pokemon To Show",
    text: "On Clicking, You will find a list of pokemons. Select a pokemon to see its abilities, height, weight",
    position: "right",
    elementId: "select-pokemon",
  },
  {
    id: "3",
    title: "Show All Pokemons",
    text: "On Clicking, shows the details of the all the pokemons available",
    position: "right",
    elementId: "show-all",
  },
  {
    id: "4",
    title: "Add Pokemon To Favourite List",
    text: "On clicking, it sdds the pokemon to Favourite List ",
    position: "right",
    elementId: "add-fav-pokemon",
  },
  {
    id: "4",
    title: "Show Favourite Pokemon",
    text: "On Clicking, shows the details of the all the favourite pokemons",
    position: "right",
    elementId: "favourites",
  },
];
export const getTourSteps = (tourSteps) => {
  return tourSteps.map((tourPopUp) => {
    const element = document.getElementById(tourPopUp.elementId);
    console.log('element: ', element);
    return {
      element,
      popover: {
        element,
        title: tourPopUp.title,
        description: tourPopUp.text,
        side: tourPopUp.position,
        align: "start",
      },
    };
  });
};

export const initTourGuide = (tourSteps) => {
  const driverObj = driver({
    popoverClass: "driverjs-theme",
    showButtons: ["next", "previous", "close"],
    nextBtnText: "Next",
    prevBtnText: "Previous",
    doneBtnText: "Finish",
    overlayColor: "#484848",
    showProgress: true,
    steps: getTourSteps(tourSteps),
    onDestroyStarted: () => {
      if (!driverObj.hasNextStep()) {
        driverObj.destroy();
      }
    },
    onCloseClick: () => {
      driverObj.destroy();
    },
  });

  driverObj.drive();
};
