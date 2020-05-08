
let date = new Date();
let dateTableName = date.toISOString().slice(0, 10);

const substract1Day = (date) => {
    date.setDate(date.getDate() - 1);
}

const handleLatest =  (db) => (req, res) => {
    db.schema.hasTable(dateTableName).then( (exists) => {
        if(exists) {
            db(dateTableName)
              .select('*')
              .then(data =>  {
                  data.push({date: dateTableName});
                  res.json(data);
                })
              .catch(err => res.status(400).json(err));
        } else {
            substract1Day(date);
            dateTableName = date.toISOString().slice(0, 10);
            db(dateTableName)
              .select('*')
              .then(data =>  {
                data.push({date: dateTableName});
                res.json(data);
              })
              .catch(err => res.status(400).json(err));
        }
    });
}

module.exports = {
    handleLatest
}