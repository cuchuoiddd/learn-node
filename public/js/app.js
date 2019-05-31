var chat = io.connect('http://localhost:1993')

chat.on('connect', function () {
    chat.emit('hi', "hello world")

    chat.on('hello', function(data) {
        $('.socket-id').html(`
                <p> Socket connected: ${data.id} </p>
        `)
    })

    chat.on('new-user', function(data) {
        console.log(data)
    })

    
});
$('.add').click(function(){
    chat.emit('new-user', {
        name: $('.name').val()
    })
    
})
  