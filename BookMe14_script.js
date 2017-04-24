
// Class Book-----------------------------------------------------------
function Book (isbn,title,author,synopsis,img,links){
	this.isbn = isbn;
	this.title = title;
	this.author = author;
	this.synopsis = synopsis;
	this.img = img;
	this.links = links;
	this.likes = 0;
	this.dislikes = 0;
	this.bookshelf; 

	this.like = function (){
		this.likes ++;
	}
 
	this.dislike = function(){
		this.dislikes ++;
	}

	this.render = function (id){
		$("#" + id + " .img-rounded").attr("src",this.img);
		$("#" + id + " .title").html(this.title);
		$("#" + id + " .author").html(this.author);
		$("#" + id + " .synopsis").html(this.synopsis);
		$("#" + id + " .links").html(this.links);
		$("#" + id + " .numberl").html(this.likes);
		$("#" + id + " .numberd").html(this.dislikes);

		var data = {"book":this, "id":id};
		$("#" + id + " .btn-like").off("click");
		$("#" + id + " .btn-like").click(data,function(event){
			event.data.book.like();
			event.data.book.render(event.data.id);
		})

		var data = {"book":this, "id":id};
		$("#" + id + " .btn-dislike").off("click");
		$("#" + id + " .btn-dislike").click(data,function(event){
			event.data.book.dislike();
			event.data.book.render(event.data.id);
		})

		var data = {"bookshelf":this.bookshelf, "id":id};
		$("#" + id + " .btn-next").off("click");
		$("#" + id + " .btn-next").click(data,function(){
			data.bookshelf.next(id);
		})
	}
}


// Class Queue---------------------------------------------------------
function Queue (){
	this.data = [];

	this.enqueue = function(element){
		this.data.push(element);
	}

	this.dequeue = function(){
		return this.data.shift();
	}
}



// Class BookShelf-----------------------------------------------------
function BookShelf (){
	// criacao do dictionario shelf, ainda vazio
	this.shelf = new Queue ();
	
	//adiciona book à Queue
	this.addBook = function (book){
		book.bookshelf = this;	
		this.shelf.enqueue(book);
	}

	//inicializa livros a partir da fila
	this.init = function (){
		var firstDeq = this.shelf.dequeue();
		var secondDeq = this.shelf.dequeue();
		var thirdDeq = this.shelf.dequeue();

		firstDeq.render("firstShelf");
		secondDeq.render("secondShelf");
		thirdDeq.render("thirdShelf");
	}
		
	//passa ao proximo livro da fila
	this.next = function (coluna){
			var nextDeq = this.shelf.dequeue();
			nextDeq.render(coluna);
	}  
	
	//faz o load do ficheiro JSON da googleapis
	this.load = function(busca){
		this.busca = busca;
		var url = "https://www.googleapis.com/books/v1/volumes?q=" + busca + "&printType=books&maxResults=25&orderBy=relevance";
		var currentshelf = this;
		$.get(url)
			.done(function(data){
				currentshelf.parseBook(data);
			})
			.fail(function(data){
				console.log('Error: ' + data);
			})
	}

	// adiciona livros ao addBook para serem adicionados à fila
	this.parseBook = function(newbookshelf){
		this.bookone = {};
			for (i = 0; i < newbookshelf.items.length; i++){
				title = newbookshelf.items[i].volumeInfo.title ? newbookshelf.items[i].volumeInfo.title  : "Undefined title";
				author = newbookshelf.items[i].volumeInfo.authors ? newbookshelf.items[i].volumeInfo.authors[0] : "Undefined author";
				isbn = newbookshelf.items[i].volumeInfo.industryIdentifiers ?  newbookshelf.items[i].volumeInfo.industryIdentifiers[0].identifier : "undefined isbn";
				synopsis = newbookshelf.items[i].volumeInfo.description ? newbookshelf.items[i].volumeInfo.description : "Undefined synopsis";
				cover = newbookshelf.items[i].volumeInfo.imageLinks ? newbookshelf.items[i].volumeInfo.imageLinks.thumbnail : "https://s-media-cache-ak0.pinimg.com/originals/03/e2/a5/03e2a5e009ddafe75460e0692e35efa4.jpg";

				var books = new Book (isbn,title,author,synopsis,cover,"links");
		
				bookShelf1.addBook(books);
			}

	bookShelf1.init();
	}	

	this.search = function(search){
		this.shelf.data = [];
		searchmade = this;
		searchmade.load(search);
	}

} 



// Add Shelf to class BookShelf-----------------------------------------
var bookShelf1 = new BookShelf();

bookShelf1.load("harry");


//Search form-----------------------------------------------------------------------
$("#searchB").off("submit");	
$("#searchB").submit(function(event){
	var search = $("#search").val();
	bookShelf1.search(search);
	event.preventDefault();
})






// Footer function
 $(window).ready(function footplace() {
   var docHeight = $(window).height();
   var footerHeight = $('#footer').height();
   var footerTop = $('#footer').position().top + footerHeight;

   if (footerTop < docHeight) {
    $('#footer').css('margin-top', (docHeight - footerTop) + 'px');
   }
  });












