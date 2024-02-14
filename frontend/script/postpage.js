document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');

  try {
      const posts = await fetchUserPosts(userId);
      displayUserPosts(posts);
  } catch (error) {
      console.error('Error fetching user posts:', error);
  }

  const downloadExcelButton = document.getElementById('downloadExcelButton');
  downloadExcelButton.addEventListener('click', async () => {
      try {
          const posts = await fetchUserPosts(userId);
          downloadExcel(posts);
      } catch (error) {
          console.error('Error downloading user posts:', error);
      }
  });

  const bulkAddButton = document.getElementById('bulkAddButton');
  bulkAddButton.addEventListener('click', async () => {
      try {
          const posts = await fetchUserPosts(userId);
          await bulkAddPosts(posts, userId);
      } catch (error) {
          console.error('Error adding user posts in bulk:', error);
      }
  });
});

async function fetchUserPosts(userId) {
  try {
      const response = await fetch(`http://localhost:4500/users/posts/${userId}`);
      if (response.ok) {
          return await response.json();
      } else {
          throw new Error('Failed to fetch user posts');
      }
  } catch (error) {
      throw error;
  }
}

function displayUserPosts(posts) {
  const postList = document.getElementById('postList');
  postList.innerHTML = '';

  posts.forEach(post => {
      const postItem = document.createElement('div');
      postItem.classList.add('post');
      postItem.innerHTML = `
          <h2>Title : ${post.title}</h2>
          <p>Body : ${post.body}</p>
      `;
      postList.appendChild(postItem);
  });
}

function convertToExcel(posts) {
  const header = ['Title', 'Body']; 
  const rows = posts.map(post => [post.title, post.body]);
  const csvContent = [
      header.join(','), 
      ...rows.map(row => row.join(',')) 
  ].join('\n');
  return csvContent;
}

function downloadExcel(posts) {
  const excelContent = convertToExcel(posts);
  const blob = new Blob([excelContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'user_posts.xlsx';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

async function bulkAddPosts(posts, userId) {
  try {
      const data = posts.map(post => ({ ...post, userId }));
      const response = await fetch('http://localhost:4500/users/posts/bulk-add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      if (response.ok) {
          console.log('Posts added successfully');
      } else {
          throw new Error('Failed to add posts');
      }
  } catch (error) {
      throw error;
  }
}
