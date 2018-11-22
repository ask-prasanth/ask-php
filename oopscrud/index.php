<html>
<head>
<title>CRUD</title>
	<script src="js/jquery.min.js"></script>
	<script src="js/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
</head>
<style type="text/css">
	table img{
		width: 200px;
	}
</style>
<body>
	<table border="1" cellpadding="5" cellspacing="0">
		<thead>
			<tr>
				<td></td>
				<td><input type="text" name="name"></td>
				<td>
					<select name="category">
						<option value="-1">Select Category</option>
					</select>
				</td>
				<td><input type="text" name="description"></td>
				<td><input type="file" name="product_img"></td>
				<td><input type="submit" id="save" value="Submit"></td>
			</tr>
			<tr>
				<th>No</th>
				<th>ProductName</th>
				<th>Category</th>
				<th>ProductDescription</th>
				<th>Picture</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</body>
</html>