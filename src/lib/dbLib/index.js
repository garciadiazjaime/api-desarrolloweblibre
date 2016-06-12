import mysql from 'mysql';

export default class DbLib {

  constructor(){
    this.connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'blog'
    });
    this.isConnectionOption = false;
  }

  openConnection() {
    return new Promise((resolve, reject) => {
      if (!this.isConnectionOption) {
        this.connection.connect();
        this.isConnectionOption = true;
      }
      resolve();
    });
  }

  executeQuery(sql) {
    return new Promise((resolve, reject) => {
      this.openConnection().then(() => {
        this.connection.query(sql, (err, rows, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          // this.closeConnection();
        });
      });
    });
  }

  insertQuery(sql, data) {
    return new Promise((resolve, reject) => {
      this.openConnection().then(() => {
        this.connection.query(sql, data, function(err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result.insertId);
          }
          // this.closeConnection();
        });
      });
    });
  }

  closeConnection() {
    this.connection.end();
  }
}
