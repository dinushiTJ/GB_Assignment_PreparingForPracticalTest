<%@ page import="com.paymentclientapp.model.Payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payment Client App</title>
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/payments.js"></script>
<!-- Bootstrap 4 <link rel="stylesheet" href="Views/bootstrap.min.css">-->
<!-- Bootstrap 5 -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0"
	crossorigin="anonymous">

<link rel="stylesheet" href="Views/payment.styles.css">
</head>
<body class="d-flex flex-column h-100">
	<main class="flex-shrink-0">
		<div class="d-flex flex-column p-3 w-25 bg-lessdark text-light">
			<a href="#"
				class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none">
				<!-- <img class="bi me-2" width="40" height="32" src=""/>--> <span
				class="fs-4 fw-semibold">Payments</span>
			</a>
			<hr>
			<div class="nav nav-pills flex-column mb-auto">
				<!-- payment form -->
				<form id='paymentform' class='paymentform'>
					<input type='hidden' id='paymentid' name='paymentid' value=''>
					<div class="row mb-0">
						<div class="col">
							<label for="consid" name='consid' class="col-12 col-form-label">Consumer
								ID</label>

							<div class="row mb-2">
								<div class="col-12">
									<input type="text" name='consid' class="form-control"
										id="consid">
								</div>
							</div>
						</div>
						<div class="col">
							<label for="prodid" class="col-12 col-form-label">Product
								ID</label>

							<div class="row mb-2">
								<div class="col-12">
									<input type="text" name='prodid' class="form-control"
										id="prodid">
								</div>
							</div>
						</div>
					</div>
					<div class="row mb-0">
						<label for="payamount" class="col-12 col-form-label">Payment
							Amount</label>
					</div>
					<div class="row mb-2">
						<div class="col-12">
							<input type="text" name='payamount' class="form-control"
								id="payamount">
						</div>
					</div>
					<div class="row mb-0">
						<label for="ccnumber" class="col-12 col-form-label">Credit
							Card Number</label>
					</div>
					<div class="row mb-2">
						<div class="col-12">
							<input type="text" name='ccnumber' class="form-control"
								id="ccnumber">
						</div>
					</div>
					<div class="row mb-0">
						<label for="cctype" class="col-12 col-form-label">Credit
							Card Type</label>
					</div>
					<div class="row mb-4">
						<div class="col-12">
							<select class="form-control form-select cctype"
								aria-label="selectcard" id="cctype" name='cctype'>
								<option selected>Select</option>
								<option>Master</option>
								<option>Visa</option>
								<option>Credit</option>
								<option>VerizonPay</option>
								<option>Other</option>
							</select>
						</div>
					</div>
					<div class="row">
						<button type="button" class="btn btn-primary col mx-2 btnsave"
						id="btnsave" name='btnsave'>Pay Now</button>
						<button type="button" class="btn btn-secondary col mx-2 btncancel"
						id="btncancel" name='btncancel'>Cancel</button>
					</div>
				</form>
			</div>
			<hr>
			<div class="text-light">
				<span class="">&#169; Gadgetbadget Company</span>
			</div>
		</div>
		<div
			class="d-flex flex-column align-items-stretch w-75 bg-dark text-light p-3 paybg">
			<span class="fs-5 fw-semibold my-4">List of Payments</span>
			<div class="list-group list-group-flush scrollarea">
				<!-- payments grid -->
				<!-- alert box -->
				<br>
				<div id='alertSuccess'
					class='alert alertSuccess bg-success text-light'></div>
				<div id='alertError' class='alert alertError bg-danger text-light'></div>
				<br>
				<div id="divPaymentsGrid">
					<!-- table generated in DC BUS -->
				</div>
			</div>
		</div>
	</main>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8"
		crossorigin="anonymous"></script>
</body>
</html>