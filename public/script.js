// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the Add Ride button and form
    const showFormBtn = document.getElementById('showRideFormBtn');
    const rideForm = document.getElementById('rideForm');
    const saveRideBtn = document.getElementById('saveRideBtn');
    const ridesList = document.getElementById('ridesList');

    // Show/Hide form when button is clicked
    if (showFormBtn) {
        showFormBtn.onclick = function() {
            if (rideForm.style.display === 'none' || rideForm.style.display === '') {
                rideForm.style.display = 'block';
            } else {
                rideForm.style.display = 'none';
            }
        }
    }

    // Save new ride when button is clicked
    if (saveRideBtn) {
        saveRideBtn.onclick = function() {
            // Get values from form
            const name = document.getElementById('riderName').value;
            const fromLocation = document.getElementById('fromLocation').value;
            const toLocation = document.getElementById('toLocation').value;
            const time = document.getElementById('departureTime').value;
            const seats = document.getElementById('seatsLeft').value;

            // Check if all fields are filled
            if (!name || !fromLocation || !toLocation || !time || !seats) {
                alert('Please fill all fields!');
                return;
            }

            // Get first letter for initial circle
            const initial = name.charAt(0).toUpperCase();

            // Create new ride card
            const newRide = document.createElement('div');
            newRide.className = 'ride-card';
            newRide.innerHTML = `
                <div class="ride-initial">${initial}</div>
                <div class="ride-details">
                    <h3>${name}</h3>
                    <p class="ride-route">${fromLocation} → ${toLocation}</p>
                    <p class="ride-time">🕐 ${formatTime(time)}</p>
                    <p class="ride-seats">💺 ${seats} seats left</p>
                </div>
                <button class="join-btn">Join Ride</button>
            `;

            // Add the new ride to the top of the list
            ridesList.insertBefore(newRide, ridesList.firstChild);

            // Clear form
            document.getElementById('riderName').value = '';
            document.getElementById('fromLocation').value = '';
            document.getElementById('toLocation').value = '';
            document.getElementById('departureTime').value = '';
            document.getElementById('seatsLeft').value = '';

            // Hide form
            rideForm.style.display = 'none';

            // Show success message
            alert('✅ Ride posted successfully!');

            // Add click event to the new Join button
            const joinBtn = newRide.querySelector('.join-btn');
            joinBtn.onclick = function() {
                alert(`You joined ${name}'s ride!`);
            };
        }
    }

    // Helper function to format time
    function formatTime(timeString) {
        if (!timeString) return 'Time TBD';
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }

    // Add click events to existing Join buttons
    const joinButtons = document.querySelectorAll('.join-btn');
    joinButtons.forEach(btn => {
        btn.onclick = function() {
            alert('You joined this ride!');
        };
    });

    // Add click events to Join Instantly buttons
    const instantButtons = document.querySelectorAll('.join-instant-btn');
    instantButtons.forEach(btn => {
        btn.onclick = function() {
            alert('🎉 Request sent! Driver will confirm shortly.');
        };
    });

});