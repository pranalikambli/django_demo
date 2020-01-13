$().ready(function (){
function Counter(options) {
    var timer;
    var instance = this;
    var resetSeconds = options.seconds || 10;
    var seconds = resetSeconds;
    var onUpdateStatus = options.onUpdateStatus || function() {};
    var onCounterEnd = options.onCounterEnd || function() {};
    var onCounterStart = options.onCounterStart || function() {};
    var onCounterRestart = options.onCounterRestart || function() {};

    function decrementCounter() {
        onUpdateStatus(seconds);
        if (seconds === 0) {
            stopCounter();
            onCounterEnd();
            return;
        }
        seconds--;
    };

    function resetCounter() {
        clearInterval(timer);
        startCounter();
        onCounterRestart();
    };

    function startCounter() {
        seconds = resetSeconds;
        onCounterStart();
        clearInterval(timer);
        timer = 0;
        decrementCounter();
        timer = setInterval(decrementCounter, 1000);
    };

    function stopCounter() {
        clearInterval(timer);
    };

    return {
        start: function() {
            startCounter();
        },
        stop: function() {
            stopCounter();
        },
        reset: function() {
            resetCounter();
        },
    }
};

var countdown = new Counter({
    // Number of seconds to count down. This should be equivalent to your server session timeout.
    seconds: 18000000000,
    onCounterStart: function () {
        // Session started.
    },

    // Callback function for each second
    onUpdateStatus: function(second) {
        if (second == 300) {
            $("#sessionModal").show();
        }
        $("#sessionModal h4.modal-title").html("You will be logged out in "+ Math.floor(second / 60) + " minute(s).")
    },

    onCounterRestart: function() {
        $("#sessionModal").hide();
    },

    // Callback function for counter end
    onCounterEnd: function() {
        // Show message session is over to user
        $("#sessionModal").hide();
        alert("Your session expired. Please login again.");
        window.location.href = "/";
    }

});
countdown.start();

$("#sessionModal button.session-refresh").on('click', function() {
$.ajax({
        async: false,
        type: 'POST',
        url:'/frontend/renew_session/',
        error: function(data) {
            alert("Error occurred. Please try again");
        }
});
countdown.reset();
});

$("#sessionModal button.session-cancel").on('click', function() {
    $("#sessionModal").hide();
    return false;
});

$("#sessionModal .close").on('click', function() {
    $("#sessionModal").hide();
    return false;
});

});