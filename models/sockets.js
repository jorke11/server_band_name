const BandList = require("./band-list")

class Sockets{
    constructor(io){
        this.io = io
        this.bandList = new BandList()
        this.socketEvents()
    }

    socketEvents(){
        this.io.on("connection",(socket)=>{
            
            console.log('conectado')

            //emit al cliente conectado todas las bandas actuales

            socket.emit("current-bands",this.bandList.getBands())

            socket.on("votar-banda",(id)=>{
                console.log('voto',id)
                this.bandList.increaseVotes(id)
                this.io.emit("current-bands",this.bandList.getBands())
                
            })
            socket.on("borrar-banda",(id)=>{
                console.log('voto',id)
                this.bandList.removeBand(id)
                this.io.emit("current-bands",this.bandList.getBands())
            })
            socket.on("edit-name",(data)=>{
                let {id,name} = data
                console.log('edit name',data)
                this.bandList.changeBandName(id,name)
                this.io.emit("current-bands",this.bandList.getBands())
            })
            socket.on("crear-banda",(name)=>{
                this.bandList.addBand(name)
                this.io.emit("current-bands",this.bandList.getBands())
            })

            
        
        })
    }
}

module.exports  = Sockets