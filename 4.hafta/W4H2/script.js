var script = document.createElement('script'); 
script.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
script.onload = function() {

const appendLocationSelector = '.appendLocation';

let $appendLocation = $(appendLocationSelector);
if ($appendLocation.length === 0) {
  $appendLocation = $('<div class="appendLocation"></div>');
  $(document.body).append($appendLocation);
}


const style = document.createElement("style");
style.textContent = `
body {
display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #f1f8ff;
    font-family: Arial, sans-serif;
}
    .appendLocation {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
        max-width: 1100px;
        margin: 20px;
        padding: 20px;
    }
     
    .user-card p {
        margin: 5px 0;
        font-size: 14px;
      }

      .user-card a {
        color: #007bff;
        text-decoration: none;
      }
      .user-card { 
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;  
      }
      .delete-button {
      margin-top: 15px;
        padding: 8px 12px;
        background-color: #e74c3c;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s ease;
      }
        .delete-button:hover {
        background-color: #c0392b;
      }
    

      .getAllUser {
        background-color: #517df7ff;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        padding:10px;
        font-weight: bold;
        text-align:center;
        transition: background-color 0.2s ease;
      }
   .getAllUser:hover{
    background-color: #295ff3ff;
   }
  @media (max-width: 768px) {
  .appendLocation {
    grid-template-columns: 1fr 1fr;
    padding: 10px;
  }
}

@media (max-width: 468px) {
  .appendLocation {
    grid-template-columns: 1fr;
    padding: 10px;
  }
}
`;

$(document.head).append(style);

const getData = async () => {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem("users", JSON.stringify({ data, expiry }));
        getUsers(data);
      })
      .catch((err) => reject("Veri çekme hatası: " + err));
  });
};


const getUsers = (users) => {
  users.forEach((user) => {
    const $userCard = $(`
            <div class="user-card" data-id="${user.id}">
              <p><strong>İsim:</strong> ${user.name}</p>
              <p><strong>Kullanıcı Adı:</strong> ${user.username}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Telefon:</strong> ${user.phone}</p>
              <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
              <p><strong>Şirket:</strong> ${user.company.name}</p>
              <p><strong>Adres:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city} (${user.address.zipcode})</p>
             <button class="delete-button">Sil</button>
              </div>
          `);
    $appendLocation.append($userCard);
  });
};

const getCachedData = () => {
    const cached = localStorage.getItem("users");
    if (cached) {
      const { data, expiry } = JSON.parse(cached);
      if (new Date().getTime() < expiry) {
        getUsers(data);
      } else {
        localStorage.removeItem("users");
      }
    }
    return null;
  };

getCachedData();

$(document).on("click", ".delete-button", function () {
  const $userCard = $(this).closest(".user-card");
  const id = $userCard.data("id");
  $userCard.remove();
  let cached = JSON.parse(localStorage.getItem("users"));
  if (cached && cached.data) {
    cached.data = cached.data.filter(user => user.id != id);
    localStorage.setItem("users", JSON.stringify(cached));
  }
});

const showUserButton = () => {
   if (!sessionStorage.getItem("getUsers")) {
      $appendLocation.html(
        `<button class="getAllUser">Tüm Kullanıcıları Getir</button>`
      );
    }
  };

  const observerCallback = () => {
    const userCardsCount = $appendLocation.find(".user-card").length;
    if (userCardsCount === 0) {
      if ($appendLocation.find('.getAllUser').length === 0) {
        showUserButton();
      }
    } else {
      $appendLocation.find(".getAllUser").remove();
    }
  };

  const observer = new MutationObserver(observerCallback);
  observer.observe($appendLocation[0], { childList: true });

  $(document).on("click", ".getAllUser", async function () {
    sessionStorage.setItem("getUsers", "true");
       getData();
  });


$(document).ready(function () {
 if (!getCachedData()) {
    getData();
    showUserButton();
  }
});



};
document.head.appendChild(script);



