//MAIN SELECTOR
//Comments down here have to switch to // because it is JS instead of html
//Get the dropdown list by ID
var select = document.getElementById('service');
//Function that recognizes change in value
function logValue() {
    switch (this.value) {
        //Each case gets the 'value' from the drop down option
        case 's3':
            //Hide each form except the one selected
            //Doing it this way, we dont have to check which one was previously selected
            //We just hide them all
            document.getElementById('s3_form').style.display = "block";
            document.getElementById('ec2_form').style.display = "none";
            document.getElementById('rds_form').style.display = "none";
            document.getElementById('lambda_form').style.display = "none";
            document.getElementById('fargate_form').style.display = "none";
            break;
        case 'ec2':
            document.getElementById('s3_form').style.display = "none";
            document.getElementById('ec2_form').style.display = "block";
            document.getElementById('rds_form').style.display = "none";
            document.getElementById('lambda_form').style.display = "none";
            document.getElementById('fargate_form').style.display = "none";
            break;
        case 'rds':
            document.getElementById('s3_form').style.display = "none";
            document.getElementById('ec2_form').style.display = "none";
            document.getElementById('rds_form').style.display = "block";
            document.getElementById('lambda_form').style.display = "none";
            document.getElementById('fargate_form').style.display = "none";
            break;
        case 'lambda':
            document.getElementById('s3_form').style.display = "none";
            document.getElementById('ec2_form').style.display = "none";
            document.getElementById('rds_form').style.display = "none";
            document.getElementById('lambda_form').style.display = "block";
            document.getElementById('fargate_form').style.display = "none";
            break;
        case 'fargate':
            document.getElementById('s3_form').style.display = "none";
            document.getElementById('ec2_form').style.display = "none";
            document.getElementById('rds_form').style.display = "none";
            document.getElementById('lambda_form').style.display = "none";
            document.getElementById('fargate_form').style.display = "block";
            break;
    }
}
select.addEventListener('change', logValue, false);

function create_s3_tf () {
    var name = document.getElementById('s3_name').value;
    var size = document.getElementById('s3_size').value;
    alert(name + size);
}