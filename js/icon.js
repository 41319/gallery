(function () {
  // Create the icon container
  const iconContainer = document.createElement('div');
  iconContainer.id = 'floating-option-icon';
  iconContainer.style.position = 'fixed';
  iconContainer.style.bottom = '20px';
  iconContainer.style.right = '20px';
  iconContainer.style.width = '50px';
  iconContainer.style.height = '50px';
  iconContainer.style.background = '#007bff';
  iconContainer.style.color = 'white';
  iconContainer.style.borderRadius = '50%';
  iconContainer.style.display = 'flex';
  iconContainer.style.alignItems = 'center';
  iconContainer.style.justifyContent = 'center';
  iconContainer.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
  iconContainer.style.cursor = 'pointer';
  iconContainer.style.zIndex = '10000';
  iconContainer.title = 'Options';

  // Add icon (you can change this to an SVG or image if desired)
  iconContainer.innerHTML = '⚙️';

  // Click behavior (customize as needed)
  iconContainer.addEventListener('click', () => {
    alert('Options clicked! Customize this behavior.');
  });

  // Append to body
  window.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(iconContainer);
  });
})();
