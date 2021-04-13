$(document).ready(function () {
    $('#rsv-bot > header .invite').click(function (e) { 
        e.preventDefault();

        $('#rsv-bot > main').css('display', 'inherit');
        $('#rsv-bot > header').css('display', 'none');
        
    });
    $('#rsv-bot > main .bot-header .close').click(function (e) { 
        e.preventDefault();

        $('#rsv-bot > main').css('display', 'none');
        $('#rsv-bot > header').css('display', 'inherit');
        
    });
});

let botService;

if (location == "http://rsvbot64.ml/") { botService = "http://service.rsvbot64.ml:5000/bot/"; } 
else { botService = "http://127.0.0.1:5000/bot/"; }

const LastMessage = () => {
    let chat = $('#rsv-bot > main .bot-content');

    chat.scrollTop(chat.outerHeight(true));
}

$(document).ready(function () {
    $('#rsv-bot > main .bot-footer button').click(function (e) { 
        e.preventDefault();
        
        let userQuery = $('textarea#query').val(),
            chatContent = $('#rsv-bot > main .bot-content'),
            answer = $('p#query'),
            response = $('p#response');


        $('textarea#query').val(' ');
        $(`<p id="query">${userQuery}</p>`).appendTo(chatContent);
        
        $.ajax({
            type: "GET",
            url: botService + encodeURIComponent(userQuery),
            success: function (response) {
                const responseJson = JSON.parse(JSON.stringify(response));

                $(`<p id="response">${responseJson.botResponse}</p>`).appendTo(chatContent);
            }
        });

        LastMessage();
    });
});