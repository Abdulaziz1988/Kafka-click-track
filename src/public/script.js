// Send a request to the server when the user clicks on the website
document.addEventListener('click', function () {
  fetch('/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ event: 'click' })
  })
    .then(response => {
      if (response.ok) {
        console.log('Event sent successfully');
      } else {
        console.error('Failed to send event');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});