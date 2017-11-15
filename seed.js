const {MongoClient} = require('mongodb')

MongoClient.connect("mongodb://localhost/clock", (err, db) => {
  const timezones = db.collection('timezones')

  timezones
  .find({})
  .toArray()
  .then(results => {
    !results.length
    ? timezones
    .insertMany(
      [
        "America/Toronto",
        "Asia/Dubai",
        "Europe/Belgrade",
        "Asia/Tokyo",
        "Pacific/Honolulu",
        "America/Denver",
        "Europe/Oslo",
        "Australia/Sydney",
        "Asia/Shanghai",
      ].map(zone => ({
        zone: zone
      }))
    )
    .then(() => db.close())
    .catch(error => console.error(error))
    : db.close()
  })
  .catch(error => console.error(error))
})
