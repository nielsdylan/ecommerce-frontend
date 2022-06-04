const API = "http://127.0.0.1:8000/api";
$(document).ready(function () {
    getProducts();
    getCategories();
});

function getProducts() { 
    var html = '';
    $.ajax({
        method: 'GET',
        url: API+"/products",
        dataType: 'json',
        data: {},
        beforeSend: function()
        {
        },

    }).done(function (response) {
        
        renderProducts(response);
    }).fail(function () {
        // alert("Error");
    });
}
function getCategories() { 
    var html ='';
    $.ajax({
        method: 'GET',
        url: API+"/categories",
        dataType: 'json',
        data: {},
        beforeSend: function()
        {
        },

    }).done(function (response) {
        html ='';
        $.each(response, function (index, element) { 
            console.log(element);
            html+=''
                +'<li class="list-group-item"> <a href="#" class="" data-id="'+element.id+'" data-action="select">'+element.name+'</a></li>'
            +'';
        });
        $('[data-action="categories"]').html(html);
        html = '';

    }).fail(function () {
        // alert("Error");
    });
}
$(document).on('click','[data-action="select"]',function (e) {
    e.preventDefault();
    var category_id = $(this).attr("data-id");
    

    $.ajax({
        method: 'POST',
        url: API+"/product/category",
        dataType: 'json',
        data: {id:category_id},
        beforeSend: function()
        {
        },

    }).done(function (response) {

        renderProducts(response);
        console.log(response);

    }).fail(function () {
        // alert("Error");
    });


});
function renderProducts(response) {  
    var html ='';
    $.each(response.data, function (index, element) { 
        
        html+=''
        +'<div class="col-md-4">'
            +'<img src="'+element.url_image+'" class="card-img-top" alt="...">'
            +'<div class="card">'
                +'<div class="card-body">'
                    +'<h5 class="card-title">'+element.name+'</h5>'
                    +'<div class="row">'
                        +'<div class="col-md-4"> $'+element.price+' </div>';
                        if (element.discount!==0) {
                            html+='<div class="col-md-4"> '+element.discount+'% </div>'
                        }
                        
                        html+='<div class="col-md-4"> carrito </div>'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>'
    });
    $('[data-action="products"]').html(html);
    html = '';

    var per_page = response.links;
    per_page =  per_page.length-1;
    
    html+=''
        +'<nav aria-label="Page navigation">'
            +'<ul class="pagination">'
                +'<li class="page-item">'
                    +'<a class="page-link" href="'+response.links[0].url+'">'
                        +'Previous'
                    +'</a>'
                +'</li>';
                $.each(response.links, function (index, element) { 
                    if (index!=0 && index!=(per_page)) {
                        console.log(element);
                        html+='<li class="page-item"><a class="page-link" href="'+element.url+'">'+element.label+'</a></li>'
                    }
                     
                });
                html+='<li class="page-item">'
                    +'<a class="page-link" href="'+response.links[per_page].url+'">'
                        +'Next'
                    +'</a>'
                +'</li>'
            +'</ul>'
        +'</nav>'
    +'';
    $('[data-action="pagination"]').html(html);
}
