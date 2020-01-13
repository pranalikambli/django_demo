 //$(".sector").combobox();

 $(document).ready(function () {

    function changeDates() {
        $('small.startDate.required').css('display', 'none');
        $('small.startDate.rangeInvalid').css('display', 'none');
        $('small.endDate.required').css('display', 'none');
        $('small.endDate.rangeInvalid').css('display', 'none');
        var today = new Date();
        var month = today.getMonth();
        var date = today.getDate();
        var month_string = "";
        var date_string = "";

        if (date < 10) {
            date_string = "0" + date;
        }
        else {
            date_string = date;
        }

        if (month < 10) {
            month_string = "0" + month;
        }
        else {
            month_string = month;
        }

        if (month < 3) {
//            start_date = (today.getFullYear() - 1) + '/' + '04/01';
            sdate = new Date(today.getFullYear() - 1, 3, 1)
            schr_month = sdate.toLocaleString('en-in', {month: 'short'});
            start_date = "0"+sdate.getDate() + "-" + schr_month + "-" + (today.getFullYear() - 1);
        }
        else {
            sdate = new Date(today.getFullYear(), 3, 1)
            schr_month = sdate.toLocaleString('en-in', {month: 'short'});
            start_date = "0"+sdate.getDate() + "-" + schr_month + "-" + today.getFullYear();
        }

        edate = new Date(today.getFullYear(), month, date);
        echr_month = edate.toLocaleString('en-in', { month: 'short' });
        end_date = date_string + "-" + echr_month + "-" + today.getFullYear();
        $('#startDate').val(start_date);
        $('#startDate').attr('value', start_date);
        $('#startDate').attr('disabled', 'disabled');
        $('#endDate').val(end_date);
        $('#endDate').attr('value', end_date);
        $('#endDate').attr('disabled', 'disabled');
        $('span.input-group-addon').css({ 'z-index': -1, 'visibility': 'hidden' });
    }

    if ($("#fa").is(':checked')) {
        changeDates();
    }


    $("#fa").on('change', function (e) {
        if ($(this).is(':checked')) {
            changeDates();
        }
    });

    $("#daterange").on('change', function (e) {
        if ($(this).is(':checked')) {
            var date = new Date(), d = date.getDate(), y = date.getFullYear(), m = date.getMonth();
            $('span.input-group-addon').css({ 'z-index': 1, 'visibility': 'visible' });
            $(".datepicker").datepicker("setDate", new Date(y, m, 1));
            $('#startDate').removeAttr("disabled");
            $('.datepicker_to').datepicker("setDate", new Date(y, m, d));
            $('#endDate').removeAttr("disabled");
        }
    });

    /* for Jquery UI datepicker starts */
    $(".datepicker").datepicker({
        autoclose: true,
        todayHighlight: true,
        clearBtn: true,
//        format: "yyyy/mm/dd",
        format: "dd-M-yyyy",
        endDate: "0d"
    }).datepicker();
    $(".datepicker_instrument").datepicker({
        autoclose: true,
        todayHighlight: true,
        clearBtn: true,
        format: "yyyy-mm-dd",
        /*endDate: "0d"*/
    }).datepicker();

    $(".datepicker").on('change', function (e) {
        if (e.target.id == 'startDate') {
            $('small.startDate.required').css('display', 'none');
            $('small.startDate.rangeInvalid').css('display', 'none');
            $('#startDate').attr('value', e.target.value);
        }
        else if (e.target.id == 'endDate') {
            $('small.endDate.required').css('display', 'none');
            $('small.endDate.rangeInvalid').css('display', 'none');
            $('#endDate').attr('value', e.target.value);
        }
    });

    $('#mis-dashboard').submit(function (e) {


        if ($('#endDate').val() == '') {
            $('small.endDate.required').css('display', 'block');
            $('small.endDate.required').css('color', 'red');
            e.preventDefault();
            return false;
        }

        if ($('#startDate').val() == '') {
            $('small.startDate.required').css('display', 'block');
            $('small.startDate.required').css('color', 'red');
            e.preventDefault();
            return false;
        }
        start_date = new Date($('#startDate').val());
        end_date = new Date($('#endDate').val());
        if (end_date < start_date) {
            $('small.endDate.rangeInvalid').css('display', 'block');
            $('small.endDate.rangeInvalid').css('color', 'red');
            //        $('small.startDate.rangeInvalid').css('display', 'block');
            //        $('small.startDate.rangeInvalid').css('color', 'red');
            e.preventDefault();
            return false;
        }
        else if (start_date > end_date) {
            //        $('small.endDate.rangeInvalid').css('display', 'block');
            //        $('small.endDate.rangeInvalid').css('color', 'red');
            $('small.startDate.rangeInvalid').css('display', 'block');
            $('small.startDate.rangeInvalid').css('color', 'red');
            e.preventDefault();
            return false;
        }
    });


    /*  for drop down starts */
    $('input').attr('autocomplete', 'off');


    $(".datepicker").datepicker({
        autoclose: true,
        todayHighlight: true,
        clearBtn: true
        //  startDate: "dateToday"
    }).datepicker();

    // Off Canvas Menu Open & Close
    $('#offCanvas').on('click', function () {
        $('.nav-offcanvas').addClass('open');
        $('.offcanvas-overlay').addClass('on');
    });
    $('#offCanvasClose, .offcanvas-overlay').on('click', function () {
        $('.nav-offcanvas').removeClass('open');
        $('.offcanvas-overlay').removeClass('on');
    });

    $("#leftside-navigation .sub-menu > a").click(function (e) {
        $("#leftside-navigation ul ul").slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(),
            e.stopPropagation()
    })

    $(".datatable").DataTable({
        responsive: true,
        pagingType: "full_numbers",
        lengthChange: false,
        "pageLength": 1
    });

    var table = $('#example').DataTable({
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: true,

    });

    $(function () {
        $.widget("custom.combobox", {
            _create: function () {
                this.wrapper = $("<span>")
                    .addClass("custom-combobox")
                    .insertAfter(this.element);

                this.element.hide();
                this._createAutocomplete();
                this._createShowAllButton();
            },

            _createAutocomplete: function () {
                var selected = this.element.children(":selected"),
                    value = selected.val() ? selected.text() : "";

                this.input = $("<input>")
                    .appendTo(this.wrapper)
                    .val(value)
                    .attr("title", "")
                    .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: $.proxy(this, "_source")
                    })
                    .tooltip({
                        classes: {
                            "ui-tooltip": "ui-state-highlight"
                        }
                    });

                this._on(this.input, {
                    autocompleteselect: function (event, ui) {
                        ui.item.option.selected = true;
                        this._trigger("select", event, {
                            item: ui.item.option
                        });
                    },

                    autocompletechange: "_removeIfInvalid"
                });
            },

            _createShowAllButton: function () {
                var input = this.input,
                    wasOpen = false

                $("<a>")
                    .attr("tabIndex", -1)
                    // .attr("title", "Show All Items")
                    .attr("height", "")
                    .tooltip()
                    .appendTo(this.wrapper)
                    .button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: "false"
                    })
                    .removeClass("ui-corner-all")
                    .addClass("custom-combobox-toggle ui-corner-right")
                    .on("mousedown", function () {
                        wasOpen = input.autocomplete("widget").is(":visible");
                    })
                    .on("click", function () {
                        input.trigger("focus");

                        // Close if already visible
                        if (wasOpen) {
                            return;
                        }

                        // Pass empty string as value to search for, displaying all results
                        input.autocomplete("search", "");
                    });
            },

            _source: function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                response(this.element.children("option").map(function () {
                    var text = $(this).text();
                    if (this.value && (!request.term || matcher.test(text)))
                        return {
                            label: text,
                            value: text,
                            option: this
                        };
                }));
            },

            _removeIfInvalid: function (event, ui) {

                // Selected an item, nothing to do
                if (ui.item) {
                    return;
                }

                // Search for a match (case-insensitive)
                var value = this.input.val(),
                    valueLowerCase = value.toLowerCase(),
                    valid = false;
                this.element.children("option").each(function () {
                    if ($(this).text().toLowerCase() === valueLowerCase) {
                        this.selected = valid = true;
                        return false;
                    }
                });

                // Found a match, nothing to do
                if (valid) {
                    return;
                }

                // Remove invalid value
                this.input
                    .val("")
                    .attr("title", value + " didn't match any item")
                    .tooltip("open");
                this.element.val("");
                this._delay(function () {
                    this.input.tooltip("close").attr("title", "");
                }, 2500);
                this.input.autocomplete("instance").term = "";
            },

            _destroy: function () {
                this.wrapper.remove();
                this.element.show();
            }
        });

        //$(".sector").combobox();
        $("#toggle").on("click", function () {
            $(".sector").toggle();
        });
    });

    $(".set > a").on("click", function (e) {
        e.preventDefault();


        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this)
                .siblings(".content")
                .slideUp(200);
            $(this).find('i')
                .removeClass("fa-minus")
                .addClass("fa-plus");
        } else {
           /*  $(".set > a i")
                .removeClass("fa-minus")
                .addClass("fa-plus"); */
            $(this)
                .find("i")
                .removeClass("fa-plus")
                .addClass("fa-minus");
             // $(".set > a").removeClass("active");
            $(this).addClass("active");
           // $(".content").slideUp(200);
            $(this)
                .siblings(".content")
                .slideDown(200);
        }
    });


    //added for compare options in checkout starts
    // show dropdown on link click
    $('.select-choose__link').click(function () {
        $(this).next('.select-choose__list').slideToggle('fast');
        return false;
    });

    $('.select-choose__item input[type=checkbox]').each(function () {
        // value of clicked checkbox
        var thisVal = $(this).attr('value') + ', ';

        $(this).change(function () {
            //current value of our "select"
            var currentText = $('.select-choose').find('.select-choose__title').val();
            if ($(this).is(':checked')) {
                // if checkbox checked append his value to select
                currentText = currentText + thisVal;
            } else {
                // if checkbox unactive remove her value from select
                currentText = currentText.replace(thisVal, '');
            }
            $(this).closest('.select-choose').find('.select-choose__title').val(currentText);
        })
    })
    //added for compare

});


window.onload = function () {
    showLoader('hide');
};

function showLoader(type) {
    type = type || 'show';
    if (type == "show") {
        if (!$('body').hasClass('overflow-hidden')) {
            $('body').addClass('overflow-hidden');
        }
        $('.pageLoader').show();
    }
    else if (type == "hide") {
        if ($('body').hasClass('overflow-hidden')) {
            $('body').removeClass('overflow-hidden');
        }
        $('.pageLoader').hide();
    }
}

/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function () {
    $("#back2Top").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});
/*Scroll to top when arrow up clicked END*/




/*Script For Tabbed Content */
$(function() {
    $('.tab-content:first-child').show();
    $('.tab-nav-link').bind('click', function(e) {
        $this = $(this);
        $tabs = $this.parent().parent().next();
        $target = $($this.data("target")); // get the target from data attribute
        $this.siblings().removeClass('current');
        $target.siblings().css("display", "none")
        $this.addClass('current');
        $target.fadeIn("fast");

    });
    $('.tab-nav-link:first-child').trigger('click');
});


/* if in drawer mode */
$(".tab_drawer_heading").click(function() {

    $(".tab_content").hide();
    var d_activeTab = $(this).attr("rel");
    $("#" + d_activeTab).fadeIn();

    $(".tab_drawer_heading").removeClass("d_active");
    $(this).addClass("d_active");

    $("ul.tabs li").removeClass("active");
    $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
});


/* Extra class "tab_last"
   to add border to right side
   of last tab */
$('ul.tabs li').last().addClass("tab_last");

/*Script For Tabbed Content End */
