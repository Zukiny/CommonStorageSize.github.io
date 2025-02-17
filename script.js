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
document.get