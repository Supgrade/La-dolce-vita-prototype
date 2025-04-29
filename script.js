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

// Function to handle dictionary search
function searchDictionary(query) {
    // Placeholder for dictionary functionality
    // In a real implementation, this would query a database or API
    const searchResults = document.querySelector('.dictionary-results');
    
    if (searchResults) {
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
        } else {
            // Mock search results based on query
            // In a real app, this would filter from a database
            searchResults.innerHTML = `
                <div class="dictionary-item" onclick="showDictionaryEntry('${query}')">
                    <div class="dictionary-term">${query}</div>
                    <div class="dictionary-preview">Search result for "${query}"</div>
                </div>
                <div class="dictionary-notice">Showing results for "${query}"</div>
            `;
        }
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

// Initialize YouTube integration link
document.addEventListener('DOMContentLoaded', function() {
    // Find any elements that should link to YouTube and attach event listeners
    const youtubeLinks = document.querySelectorAll('.youtube-link');
    youtubeLinks.forEach(link => {
        link.addEventListener('click', function() {
            navigateTo('youtube-screen');
        });
    });
    
    // Add YouTube access from home screen
    const homeScreen = document.getElementById('home-screen');
    if (homeScreen) {
        const newEpisode = homeScreen.querySelector('.new-episode');
        if (newEpisode) {
            newEpisode.addEventListener('click', function(e) {
                // Prevent navigation if clicking on the button
                if (e.target.tagName !== 'BUTTON') {
                    navigateTo('youtube-screen');
                }
            });
        }
    }
    
    // Set up dictionary search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchDictionary(this.value);
        });
        
        // Initialize with empty search to show popular terms
        searchDictionary('');
    }
}); 