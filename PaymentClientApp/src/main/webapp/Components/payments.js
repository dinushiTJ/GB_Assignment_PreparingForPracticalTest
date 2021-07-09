$(document).ready(function () {
    if ($("#alertSuccess").text().trim() == "") {
        $("#alertSuccess").hide();
    }
    $("#alertError").hide();
    $("#btncancel").addClass('invisible');
    loadPayments();
});

// CLIENT COMPONENTS
// CLIENT CONTROLLER
function loadPayments() {
	$.ajax(
        {
            url: "PaymentAPI",
            type: "GET",
            dataType: "text",
            complete: function (response, status) {
                onLoadPaymentsComplete(response.responseText, status);
            }
        });
}

function onLoadPaymentsComplete(response, status) {
	if (status == "success") {
        var serverResponse = JSON.parse(response);
        $("#divPaymentsGrid").html(serverResponse.payments);
    } else if (status == "error") {
        $("#alertError").text("Error occurred while requesting payment data.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error occurred while retrieving payment data.");
        $("#alertError").show();
    }
}

$(document).on("click", "#btnsave", function (event) {
    // Clear alerts
    $("#alertSuccess").text("");
    $("#alertSuccess").hide();
    $("#alertError").text("");
    $("#alertError").hide();
    // Form validation
    var status = validatePaymentForm();
    if (status != true) {
        $("#alertError").text(status);
        $("#alertError").show();
        return;
    }
    // If valid
    //check if put or post
    var type = ($("#paymentid").val() == "") ? "POST" : "PUT";
    $.ajax(
        {
            url: "PaymentAPI",
            type: type,
            data: $("#paymentform").serialize(),
            dataType: "text",
            complete: function (response, status) {
                onPaymentSaveComplete(response.responseText, status);
            }
        });
});

function onPaymentSaveComplete(response, status) {
    if (status == "success") {
        var serverResponse = JSON.parse(response);
        if (serverResponse.status.trim() == "success") {
            $("#alertSuccess").text("Payment was saved successfully.");
            $("#alertSuccess").show();
            $("#divPaymentsGrid").html(serverResponse.data);
        } else if (serverResponse.status.trim() == "error") {
            $("#alertError").text(serverResponse.data);
            $("#alertError").show();
        }
    } else if (status == "error") {
        $("#alertError").text("Error occurred while saving.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error occurred while saving.");
        $("#alertError").show();
    }
    $("#btncancel").click();
}

$(document).on("click", ".btnupdate", function (event) {
    $("#paymentid").val($(this).data("paymentid"));
    $("#btnsave").text("Update Now");
    $("#btncancel").removeClass('invisible');
    $("#consid").val($(this).closest("tr").find('td:eq(1)').text());
    $("#prodid").val($(this).closest("tr").find('td:eq(2)').text());
    $("#payamount").val($(this).closest("tr").find('td:eq(3)').text());
    $("#ccnumber").val($(this).closest("tr").find('td:eq(7)').text());
    $("#cctype").val($(this).closest("tr").find('td:eq(8)').text());
});

$(document).on("click", ".btncancel", function (event) {
    $("#paymentid").val("");
    $("#btnsave").text("Pay Now");
    $("#paymentform")[0].reset();
    $(this).addClass('invisible');
});

$(document).on("click", ".btndelete", function (event) {
    $.ajax(
        {
            url: "PaymentAPI",
            type: "DELETE",
            data: "paymentid=" + $(this).data("paymentid"),
            dataType: "text",
            complete: function (response, status) {
                onPaymentDeleteComplete(response.responseText, status);
            }
        });
});

function onPaymentDeleteComplete(response, status) {
    if (status == "success") {
        var serverResponse = JSON.parse(response);
        if (serverResponse.status.trim() == "success") {
            $("#alertSuccess").text("Payment was successfully deleted.");
            $("#alertSuccess").show();
            $("#divPaymentsGrid").html(serverResponse.data);
        } else if (resultSet.status.trim() == "error") {
            $("#alertError").text(serverResponse.data);
            $("#alertError").show();
        }
    } else if (status == "error") {
        $("#alertError").text("Error occurred while deleting.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error occurred while deleting.");
        $("#alertError").show();
    }
}

// CLIENT MODEL
// Validate Payment Form
function validatePaymentForm() {
    if ($("#consid").val().trim() == "") {
        return "Invalid Customer ID.";
    }
    
    if ($("#prodid").val().trim() == "") {
        return "Invalid Product ID.";
    }
    
    var payamt = $("#payamount").val().trim();
    if (payamt == "") {
        return "Invalid Payment Amound.";
    }
   	
    if (!$.isNumeric(payamt)) {
        return "Payment Amount must be a numerical value.";
    }
	
    $("#payamount").val(parseFloat(payamt).toFixed(2));
    
    var cc = $("#ccnumber").val().trim();
    if (cc == "") {
        return "Invalid Credit Card Number.";
    }
   	
    if (!$.isNumeric(cc)) {
        return "Credit Card Number must be a numerical value.";
    }
    
    if ($("#cctype").val().trim() == "Select") {
        return "Invalid Credit Card Type.";
    }
    
    return true;
}