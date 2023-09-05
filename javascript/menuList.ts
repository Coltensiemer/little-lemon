import { json } from "express";

export interface MenuState {
  id: number;
  title: string;
  data: [
    {
      id: number;
      menu_id: number;
      item_title: string;
      price: number;
    }
  ];
}

export function editMenuData(data): MenuState {
  const theData = data.reduce((acc, item) => {
    const { menu_id, menu_title, item_title, price, id } = item;
    const existingSection = acc.find((section) => section.title === menu_title);

    if (existingSection) {
      existingSection.data.push({ id, menu_id, item_title, price });
    } else {
      acc.push({
        id: menu_id,
        title: menu_title,
        data: [{ id, menu_id, item_title, price }],
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