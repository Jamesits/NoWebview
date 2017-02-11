var nowebview = {
    checkers: [
        // webView object exists
        function() {
            return 'webView' in window;
        },

        // Android object exists
        function() {
            return 'Android' in window;
        },

        // deviceready event
        function() {
            return window.document && 'ondeviceready' in window.document;
        },

        // explicitely states it is standalone
        function() {
            return window.navigator && 'standalone' in window.navigator;
        },

        // can notifiy a parent app
        function() {
            return window.external && 'notify' in window.external;
        },

        // Ti object exists
        function() {
            return 'Ti' in window;
        },

        // _cordovaNative object exists
        function() {
            return '_cordovaNative' in window;
        },

        // served as file (but false positive if a Web page is loaded from the filesystem)
        // function (){ return window.location.href.indexOf('file:') === 0; },

        // iOS UIWebView
        function() {
            var userAgent = navigator.userAgent || '';
            return userAgent.indexOf(' Mobile/') > 0 && userAgent.indexOf(' Safari/') === -1;
        }
    ],
    warnings: [{
        css: `
#nowebview-notif * { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box;}
#nowebview-notif { background-color: #3C261C; background-image: url(v.jpg); background-position: center; background-repeat: no-repeat; background-size: cover; font-size: 16px; height: 100%; left: 0; margin: 0; overflow: hidden; position: fixed; text-align: left; top: 0; -webkit-transition: top 0.8s; transition: top 0.8s; width: 100%; z-index: 99999; }
#nowebview-notif.out { top: -150%; }
#nowebview-notif section { background: rgba(0, 0, 0, 0.2); border-radius: 1em; color: white; line-height: 1.5em; margin: 5% auto 3%; max-height: 70%; max-width: 750px; overflow-y: auto; padding: 3%; text-shadow: 1px 3px 3px black; width: 75%; }
#nowebview-notif p { color: white; line-height: 1.5em; text-shadow: 1px 3px 3px black; }
#nowebview-notif h1 { border-bottom: 1px solid #CCC; color: white; font-family: sans-serif; font-size: 1.5em; font-weight: bold; line-height: 1.5em; margin: 0 0 1em 0.25em; padding: 0 0 0.25em; }
#nowebview-notif a { color: #CCC; text-decoration: underline; } #nowebview-notif a:hover { background: transparent; color: #EEEEEE; text-decoration: underline; }
#nowebview-notif .anno { color: #BBB; font-size: 0.9em; margin-bottom: 1.5em; padding: 0 2em; text-shadow: 1px 1px 1px black;}
#nowebview-notif footer { display: block; height: 20%; text-align: center; }
#nowebview-notif .nowebview-notif-btn { background-color: black; border-radius: 8px; box-shadow: 0 0 15px white; color: white; display: inline-block; line-height: 1.5em; padding: 0.5em 1em; text-decoration: none; }
#nowebview-notif .nowebview-notif-btn:hover { background-color: #333; color: white; text-decoration: none; }`,
        html: `
<h1>You are viewing this website in a webview.</h1>
<p>Using webview is slow, inconvenient, insecure, and completely unnecessery. We recommend opening this page in a browser.</p>
<a>Click here to see what's wrong with webview.</a>
<p>You can look around to see if there is a button to let you open this page in some browser. If there is none, you should tell the app author to add one or remove webview completely.<p>
        `
    }],
    doCheck: function() {
        return nowebview.checkers.some(function applyRule(rule) {
            return rule();
        });
    },
    displayWarning: function(level) {
        var l = nowebview.warnings[level];
        var css_block = document.createElement("style");
        css_block.appendChild(document.createTextNode(l.css));
        var element = document.createElement("div");
        element.id = 'nowebview-notif';
        element.innerHTML = l.html;
        element.appendChild(css_block);
        document.body.appendChild(element);
    }
};

(function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
})(function(){
    if (nowebview.doCheck()) nowebview.displayWarning(0);
});
