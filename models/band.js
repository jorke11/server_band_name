const {v4:uuid4} = require("uuid")

class Band{
    constructor(name){
        this.id = uuid4()
        this.name = name
        this.votes = 0
    }
}

module.exports = Band;