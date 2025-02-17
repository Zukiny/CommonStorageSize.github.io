document.getElementById('selectFileButton').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            displayCSVContents(contents);
        };
        reader.readAsText(file);
    }
});

function displayCSVContents(contents) {
    const lines = contents.split('\n').map(line => line.split(','));
    const tableHead = document.getElementById('dataTable').querySelector('thead');
    const tableBody = document.getElementById('dataTable').querySelector('tbody');

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    if (lines.length === 0) {
        document.getElementById('outputLabel').innerText = "The file is empty.";
        return;
    }

    const headerRow = document.createElement('tr');
    lines[0].forEach(header => {
        const th = document.createElement('th');
        th.innerText = header;
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    for (let i = 1; i < lines.length; i++) {
        const row = document.createElement('tr');
        lines[i].forEach(cell => {
            const td = document.createElement('td');
            td.innerText = cell;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    }

    document.getElementById('tableContainer').style.display = 'block';
    document.getElementById('selectFileButton').style.display = 'none';
    document.getElementById('outputLabel').innerText = "File loaded successfully.";
}

document.getElementById('commonSizeButton').addEventListener('click', findMostCommonSize);
document.getElementById('topThreeButton').addEventListener('click', listTopThreeSizes);

function findMostCommonSize() {
    const table = document.getElementById('dataTable');
    if (table.rows.length <= 1) {
        document.getElementById('outputLabel').innerText = "No data available.";
        return;
    }

    const sizeCount = {};
    for (let i = 1; i < table.rows.length; i++) {
        const size = table.rows[i].cells[0].innerText; // Assuming storage sizes are in the first column
        sizeCount[size] = (sizeCount[size] || 0) + 1;
    }

    const mostCommonSize = Object.keys(sizeCount).reduce((a, b) => sizeCount[a] > sizeCount[b] ? a : b);
    document.getElementById('outputLabel').innerText = "Most Common Size: " + mostCommonSize;
}

function listTopThreeSizes() {
    const table = document.getElementById('dataTable');
    if (table.rows.length <= 1) {
        document.getElementById('outputLabel').innerText = "No data available.";
        return;
    }

    const sizeCount = {};
    for (let i = 1; i < table.rows.length; i++) {
        const size = table.rows[i].cells[0].innerText; // Assuming storage sizes are in the first column
        sizeCount[size] = (sizeCount[size] || 0) + 1;
    }

    const sortedSizes = Object.entries(sizeCount).sort((a, b) => b[1] - a[1]);
    const topSizes = sortedSizes.slice(0, 3).map(entry => `${entry[0]}: ${entry[1]}`).join('<br>');

    document.getElementById('outputLabel').innerHTML = "Top 3 Sizes:<br>" + topSizes;
}

// Close the window (not applicable in a web context, but can be used to hide the app)
document.getElementById('exitButton').addEventListener('click', () => {
    window.close(); // This will only work if the window was opened by a script
});