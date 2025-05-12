// Function to navigate between screens
function navigateTo(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the selected screen
    document.getElementById(screenId).classList.add('active');
    
    // Update active navigation item (if it exists)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Set appropriate nav item as active
    // This works when nav items have onclick="navigateTo('screen-id')"
    navItems.forEach(item => {
        const clickEvent = item.getAttribute('onclick');
        if (clickEvent && clickEvent.includes(screenId)) {
            item.classList.add('active');
        }
    });
}

// Function to show toast messages
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = toast.querySelector('.toast-text');
    
    toastText.textContent = message;
    toast.classList.add('show');
    
    // Hide the toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Function to show action feedback with animation
function showActionFeedback(element, message) {
    // Create feedback icon if it doesn't exist
    if (!element.querySelector('.feedback-icon')) {
        const feedbackIcon = document.createElement('div');
        feedbackIcon.className = 'feedback-icon';
        element.appendChild(feedbackIcon);
        element.classList.add('action-feedback');
    }
    
    const feedbackIcon = element.querySelector('.feedback-icon');
    feedbackIcon.textContent = message;
    feedbackIcon.classList.add('show');
    
    // Add visual indication to the button
    if (element.classList.contains('share-btn')) {
        element.classList.add('shared');
    }
    
    // Show toast message
    showToast(message);
    
    // Hide the feedback after 2 seconds
    setTimeout(() => {
        feedbackIcon.classList.remove('show');
    }, 2000);
}

// Function to save to favorites
function saveToFavorites(element, message) {
    // Toggle saved state
    element.classList.toggle('saved');
    
    // Create feedback icon if it doesn't exist
    if (!element.querySelector('.feedback-icon')) {
        const feedbackIcon = document.createElement('div');
        feedbackIcon.className = 'feedback-icon';
        element.appendChild(feedbackIcon);
        element.classList.add('action-feedback');
    }
    
    const feedbackIcon = element.querySelector('.feedback-icon');
    feedbackIcon.textContent = element.classList.contains('saved') ? "Saved!" : "Removed!";
    feedbackIcon.classList.add('show');
    
    // Show toast message
    showToast(element.classList.contains('saved') ? message : "Removed from favorites");
    
    // Hide the feedback after 2 seconds
    setTimeout(() => {
        feedbackIcon.classList.remove('show');
    }, 2000);
}

// Function to handle dictionary search
function searchDictionary(query) {
    // Placeholder for dictionary functionality
    // In a real implementation, this would query a database or API
    const searchResults = document.querySelector('.dictionary-results');
    
    if (searchResults) {
        // Show loading state
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = '<div class="loading-spinner"></div><div>Searching...</div>';
        searchResults.innerHTML = '';
        searchResults.appendChild(loadingIndicator);
        
        // Simulate API call delay
        setTimeout(() => {
            // Clear previous results
            searchResults.innerHTML = '';
            
            if (query.trim() === '') {
                // If query is empty, show popular terms
                searchResults.innerHTML = `
                    <div class="dictionary-item" onclick="showDictionaryEntry('Aperitivo')">
                        <div class="dictionary-term">Aperitivo</div>
                        <div class="dictionary-preview">Pre-dinner drinks and snacks</div>
                    </div>
                    <div class="dictionary-item" onclick="showDictionaryEntry('Dolce far niente')">
                        <div class="dictionary-term">Dolce far niente</div>
                        <div class="dictionary-preview">The sweetness of doing nothing</div>
                    </div>
                    <div class="dictionary-item" onclick="showDictionaryEntry('Ciao')">
                        <div class="dictionary-term">Ciao</div>
                        <div class="dictionary-preview">Hello/Goodbye</div>
                    </div>
                `;
                
                // Add results count
                const resultsCount = document.createElement('div');
                resultsCount.className = 'dictionary-notice';
                resultsCount.textContent = '3 popular terms shown';
                searchResults.appendChild(resultsCount);
            } else {
                // Mock search results based on query
                // In a real app, this would filter from a database
                searchResults.innerHTML = `
                    <div class="dictionary-item" onclick="showDictionaryEntry('${query}')">
                        <div class="dictionary-term">${query}</div>
                        <div class="dictionary-preview">Search result for "${query}"</div>
                    </div>
                `;
                
                // Add results count
                const resultsCount = document.createElement('div');
                resultsCount.className = 'dictionary-notice';
                resultsCount.textContent = '1 result found for "' + query + '"';
                searchResults.appendChild(resultsCount);
            }
        }, 500); // Simulate half-second delay for search
    }
}

// Function to clear search
function clearSearch(inputId) {
    const searchInput = document.getElementById(inputId);
    if (searchInput) {
        searchInput.value = '';
        // Trigger search update
        if (inputId === 'motto-search') {
            searchMottos('');
        } else {
            searchDictionary('');
        }
    }
}

// Function to search mottos
function searchMottos(query) {
    const mottoList = document.querySelector('.motto-list');
    const noResults = document.getElementById('no-results');
    const searchStatus = document.getElementById('search-status');
    const searchTerm = document.getElementById('search-term');
    const loadingIndicator = searchStatus.querySelector('.loading-indicator');
    const resultsCount = searchStatus.querySelector('.results-count');
    
    // Show loading
    loadingIndicator.style.display = 'flex';
    resultsCount.style.display = 'none';
    mottoList.style.display = 'none';
    noResults.style.display = 'none';
    
    // Simulate search delay
    setTimeout(() => {
        if (query.trim() === '') {
            // Show all mottos
            mottoList.style.display = 'block';
            loadingIndicator.style.display = 'none';
            resultsCount.style.display = 'block';
            resultsCount.textContent = '4 mottos found';
        } else if (query.toLowerCase().includes('chi') || query.toLowerCase().includes('ride')) {
            // Found results
            mottoList.style.display = 'block';
            loadingIndicator.style.display = 'none';
            resultsCount.style.display = 'block';
            resultsCount.textContent = '2 mottos found';
        } else {
            // No results
            mottoList.style.display = 'none';
            noResults.style.display = 'flex';
            loadingIndicator.style.display = 'none';
            resultsCount.style.display = 'none';
            if (searchTerm) searchTerm.textContent = query;
        }
    }, 500);
}

// Function to apply a search suggestion
function applySuggestion(suggestion) {
    const searchInput = document.getElementById('motto-search');
    if (searchInput) {
        searchInput.value = suggestion;
        searchMottos(suggestion);
    }
}

// Function to show a dictionary entry
function showDictionaryEntry(term) {
    // In a real app, this would fetch detailed info from a database
    navigateTo('dictionary-entry');
    
    // Populate the entry screen with information about the term
    const entryTitle = document.querySelector('#dictionary-entry .entry-title');
    const entryDefinition = document.querySelector('#dictionary-entry .entry-definition');
    const entryExample = document.querySelector('#dictionary-entry .entry-example');
    
    if (entryTitle && entryDefinition && entryExample) {
        entryTitle.textContent = term;
        entryDefinition.textContent = `Definition of "${term}" would appear here.`;
        entryExample.textContent = `Example usage of "${term}" would appear here.`;
    }
    
    showToast(`Viewing entry for "${term}"`);
}

// Function to switch tabs in the favorites screen
function showFavoritesTab(tabName) {
    const tabs = document.querySelectorAll('.favorites-tab');
    const contents = document.querySelectorAll('.favorites-content');
    
    // Update active tab
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(tabName)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Show appropriate content
    contents.forEach(content => {
        if (content.id === 'favorites-' + tabName) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
}

// Function to remove an item from favorites
function removeFavorite(event, itemId) {
    event.stopPropagation(); // Prevent navigation
    
    const item = event.target.closest('.favorites-item');
    const parent = item.parentNode;
    const empty = parent.querySelector('.empty-favorites');
    
    // Remove the item with animation
    item.style.opacity = '0';
    setTimeout(() => {
        item.remove();
        
        // If no more items, show empty state
        if (parent.querySelectorAll('.favorites-item').length === 0) {
            empty.style.display = 'flex';
        }
    }, 300);
    
    showToast('Item removed from favorites');
}

// Initialize YouTube integration link
document.addEventListener('DOMContentLoaded', function() {
    // Set up motto search functionality
    const mottoSearchInput = document.getElementById('motto-search');
    if (mottoSearchInput) {
        mottoSearchInput.addEventListener('input', function() {
            searchMottos(this.value);
        });
        
        // Initialize with empty search to show all mottos
        searchMottos('');
    }
    
    // Set up dictionary search functionality
    const searchInput = document.querySelector('.search-input:not(#motto-search)');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchDictionary(this.value);
        });
        
        // Initialize with empty search to show popular terms
        searchDictionary('');
    }
    
    // Initialize video thumbnails to be clickable
    const videoPreview = document.querySelector('.video-preview');
    if (videoPreview) {
        videoPreview.addEventListener('click', function() {
            navigateTo('youtube-screen');
        });
    }
}); 
