
$(document).ready(function () {
   
    var customnerJS = new CustomerJS();
    
})

class CustomerJS {
    constructor() {
        this.formMode = null;
        this.loadData();
        this.initEvents();
        
    }
    initEvents() {
        $('#btnAdd').click(this.btnAddOnclick.bind(this));       
        $('#btnCancle').click(this.btnCancleOnclick.bind(this));
        $('#btnSave').click(this.btnSaveOnclick.bind(this));
        $('.tittle-button-close').click(this.btnCancleOnclick.bind(this));       
        $(".required").blur(this.checkRequired);
        $(".tbCustomer tbody").on("click", "tr", function () {
            
            $(this).siblings().removeClass('row-selected');
            
            $(this).addClass('row-selected');
            
        });
        $("#btnEdit").click(this.btnEditOnclick.bind(this));
        $("#btnDelete").click(this.btnDeleteOnclick.bind(this));
       
    }
    loadData() {
        //Lay Du lieu tren server thong qua loi goi api
        $.ajax({

            url: "https://localhost:44314/api/Customers",
            method: "GET",//put , pop , get,
            data: "",// tham so truyenqua body repuest
            contenType: "application/json",
            dataType: "",

            success: function () {
                
            },

            fail: function () {
               
            },

        }).done(function (response) {

            
            $(".grid tbody").empty();
            $.each(response, function (index, item) {

                var htmlEmploy = $(`<tr>
                        <td>`+ item.MaKhachHang + `</td >
                        <td>`+ item.TenKhachHang + `</td>
                        <td>`+ item.Email + `</td>
                        <td>`+ item.SoDienThoai + `</td>
                        <td>`+ item.CongTy + `</td>
                        </tr>`);
                $('.grid tbody').append(htmlEmploy);

            });
        }).fail(function () {

            
        });

        
    }
    btnDeleteOnclick() {
        var temp = this;
        if (temp.getEmployeeCode() != null) {
            $.ajax({
                url: "https://localhost:44314/api/Customers/" + temp.getEmployeeCode(),
                method: "Delete",
                data: "",
                contenType: "application/json",
                dataType: "",
            }).done(function (res) {
                temp.loadData();
                temp.hideDialogDetail();
            }).fail(function (res) {

            })
         

        } else {
            alert("Ban chua chon du lieu");
        }
     }
    

    getEmployeeCode() {
        var trSelected = $(".tbCustomer .row-selected");
        var employeeCode = null;
        if (trSelected.length > 0) {
            
           
            

            var employeeCode = $(trSelected).children()[0].textContent;
            
        }
        return employeeCode;
    }

    btnEditOnclick() {
        this.formMode = "edit";
        var temp = this;
        
        if (temp.getEmployeeCode() != null) {
            temp.showDialogDetail();                            
            $.ajax({
                url: "https://localhost:44314/api/Customers/" + temp.getEmployeeCode(),
                method : "GET"

            }).done(function (res) {
                if (!res) {
                    debugger;
                    alert("khong co nhan vien tuong ung");
                } else {
                    
                    $("#txtCode").val(res.MaKhachHang);
                    $("#txtName").val(res.TenKhachHang);
                    $("#txtEmail").val(res.Email);
                    $("#txtPhone").val(res.SoDienThoai);
                    $("#txtConpany").val(res.CongTy);
                 
                }

                })
        } else {
            alert("ban chua chon du lieu ok");
        }
        
    }

    btnAddOnclick() {
        this.formMode = "add";
        this.showDialogDetail();
    }



    btnCancleOnclick() {
        this.hideDialogDetail();
    }

   btnSaveOnclick() {
    /*var employeeCode = $("#txtCode").val();
    var employeeName = $("#txtName").val();
    if (!employeeCode) {
        $("#txtCode").addClass('reqiured-error');
       
        $("#txtCode").attr("title", "Ban Phai nhap thong tin");
        return;
    }

    if (!employeeName) {
        $("#txtName").addClass('reqiured-error');
       
        $("#txtName").attr("title", "Ban Phai nhap thong tin");

        return;
    }
    */
    var inputRequireds = $(".required");
    var isValid = true;

    $.each(inputRequireds, function (index, input) {

        var valid = $(input).trigger("blur");
        if (isValid && valid.hasClass('reqiured-error')) {
            isValid = false;
        }
    });

    if (isValid) {
        var temp = this;

        if (temp.formMode == "add") {
            var employee = {};
            employee.MaKhachHang = $("#txtCode").val();
            employee.TenKhachHang = $("#txtName").val();
            employee.Email = $("#txtEmail").val();
            employee.SoDienThoai = $("#txtPhone").val();
            employee.CongTy = $("#txtConpany").val();
            // thuc hien cat du lieu vao database
            debugger
            $.ajax({
                url: "https://localhost:44314/api/Customers",
                method: "POST",
                data: JSON.stringify(employee),
                contentType: "application/json",
                dataType: "json",
            }).done(function (res) {
                temp.loadData();
                temp.hideDialogDetail();
                debugger;

            }).fail(function (res) {
                alert("loi");
                debugger
            })
        }

        if (temp.formMode == "edit") {

            var epEdit = {};

            epEdit.MaKhachHang = $("#txtCode").val();
            epEdit.TenKhachHang = $("#txtName").val();
            epEdit.Email = $("#txtEmail").val();
            epEdit.SoDienThoai = $("#txtPhone").val();
            epEdit.CongTy = $("#txtConpany").val();

            $.ajax({
                url: "https://localhost:44314/api/Customers/" + temp.getEmployeeCode(),

                method: "PUT",
                data: JSON.stringify(epEdit),
                contentType: "application/json",
                dataType: "json",
            }).done(function (res) {
                temp.loadData();
                temp.hideDialogDetail();

            }).fail(function (res) {
                alert("loi");
            });
        }

    }


}



    checkRequired(){
        
        var value = this.value;
        if (!value) {
           $(this).addClass('reqiured-error');
           $(this).attr("title", "Ban Phai nhap thong tin");

        } else {
            $(this).removeClass('reqiured-error');
            $(this).removeAttr("title", "Ban Phai nhap thong tin");
        }
      
    }

    showDialogDetail() {
        $(".dialog input").val(null);
        $('.dialog-modal').show();
        $('.dialog').show();
        $("#txtCode").focus();
    }
    hideDialogDetail() {
        $('.dialog-modal').hide();
        $('.dialog').hide();
    }
    
    rowOnSelect() {
        
        $(this).siblings().removeClass('row-selected');
        $(this).addClass('row-selected');
        
       
       
   }
    
}

var employees  = [
    {
        MaKhachHang: "NV001",
        TenKhachHang: "Nguyễn Quốc Việt",
        Email: "viet99cm@gmail.com",
        SoDienThoai: "0355445775",
        CongTy: "My Linh"
    },

    {
        MaKhachHang: "NV002",
        TenKhachHang: "Nguyễn Quốc Khải",
        Email: "Khai99cm@gmail.com",
        SoDienThoai: "0355445778",
        CongTy: "My Linh"
    },

    {
        MaKhachHang: "NV003",
        TenKhachHang: "Trần Quốc Tuấn",
        Email: "Tuan99cm@gmail.com",
        SoDienThoai: "0355445779",
        CongTy: "My Linh"
    },

    {
        MaKhachHang: "NV004",
        TenKhachHang: "Nguyễn Hoài Nam",
        Email: "Nam99cm@gmail.com",
        SoDienThoai: "0355445789",
        CongTy: "My Linh"
    },


]

