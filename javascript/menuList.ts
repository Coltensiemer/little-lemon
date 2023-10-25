


const databaseImages = [ 
  {id: 1, name: "Grilled Chicken Salad", image: require("../assets/littlelemonIcon/grilled_chicken_salad.jpeg")},
  {id: 2, name: "Carrot Cake", image: require("../assets/littlelemonIcon/carrot_cake.jpeg")},
  {id: 3, name: "Coke", image: require("../assets/littlelemonIcon/coke.jpeg")},
  {id: 4, name: "Hummus", image: require("../assets/littlelemonIcon/hummus.jpeg")},
  {id: 5, name: "Spinach Artichoke Dip", image: require("../assets/littlelemonIcon/spinach_artichoke_dip.jpeg")},
  {id: 6, name: "Fried Calamari Rings", image: require("../assets/littlelemonIcon/fried_calamari_rings.jpeg")},
  {id: 7, name: "Fried Mushroom", image: require("../assets/littlelemonIcon/fried_mushrooms.jpeg")},
  {id: 8, name: "Greek", image: require("../assets/littlelemonIcon/greek_salad.jpeg")},
  {id: 9, name: "Caesar", image: require("../assets/littlelemonIcon/caesar_salad.jpeg")},
  {id: 10, name: "Tuna Salad", image: require("../assets/littlelemonIcon/tuna-salad.jpeg")},
  {id: 10, name: "Beer", image: require("../assets/littlelemonIcon/beer.jpeg")},
  {id: 11, name: "Water", image: require("../assets/littlelemonIcon/water.jpeg")},
  {id: 12, name: "Iced Tea", image: require("../assets/littlelemonIcon/ice_tea.jpeg")},
]

export interface MenuState {
  id: number;
  title: string;
  data: [
    {
      id: number;
      menu_id: number;
      item_title: string;
      price: number;
      image: string, 
    }
  ];
}

export function editMenuData(data): MenuState {
  const theData = data.reduce((acc, item) => {
    const { menu_id, menu_title, item_title, price, id } = item;
    const existingSection = acc.find((section) => section.title === menu_title);

    const matchImage = databaseImages.find((imageitem) => { 
      return imageitem.name === item_title
    })

    let image = null
    if (matchImage) { 
      image = matchImage.image
    }

    if (existingSection) {
      existingSection.data.push({ id, menu_id, item_title, price, image });
    } else {
      acc.push({
        id: menu_id,
        title: menu_title,
        data: [{ id, menu_id, item_title, price, image }],
      });
    }

    return acc;
  }, []);

  return theData;
}


export const getMenu = async (state: any) => {
    try {
      // orginal -- don't delele
      const response = await fetch('http://localhost:3100/menu_items');
      const jsonData = await response.json();

      state(editMenuData(jsonData))
    } catch (error) {
      console.log(`Error Message: ${error.Message}`);
    }
  };