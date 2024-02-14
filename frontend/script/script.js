document.getElementById('fetchUsersBtn').addEventListener('click', () => {
  fetchUsers();
});

function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      displayUsers(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}

function displayUsers(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = ''; 
  users.forEach((user, index) => {
    const companyName = user.company.name;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <p><strong>${index + 1}. Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Website:</strong> ${user.website}</p>
      <p><strong>City:</strong> ${user.address.city}</p>
      <p><strong>Company:</strong> ${companyName}</p>
      <div class="buttonContainer">
        <button class="addButton" data-user='${JSON.stringify(user)}'>Add</button>
        <button class="openButton" data-user-id="${user.id}">Open</button>
      </div>
      <hr>
    `;
    userList.appendChild(listItem);

    const addButton = listItem.querySelector('.addButton');
    const openButton = listItem.querySelector('.openButton');
    addButton.addEventListener('click', async () => {
      const userData = JSON.parse(addButton.dataset.user);
      
      try {
        userData.company = companyName;

        const response = await fetch('http://localhost:4500/users/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        
        if (response.ok) {
          const responseData = await response.json();
          console.log('User added successfully:', responseData);
        } else {
          console.error('Failed to add user:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }
    });

    openButton.addEventListener('click', () => {
      const userId = openButton.dataset.userId;
      window.location.href = `postpage.html?userId=${userId}`;
    });
  });
}