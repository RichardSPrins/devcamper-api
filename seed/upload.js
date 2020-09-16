const agent = require('../test/agent');
const imageService = require('../services/imageService');
const fs = require('fs');
const async = require('async')
const uuid = require('uuid')
var path = require('path');

const uploadImage = function(file, cb) {
    agent
    .post('/images').attach('image', 'seed/images/' + file)
    .expect(200)
    .end(function(err, res) {
        var body = res.body;
        cb(err, body.id)
    });
}

fs.readdir('seed/images', (err, files) => {
    const tasks = []
    files.forEach(file => {
        tasks.push(cb => {

            // cb(null,[path.parse(file).name,uuid.v4()])

            uploadImage(file, (err, id) => {
                cb(err, [path.parse(file).name, id])
            });
        })
    })

    async.parallel(tasks, (err, results) => {
        const obj = {}
        results.forEach(pair => {
            obj[pair[0]] = pair[1]
        })
        fs.writeFileSync('seed/uploads.json', JSON.stringify(obj, null, 4))
    })
})
