const filePath = 'IMSLP23765-PMLP01595-Beethoven_Symphony6_Cls.pdf';
const loadingTask = pdfjsLib.getDocument(filePath);
loadingTask.promise.then(function(pdf) {
    const numPages = pdf.numPages;
    for (let i = 0; i < numPages; i++) {
        // you can now use *pdf* here
        pdf.getPage(i+1).then(function(page) {
            // you can now use *page* here
            var scale = 1;
            var viewport = page.getViewport({ scale: scale, });
            // Support HiDPI-screens.
            var outputScale = window.devicePixelRatio || 1;

            const canvas = document.createElement("canvas");
            const context = canvas.getContext('2d', {willReadFrequently: true});

            document.getElementById("canvases").appendChild(canvas);

            canvas.width = Math.floor(viewport.width * outputScale);
            canvas.height = Math.floor(viewport.height * outputScale);

            var transform = outputScale !== 1
            ? [outputScale, 0, 0, outputScale, 0, 0]
            : null;

            var renderContext = {
                canvasContext: context,
                transform: transform,
                viewport: viewport
            };

            var renderingTask = page.render(renderContext);

            renderingTask.promise.then(function() {
                // do drawing/graphics/image-processing/computer-vision stuff 
            });
        });
    }
});