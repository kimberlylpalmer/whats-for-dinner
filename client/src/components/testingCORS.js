

fetch('http://localhost:5555/test-cors')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
