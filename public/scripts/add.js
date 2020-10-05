$(document).ready(function(){
    $("#HinhSP").change(function(){
        var data = new FormData();
        jQuery.each(jQuery('#HinhSP')[0].files, function(i, file) {
            console.log('file-'+i);
            data.append('file-'+i, file);
        });

        jQuery.ajax({
            url: './uploadHinh',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST', // For jQuery < 1.9
            success: function(data){
                console.log(data);
                if(data.kq==1){
                    $("#hinh").attr("src","./upload/" + data.file);
                    $("#TenHinh").val(data.file);
                }else{
                    alert("Ban chon sai file hinh.");
                }
            }
        });

    });
});