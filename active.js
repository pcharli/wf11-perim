    // Set the name of the hidden property and the change event for visibility
    let hidden, visibilityChange
    var statut = true

    if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    
    } /*else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
        
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    */

    function handleVisibilityChange() {
        if (document.hidden) {
            document.title = "pause"
            window.statut = false
        } else {
            document.title = "play"
            window.statut = true
        }
     }
     document.addEventListener(visibilityChange, handleVisibilityChange, false);