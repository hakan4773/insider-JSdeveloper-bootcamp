$(document).ready(function(){
    getPosts();
})




function getPosts(){
$.ajax({
  url: 'https://randomuser.me/api/?results=20',
  dataType: 'json',
  method: "GET",
  success: function (response) {
    response.results.forEach(function (user) {
        const userId = user.id.value || `user-${user.login.uuid}`; 
           const userCard = $(`
         <div id="userContainer" class="userCard" style="display: none;">
  <div class="imageContainer">
    <img src="${user.picture.medium}" alt="User Picture">
  </div>
  <div class="userInfo">
    <p><strong><i class="fas fa-user me-2"></i>Ad:</strong> ${user.name.title} ${user.name.first} ${user.name.last}</p>
    <p><strong><i class="fas fa-venus-mars me-2"></i>Cinsiyet:</strong> ${user.gender}</p>
    <p><strong><i class="fas fa-envelope me-2"></i>Email:</strong> ${user.email}</p>
    <p><strong><i class="fas fa-user-tag me-2"></i>Kullanıcı Adı:</strong> ${user.login.username}</p>
    <p><strong><i class="fas fa-map-marker-alt me-2"></i>Konum:</strong> ${user.location.city}, ${user.location.country}</p>
  </div>
  <button class="viewButton" data-fancybox data-src="#${userId}">
    <i class="fas fa-eye me-1"></i> Görüntüle
  </button>
</div>

        `);
      //Fancybox için kullanıcı bilgileri
          const detailContent = $(`
          <div style="display: none;" class="fancyContent" id="${userId}">
            <h2>${user.name.first} ${user.name.last}</h2>
            <img src="${user.picture.large}" alt="Detail Picture" />
            <p><strong><i class="fas fa-venus-mars me-2"></i>Cinsiyet:</strong> ${user.gender}</p>
    <p><strong><i class="fas fa-envelope me-2"></i>Email:</strong> ${user.email}</p>
    <p><strong><i class="fas fa-user-tag me-2"></i>Kullanıcı Adı:</strong> ${user.login.username}</p>
    <p><strong><i class="fas fa-map-marker-alt me-2"></i>Konum:</strong> ${user.location.city}, ${user.location.country}</p>
          </div>
        `);  
        //slider resimleri
       const userImage = $(`
  <div class="sliderItem">
    <img src="${user.picture.large}" data-fancybox data-src="#${userId}" alt="${user.name.first}" />
  </div>
`);
$('.slider').append(userImage);
        $('.container').append(userCard);
         $('.container').append(detailContent);
         //fadeIn animasyonu
     userCard.fadeIn(600);
     
    });
$('.slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  dots: true,
  infinite: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
         dots: false,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
         dots: false,
      }
    }
  ]
});

      },
  error: function (xhr, status, error) {
   console.error("Bir hata oluştu",error)
  },
  
});

}

//toggleClass animasyonu
$(document).on('mouseenter', '.userCard', function () {
  $(this).css({
    'border':'2px solid #3498db',
    'box-shadow': '0 5px 15px rgba(0,0,0,0.3)',
    'transition': 'all 0.3s ease'
  });
}).on('mouseleave', '.userCard', function () {
  $(this).css({
    'border':'1px solid #ddd',
    'box-shadow': 'none'
  });
});

//bounce animasyonu
$(document).on('click', '.userCard', function () {
  $(this).removeClass('animate__animated animate__bounce');
   void this.offsetWidth;
 $(this).addClass('animate__animated animate__bounce');
})
