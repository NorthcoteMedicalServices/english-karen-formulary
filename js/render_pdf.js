// Import pdf.js as an ES module
import * as pdfjsLib from './pdfjs/build/pdf.mjs';

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.mjs';

/**
 * Function to render a PDF document in a specified page range
 * @param {string} pdfUrl - URL or path to the PDF file.
 * @param {number[]} pageRange - Array listing the start and end page [startPage, endPage].
 * @param {string} containerId - ID of the container where the PDF will be rendered.
 */
function renderPdf(pdfUrl, pageRange, containerId) {
    const container = document.getElementById(containerId);
    
    // Clear previous content in container
    container.innerHTML = '';

    pdfjsLib.getDocument(pdfUrl).promise.then(pdfDoc => {
        const startPage = Math.max(pageRange[0], 1);
        const endPage = Math.min(pageRange[1], pdfDoc.numPages);

        for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
            pdfDoc.getPage(pageNum).then(page => {
                const viewport = page.getViewport({ scale: 1.5 });

                // Create canvas element for each page
                const canvas = document.createElement('canvas');
                canvas.style.marginBottom = '10px';
                container.appendChild(canvas);

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                // Render pdf on canvas
                const renderContext = {
                    canvasContext: canvas.getContext('2d'),
                    viewport: viewport,
                };
                page.render(renderContext);
            });
        }
    }).catch(error => {
        console.error('Error loading PDF:', error);
    });
}

// Export the function so it can be imported
export { renderPdf };
