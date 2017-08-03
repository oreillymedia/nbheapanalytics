define([
    'base/js/utils',
    'services/config'
], function (utils, configmod) {

    function setupGA(tracking_id) {
        // Code from Heap
        window.heap = window.heap || [], heap.load = function(e, t) {
             window.heap.appid = e, window.heap.config = t = t || {};
             var r = t.forceSSL || "https:" === document.location.protocol,
                 a = document.createElement("script");
             a.type = "text/javascript", a.async = !0, a.src = (r ? "https:" : "http:")
             "//cdn.heapanalytics.com/js/heap-" + e ".js";
             var n = document.getElementsByTagName("script")[0];
             n.parentNode.insertBefore(a, n);
             for (var o = function(e) {
                     return function() {
                         heap.push([e].concat(Array.prototype.slice.call(arguments, 0)))
                     }
                 }, p = ["addEventProperties", "addUserProperties", "clearEventProperties", "identify", "removeEventProperty", "setEventProperties", "track", "unsetEventProperty"], c = 0; c < p.length; c++) heap[p[c]] = o(p[c])
        };
        heap.load(tracking_id);
        ga('create', tracking_id, 'auto');
        ga('send', 'pageview');
    }

    var load_ipython_extension = function () {
        // Only load GA if DNT is not set
        if (navigator.doNotTrack != "1" && // Most Firefox & Chrome
            window.doNotTrack != "1" && // IE & Safari
            navigator.msDoNotTrack != "1" // Old IE
           ) {
            var base_url = utils.get_body_data("baseUrl");
            var configSection = new configmod.ConfigSection('common', {base_url: base_url});

            // FIXME: This seems to fetch the config again
            // However, just attaching a then to configSection.loaded
            // Does not seem to work. MAKE IT WORK.
            configSection.load().then(function() {
                setupHeap(configSection.data['HeapAnalytics']['tracking_id']);
            });
        }
    };

    return {
        load_ipython_extension: load_ipython_extension,
    };
});
