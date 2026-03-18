document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.getElementById("invoice-table-body");

    try {
        const response = await fetch("/billing-data");
        const result = await response.json();

        if (result.success) {
            result.data.forEach((item, index) => {
                const row = document.createElement("tr");

                const total = parseFloat(item.labTests) + parseFloat(item.medicines) + 
                            parseFloat(item.consultationFees) + parseFloat(item.roomCost);

                row.setAttribute("data-room", item.roomCost || 0);
                row.setAttribute("data-lab", item.labTests || 0);
                row.setAttribute("data-meds", item.medicines || 0);
                row.setAttribute("data-fees", item.consultationFees || 0);
                row.setAttribute("data-doctor", item.doctorName || "N/A");
                row.setAttribute("data-mobile", item.mobileNumber || "N/A");

                row.innerHTML = `
                    <td>${item.patientId}</td>
                    <td>${item.patientName}</td>
                    <td>₹${total.toFixed(2)}</td>
                    <td>${new Date(item.date).toLocaleDateString()}</td>
                    <td><button class="download-btn">Download</button></td>
                `;
                tableBody.appendChild(row);
            });

            attachDownloadListeners();
        } else {
            tableBody.innerHTML = `<tr><td colspan="6">Failed to load data</td></tr>`;
        }
    } catch (err) {
        console.error("Failed to fetch billing data:", err);
        tableBody.innerHTML = `<tr><td colspan="6">Server error</td></tr>`;
    }

    document.getElementById('search-btn').addEventListener('click', function () {
        let searchValue = document.getElementById('search').value.toLowerCase();
        let rows = document.querySelectorAll('.invoice-table tbody tr');

        rows.forEach(row => {
            let patientName = row.cells[1].textContent.toLowerCase();
            let invoiceId = row.cells[0].textContent.toLowerCase();
            if (patientName.includes(searchValue) || invoiceId.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

function attachDownloadListeners() {
    document.querySelectorAll(".download-btn").forEach(button => {
        button.addEventListener("click", function () {
            let row = this.closest("tr");
            let invoiceId = "INV-"+row.cells[0].textContent;
            let patientName = row.cells[1].textContent;
            let amount = row.cells[2].textContent;
            let dateIssued = row.cells[3].textContent;
            let mobileNumber = row.getAttribute("data-mobile");

            let invoiceContent = `
    <html>
    <head><title>Invoice - ${invoiceId}</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #f4f8fb; color: #333; }
            h2 { text-align: center; color: #123; font-size: 24px; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 0 10px #aaa; border-radius: 8px; }
            td { border: 1px solid #ddd; padding: 10px; font-size: 14px; }
            tr:nth-child(even) { background: #bcefea; }
            .footer { position: fixed; bottom: 15px; left: 40%; font-size: 14px; color: #555; }
            .downloadBtn { background: #2564ac; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; position: fixed; bottom: 35px; left: 50%; transform: translateX(-50%); }
            .downloadBtn:hover { background: #427ec2; }
            @media print {
                .downloadBtn { display: none; }
                .footer { font-size: 12px; }
            }
        </style>
    </head>
    <body>
        <h2>Invoice</h2>
        <table>
            <tr><td><strong>Invoice ID:</strong> ${invoiceId}</td></tr>
            <tr><td><strong>Patient Name:</strong> ${patientName}</td></tr>
            <tr><td><strong>Mobile Number:</strong> ${mobileNumber}</td></tr>
            <tr><td><strong>Consulted Doctor:</strong> ${row.getAttribute("data-doctor")}</td></tr>
            <tr><td><strong>Date Issued:</strong> ${dateIssued}</td></tr>
            <tr><td><strong>Room Cost:</strong> ₹${parseFloat(row.getAttribute("data-room")).toFixed(2)}</td></tr>
            <tr><td><strong>Lab Tests:</strong> ₹${parseFloat(row.getAttribute("data-lab")).toFixed(2)}</td></tr>
            <tr><td><strong>Medicines:</strong> ₹${parseFloat(row.getAttribute("data-meds")).toFixed(2)}</td></tr>
            <tr><td><strong>Consultation Fees:</strong> ₹${parseFloat(row.getAttribute("data-fees")).toFixed(2)}</td></tr>
            <tr><td><strong>Total Amount:</strong> ${amount}</td></tr>
        </table>
        <button class="downloadBtn" onclick="window.print()">Download</button>
        <div class="footer">&copy; 2025 Billing Management System</div>
    </body>
    </html>
`;

            let newWindow = window.open("", "_blank");
            newWindow.document.write(invoiceContent);
            newWindow.document.close();
        });
    });
}