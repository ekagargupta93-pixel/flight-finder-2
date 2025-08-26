console.log("Flight Finder app loaded!");

// Mock flight data
const mockFlights = [
  {
    airline: "Delta Airlines",
    price: "$299",
    duration: "5h 45m",
    stops: "1 stop",
    departure: "10:30 AM",
    arrival: "4:15 PM",
    isSelfTransfer: true,
    transferNote: "Self-transfer at ATL",
    transferAirport: "ATL",
    transferTime: "2h 15m",
    visaRequirement: "No visa required",
    riskNote: "Low risk - Major hub, frequent connections"
  },
  {
    airline: "American Airlines",
    price: "$325",
    duration: "6h 20m",
    stops: "Direct",
    departure: "8:15 AM",
    arrival: "2:35 PM",
    isSelfTransfer: false,
    transferNote: "",
    transferAirport: "N/A",
    transferTime: "N/A",
    visaRequirement: "No visa required",
    riskNote: "No risk - Direct flight"
  },
  {
    airline: "United Airlines",
    price: "$275",
    duration: "7h 10m",
    stops: "2 stops",
    departure: "11:45 AM",
    arrival: "6:55 PM",
    isSelfTransfer: true,
    transferNote: "Self-transfer at ORD & DEN",
    transferAirport: "ORD, DEN",
    transferTime: "1h 45m, 2h 30m",
    visaRequirement: "No visa required",
    riskNote: "Medium risk - Multiple transfers, tight connections"
  },
  {
    airline: "Southwest Airlines",
    price: "$310",
    duration: "5h 55m",
    stops: "1 stop",
    departure: "9:00 AM",
    arrival: "2:55 PM",
    isSelfTransfer: true,
    transferNote: "Self-transfer at MDW",
    transferAirport: "MDW",
    transferTime: "1h 30m",
    visaRequirement: "No visa required",
    riskNote: "Low risk - Single transfer, adequate time"
  }
];

// DOM elements
const searchForm = document.querySelector('.flight-search-form');
const searchContainer = document.querySelector('.search-container');

// Handle form submission
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(searchForm);
  const origin = formData.get('origin');
  const destination = formData.get('destination');
  const departureDate = formData.get('departure-date');
  const passengers = formData.get('passengers');
  
  // Validate form
  if (!origin || !destination || !departureDate || !passengers) {
    alert('Please fill in all fields');
    return;
  }
  
  // Display results
  displayFlightResults(origin, destination, departureDate, passengers);
});

// Display flight results
function displayFlightResults(origin, destination, departureDate, passengers) {
  // Remove existing results if any
  const existingResults = document.querySelector('.flight-results');
  if (existingResults) {
    existingResults.remove();
  }
  
  // Create results container
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'flight-results';
  
  // Add results header
  const resultsHeader = document.createElement('div');
  resultsHeader.className = 'results-header';
  resultsHeader.innerHTML = `
    <h2>Flight Results</h2>
    <p>${origin} → ${destination} • ${departureDate} • ${passengers} passenger${passengers > 1 ? 's' : ''}</p>
  `;
  resultsContainer.appendChild(resultsHeader);
  
  // Add flight cards
  mockFlights.forEach(flight => {
    const flightCard = createFlightCard(flight);
    resultsContainer.appendChild(flightCard);
  });
  
  // Insert results after the form
  searchContainer.appendChild(resultsContainer);
  
  // Smooth scroll to results
  resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Create individual flight card
function createFlightCard(flight) {
  const card = document.createElement('div');
  card.className = 'flight-card';
  
  card.innerHTML = `
    <div class="flight-info">
      <div class="airline-info">
        <h3>${flight.airline}</h3>
        <div class="flight-details">
          <span class="departure">${flight.departure}</span>
          <span class="duration">${flight.duration}</span>
          <span class="arrival">${flight.arrival}</span>
        </div>
        ${flight.isSelfTransfer ? `<div class="self-transfer-badge">🔄 Self-Transfer</div>` : ''}
        ${flight.transferNote ? `<div class="transfer-note">${flight.transferNote}</div>` : ''}
      </div>
      <div class="flight-meta">
        <span class="stops ${flight.stops === 'Direct' ? 'direct' : 'stops'}">${flight.stops}</span>
        <div class="price">${flight.price}</div>
      </div>
    </div>
    
    <div class="flight-details-expanded">
      <div class="detail-row">
        <div class="detail-item">
          <span class="detail-label">Transfer Airport:</span>
          <span class="detail-value">${flight.transferAirport}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Transfer Time:</span>
          <span class="detail-value">${flight.transferTime}</span>
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-item">
          <span class="detail-label">Visa Requirement:</span>
          <span class="detail-value">${flight.visaRequirement}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Risk Level:</span>
          <span class="detail-value risk-${flight.riskNote.toLowerCase().includes('low') ? 'low' : flight.riskNote.toLowerCase().includes('medium') ? 'medium' : 'none'}">${flight.riskNote}</span>
        </div>
      </div>
    </div>
    
    <button class="select-flight-btn">Select Flight</button>
  `;
  
  // Add click handler for select button
  const selectBtn = card.querySelector('.select-flight-btn');
  selectBtn.addEventListener('click', function() {
    alert(`Selected: ${flight.airline} flight for ${flight.price}`);
  });
  
  return card;
}

// Add some basic styling for the results
const style = document.createElement('style');
style.textContent = `
  .flight-results {
    margin-top: 40px;
    animation: fadeIn 0.5s ease-in;
  }
  
  .results-header {
    text-align: center;
    margin-bottom: 30px;
    color: white;
  }
  
  .results-header h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .results-header p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
  
  .flight-card {
    background: white;
    border-radius: 16px;
    padding: 25px;
    margin-bottom: 20px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    border: 1px solid rgba(255,255,255,0.2);
  }
  
  .flight-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  }
  
  .flight-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  
  .airline-info h3 {
    color: #1f2937;
    margin-bottom: 8px;
    font-size: 1.3rem;
    font-weight: 600;
  }
  
  .flight-details {
    display: flex;
    align-items: center;
    gap: 15px;
    color: #6b7280;
    font-size: 0.9rem;
  }
  
  .flight-details .duration {
    color: #374151;
    font-weight: 500;
  }
  
  .self-transfer-badge {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: 8px;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
  }
  
  .transfer-note {
    color: #6b7280;
    font-size: 0.85rem;
    margin-top: 4px;
    font-style: italic;
  }
  
  .flight-details-expanded {
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
    border: 1px solid #e2e8f0;
  }
  
  .detail-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .detail-row:last-child {
    margin-bottom: 0;
  }
  
  .detail-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .detail-label {
    font-size: 0.8rem;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .detail-value {
    font-size: 0.95rem;
    color: #1e293b;
    font-weight: 500;
  }
  
  .detail-value.risk-low {
    color: #059669;
    font-weight: 600;
  }
  
  .detail-value.risk-medium {
    color: #d97706;
    font-weight: 600;
  }
  
  .detail-value.risk-none {
    color: #059669;
    font-weight: 600;
  }
  
  .flight-meta {
    text-align: right;
  }
  
  .stops {
    display: block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .stops.direct {
    background: #dcfce7;
    color: #166534;
  }
  
  .stops.stops {
    background: #fef3c7;
    color: #92400e;
  }
  
  .price {
    font-size: 1.8rem;
    font-weight: 700;
    color: #059669;
  }
  
  .select-flight-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
  }
  
  .select-flight-btn:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-1px);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (max-width: 768px) {
    .flight-info {
      flex-direction: column;
      gap: 15px;
    }
    
    .flight-meta {
      text-align: left;
    }
    
    .flight-details {
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
    }
    
    .detail-row {
      flex-direction: column;
      gap: 15px;
    }
    
    .detail-item {
      margin-bottom: 10px;
    }
  }
`;

document.head.appendChild(style);