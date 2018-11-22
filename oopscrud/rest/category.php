<?php
require_once "../connection.php";
require_once "../controller/category.php";
require_once "../controller/product.php";

$mode = $_REQUEST['mode'];

$objCategory = new Category();
$result = "";
if($mode == "loadAll"){
	$category = $objCategory->getAll();
	$result.="<option value='-1'>"; 
	$result.="Select One";
	$result.="</option>";
	while($row = $category->fetch_assoc()){
		$result.="<option value='".$row["CategoryID"]."'>";
		$result.=$row["CategoryName"];
		$result.=$row["CategoryName"];
		$result.="</option>";
	}
	echo $result;
}else if($mode == "loadOne"){
	$objProduct = new Product();
	$product = $objProduct->getOne($_REQUEST['id'])->fetch_assoc();

	$category = $objCategory->getAll();
	$result.="<option value='-1'>";
	$result.="Select One";
	$result.="</option>";
	while($row = $category->fetch_assoc()){
		$result.="<option value='".$row["CategoryID"]."'";
		if($row["CategoryID"]==$product['CategoryID']) $result.= " selected";
		$result.=">";
		$result.=$row["CategoryName"];
		$result.="</option>";
	}
	echo $result;
}
?>    