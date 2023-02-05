<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossorigin="anonymous"
    />
    <title>News API Results</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="index.js"></script>
    <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"
    ></script>
    <script
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
            integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
            crossorigin="anonymous"
    ></script>
    <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
            integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
            crossorigin="anonymous"
    ></script>
    
<!--    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>-->
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
</head>
<body>
<div class="news-container">
    <h2 class="h2 d-flex flex-wrap justify-content-center  p-5 m-5" id="title">News Results</h2>
    <div class="container d-flex flex-wrap justify-content-center">
        <form class="col-6">
            <div class="form-group col-12">
                <label for="query">Search For:</label>
                <input type="text" class="form-control" id="query">
            </div>

            <div class="form-group col-12">
                <label for="from">From:</label>
                <input type="text" class="form-control" id="from">
            </div>

            <div class="form-group col-12">
                <label for="to">To:</label>
                <input type="text" class="form-control" id="to">
            </div>

            <div class="d-flex flex-wrap justify-content-end">
                <button type="button" class="btn btn-primary m-2 ms-5 me-5 p-2" id="searchButton" style="width: 20%;">
                    Search
                </button>
            </div>
            
        </form>
        <form class="col-4 form-search-values position-absolute-right m-5 p-5">

            <div class="form-group row">
                <label>Entered Query:</label>
                <span id="enteredQuery"></span>
            </div>

            <div class="form-group row">
                <label>Entered From:</label>
                <span id="enteredFrom"></span>
            </div>

            <div class="form-group row">
                <label>Entered To:</label>
                <span id="enteredTo"></span>
            </div>
        </form>
    </div>
    <div id="news-items"></div>
</div>


</body>
</html>