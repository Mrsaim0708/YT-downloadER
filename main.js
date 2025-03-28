document.getElementById('searchBtn').addEventListener('click', function () {
    const query = document.getElementById('searchQuery').value;
    if (!query) {
        alert('Please enter a search query');
        return;
    }

    fetch(`https://bjtricksapis.vercel.app/search/youtube?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                displayResults(data.result);
            } else {
                alert('No results found. Please try a different query.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching the video details. Please try again later.');
        });
});

function displayResults(videos) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card p-3';
        videoCard.innerHTML = `
            <img src="${video.imageUrl}" alt="${video.title}" class="video-image">
            <div class="mt-2">
                <a href="${video.link}" target="_blank" class="video-title">${video.title}</a>
                <p class="video-channel">Channel: ${video.channel}</p>
                <p>Duration: ${video.duration}</p>
            </div>
        `;
        resultsContainer.appendChild(videoCard);
    });
}