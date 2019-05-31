// import helper
import Helper from '../helpers/Helper'
module.exports = {
    index: (req, res) => {
        const io = req.io;
        
        io.on('connection', function (socket) {
            console.log("Socket connected: ", socket.id)
            socket.on('hi', data => {
                console.log(data)
                socket.emit('hello', {msg: data, id: socket.id})
            })

            socket.on('new-user', data => {
                console.log(data)
                // socket.emit('new-user', {msg: `Hello ${data.name}`})
                io.sockets.emit('new-user', {msg: `Hello ${data.name}`})
            })
        });
        
        res.render('index', {title: Helper.Cuchuoi})
    },

    test: (req, res) => {
        res.json(req.body)
    },

    uploadImage: (req, res) => {
        console.log(req.file)
        var filename = req.file.filename;
        // fs.unlinkSync(medicineImage); // remove file uploaded
        if(filename){
            res.json({
                status: 200,
                filename: filename
            })
            
        }
    }
} 