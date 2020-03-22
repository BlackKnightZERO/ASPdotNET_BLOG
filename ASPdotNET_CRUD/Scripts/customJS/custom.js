$(document).ready(function () {
    console.log("System Started!");
    LoadGridData();
    $(document).delegate('#kendoToggler', 'click', function (e) {
        $('.toggleDiv').toggle();
    });
    $(document).delegate('#btnAddNew', 'click', function (e) {
        $('#addBlogModal').modal('toggle');
    });
    $(document).delegate('#btnEdit', 'click', function (e) {
        e.preventDefault();
        //console.log(this.value);
        var ID = this.value;
        console.log(ID);
        var _dbModel = {
            'id': ID,
        };
        $.ajax({
            type: "POST",
            url: "/Blog/LoadSelectedBlog",
            data: JSON.stringify(_dbModel),
            contentType: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                //console.log(data);
                $('#EditId').val(ID);
                $('#EditAuthor').text("");
                $('#EditDate').text("");
                $('#EditDate').text(data[0].DateAdded);
                $('#EditAuthor').text(data[0].AddedBy);
                $('#EditTitle').val(data[0].title);
                $('#EditDescription').val(data[0].description);
            },
            error: function () {
                console.log("data not retrieved!");
            }
        });
    });
    $(document).delegate('#btnSave', 'click', function (e) {
        e.preventDefault();
        var ID = $('#EditId').val();
        var ttl = $("#EditTitle").val();
        var desc = $("#EditDescription").val();
        var _dbModel = {
            'id': ID, 'title': ttl, 'description': desc,
        };
        //console.log(_dbModel);
        $.ajax({
            type: "POST",
            url: "/Blog/Update",
            data: JSON.stringify(_dbModel),
            contentType: "application/json",
            datatype: "json",
            async: false,
            success: function (data) {
                //alert("!");
                $('#editModal').modal('toggle');
                $('#EditTitle').val("");
                $('#EditDescription').val("");
                if (data.success == true) {
                    LoadGridData();
                    $.notify(" Data Updated Successfully.. ", "success");
                }
                else {
                    $.notify(" Data Updation Failed..! ", "error");
                }
            },
            error: function () {
                $.notify(" Oops Something Went Wrong..! ", "error");
            }
        });
    });
    $(document).delegate('#btnDelete', 'click', function (e) {
        e.preventDefault();
        var ID = this.value;
        console.log(ID);
        var ans = confirm("Are you sure to delete a record");
        if (ans == true) {
            var _dbModel = {
                'id': ID,
            };
            $.ajax({
                type: "POST",
                url: "/Blog/DeleteBlog",
                data: JSON.stringify(_dbModel),
                contentType: "application/json",
                datatype: "json",
                success: function (data) {
                    if (data.success == true) {
                        LoadGridData();
                        $.notify(" Data Deleted Successfully.. ", "success");
                    }
                    else {
                        $.notify(" Data Deleted Failed..! ", "error");
                    }
                }
            });
        }
    });

    $("#btnSubmit").click(function (e) {
        // e.preventDefault();
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
                //alert("!");
                $('#addBlogModal').modal('toggle');
                $('#title').val("");
                $('#description').val("");
                LoadGridData();
                $.notify(" Data Added Successfully.. ", "success");
            },
            error: function () {
                $.notify(" Data Addition Failed..! ", "error");
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
                //console.log(data);
                BindGridData(data);
                tableAppend(data);
            },
            error: function () {
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
            '<th>Author</th>' +
            '<th>Date</th>' +
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
            txt += '<td><a href="/Blog/Detail?BlogId=' + item.id +'">' + item.title + '</a></td>';
            txt += '<td>' + item.description + '</td>';
            txt += '<td>' + item.AddedBy + '</td>';
            txt += '<td>' + item.DateAdded + '</td>';
            txt += '<td><button value="' + item.id + '" type="button" id="btnEdit" class="btn btn-sm btn-info" data-toggle="modal" data-target="#editModal">Edit</button>';
            txt += '<button value="' + item.id + '" type= "button" id="btnDelete" class="btn btn-sm btn-danger">Delete</button ></td >';
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
                { field: "AddedBy", title: "Author", filterable: true },
                { field: "DateAdded", title: "Date", filterable: true },

                {
                    field: "id",
                    template: '<a role="button" class="k-button k-button-icontext k-grid-edit" href="javascript:void(0)" onclick=LoadEditData(#=id#)><span class="k-icon k-i-edit"></span>Edit</a>' +
                            '<a role="button" class="k-button k-button-icontext k-grid-delete" " href="javascript:void(0)" onclick=DeleteBlog(#=id#)><span class="k-icon k-i-close"></span>Delete</a>',

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
   
//ready function
});
function DeleteBlog(id) {
        var ans = confirm("Are you sure to delete a record");
        if (ans == true) {
            var _dbModel = { 'id': id };
            console.log(_dbModel);
            $.ajax({
                type: "POST",
                url: "/Blog/DeleteBlog",
                data: JSON.stringify(_dbModel),
                contentType: "application/json",
                datatype: "json",
                success: function (data) {
                    if (data.success == true) {
                        LoadGridData();
                        $.notify("Data Deleted Successfully..", "success");
                    }
                    else {
                        $.notify("Data Deleted Failed..!", "error");
                    }
                }
            });
        }
}

function LoadEditData(id) {
    // e.preventDefault();
    console.log(id);
    var _dbModel = {
        'id': id,
    };
    //console.log(_dbModel);
    $.ajax({
        type: "POST",
        url: "/Blog/LoadSelectedBlog",
        data: JSON.stringify(_dbModel),
        contentType: "application/json",
        datatype: "json",
        async: false,
        success: function (data) {
            //console.log(data);
            $('#editModal').modal('toggle');
            $('#EditId').val("");
            $('#EditAuthor').text("");
            $('#EditDate').text("");

            $('#EditId').val(data[0].id);
            $('#EditDate').text(data[0].DateAdded);
            $('#EditAuthor').text(data[0].AddedBy);
            $('#EditTitle').val(data[0].title);
            $('#EditDescription').val(data[0].description);
        },
        error: function () {
            console.log("data not retrieved!");
        }
    });
}

