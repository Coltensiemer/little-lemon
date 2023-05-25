import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

export const fetchUserData = (callback) => {
	db.transaction((tx) => {
	  tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
		const result = rows._array;
		callback(result);
	  });
	});
  };

  export default db