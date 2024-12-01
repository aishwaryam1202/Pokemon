import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { POKEMON_VIEW_TYPE } from './../Constants/PokemonViewConstants';

export const PokemonTourSteps = [
  {
    id: "0",
    title: "Welcome to the Pokémon World",
    text: "Explore and manage your favorite Pokémon! Let me guide you through the features of this app.",
    position: "right",
    elementId: "",
  },
  {
    id: "1",
    title: "View Selected Pokémon",
    text: "Click here to see detailed information about the Pokémon you've selected.",
    position: "right",
    elementId: POKEMON_VIEW_TYPE.VIEW_ONE_POKEMON,
  },
  {
    id: "2",
    title: "Choose a Pokémon to Explore",
    text: "Click here to browse a list of Pokémon. Select one to view its abilities, height, and weight.",
    position: "right",
    elementId: "select-pokemon",
  },
  {
    id: "3",
    title: "View All Pokémon",
    text: "Click here to see details of all available Pokémon in the app.",
    position: "right",
    elementId: POKEMON_VIEW_TYPE.VIEW_ALL_POKEMON,
  },
  {
    id: "4",
    title: "Add Pokémon to Favorites",
    text: "Click here to add a Pokémon to your favorites list for quick access later.",
    position: "right",
    elementId: "add-fav-pokemon",
  },
  {
    id: "5", // Fixed duplicate ID issue
    title: "View Favorite Pokémon",
    text: "Click here to see all the Pokémon you have added to your favorites.",
    position: "right",
    elementId: POKEMON_VIEW_TYPE.VIEW_FAVOURITE_POKEMON,
  },
];

export const getTourSteps = (tourSteps) => {
  return tourSteps.map((tourPopUp) => {
    const element = document.getElementById(tourPopUp.elementId);
    console.log("element: ", element);
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
