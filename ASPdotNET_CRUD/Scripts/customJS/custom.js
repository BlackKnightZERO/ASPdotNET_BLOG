$(document).ready(function () {
    console.log("ready!");


    LoadGridData();


    $("#btnSubmit").click(function (e) {
        e.preventDefault();
        var ttl = $("#title").val();
        var desc = $("#description").val();

        var _dbModel = {
            'title': ttl, 'description': desc,
        };

        $.ajax({
            type: "POST",
            url: "/Blog/Add",
            data: JSON.stringify(_dbModel),
            contentType: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                //$("#ddlCity").empty();
                //var txt = '';
                //txt += '<option value="-1">-- Select City --</option>';
                //$.each(data, function (i, item) {
                //    txt += '<option value="' + item.Code + '">' + item.Value + '</option>';
                //});
                //$("#ddlCity").append(txt);
                alert("!");
            }
        });
    });


    function LoadGridData() {
        $.ajax({
            type: "GET",
            url: "/Blog/GetAll",
            //data: JSON.stringify(_dbModel),
            contentType: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                console.log(data);
                //BindGridData(data);
                tableAppend(data);
            },
            error: function(){
                console.log("data not retrieved!");
            }
        });
    }

    function tableAppend(data) {
        $("#tblBlog2").empty();

        var txt = '<table class="table table-bordered table-striped ">' +
            '<thead>' +
            '<tr>' +
            '<th>Id</th>' +
            '<th>Title</th>' +
            '<th>Details</th>' +
            '<th>Action</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        $.each(data, function (i, item) {

            txt += '<tr>';
            //$.each(item, function (i, item) {
            //    txt += '<td>' + item + '</td>';

            //});
            txt += '<td>' + item.id + '</td>';
            txt += '<td>' + item.title + '</td>';
            txt += '<td>' + item.description + '</td>';
            txt += '<td><button onclick=LoadEditData(' + item.id + ') type="button" id="btnEdit" class="btn btn-info">Edit</button> <button onclick=DeleteData(' + item.id + ')  type="button" id="btnDelete" class="btn btn-danger">Delete</button></td>';
            //txt += '<td><button onclick=LoadEditData(' + item.AdminID + ') type="button" id="btnEdit" class="btn btn-info">Edit</button> <button onclick=DeleteData(' + item.AdminID + ')  type="button" id="btnDelete" class="btn btn-danger">Delete</button></td>';
            txt += '</tr>';
        });
        txt += '</tbody></table>';
        //alert(txt);
        $("#tblBlog2").append(txt);
    }


    function BindGridData(data) {
        $("#tblBlog").kendoGrid().empty();
        $("#tblBlog").kendoGrid({
            dataSource: {
                data: data,
                dataType: "json",
            },
            toolbar: "<a id='btnAddNew' role='button' class='k-button k-button-icontext k-grid-add' href='javascript:void(0)'><span class='k-icon k-i-plus'></span>Add New Record</a>",
            columns: [

                { field: "id", title: "ID", hidden: true, filterable: true },
                { field: "title", title: "Title", filterable: true },
                { field: "description", title: "Details", filterable: true },

                {
                    field: "id",
                    template: '<a role="button" class="k-button k-button-icontext k-grid-edit" href="javascript:void(0)" onclick=LoadEditData(#=id#)><span class="k-icon k-i-edit"></span>Edit</a>' +
                        '<a role="button" class="k-button k-button-icontext k-grid-delete" " href="javascript:void(0)" onclick=DeleteGridData(#=id#)><span class="k-icon k-i-close"></span>Delete</a>',

                    title: "Action",
                    width: 170,
                    headerAttributes: { style: "text-align: center" },
                    attributes: { class: "text-center" },
                    filterable: false
                },
            ],
            sortable: true,
            filterable: {
                extra: false, //do not show extra filters
                operators: { // redefine the string operators
                    string: {
                        contains: "Contains",
                        startswith: "Starts With",
                        eq: "Is Equal To"
                    }
                }
            },
            resizable: true,
            height: 450,
            pageable: false,
            scrollable: true
        });
    }


});