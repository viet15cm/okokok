$(document).ready(function () {
    loadData();
})

function loadData() {
    $.each(employees, function (index, item) {

        var htmlEmploy = $(`<tr>
                        <td>`+ item.MaNhanVien + `</td >
                        <td>`+ item.TenNhanVien + `</td>
                        <td>`+ item.Email + `</td>
                        <td>`+ item.SDT + `</td>
                        </tr>`);
        $('.grid tbody').append(htmlEmploy);

    });
    
    
}


var employees = [
    {
        MaNhanVien: "NV001",
        TenNhanVien: "Bùi Văn Cảnh",
        Email: "canh99cm@gmail.com",
        SDT : "0355445775"
    },
    {
        MaNhanVien: "NV002",
        TenNhanVien: "Bùi Văn Thanh",
        Email: "thanh99cm@gmail.com",
        SDT: "0355445755"
    },
    {
        MaNhanVien: "NV003",
        TenNhanVien: "Bùi Văn Thiên",
        Email: "thien99cm@gmail.com",
        SDT: "0355445975"
    }

]