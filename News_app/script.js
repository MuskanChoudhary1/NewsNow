const apiKey = 'c892c1f3e79a41d9913aec9f4aa9f872';
const baseUrl = 'https://newsapi.org/v2/everything?q=';

// Function to fetch news based on a search query or category
function fetchNews(query = '') {
    const searchQuery = query || document.getElementById('search').value; // Use the query passed or the search bar value
    const url = searchQuery ? `${baseUrl}${searchQuery}&apiKey=${apiKey}` : `${baseUrl}latest&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
        })
        .catch(error => console.error('Error fetching news:', error));
}


// Function to fetch news articles based on a category
function fetchCategory(category) {
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
            document.getElementById('back-btn').classList.remove('hidden'); // Show "Back to General News"
        })
        .catch(error => console.error('Error fetching category news:', error));
}

// Function to display news articles
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear existing articles

    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No articles found</p>';
        return;
    }

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = ` 
            <img src="${article.urlToImage}" alt="News Image">
            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
            <p>${article.description || 'No description available.'}</p>
        `;
        newsContainer.appendChild(newsItem);
    });
}

// Function to go back to general news
function goBackToGeneral() {
    document.getElementById('back-btn').classList.add('hidden'); // Hide the back button
    fetchNews(); // Fetch general news
    window.scrollTo(0, 0); // Scroll to the top of the page
}

// Trigger search on Enter key press (optional)
document.getElementById('search').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchNews(); // Fetch news when Enter is pressed
    }
});

// Initial fetch of general news on page load
fetchNews();
