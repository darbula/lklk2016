Reveal.initialize({
    controls: false,
    progress: true,
    history: true,
    center: false,

    //theme: 'bmo-manual', // manually defined
    transition: 'linear', // default/cube/page/concave/zoom/linear/fade/none

    // The "normal" size of the presentation, aspect ratio will be preserved
    // when the presentation is scaled to fit different resolutions. Can be
    // specified using percentage units.
    width: 1024,
    height: 768,

    // Factor of the display size that should remain empty around the content
    margin: 0.07,

    // Bounds for smallest/largest possible scale to apply to content
    minScale: 0.2,
    maxScale: 1.0,

    rollingLinks: false,

    // Optional libraries used to extend on reveal.js
    dependencies: [
        { src: 'vendor/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
        { src: 'vendor/reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'vendor/reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
        { src: 'vendor/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
        //{ src: 'vendor/reveal.js/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
        { src: 'vendor/reveal.js/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
        //{ src: 'vendor/reveal.js/plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } },
        //{ src: 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML,/vendor/mathjax-config.js', async: true },
    ]
});
// optionally rerender math
/*
Reveal.addEventListener( 'slidechanged', function( event ) {
    MathJax.Hub.Rerender(event.currentSlide);
});
*/
Reveal.addEventListener('slidechanged', function(event) {
    // Reset all animations
    var divs = event.currentSlide.getElementsByTagName("div"); //TODO: ograniciti na child
    var i = divs.length-1;
    while (i>=0) {
        console.log(divs[i]);
        if (divs[i].id!="") {
            document.dispatchEvent(new CustomEvent(divs[i].id));
        }
        i--;
    }
});
Reveal.addEventListener('fragmentshown', function(event) {
    // For every fragment trigger optional action/animation
    if (event.fragment.id!="" && event.fragment.parentNode.id!="") {
        document.dispatchEvent(new CustomEvent(event.fragment.parentNode.id+"-"+event.fragment.id));
    }
});
