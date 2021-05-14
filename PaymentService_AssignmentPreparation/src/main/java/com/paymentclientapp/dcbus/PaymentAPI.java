package com.paymentclientapp.dcbus;

import java.io.IOException;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.paymentclientapp.model.Payment;

/**
 * Servlet implementation class PaymentAPI
 */
@WebServlet("/PaymentAPI")
public class PaymentAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Payment paymentObj;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public PaymentAPI() {
		super();
		paymentObj = new Payment();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//reading all payments and generate the HTML table
		JsonObject responseJson = generatePaymentTable(paymentObj.readPayments(null));
		response.getWriter().append(responseJson.toString());		
	}

	
	private JsonObject generatePaymentTable(JsonObject paymentsJson) {
		//generating payments table
		JsonObject responseJson;		
		String paymentTableStr = "<table class='table table-light table-striped table-hover table-sm'>"
				+ "<thead><tr class='text-center align-middle'>"
				+ "<th>Payment ID</th>"
				+ "<th>Consumer ID</th>"
				+ "<th>Product ID</th>"
				+ "<th>Payment Amount</th>"
				+ "<th>Date Payed</th>"
				+ "<th>Service Charge Rate</th>"
				+ "<th>Applied Tax Rate</th>"
				+ "<th>Credit Card Number</th>"
				+ "<th>Card Type</th>"
				+ "<th>Update</th>"
				+ "<th>Delete</th>"
				+ "</tr><thead><tbody>";

		if(! paymentsJson.has("payments")) {
			responseJson = new JsonObject();
			responseJson.addProperty("status", "error");
			responseJson.addProperty("message", "Failed to retrieve payment data.");
			return responseJson;
		}

		for(JsonElement paymentElement : paymentsJson.get("payments").getAsJsonArray()) {
			JsonObject payment = paymentElement.getAsJsonObject();
			paymentTableStr += "<tr><td>"+ payment.get("payment_id").getAsString() +"</td>"
					+ "<td>"+ payment.get("consumer_id").getAsString() +"</td>"
					+ "<td>"+ payment.get("product_id").getAsString() +"</td>"
					+ "<td>"+ payment.get("payment_amount").getAsString() +"</td>"
					+ "<td>"+ payment.get("date_payed").getAsString() +"</td>"
					+ "<td>"+ payment.get("service_charge_rate").getAsString() +"</td>"
					+ "<td>"+ payment.get("applied_tax_rate").getAsString() +"</td>"
					+ "<td>"+ payment.get("creditcard_no").getAsString() +"</td>"
					+ "<td>"+ payment.get("card_type").getAsString() +"</td>"
					+ "<td><input type='button' class='btn btn-secondary btnupdate' id='btnupdate' data-paymentid='"+payment.get("payment_id").getAsString()+"' value='Update'></td>"
					+ "<td><input type='button' class='btn btn-danger btndelete' id='btndelete' data-paymentid='"+payment.get("payment_id").getAsString()+"' value='Delete'</td></tr>";
		}

		paymentTableStr += "</tbody></table>";

		responseJson = new JsonObject();
		responseJson.addProperty("status", "success");
		responseJson.addProperty("payments", paymentTableStr);

		return responseJson;
	}

	
}
