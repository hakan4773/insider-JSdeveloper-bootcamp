const style = document.createElement("style");
style.textContent = `
  body {
    margin:0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #f1f8ff;
    font-family: Arial, sans-serif;

  }
    .ins-api-users {
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
      .user-card{
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
      .delete-button{
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
      h1{
      text-align:center
      
      }
   
      @media (max-width: 768px) {
  .ins-api-users {
    grid-template-columns: 1fr 1fr;
    padding: 10px;
  }
      @media (max-width: 468px) {
  .ins-api-users {
    grid-template-columns: 1fr;
    padding: 10px;
  }
}

`;
document.head.appendChild(style);

$(document).ready(function () {
getData();
});

  const $container = $(".ins-api-users");
  $("body").prepend("<h1>Kullanıcı Listesi</h1>");

  //Veriyi Apiden çekme
  const getData = async () => {
    return new Promise((resolve, reject) => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
         .then((data) => {
          cachedData(data); 
          resolve(data);
        })
        .catch((err) => reject("Veri çekme hatası: " + err));

    });
  };

//veriyi localstorage'a 24 saatliğine kaydetme
   const cachedData = (data) => {
    const now = new Date();
    const item = {
      data:data,
      expiry: now.getTime() + 24 * 60 * 60 * 1000,
    };
    localStorage.setItem("users", JSON.stringify(item));
  };

//veriyi listeleme
const getUsers = (users) => {
        $container.empty();
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
          $container.append($userCard);
        });
      };

//localstoragedaki veriyi listeleme
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


//kullanıcıyı localstoragedan silme işlemi
$(document).on("click", ".delete-button", function () {
  const $userCard = $(this).closest(".user-card");
  const id = $userCard.data("id");
  $userCard.remove();

  let cached = JSON.parse(localStorage.getItem("users"));
  if (cached && cached.data) {
    cached.data = cached.data.filter(user => user.id != id);
    if (cached.data.length === 0) {
        localStorage.removeItem("users");
      } else {
        localStorage.setItem("users", JSON.stringify(cached));
      }  }
});

 //Apide veri yoksa 
  if (!getCachedData()) {
    getData().then(getUsers).catch(err => {
      $container.html(`<p style="color:red;">${err}</p>`);
    });
  }


//animasyonlar
  $(document)
    .on("mouseenter", ".user-card", function () {
      $(this).css({
        border: "2px solid #3498db",
        "box-shadow": "0 5px 15px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
      });
    })
    .on("mouseleave", ".user-card", function () {
      $(this).css({
        border: "1px solid #ddd",
        "box-shadow": "none",
      });
    });
