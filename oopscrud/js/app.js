$(document).ready(function(){
	$("#save").click(saveData);
	$("[name='submit']").click(function(){
		mode = "insert";
		$("#save").attr("value", "Submit");
	})
	$("body").on("click", ".edit", function(){
		mode = "update";
		$("#save").attr("value", "Edit");
		idTarget = $(this).attr("data-id");
		getData(idTarget);
	});
	$("body").on("click", ".delete", function(){
		idTarget = $(this).attr("data-id");
		var temp = confirm("Are you sure?");
		if(!temp){
			return false;
		}else{
			deleteData(idTarget);
		}
	});
	loadData();

	var mode = "insert";
	var idTarget = -1;
	var data;
	var productName;
	var productDescription;
	var category;
	var productImg;

	function getValue(){
		data = new FormData();
		productName = $("[name='name']").val();
		productDescription = $("[name='description']").val();
		category = $("[name='category']").val();
		productImg = $("[name='product_img']").prop("files")[0];

		if(productImg==undefined){
			productImg = null;
		}

		data.append("mode", mode);
		data.append("id", idTarget);
		data.append("productName", productName);
		data.append("productDescription", productDescription);
		data.append("category", category);
		data.append("productImg", productImg);
	}

	function saveData(){
		getValue();
		if(productName == ""){
			alert("Name Added successfully");
		}else if(productDescription==""){
			alert("description Added successfully");
		}else if(category==-1){
			alert("pilih Added successfully!");
		}else{
			if(mode=="insert"){
				insertData();
			}else if(mode=="update"){
				updateData();
			}
		}
	};

	function insertData(){
		$('#loading').show();
		getValue();
		$.post({
			url : "rest/product.php",
			data : data,
			contentType : false, //ini harus dibuat supaya tidak error saat upload
			processData: false, //ini harus dibuat supaya tidak error saat upload
			success : function(){
				loadData();
			},
			complete : function(){
				$('#loading').hide();
			}
		});
	}

	function getData($id){
		$.get({
			url : "rest/product.php",
			data : {mode:'loadOne', id:idTarget},
			success : function(data){
				var temp = JSON.parse(data);
				$("[name='name']").val(temp.ProductName);
				$("[name='description']").val(temp.ProductDescription);
			}
		});

		//getcategory
		$.get({
			url : "rest/category.php",
			data : {mode:"loadOne", id:idTarget},
			success : function(data){
				$("[name='category']").html(data);
				//alert(data);
			}
		});
	}

	function updateData(){
		$('#loading').show();
		getValue();
		$.post({
			url : "rest/product.php",
			data : data,
			contentType : false, //ini harus dibuat supaya tidak error saat upload
			processData: false, //ini harus dibuat supaya tidak error saat upload
			success : function(){
				loadData();
				clearForm();
			},
			complete : function(){
				$('#loading').hide();
			}
		});
	}

	function loadData(){
		$.get({
			url : "rest/product.php",
			data : {mode:'load'},
			success : function(data){
				$("body table tbody").html(data);
			}
		});

		//getcategory
		$.get({
			url : "rest/category.php",
			data : {mode:"loadAll"},
			success : function(data){
				$("[name='category']").html(data);
				//alert(data);
			}
		});

		clearForm();
	};

	function deleteData(id){
		$('#loading').show();
		$.get({
			url : "rest/product.php",
			data : {mode:"delete", id:idTarget},
			success : function(){
				loadData();
				clearForm();
			},
			complete : function(){
				$('#loading').hide();
			}
		});
	}

	function clearForm(){
		$("[name='name']").val("");
		$("[name='description']").val("");
		$("[name='category']").val("");
		$("[name='product_img']").val("");

		data = new FormData();

		mode = "insert";
		$("#save").attr("value", "Submit");
		idTarget = -1;
	}
})