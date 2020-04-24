const express = require('express');
const router = express.Router();
const Response = require('../../../models/Response')

var MongoClient = require('mongodb').MongoClient

const uri = "mongodb+srv://Simon:OOZeoX5bXGbWR9KS@cluster0-n4iai.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


router.get('/score-scheme', async (req, res) => {
    await client.connect()
        .then(client => {
            var db = client.db('yobetit')

            db.collection('slots').find().toArray((err, result) => {
                if (err) throw err;

                const scoreSchemeResult = result;

                db.collection('slot-types').find().toArray((err, result) => {
                    if (err) throw err;

                    const types = result;

                    let scoreSchemes = [];
                    scoreSchemeResult.forEach(scheme => {
                        scoreSchemes.push({
                            count: scheme.count,
                            reward: scheme.reward,
                            type: types.filter(type => type.id == scheme.type_id).map(type => type.name).toString()
                        })
                    });

                    res.send(new Response(true, 'Slot sheet received!', scoreSchemes));
                });

            });
        })
        .catch(error => {
            res.send(error.message);
        });
})
router.get('/history', async (req, res) => {
    await client.connect()
        .then(client => {
            var db = client.db('yobetit')
            db.collection('player-spins').find().toArray((err, result) => {
                const spinResults = result;
                db.collection('player').find().toArray((err, result) => {
                    const player = result[0];
                    res.send(new Response(true, 'Got player history', { history: spinResults, playerCoins: player.coins }));
                });
            });
        }).catch(error => {
            res.send(error.message);
        });
});


router.get('/roll', async (req, res) => {

    await client.connect()
        .then(client => {
            var db = client.db('yobetit')
            db.collection('player').find().toArray((err, result) => {
                const player = result[0];
                if (err) throw err;

                if (player.coins <= 0) {
                    res.send(new Response(false, 'Player does not have enough coins!', { error: 'Not enough money to spin!' }));
                    return;
                }

                db.collection('slots').find().toArray((err, result) => {
                    if (err) throw err;
                    const scoreScheme = result;
                    db.collection('slot-types').find().toArray((err, result) => {
                        if (err) throw err;
                        function roll() {
                            return GetTypeFromTypeId(Math.floor(Math.random() * 4), result);
                        }

                        let newPlayerCoins = player.coins - 1;

                        let spins = []
                        let hits = [0, 0, 0, 0];

                        for (let i = 0; i < 3; i++) {
                            spins.push(roll());

                            hits[spins[i].id]++
                        }

                        let score = 0;

                        for (let typeId = 0; typeId < hits.length; typeId++) {
                            const filteredSchemes = scoreScheme.filter(scheme => scheme.type_id == typeId && scheme.count == hits[typeId]);

                            filteredSchemes.forEach(scheme => {
                                score += scheme.reward;
                            });
                        }

                        newPlayerCoins += score;
                        db.collection('player-spins').insertOne({ spins: spins.map(spin => spin.name), reward: score });
                        db.collection('player').updateOne({ '_id': player._id }, { $set: { coins: newPlayerCoins } });

                        res.send(new Response(true, 'Roll Succesful', { reward: score, spins: spins.map(spin => spin.name), playerCoins: newPlayerCoins }));
                    });
                });
            });
        }).catch(error => {
            res.send(error.message);
        });
})

router.get('/reset', async (req, res) => {

    await client.connect()
        .then(client => {
            var db = client.db('yobetit')
            db.collection('player').find().toArray((err, result) => {
                const player = result[0];
                db.collection('player-spins').find().toArray((err, result) => {
                    if (err) throw err;

                    db.collection('player').updateOne({ '_id': player._id }, { $set: { coins: 20 } });
                    db.collection('player-spins').deleteMany({});

                    res.send(new Response(true, 'Reset Slot Machine'));
                });
            });
        }).catch(error => {
            res.send(error.message);
        });
})



function GetTypeFromTypeId(typeId, types) {
    return types.filter(type => type.id == typeId)[0];
}


module.exports = router;

