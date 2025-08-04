let start = 0;
const limit = 5;
isLoading=false;

function getPosts(){
        isLoading = true;
$('#loading').show(); 
$(".scroll").text("Yükleniyor...");

$.ajax({
  url: `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`,
  method: "GET",
  success: function (response) {
    if (start >= 100 || response.length===0) {
$(".scroll").text("Gösterilecek başka veri yok...").css({'color': '#ff6b6b'});

  $(window).off('scroll');
    $('#loading').hide();
      return;

      
    }
    
    response.forEach(function (post) {
$('.container').append(
  `<div id="postContainer">
     <p><strong>Post ID:</strong> ${post.id}</p>
     <p><strong>User ID:</strong> ${post.userId}</p>
     <p class="name"><strong>Title:</strong> ${post.title}</p>
     <p><strong>Body:</strong> ${post.body}</p>
   </div>`
);
         });
start += limit;
  },
  error: function (xhr, status, error) {
          $(".scroll").text("Yükleme hatası. Tekrar deneyin...");

  },
    complete: function() {
      $('#loading').hide();
      isLoading = false;
    }
});
}

$(document).ready(function(){

  getPosts();   

  let scrollTimer;

$(window).scroll(function () {
      clearTimeout(scrollTimer);
scrollTimer=setTimeout(function(){

 if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
getPosts(); 
  }
},300
)
});
});