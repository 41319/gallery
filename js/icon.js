<script>
(function () {
  // Create the icon container
  const iconContainer = document.createElement('div');
  iconContainer.id = 'floating-option-icon';
  iconContainer.style.position = 'fixed';
  iconContainer.style.bottom = '20px';
  iconContainer.style.right = '20px';
  iconContainer.style.width = '56px';
  iconContainer.style.height = '56px';
  iconContainer.style.background = '#1976d2'; // MUI primary
  iconContainer.style.color = 'white';
  iconContainer.style.borderRadius = '50%';
  iconContainer.style.display = 'flex';
  iconContainer.style.alignItems = 'center';
  iconContainer.style.justifyContent = 'center';
  iconContainer.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
  iconContainer.style.cursor = 'pointer';
  iconContainer.style.zIndex = '10000';
  iconContainer.title = 'Save Bookmark';

  // Material UI-style "bookmark" SVG icon
  iconContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" 
         height="24" viewBox="0 96 960 960" width="24" 
         fill="white">
      <path d="M240 936V296q0-24 18-42t42-18h360q24 0 42 18t18 42v640l-240-120-240 120Z"/>
    </svg>
  `;

  // Click behavior: save { label, url } to localStorage
  iconContainer.addEventListener('click', () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const newBookmark = {
      label: document.title,
      url: window.location.href
    };
    bookmarks.push(newBookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    alert(`Saved: "${newBookmark.label}"`);
  });

  // Append to body
  window.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(iconContainer);
  });
})();
</script>
