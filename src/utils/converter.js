import {tableName} from '../constants/routes'

export default function converter(input, type, cartoDbId) {
    const tableItem = input;
    var columns = [];
    var columnTypes = [];
    var columnInfo = [];
    var values = [];
    const valueInserts = [];
  
    parseObject(tableItem, type, cartoDbId);
  
    const sql = toSql(valueInserts);
  
    return sql;
  
    function parseObject(tableItem, type, cartoDbId) {
      let query = '';
  
      convertObject(tableItem)
      parseColumnInfo()
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
        if (typeof value === 'string' && i !== "the_geom") {
          value = "'" + value + "'";
        }
        if (value == null) {
          value = "\"\""
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
  
    function toSql(queries) {
      return queries.join(`;\n`);
    }
  }