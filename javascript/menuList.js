export const getMenu = async (setMenuItem) => {
    try {
      // orginal -- don't delele
      const response = await fetch('http://localhost:3100/menu_items');
      const jsonData = await response.json();

		setMenuItem(jsonData)

    } catch (error) {
      console.log(`Error Message: ${error.Message}`);
    }
  };