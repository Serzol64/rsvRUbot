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