 
 const handleTotal = db => (req, res) => {
    db('totals')
      .select('*')
      .then(data => {
        res.json(data)
      })
      .catch(err => res.status(400).json(err));
 }

 module.exports = {
     handleTotal
 }