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
    const tableContainer = document.getElementById('tableContainer');

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    if (lines.length === 0) {
        document.getElementById('outputLabel').innerText = "The file is empty.";
        return;
    }

    // Create table headers
    const headerRow = document.createElement('tr');
    lines[0].forEach(header => {
        const th = document.createElement('th');
        th.innerText = header.trim();
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    // Create table rows
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].join('').trim() === '') continue; // Skip empty lines
        const row = document.createElement('tr');
        lines[i].forEach(cell => {
            const td = document.createElement('td');
            td.innerText = cell.trim();
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    }

    // Display the table inside the fixed-size container
    tableContainer.style.display = 'block';
    document.getElementById('selectFileButton').style.display = 'none';
    document.getElementById('outputLabel').innerText = "File loaded successfully.";
}
