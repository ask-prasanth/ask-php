<?php
class Product{
	private $conn;
	private $table;

	public function __construct(){
		$db = new connection();
		$this->conn = $db->getConnection();
		$this->table = "product";
	}
	public function getAll(){
		return $this->conn->query("SELECT * from $this->table JOIN category on $this->table.CategoryID=category.CategoryID");
	}
	public function save($name, $description, $category, $productImg){
		echo $name;
		$this->conn->query("INSERT into $this->table( ProductName, ProductDescription, CategoryID, productImg) VALUES('$name', '$description', '$category', '$productImg')");
	}
	public function getOne($id){
		return $this->conn->query("SELECT * from $this->table JOIN category on $this->table.CategoryID=category.CategoryID WHERE $this->table.ProductID='$id'");
	}
	public function update($id, $name, $description, $category, $productImg){
		$this->conn->query("UPDATE $this->table SET ProductName='$name', ProductDescription='$description', CategoryID='$category', productImg='$productImg' WHERE ProductID='$id'");
	}
	public function delete($id){
		$this->conn->query("DELETE from $this->table WHERE ProductID = '$id'");
	}
}
?>