// Replace with your actual API key and URL from Gibson
const API_KEY = X-Gibson-API-Key: [gAAAAABoPy3vrMTA1Iw5vCO_Cxvt_K_WPv7hokr61sNoCxHj-ePwV00eTgM6a4HTpUGGmgO3F5FHoma5A_JK9G-aqShB0CYn9BYGY1BQwWVRgKubglgHumI=];
const API_URL = https://api.gibsonai.com;

// When the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load existing requests
    getRequests();
    
    // Set up the form submission
    document.getElementById('requestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitRequest();
    });
});

// Function to get all requests
async function getRequests() {
    try {
        const response = await fetch(`${API_URL}/request_lwr`, {
            method: 'GET',
            headers: {
                'X-Gibson-API-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        displayRequests(data);
    } catch (error) {
        console.error('Error fetching requests:', error);
        alert('Could not load requests. See console for details.');
    }
}

// Function to submit a new request
async function submitRequest() {
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const estimatedHours = document.getElementById('estimatedHours').value;
    
    try {
        const response = await fetch(`${API_URL}/request_lwr`, {
            method: 'POST',
            headers: {
                'X-Gibson-API-Key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: description,
                priority: priority,
                estimated_hours: parseInt(estimatedHours),
                submission_date: new Date().toISOString()
            })
        });
        
        const result = await response.json();
        alert('Request submitted successfully!');
        document.getElementById('requestForm').reset();
        getRequests(); // Refresh the list
    } catch (error) {
        console.error('Error submitting request:', error);
        alert('Could not submit request. See console for details.');
    }
}

// Function to display requests in the page
function displayRequests(requests) {
    const requestsList = document.getElementById('requestsList');
    requestsList.innerHTML = '';
    
    if (requests.length === 0) {
        requestsList.innerHTML = '<p>No requests found.</p>';
        return;
    }
    
    requests.forEach(request => {
        const requestItem = document.createElement('div');
        requestItem.className = 'request-item';
        requestItem.innerHTML = `
            <h3>LWR #${request.id}</h3>
            <p><strong>Description:</strong> ${request.description}</p>
            <p><strong>Priority:</strong> ${request.priority}</p>
            <p><strong>Estimated Hours:</strong> ${request.estimated_hours}</p>
            <p><strong>Submitted:</strong> ${new Date(request.submission_date).toLocaleString()}</p>
        `;
        requestsList.appendChild(requestItem);
    });
}