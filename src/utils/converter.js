import {SQL_API} from '../constants/routes'
const tableName = SQL_API.tableNameForUpateInsert;

export default function converter(inputArr, type) {
  const tableItems = inputArr;
  var columns = [];
  var columnTypes = [];
  var columnInfo = [];
  var values = [];
  const valueInserts = [];

  tableItems.forEach((tableItem) => {
    parseObject(tableItem, type, tableItem.cartodb_id);
  });

  return valueInserts;

  function parseObject(tableItem, type, cartoDbId) {
    let query = '';

    convertObject(tableItem)
    parseColumnInfo()
    columns.shift();
    values.shift();
    if (type === 'UPDATE') {
      const set = createSet(columns, values)
      query = `UPDATE ${tableName} SET ${set} WHERE cartodb_id = ${cartoDbId}`;
    }
    else {
      query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`
    }
    valueInserts.push(query)
  }

  function convertObject(item) {
    columns = [];
    values = [];
    for (var i in item) {
      columns.push(i);
      let value = item[i]
      if (!value && value !== 0) {
        value = 'NULL'
      } else if (typeof value === 'string' && i !== "the_geom") {
        value = "'" + value + "'";
      }
      values.push(value);
    }
  }

  function parseColumnInfo() {
    for (var i = 0; i < columns.length; i++) {
      if (typeof (values[i]) == "string") {
        columnTypes = "TEXT"
        columnInfo.push(`${columns[i]} ${columnTypes}`)
      }
      else if (typeof (values[i]) == "number") {
        columnTypes = "INTERGER"
        columnInfo.push(`${columns[i]} ${columnTypes}`)
      }
    }
  }
 
  function createSet(columns, values) {
    let string = '';

    columns.forEach((col, i) => {
      string += `${col} = ${values[i]}, `
    });

    return string.slice(0, -2);
  }
}