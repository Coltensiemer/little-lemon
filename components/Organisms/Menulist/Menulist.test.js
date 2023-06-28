import React from 'react';
import renderer from 'react-test-renderer'
import Menulist from './Menulist';
import { editData } from './Menulist';



test('Takes in data and transform data to render proper structure', ()=> { 

	const data = [	{
		"menu_title": "Appetizers",
		"menu_id": 1,
		"item_title": "Hummus",
		"price": "10.00",
		"id": 2
	}, ]

	const expectedOutput = [ 
		{ 
			id:1,
			title: 'Appetizers', 
			data: [ 
				{ 
					id:2, 
					menu_id: 1, 
					item_title: 'Hummus',
					price: '10.00'
				}
			]
		}
	]

	const result = editData(data);

	expect(result).toEqual(expectedOutput)

})