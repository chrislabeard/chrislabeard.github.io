jQuery(document).ready(function ($) {

    $('#builder-text').on('keyup', function () {
        $('#builder').text($(this).val())
    });
    $('#address-text').on('keyup', function () {
        $('#address').text($(this).val())
    });

    $('.single-value select').on('change', function() {
        var selectedValue = $(this).parents('.single-value').find('select').val();
        var name = $(this).parents('.single-value').attr('data-label');
        var id = $(this).attr('id');
        if(selectedValue) {
            if($('#single-values').length) {
                if($('#single-values tr#'+ id).length) {
                    if(selectedValue == 0) {
                        $('table').find('tr#' + id).remove();
                    } else {
                        var row = $('table').find('tr#' + id);
                        row.find('.value').text(selectedValue);
                    }

                } else {
                    
                    var row = '<tr id="' + id + '">';
                    row += '<td>' + name + '</td>';
                    row += '<td class="value">' + selectedValue + '</td>';
                    $('#single-values tbody').append(row);              
                }
            } else {
                var table = '<table class="table table-bordered" id="single-values">';
                    table += '<thead class="thead-light">';
                    table += '<tr>';
                    table += '<th></th>';
                    table += '<th>Amount</th>';
                    table += '</thead>';
                    table += '<tbody>';
                    table += '<tr id="' + id + '">';
                    table += '<td>' + name + '</td>';
                    table += '<td class="value">' + selectedValue + '</td>';
                    $('#export').append(table);
            }
        } else {

        }
    });
    var totalSquareFt = 0
    $('.calc-row input').on('keyup', function () {
        var type = $(this).attr('data-type');
        var id = $(this).parents('.calc-row').attr('id');
        var name = $(this).parents('.calc-row').attr('data-label');
        var width;
        var height;
        if (type == 'width') {
            height = $(this).parents('.calc-row').find('input[data-type="height"]').val();
            width = $(this).val();
        } else {
            width = $(this).parents('.calc-row').find('input[data-type="width"]').val();
            height = $(this).val();
        }
        var total = parseFloat(width * height);
        var totalFormatted = total.toLocaleString('en-US', { minimumFractionDigits: 1 });
        var test = width * height;
        $(this).parents('.calc-row').find('.total span').text(totalFormatted);


        if ($('tr#' + id).length) {
            var row = $('table#sq-ft').find('tr#' + id);
            row.find('td.width').text(width);
            row.find('td.height').text(height);
            row.find('td.total').text(totalFormatted);
            row.find('td.total').attr('data-total', total);
        } else {
            var row = '<tr id=' + id + '>';
            row += '<td>' + name + '</td>';
            row += '<td class="width">' + width + '</td>';
            row += '<td class="height">' + height + '</td>';
            row += '<td class="total" data-total=' + total + '>' + totalFormatted + '</td>';
            row += '</tr>';

            $('table#sq-ft tbody').append(row);
        }
        var completeTotal = 0;
        $("table#sq-ft tbody tr").each(function (index) {
            var value = parseFloat($(this).find('.total').attr('data-total'));
           
            completeTotal += parseFloat(value);
            totalSquareFt = completeTotal;

        });
        $('#complete-total').text(completeTotal.toLocaleString('en-US', { minimumFractionDigits: 1 }));

    });
    function toFixed(num, fixed) {
        var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        return num.toString().match(re)[0];
    }

    $('.dirt-calc input').on('keyup', function(){
        var total = 0;
        $('.dirt-calc input').each(function(index){
            total += parseFloat($(this).val());
        });
        if(total > 0) {
            var average = toFixed(((total / 4) - 6) / 12, 2);
            if(totalSquareFt > 0) {
                var fillTotal = parseFloat(((totalSquareFt * average) / 27) * 1.4);
                $('#fill-total .value').text(toFixed(fillTotal, 2));
            }
        }
    });

    function happyUrl(string) {
        var happy = string.replace(/\s+/g, '-').toLowerCase();
        return happy;
    }

    $('#submit').click(function (e) {
        e.preventDefault();
        var filename = 'flatwork-sheet';
        var date = new Date(),
            yr = date.getFullYear(),
            month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
            day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            newDate = yr + '-' + month + '-' + day;


        if ($('#builder-text').val().length) {
            filename += '-' + happyUrl($('#builder-text').val());
        }
        if ($('#address-text').val().length) {
            filename += '-' + happyUrl($('#address-text').val());
        }
        filename += '-' + newDate;
        var element = document.getElementById('export');
        html2pdf(element,
            {
                margin: [15, 15, 15, 15],
                filename: filename,
                html2canvas: { dpi: 300, letterRendering: true },
            }
        );
        alert('done');
    });
});