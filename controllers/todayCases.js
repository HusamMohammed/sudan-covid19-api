
let sourceTable = 'z';

const handleTodayCases = db => (req, res) => {
    db.schema.hasTable(req.body.date).then(exists => {
        if(!exists) {
            db.transaction(trx => {
                trx.schema.createTable(req.body.date, table => {
                    table.text('state').primary();
                    table.integer('cases');
                    table.integer('recovery');
                    table.integer('death');
                })
                .then(() => {
                    return  trx(req.body.date)
                            .insert(req.body.newCases)
                            .then()
                            .catch(err => res.status(400).json('unable to add fields'));
                })
                .then(() => {
                    return trx
                            .raw(`UPDATE ${sourceTable} ` +
                            `SET cases = ${sourceTable}.cases + "${req.body.date}".cases, ` +
                            `recovery = ${sourceTable}.recovery + "${req.body.date}".recovery, ` +
                            `death = ${sourceTable}.death + "${req.body.date}".death ` +
                            `FROM "${req.body.date}" WHERE ${sourceTable}.state = "${req.body.date}".state`)
                            .then()
                            .catch(err => res.status(400).json(err + ' unable to update'));
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
            .then(() => res.status(200).json('ok'))
            .catch(err => res.status(400).json(' unabel to create table'));
        } 
        else {
            res.status(400).json('table already exists')
        }
    });
}

module.exports = {
    handleTodayCases
}
