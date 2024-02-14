document.addEventListener('DOMContentLoaded', async () => {
    const userId = 'your_user_id_here'; 
  
    try {
      const response = await fetch(`http://localhost:your_port_number_here/users/posts/${userId}`);
      if (response.ok) {
        const data = await response.json();
        displayUserPosts(data);
      } else {
        console.error('Failed to fetch user posts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  });
  
  function displayUserPosts(posts) {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';
  
    posts.forEach(post => {
      const postItem = document.createElement('div');
      postItem.classList.add('post');
      postItem.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
      postList.appendChild(postItem);
    });
  }
  