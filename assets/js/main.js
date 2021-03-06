$(function() {

    // Alert Function
    function alert_msg(alert_type, alert_msg){
        $('.alert p').html(alert_msg);
        if(alert_type == 'warning'){
            $('.alert').addClass('warning-bg');
        }else if(alert_type == 'success'){
            $('.alert').addClass('success-bg');
        }else if(alert_type == 'danger'){
            $('.alert').addClass('danger-bg');
        }

        $('.alert').fadeIn().delay(10000).fadeOut();
    }

    //nav animation
    $('div.nav_header').click(function(){
        $(this).siblings().next('nav').stop().slideUp();
        $(this).next('nav').stop().slideDown();
    });

    // Loading a page in the
    function load_page(selector, file, data){
        if(typeof(data)==='undefined') data = '';
        $('.loading').fadeIn();
        $(selector).fadeOut(10).stop().delay(30).load(file, data, function() {
            $('.loading').fadeOut();
        }).delay(500).fadeIn();
        //$(selector).fadeOut(10).delay(30).load(file).delay(500).fadeIn();
    }

    // Add Customer Button
    $('#add_customer_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/new_customer_form.php');
    });

    // View Customer Button
    $('#view_customers_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/view_customers.php');
    });

    // Add Customer Submit Form
    $(document).on("submit", "#add_customer_form", function(e) {
        $('.loading').fadeIn();
        $("input, button").prop('disabled', true);
        // Validate the Form
        if($("input[name='first_name']").val() == 0){
            $("input[name='first_name']").addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($("input[name='middle_name']").val() == 0){
            $("input[name='middle_name']").addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($("input[name='last_name']").val() == 0){
            $("input[name='last_name']").addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($("input[name='company_name']").val() == 0){
            $("input[name='company_name']").addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($("input[name='street_name']").val() == 0){
            $("input[name='street_name']").addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($("input[name='city_name']").val() == 0){
            $("input[name='city_name']").addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($("input[name='country_name']").val() == 0){
            $("input[name='country_name']").addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($("input[name='email1']").val() == 0){
            $("input[name='email1']").addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($("input[name='mobile1']").val() == 0){
            $("input[name='mobile1']").addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else{

            var post_data = {
                first_name:$("input[name='first_name']").val(),
                middle_name:$("input[name='middle_name']").val(),
                last_name:$("input[name='last_name']").val(),
                company_name:$("input[name='company_name']").val(),
                street_name:$("input[name='street_name']").val(),
                city_name:$("input[name='city_name']").val(),
                country_name:$("input[name='country_name']").val(),
                email1:$("input[name='email1']").val(),
                email2:$("input[name='email2']").val(),
                mobile1:$("input[name='mobile1']").val(),
                mobile2:$("input[name='mobile2']").val(),
                mobile3:$("input[name='mobile3']").val(),
                mobile4:$("input[name='mobile4']").val()
            };
            var formURL = $(this).attr("action");
            $.ajax({
                url : formURL,
                type: "POST",
                data : post_data,
                success:function(data, textStatus, jqXHR, response){
                    if(jqXHR.responseText == 'customer_exists'){
                        var customer_name = post_data.first_name + ' ' + post_data.middle_name + ' ' + post_data.last_name;
                        alert_msg('warning', '<strong>'+customer_name + '</strong> is already in the system.');
                        $("input, button").prop('disabled', false);
                        $('.loading').fadeOut();
                    }
                    else{
                        var customer_name = post_data.first_name + ' ' + post_data.middle_name + ' ' + post_data.last_name;
                        alert_msg('success', '<strong>'+customer_name + '</strong> has been added successfully in the System.');
                        $('input').val('');
                        $("input, button").prop('disabled', false);
                        $('.loading').fadeOut();
                    }

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("input, button").prop('disabled', false);
                    $('.loading').fadeOut();
                }
            });
        }

        e.preventDefault(); //STOP default action
        //e.unbind(); //unbind. to stop multiple form submit.
    });

    // Default Input

    $(document).on("change", "input", function() {
        $(this).removeClass('error-border');
    });

    // New Order Button
    $('#new_order_form_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/new_order_form.php');
    });

    // Pending Orders Button
    $('#pending_orders_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/view_pending_orders.php');
    });

    // Approved Orders Button
    $('#approved_orders_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/view_approved_orders.php');
    });

    // Declined Orders Button
    $('#declined_orders_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/view_declined_orders.php');
    });


    // Adding Products to the Order Form
    var products = []; // New Array to hold the products Values
    var total_amount = 0;
    $(document).on("click", "#add_product_btn", function(e) {
        $('.loading').fadeIn();
        var product_name = $("#product_name").val();
        var product_code = $('#product_code').val();
        var product_price = $('#product_price').val();
        var product_quantity = $('#product_quantity').val();
        var product_amount = $('#product_amount').val();
        var number = products.length + 1;

        if(!product_name || !product_code || !product_price || !product_quantity){
            alert_msg('warning', 'Please Fill in all the fields before Adding another product');
            if(!product_name){
                $('#product_name').addClass('error-border');
            }else if(!product_code){
                $('#product_code').addClass('error-border');
            }else if(!product_price){
                $('#product_price').addClass('error-border');
            }else if(!product_quantity){
                $('#product_quantity').addClass('error-border');
            }
            $('.loading').fadeOut();
        }else{

            products[products.length] = [products.length, product_name, product_code, product_price, product_quantity, product_amount];

            $('#order_products_display').fadeIn();
            $('#order_products_display tr:last').after('<tr><td>'+number+'</td><td>'+product_name+'</td><td>'+product_code+'</td><td>'+product_price+'</td><td>'+product_quantity+'</td><td>'+product_amount+'</td><td><a href="#" class="remove_btn text-desaturated-blue">Remove</a></td></tr>');

            total_amount = parseInt(total_amount) + parseInt(product_amount);
            $('.total_amount').fadeOut().delay(400).html(total_amount).fadeIn();

            //console.log(total_amount);
            //console.log(products);
            //var test = JSON.stringify(products);
            //console.log(test);
            /*
            for(var product = 0; product < products.length; product++){
                console.log(products[product]);
            */

            //var test = array2json(products);
            //console.log(test);
            $('.loading').fadeOut();

        }

        e.preventDefault();
    });

    // Amount Calculation System
    $(document).on("change", "#product_quantity", function() {
        $('.loading').fadeIn();
        var product_price = $('#product_price').val();
        var product_quantity = $('#product_quantity').val();
        var product_amount = product_price * product_quantity;

        $('#product_amount').val(product_amount);
        $('.loading').fadeOut();
    });

    // Remove Products
    $(document).on("click", ".remove_btn", function() {
        $('.loading').fadeIn();
        $(this).parent().parent().fadeOut();
        var array_id = $(this).parent().siblings().html()-1;
        //products.splice(products[array_id], 1);
        delete products[array_id];
        //console.log(products);
        //total_amount = products[array_id][5];
        var amount = $(this).parent().siblings(':last').html();
        total_amount = parseInt(total_amount) - parseInt(amount);
        $('.total_amount').fadeOut().delay(500).html(total_amount).fadeIn();
        //console.log(total_amount);
        $('.loading').fadeOut();
    });

    // Submitting the Order Form
    $(document).on("submit", "#new_order_form", function(e) {
        $('.loading').fadeIn();
        $("input, button").prop('disabled', true);
        // Check Form Data
        if(!$('#customer_id').val()){
            alert_msg('warning', 'Select Customer before proceeding');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($('#product_name').val() == 0){
             alert_msg('warning', 'Enter Product Name');
             $('#product_name').addClass('error-border');
             $("input, button").prop('disabled', false);
             $('.loading').fadeOut();
         }else if($('#product_code').val() == 0){
             alert_msg('warning', 'Enter the Product Code');
             $('#product_code').addClass('error-border');
             $("input, button").prop('disabled', false);
             $('.loading').fadeOut();
         }else if($('#product_price').val() == 0){
             alert_msg('warning', 'Enter the Product Price');
             $('#product_price').addClass('error-border');
             $("input, button").prop('disabled', false);
             $('.loading').fadeOut();
         }else if($('#product_quantity').val() == 0){
             alert_msg('warning', 'Enter the Product Quantity');
             $('#product_quantity').addClass('error-border');
             $("input, button").prop('disabled', false);
             $('.loading').fadeOut();
         }else{

            var customer_id = $('#customer_id').val();

            /* This Form will update 2 Tables
            /* 1. loan_orders
            /* 2. loan_products
            */

            var loan_order_id;

            // Inserting in the loan_orders
            var post_data = {
                customer_id : customer_id,
                order_amount : parseInt(total_amount)
            }
            var url = 'process/new_order_process.php';

            $.post(url, post_data, function(result){
                if(result > 0){
                    loan_order_id = result;

                    // Inserting in the loan_products

                    $.post('process/order_products_process.php', {'products':products, 'order_id': loan_order_id}, function(data){
                        if(data == 'true'){
                            $("input, button").prop('disabled', false);
                            alert_msg('success', 'New Order successfully added');
                            products.length = 0;
                            total_amount = 0;
                            load_page('#inner-content', 'includes/new_order_form.php');
                            $('.loading').fadeOut();
                        }else{
                            alert_msg('danger', 'There was an Internal Problem, Please contact the Administration');
                            $("input, button").prop('disabled', false);

                            $('.loading').fadeOut();
                        }
                    });

                }

            });

        }
        e.preventDefault();
    });


    // Calculating the Loan Amount with the Installments
    var schedule_number;
    $(document).on("change", "#schedule_number", function() {
        schedule_number = $('#schedule_number').val();
        var number = total_amount / schedule_number
        $('#payment_amount').val(number);
    });

    // Datepicker function
    $(document).on('focus', '.datepicker', function(){
        $( ".datepicker" ).datepicker({
            dateFormat: "yy-mm-dd"
        });
    });

    // View Details of the Form in the List

    $(document).on('click', '.order_view_details_btn', function(e){

        var order_id = $(this).siblings().next().next().html();

        $('#dialog_details').dialog({
            modal:true,
            title:'Order Details',
            open:function(){
                load_page(this, 'includes/view_order_details.php', {id:order_id});
            },
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 1000
            },
            resizable : true,
            minWidth : 400,
            height : 600,
            position : {my: "center top", at: "center top", of: "#container"}
        });

        e.preventDefault();
    });

    $(document).on('click', '.order_approve_btn', function(e){
        var order_id = $(this).siblings().next().next().html();
        var order_row = $(this).parent();
        $( "#dialog" )
        .appendTo('#dialog')
        .html("<p class='text-desaturated-blue text-center'> Are you sure you want to <strong class='text-desaturated-blue'>APPROVE</strong> this order?</p>")
        .dialog({
            resizable: false,
            modal: true,
            title:'Confirmation',
            buttons: {
                "Yes": function() {
                    $('.loading').fadeIn();
                    $( this ).dialog( "close" );
                    $.post('process/approve_process.php',{id:order_id}, function(c){
                        if(c == true){
                            alert_msg('success', "Order Number "+order_id+" is successfully approved");
                            order_row.fadeOut(500);
                            $('.loading').fadeOut();
                        }else{
                            alert_msg('danger', "There was a problem with the system.");
                            $('.loading').fadeOut();
                        }
                    });
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            }
        });

        e.preventDefault();
    });


    $(document).on('click', '.order_decline_btn', function(e){
        var order_id = $(this).siblings().next().next().html();
        var order_row = $(this).parent();
        $( "#dialog" )
        .appendTo('#dialog')
        .html("<p class='text-desaturated-blue text-center'> Are you sure you want to <strong class='text-desaturated-blue'>Decline</strong> this order?</p>")
        .dialog({
            resizable: false,
            modal: true,
            title:'Confirmation',
            buttons: {
                "Yes": function() {
                    $('.loading').fadeIn();
                    $( this ).dialog( "close" );
                    var reason = prompt('Please give a reason for this Decline');
                    $.post('process/decline_process.php',{id:order_id, reason:reason}, function(c){
                        if(c == true){
                            alert_msg('success', "Order Number "+order_id+" is successfully Declined");
                            order_row.fadeOut(500);
                            $('.loading').fadeOut();
                        }else{
                            alert_msg('danger', "There was a problem with the system.");
                            $('.loading').fadeOut();
                        }
                    });
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            }
        });

        e.preventDefault();
    });


    //Print Test
    $(document).on('click', '.print_this', function(){
        $('head').append("<link rel='stylesheet' href='assets/css/print.css' type='text/css' media='print' />").print();
    });

    // Transfer Order Button
    $('#transfer_order_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/transfer_orders.php');
    });

    $(document).on('click', '.order_transfer_btn', function(e){
        var order_id = $(this).siblings().next().next().html();
        var order_row = $(this).parent();
         $( "#dialog" )
        .appendTo('#dialog')
        .html("<p class='text-desaturated-blue text-center'> Are you sure the order is <strong class='text-desaturated-blue'>TRANSFERED</strong>?</p>")
        .dialog({
            resizable: false,
            modal: true,
            title:'Confirmation',
            buttons: {
                "Yes": function() {
                    $('.loading').fadeIn();
                    $( this ).dialog( "close" );
                    $.post('process/transfered_process.php',{id:order_id}, function(c){
                        if(c == true){
                            alert_msg('success', "Order Number "+order_id+" is successfully transfered");
                            order_row.fadeOut(500);
                            $('.loading').fadeOut();
                        }else{
                            alert_msg('danger', "There was a problem with the system.");
                            $('.loading').fadeOut();
                        }
                    });
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            }
        });
        e.preventDefault();
    });

    // Transfer Order Button
    $('#view_transfer_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/view_transfered_orders.php');
    });

    // Transfer Order Button
    $('#deliver_order_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/deliver_orders.php');
    });

    // Deliver Order Button
    $('#view_delivered_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/view_delivered_orders.php');
    });

    $(document).on('click', '.order_delivered_btn', function(e){
        var order_id = $(this).siblings().next().next().html();
        var order_row = $(this).parent();
         $( "#dialog" )
        .appendTo('#dialog')
        .html("<p class='text-desaturated-blue text-center'> Are you sure the order is <strong class='text-desaturated-blue'>DELIVERED</strong>?</p>")
        .dialog({
            resizable: false,
            modal: true,
            title:'Confirmation',
            buttons: {
                "Yes": function() {
                    $('.loading').fadeIn();
                    $( this ).dialog( "close" );
                    $.post('process/delivered_process.php',{id:order_id}, function(c){
                        if(c == true){
                            alert_msg('success', "Order Number "+order_id+" is successfully delivered");
                            order_row.fadeOut(500);
                            $('.loading').fadeOut();
                        }else{
                            alert_msg('danger', "There was a problem with the system.");
                            $('.loading').fadeOut();
                        }
                    });
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            }
        });
        e.preventDefault();
    });

    // View Customer Button
    $('#view_orders_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/view_all_orders.php');
    });

    /****************************************************************
        ADD PAYMENT SCHEDULE
    *****************************************************************/

    // Add Payment Schedule Button

    $('#add_payment_schedule_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/new_payment_schedule.php');
    });

    // Payment Schedule Process
    $(document).on("click", "#payment_schedule_submit", function(e) {
        $('.loading').fadeIn();
        $("input, button").prop('disabled', true);

        // Check Form

        if($('#customer_id').val() == ''){
            alert_msg('warning', 'Select a Customer');
            $('#customer_id').addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($('#payment_amount').val() == 0){
            alert_msg('warning', 'Enter Installment Amount');
            $('#payment_amount').addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($('#payment_days').val() == 0){
            alert_msg('warning', 'Enter Payment Days');
            $('#payment_days').addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($('#start_date').val() == 0){
            alert_msg('warning', 'Enter the Payment Start Date');
            $('#start_date').addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else{

            //
            var customer_id = $('#customer_id').val();
            var payment_amount = $('#payment_amount').val();
            var payment_days = $('#payment_days').val();
            var start_date = $('#start_date').val();

            // Inserting in the loan_orders
            var post_data = {
                customer_id : customer_id,
                payment_amount : parseInt(payment_amount),
                payment_days : parseInt(payment_days),
                start_date : start_date
            }

            $.post('process/schedule_order_process.php', post_data, function(d){
                if(d == 'true'){
                    $("input, button").prop('disabled', false);
                    alert_msg('success', 'New Payment schedule successfully added');
                    load_page('#inner-content', 'includes/new_payment_schedule.php');
                    $('.loading').fadeOut();
                }else{
                    alert_msg('danger', 'There was an Internal Problem, Please contact the Administration');
                    $("input, button").prop('disabled', false);
                    $('.loading').fadeOut();
                }
            });

        }
        e.preventDefault();
    });

    /****************************************************************
        ADD PAYMENT
    *****************************************************************/

    $('#enter_payment_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/new_payment_form.php');
    });

    // Payment Schedule Process
    $(document).on("click", "#enter_payment_submit", function(e) {
        $('.loading').fadeIn();
        $("input, button").prop('disabled', true);

        // Check Form

        if($('#customer_id').val() == ''){
            alert_msg('warning', 'Select a Customer');
            $('#customer_id').addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($('#paid_date').val() == 0){
            alert_msg('warning', 'Select the Date');
            $('#paid_date').addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else if($('#amount').val() == 0){
            alert_msg('warning', 'Enter the Amount Paid');
            $('#payment_days').addClass('error-border');
            $("input, button").prop('disabled', false);
            $('.loading').fadeOut();
        }else{

            //
            var customer_id = $('#customer_id').val();
            var paid_date = $('#paid_date').val();
            var amount = $('#amount').val();

            // Inserting in the loan_orders
            var post_data = {
                customer_id : customer_id,
                paid_date : paid_date,
                amount : amount
            }

            $.post('process/enter_payment_process.php', post_data, function(d){
                if(d == 'true'){
                    $("input, button").prop('disabled', false);
                    alert_msg('success', 'New Payment successfully added');
                    load_page('#inner-content', 'includes/new_payment_form.php');
                    $('.loading').fadeOut();
                }else{
                    alert_msg('danger', 'There was an Internal Problem, Please contact the Administration');
                    $("input, button").prop('disabled', false);
                    $('.loading').fadeOut();
                }
            });

        }
        e.preventDefault();
    });


    /****************************************************************
        VIEW PAYMENTS
    *****************************************************************/
    $('#view_all_payments_btn').click(function(){
        $("li[id$='btn']").removeClass('nav-hover');
        $(this).addClass('nav-hover');
        load_page('#inner-content', 'includes/view_all_payments.php');
    });

});
