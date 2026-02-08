function loadExternalHTML(filePath, divId) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(divId).innerHTML = data;
            if (window.MathJax) {
                MathJax.typeset();
            }
        })
        .catch(error => {
            console.error('Error loading external HTML:', error);
        });
}

window.onload = function() {
    loadExternalHTML('res_sta.html', 'res-sta');
};