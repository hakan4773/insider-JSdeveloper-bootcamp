/* eslint-disable */
(($) => {
    'use strict';

    const classes = {
        style: 'custom-style',
        wrapper: 'custom-wrapper',
        container: 'custom-container',
        addToCartButton: 'add-to-cart-btn',
        addToFavouriteButton: 'add-to-favourite-btn',
        viewDetailsButton: 'view-details-btn',
        headerContainer:'header-container',
        sliderContainer:'slider-container',
    };

    const selectors = {
        style: `.${ classes.style }`,
        wrapper: `.${ classes.wrapper }`,
        container: `.${ classes.container }`,
        addToCartButton: `.${ classes.addToCartButton }`,
        viewDetailsButton: `.${ classes.viewDetailsButton }`,
        addToFavouriteButton:`.${ classes.addToFavouriteButton }`,
        headerContainer:`.${classes.headerContainer}`,
        sliderContainer: `.${classes.sliderContainer}`,
       appendLocation: '#container' , 
    };

    const self = {};

    self.init = () => {
        self.reset();
        self.createHeader();
        self.createSlider();
        self.createWrapper();
        self.loadFancybox();
        self.SlickSlider();
        self.FontAvesome();
        self.buildCSS();
        self.fetchData();
        self.setEvents();
    };

    self.reset = () => {
        $(selectors.style).remove();
        $(selectors.wrapper).remove();
        $(document).off('.eventListener');
    };

    self.buildCSS = () => {
      const customStyle = `
            <style class="${classes.style}">
            ${selectors.headerContainer} {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    margin-bottom: 20px;
                    background-color: #f8f9fa;
                    border-radius: 8px;
                }

                ${selectors.appendLocation}{
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                ${selectors.wrapper} {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 25px;
                padding: 20px;
                width: 100%;
                box-sizing: border-box;
                }

                ${selectors.container} {
                    display: flex;
                    flex-direction: column;
                    position:relative;
                    gap: 10px;
                    align-items: center;
                    color: #000;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s ease;
                    width: 250px;
                    padding:10px;
                     background-color: #f9f9f9;
                   
                }
                    ${selectors.container} p {
                         font-size: 14px;
                color: #555;
                margin: 4px 0;
                text-align: center;
                    }
              ${selectors.container} img {
                width: 100%;
                height: 200px;
                border-radius: 4px;
                margin-bottom: 10px;
                background-color: transparent;
               }
                 ${selectors.container} h4 {
                font-size: 16px;
                color: #333;
                margin: 0 0 8px;
                text-align: center;
                
            }
                 ${selectors.container} strong {
                color: #000;
                text-align:left;
            }

           ${selectors.sliderContainer} {
                    width: 100%;
                    margin: 20px 0;
                    padding: 10px 0;
                }
                    .sliderItem img {
                    max-height: 300px;
                    width: auto;
                    margin: 0 auto;
                }

                ${selectors.addToCartButton} {
                    padding: 8px 16px;
                    background-color: #3498db;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-bottom:10px;
                }

                ${selectors.addToCartButton}:hover {
                    background-color: #2980b9;
                    
                }
                    ${selectors.viewDetailsButton}{
                    padding: 8px 16px;
                    background-color: green;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-bottom:10px;
                    }
             ${selectors.viewDetailsButton}:hover {
                    background-color: darkgreen;
                }

                  ${selectors.addToFavouriteButton} {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: transparent;
                    border: none;
                    font-size: 20px;
                    color: #ccc;
                    cursor: pointer;
                    transition: color 0.2s;
                    z-index: 1;
                }
                
                ${selectors.addToFavouriteButton}:hover {
                    color: red;
                }
                
                ${selectors.addToFavouriteButton}.favorited {
                    color: red;
                }
               #filter_product {
               text-align:center;
               padding:10px;
                   }

            #product-filter {
              padding: 10px;
              border: 1px solid gray;
              border-radius: 8px;
                }
              #product-details {
                    display: none;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    max-width: 800px;
                    margin: 0 auto;              }
            #cart-items {
                    margin-top: 20px;
                }
                     #cart-items ${selectors.container} {
                    width: 100%;
                    margin-bottom: 15px;
                }
             #clear-cart {
  display: block;
  width: 100%;
  padding: 10px 16px;
  margin-top: 20px;
  background-color: #e74c3c; 
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
            }
                #clear-cart:hover {
                    background-color: #c0392b;
                }
#product-basket {
  font-size: 24px;
  position: relative;
  cursor: pointer;
  padding: 10px 16px;
  background-color: #eee;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

#product-basket:hover {
  background-color: #dcdcdc;
  transform: scale(1.05);
}

#product-basket .badge {
  background-color: red;
  color: white;
  padding: 4px 8px;
  border-radius: 50%;
  font-size: 14px;
  position: absolute;
  top: -5px;
  right: -5px;
}




           .remove {
                    background-color: #95a5a6;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 4px;
                    margin-top: 10px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                
                .remove:hover {
                    background-color: #7f8c8d;
                }

             .slider-prev:before, .slider-next:before {
                    color: #333;
                }
                .slider-dots li button:before {
                    color: #333;
                }
                .slider-slide {
                    padding: 0 10px;
                }

                .fancybox__container {
                    --fancybox-bg: rgba(0, 0, 0, 0.8);
                }
            </style>
        `;
      $("head").append(customStyle);
    };

    //Header ,wrapper ve slider bileşenleri
self.createHeader=()=>{
    const headerHtml = `
            <div class="${classes.headerContainer}" >
                <div id="filter_product">
                    <input type="text" placeholder="Ürün ID'si gir..." id="product-filter" />
                </div>
                <div id="product-basket">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <span class="badge">0</span>
                </div>
                 <div  style="display:none;" id="product-details">
                  <button id="clear-cart">Sepeti Temizle</button>
                      <div id="cart-items"></div>
                  </div>
            </div>
        `;
        $(selectors.appendLocation).prepend(headerHtml);
}
self.createWrapper = () => {
  $(selectors.appendLocation).append(`<div class="${classes.wrapper}"></div>`);
};
self.createSlider = () => {
  $(selectors.appendLocation).append(`<div class="${classes.sliderContainer}"><div class="slider"></div></div>`);
};

    self.buildHTML = (product) => {
         if (!product) return;
       
        const favorites  = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavorited=favorites.includes(product.id);

        const html = `      
                <div class="${classes.container}" data-id="${product.id}">
                    <a href="${product.image}" data-fancybox="product-gallery" data-caption="${product.title}">
                        <img src="${product.image}" alt="${product.title}" />
                    </a>    
                    <h4>${product.title}</h4>
                    <p><strong>${product.price} $</strong></p>
                    <p>${product.description.substring(0, 50)}...</p>
                    <p>Kategori: ${product.category}</p>
                    <p>Puan: ${product.rating.rate} ⭐ (${product.rating.count} değerlendirme)</p>
                    <button class="${classes.viewDetailsButton}" data-id="${product.id}">Detay Göster</button>
                    <button class="${classes.addToCartButton}" data-id="${product.id}">Sepete Ekle</button>
                   <button class="${classes.addToFavouriteButton}  ${isFavorited ? 'favorited' : ''}"
                            data-id="${product.id}">
                        <i class="fa${isFavorited ? 's' : 'r'} fa-heart"></i>
                    </button>

                </div>
        `;
         // Product Details Modal
const modalHtml=(`
      <div id="product-details-${product.id}" style="display: none; max-width: 800px; padding: 20px;">
                <h2 >${product.title}</h2>
                <img src="${product.image}" alt="${product.title}" style="max-height: 400px; width: auto; display: block; margin: 0 auto;" />
                <p><strong>Fiyat: ${product.price} $</strong></p>
                <p>${product.description}</p>
                <p><strong>Kategori:</strong> ${product.category}</p>
                <p><strong>Puan:</strong> ${product.rating.rate} ⭐ (${product.rating.count} değerlendirme)</p>
            <button class="${classes.addToCartButton}" data-id="${product.id}">Sepete Ekle</button>
                   <button class="${classes.addToFavouriteButton}  ${isFavorited ? 'favorited' : ''}"
                            data-id="${product.id}">
                        <i class="fa${isFavorited ? 's' : 'r'} fa-heart"></i>
                    </button>
                </div>`
        )   

        //slider içeriği
          const productImage = (`
  <div class="sliderItem">
     <img src="${product.image}" style="cursor:pointer" data-fancybox="product-gallery"  alt="${product.title}" />
     <h4 style="text-align:center;">${product.title}</h4>
     </div>
`);

$('.slider').append(productImage);
$(selectors.wrapper).append($(html).hide().fadeIn(600));
$(selectors.appendLocation).append(modalHtml)

    };
    
    // Event listeners
    self.setEvents = () => {
      $(document).on(
        "click.eventListener",
        selectors.addToCartButton,
        function () {
          let $Card = $(this).closest(".custom-container");
          const $btn = $(this);      
         
          if ($Card.length === 0) {
            const productId = $btn.data("id");
            $Card = $(`.custom-container[data-id="${productId}"]`);
          }

    if ($Card.length === 0) return;
         $btn.html("<strong>Eklendi</strong>");
           setTimeout(() => {
             $btn.html("Sepete Ekle");
           }, 1000);
          self.setCartStorage($Card);
        }
      );

      //sepet modalı fancybox ile
      $(document).on("click.eventListener", "#product-basket", function () {
        Fancybox.show([
          {
            src: `#product-details`,
            type: "inline",
          },
        ]);
      });

      //fancybox ile ürün detaylarını gösterme
      $(document).on(
        "click.eventListener",
        selectors.viewDetailsButton,
        function () {
          const productId = $(this).data("id");
          Fancybox.show([
            {
              src: `#product-details-${productId}`,
              type: "inline",
            },
          ]);
        }
      );

      //Favorilere ekleme
      $(document).on(
        "click.eventListener",
        selectors.addToFavouriteButton,
        function () {
          const productId = $(this).data("id");
          const isFavorited = $(this).hasClass("favorited");
          let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

          if (isFavorited) {
            favorites = favorites.filter((id) => id !== productId);
            $(this).removeClass("favorited");
            $(this).html('<i class="far fa-heart"></i>');
          } else {
            favorites.push(productId);
            $(this).addClass("favorited");
            $(this).html('<i class="fas fa-heart"></i>');
          }

          self.setFavoritesStorage(favorites);
        }
      );

      //debounce
  $(document).on("input", "#product-filter", debounce(function () {
    const productId = $(this).val().trim();
    if (!productId) {
        $(selectors.container).show();
        return;
    }
    
    $.ajax({
        url: `https://fakestoreapi.com/products/${productId}`,
        method: "GET",
        success: function(product) {
            $(selectors.container).hide();
            const $filtered = $(selectors.container + `[data-id="${product.id}"]`);
            if ($filtered.length) {
                $filtered.show();
            } else {
                self.buildHTML(product);
            }
        },
        error: function() {
            alert("Ürün bulunamadı!");
            $(selectors.container).show(); 
        }
    });
}, 300));


      //debounce fonksiyonu
      function debounce(func, wait) {
        let timeout;
        return function () {
          const context = this;
          const args = arguments;
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            func.apply(context, args);
          }, wait);
        };
      }

      //toggleClass
      $(document)
        .on("mouseenter", ".custom-container", function () {
          $(this).css({
            border: "2px solid #3498db",
            "box-shadow": "0 5px 15px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          });
        })
        .on("mouseleave", ".custom-container", function () {
          $(this).css({
            border: "1px solid #ddd",
            "box-shadow": "none",
          });
        });

      //tek ürün sil
      $(document).on("click", ".remove", function () {
      const $container = $(this).closest(".custom-container");
      const id = $container.data("id");
      $container.remove(); 
      
       let items = JSON.parse(localStorage.getItem("cartItems")) || [];
       items = items.filter(itemId => itemId != id);  
       localStorage.setItem("cartItems", JSON.stringify(items));

      const count = $('#cart-items .custom-container').length;
        $('#product-basket .badge').text(count);
      });
      // Tüm ürünleri sil
      $(document).on("click", "#clear-cart", function () {
        $("#product-details #cart-items").empty();
        $('#product-basket .badge').text(0);
         localStorage.removeItem("cartItems");
      });
    };

    // Extra functions (localStorage, api requests, etc.)
    self.setCartStorage = (productCard) => {
        const cloned=productCard.clone(false);
        const productId = cloned.data("id");
        cloned.find("button").remove();
        cloned.append('<button class="remove">Sil</button>');

        let items = JSON.parse(localStorage.getItem("cartItems")) || [];
        if (!items.includes(productId)) {
          items.push(productId);
          localStorage.setItem("cartItems", JSON.stringify(items));
            $('#cart-items').append(cloned);
        }
        const count = $('#cart-items .custom-container').length;
         $('#product-basket .badge').text(count);
         
    };

    //Localstoragedaki ürünleri sepette gösterme
  self.loadCartFromStorage = () => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
   
    items.forEach(id => {
    const product = $(`.custom-container[data-id="${id}"]`).clone(false);
    product.find("button").remove();
    product.append('<button class="remove">Sil</button>');
    $('#cart-items').append(product);
  });

    const count = $('#cart-items .custom-container').length;
    $('#product-basket .badge').text(count);
    
    };

     
    //favorileri local storage'a ekleme
  self.setFavoritesStorage = (favorites) => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    //Api çağrısı ajax ile
  self.fetchData = () => {
        $.ajax({
            url: 'https://fakestoreapi.com/products?limit=5',
            dataType: 'json',
            method: 'GET',
            success: function (response) {
                response.forEach(function (product) {
                    self.buildHTML(product);
                });
                   //slick slider
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
            slidesToShow: 2,
            dots: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            dots: false,
          }
        }
      ]
    });

  self.loadCartFromStorage();
            },
            error: function (xhr, status, error) {
                console.error("Bir hata oluştu", error);
            }
        });
    };


    //FontAvesome Kütüphanesini ekleme
   self.FontAvesome = () => {
    $("head").append(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">`);
  };
  //slick slider Kütüphanesini ekleme
  self.SlickSlider = () => {
    $("head").append(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />`);
    $("head").append(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" />`);
    $("body").append(`<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>`);
  };
 //fancybox Kütüphanesini ekleme
  self.loadFancybox = () => {
    $("head").append(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css">`);
    $("body").append(`<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js"></script>`);
  };

    $(document).ready(self.init);
})(jQuery);
