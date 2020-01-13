

$(function () {

    $('.alert').delay(3000).fadeOut();
    $("input[name=filter]").on('keyup keypress', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });


    $(".numberfield").keyup(function () {

        //$('input[type="submit"]').attr('disabled','disabled');

        var $this = $(this);
        $this.val($this.val().replace(/[^\d.]/g, ''));

        if ($(this).next('span').length > 0) {
            $(this).next('span').text('');
        }


    });



    $(".numberfield").focusout(function () {



        var $this = $(this);
        id = $(this).attr('id');
        value = $(this).val();
        type = id.slice(0, -6);

        var errFlag = false;

        if (value.length > 0) {
            test_case = (/^\d{1,8}(\.\d{1,2})?$/).test(parseFloat(value));
            if (test_case == false) {
                toastr["error"]("You Can Enter Max 8 Digit Before Decimal and 2 Digit After Decimal");
                $('#' + id).val('');
                errFlag = true;
                window.setTimeout(function () {
                    $('#' + id).focus();
                }, 10);
            }

            if (type == "micro_cap") {

                smallcapvalue = $('#small_cap_value').val();
                midcapvalue = $('#mid_cap_value').val();
                if (smallcapvalue.length != 0) {
                    if (midcapvalue.length != 0) {
                        if (value >= parseFloat(smallcapvalue) || value >= parseFloat(midcapvalue)) {
                            toastr["error"]("Micro cap value cannot be greater then small cap value and mid cap value");
                            $('#' + id).val('');
                            errFlag = true;
                            window.setTimeout(function () {
                                $('#' + id).focus();

                            }, 10);
                            //$('#' + id).addClass('errorInput');
                        }
                        else {
                            errFlag = false;
                            // ($this.hasClass('errorInput')) ? $this.removeClass('errorInput') : '';
                        }
                    }
                    else {
                        if (parseFloat(value) >= parseFloat(smallcapvalue)) {
                            toastr["error"]("Micro cap value cannot be greater then small cap value and mid cap value");
                            $('#' + id).val('');
                            errFlag = true;
                            window.setTimeout(function () {
                                $('#' + id).focus();
                            }, 10);

                            //$('#' + id).addClass('errorInput');
                        }
                        else {
                            errFlag = false;
                            // ($this.hasClass('errorInput')) ? $this.removeClass('errorInput') : '';
                        }
                    }
                }
                if (smallcapvalue.length == 0 || midcapvalue.length == 0) {
                    errFlag = false;
                }

            }
            if (type == "small_cap") {

                microcapvalue = $('#micro_cap_value').val();
                midcapvalue = $('#mid_cap_value').val();
                if (microcapvalue.length != 0) {
                    if (midcapvalue.length != 0) {
                        if (parseFloat(value) >= parseFloat(midcapvalue) || parseFloat(value) <= parseFloat(microcapvalue)) {
                            toastr["error"]("Small cap value cannot be greater then mid cap value and can not be smaller than micro cap value");
                            $('#' + id).val('');
                            errFlag = true;
                            window.setTimeout(function () {
                                $('#' + id).focus();
                            }, 10);
                            //$('#' + id).addClass('errorInput');
                        }
                    }
                    else {

                        if (parseFloat(value) <= parseFloat(microcapvalue)) {

                            toastr["error"]("Small cap value should be greater then Micro cap value and mid cap value");
                            $('#' + id).val('');
                            errFlag = true;
                            window.setTimeout(function () {
                                $('#' + id).focus();
                            }, 10);
                            //  $('#' + id).addClass('errorInput');
                        }
                        else {
                            errFlag = false;
                            //($this.hasClass('errorInput')) ? $this.removeClass('errorInput') : '';
                        }
                    }
                }
                else {
                    toastr["error"]("Please Enter micro cap value first");
                    $('#' + id).val('');
                    errFlag = true;
                    window.setTimeout(function () {
                        $('#micro_cap_value').focus();
                    }, 10);
                    //  $('#' + id).addClass('errorInput');
                    $('#micro_cap_value').addClass('errorInput');
                }
            }
            if (type == "mid_cap") {

                microcapvalue = $('#micro_cap_value').val();
                smallcapvalue = $('#small_cap_value').val();




                if (microcapvalue.length != 0) {
                    if (smallcapvalue.length != 0) {
                        if (parseFloat(value) <= parseFloat(microcapvalue) || parseFloat(value) <= parseFloat(smallcapvalue)) {
                            toastr["error"]("Mid cap value cannot be smaller then small cap value and micro cap value ");
                            $('#' + id).val('');
                            errFlag = true;
                            window.setTimeout(function () {
                                $('#' + id).focus();
                            }, 10);
                            //  $('#' + id).addClass('errorInput');
                        }
                        else {
                            errFlag = false;
                            //  ($this.hasClass('errorInput')) ? $this.removeClass('errorInput') : '';
                            $('#large_cap_value').val('> ' + value);
                        }
                    }
                    else {
                        toastr["error"]("Please Enter small cap value first");
                        $('#' + id).val('');
                        errFlag = true;
                        window.setTimeout(function () {
                            $('#small_cap_value').focus();
                        }, 10);
                        //    $('#' + id).addClass('errorInput');
                        $('#small_cap_value').addClass('errorInput');
                    }
                }
                else {
                    toastr["error"]("Please Enter micro cap value first");
                    $('#' + id).val('');
                    errFlag = true;
                    window.setTimeout(function () {
                        $('#micro_cap_value').focus();
                    }, 10);
                    //  $('#' + id).addClass('errorInput');
                    $('#micro_cap_value').addClass('errorInput');
                }


            }
        }
        else {
            if (type == "mid_cap") {
                if (value.length <= 0) {

                    $('#large_cap_value').val('>');
                }
            }
        }

        if (errFlag == false) {

            ($this.hasClass('errorInput')) ? $this.removeClass('errorInput') : '';
        }
        else {

            (!$this.hasClass('errorInput')) ? $this.addClass('errorInput') : '';
        }

        var fieldNull = $('.numberfield').filter(function () {
            return this.value != '';
        });

        if ($('.numberfield.errorInput').length != 0 || $('.numberfield').length != fieldNull.length) {
            $('input[type="submit"]').prop('disabled', 'disabled');
        }
        else {
            $('input[type="submit"]').removeAttr('disabled');
        }



    });

    $(".intfield").keyup(function () {

        var $this = $(this);
        $this.val($this.val().replace(/[^\d]/g, ''));
    });


    function fetchData(url, params) {
        // Call the backend
        //alert(url);
        //var instrument_type = $('select#chnagefmp option:selected').val();
        // alert(instrument_type);
        $.get(url, params)
            .done(function (data) {

                // Put the data into target div
                $("#results").html(data);
                var sortby = $("#sortby").val();
                sortbychar = sortby.substring(0, 1)
                if (sortbychar == "-") {
                    $(".sort-icon").removeClass("main");

                }
                else {
                    $(".sort-icon").toggleClass("main");
                }

                $(".sort-icon").click(function () {
                    $(".sort-icon").toggleClass("main");
                    var sortby = $("#sortby").val();
                    sortbychar = sortby.substring(0, 1)
                    if (sortbychar == "-") {
                        sortby = sortby.substring(1);
                        $("#sortby").val(sortby);
                    }
                    else {
                        sortby = "-" + sortby;
                        $("#sortby").val(sortby);
                    }

                    var url = '/backend/marketcap_manage'; // Backend url
                    var params = { 'filter': $("input[name=filter]").val(), 'sort': $("input[name=sort]").val() }; // Search field value
                    fetchData(url, params);

                });



                // Get next page on navigation button click
                $(".previous, .next").click(function (elem) {
                    // Prevent button from taking you away from current page
                    elem.preventDefault();
                    // Get the page's url from the button clicked
                    var url = '/backend/marketcap_manage' + $(this).attr('href');
                    //url = $(this).attr('href');

                    // Call this function again with url containing page parameter
                    fetchData(url, params);
                });

            });
    };

    $("input[name=filter]").keyup(function () {

        var url = '/backend/marketcap_manage'; // Backend url
        var params = { 'filter': $("input[name=filter]").val(), 'sort': $("input[name=sort]").val() }; // Search field value
        fetchData(url, params); // Backend call for filtered data
    }).trigger('keyup');


    // market large cap

    var largcap = $('#mid_cap_value').val();
    $('#large_cap_value').val('> ' + largcap);

    /*
        $("#micro_cap_value").focusout(function () {
    
            var $this = $(this);
            id = $(this).attr('id');
            value = $(this).val();
            newval = parseFloat(value);
            if (newval <= 0) {
                alert('Value Should be greater than 0');
                $('#micro_cap_value').val('');
            }
    
        });
    
        $("#small_cap_value").focusout(function () {
    
            var $this = $(this);
            id = $(this).attr('id');
            value = $(this).val();
            newval = parseFloat(value);
            micr_value = $('#micro_cap_value').val();
            micr_value = parseFloat(micr_value);
    
            if (newval <= micr_value) {
                alert('Small Cap Value Should be greater than Micro Cap Value');
                $('#small_cap_value').val('');
            }
    
        });
    
        $("#mid_cap_value").focusout(function () {
    
            var $this = $(this);
            id = $(this).attr('id');
            value = $(this).val();
            newval = parseFloat(value);
    
            small_value = $('#small_cap_value').val();
            small_value = parseFloat(small_value);
    
            if (newval <= small_value) {
                alert('Mid Cap Value Should be greater than Small Cap Value');
                $('#mid_cap_value').val('');
            }
            else {
                $('#large_cap_value').val('> ' + value);
    
            }
    
        });  */


});


function showrecord(modifiedby, id) {

    url = '/backend/marketcap_get_record';
    var params = { 'modifiedby': modifiedby, 'id': id }; // Search field value

    fetchrecord(url, params);

}

function fetchrecord(url, params) {

    $.get(url, params)
        .done(function (data) {
            $(".modal-body").html(data);
            $('#myModal').modal('show');



        });
};


function showdelete(status, id) {

    $('#autoid').val(id);
    $('#deleting_field').html(status);
    $('#myModal').modal('show');
}



function deletefooter() {

    var deleteid = $('#autoid').val();


    url = '/backend/instrument_delete/' + deleteid;
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        beforeSend: function () {
            // < !--$('.preloader').addClass('show'); -->
        },
        success: function (data) {


            if (data.message == 0) {
                toastr["error"]("Something Went Wrong");

            }
            else {
                toastr["error"]('You have successfully delete the record');

                location.reload();
            }



        },
        error: function (data) { // if error occured
            //   < !--$('.preloader').removeClass('show'); -->
            toastr["error"]('Error occured.please try again');

        }
    });





}

function submitform() {

    err_count = 0;

    value = $("#micro_cap_value").val();
    newval = parseFloat(value);
    if (newval <= 0) {
        toastr["error"]('Micro Cap Value Should be greater than 0');

        $('#micro_cap_value').val('');
        err_count++;
    }

    var $this = $(this);
    id = $(this).attr('id');
    value = $("#small_cap_value").val();
    newval = parseFloat(value);
    micr_value = $('#micro_cap_value').val();
    micr_value = parseFloat(micr_value);

    if (newval <= micr_value) {
        toastr["error"]('Small Cap Value Should be greater than Micro Cap Value');

        $('#small_cap_value').val('');
        err_count++;
    }

    value = $("#mid_cap_value").val();
    newval = parseFloat(value);

    small_value = $('#small_cap_value').val();
    small_value = parseFloat(small_value);

    if (newval <= small_value) {
        toastr["error"]('Mid Cap Value Should be greater than Small Cap Value');

        $('#mid_cap_value').val('');
        err_count++;
    }
    else {
        $('#large_cap_value').val('> ' + value);

    }
    toastr["error"](err_count);

}


