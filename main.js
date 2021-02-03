//MAIN SELECTOR
//Comments down here have to switch to // because it is JS instead of html
//Get the dropdown list by ID
var select = document.getElementById('service');
//Function that recognizes change in value


function logValue(type) {
    switch (type) {
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

            document.getElementById('s3_picker').toggleAttribute("active", 1000);
            document.getElementById('s3_picker').classList.add("active");
            document.getElementById('ec2_picker').classList.remove("active");
            document.getElementById('rds_picker').classList.remove("active");
            document.getElementById('lambda_picker').classList.remove("active");
            document.getElementById('fargate_picker').classList.remove("active");
            
            break;
        case 'ec2':
            document.getElementById('s3_form').style.display = "none";
            document.getElementById('ec2_form').style.display = "block";
            document.getElementById('rds_form').style.display = "none";
            document.getElementById('lambda_form').style.display = "none";
            document.getElementById('fargate_form').style.display = "none";

            document.getElementById('s3_picker').classList.remove("active");
            document.getElementById('ec2_picker').classList.add("active");
            document.getElementById('rds_picker').classList.remove("active");
            document.getElementById('lambda_picker').classList.remove("active");
            document.getElementById('fargate_picker').classList.remove("active");
            
            break;
        case 'rds':
            document.getElementById('s3_form').style.display = "none";
            document.getElementById('ec2_form').style.display = "none";
            document.getElementById('rds_form').style.display = "block";
            document.getElementById('lambda_form').style.display = "none";
            document.getElementById('fargate_form').style.display = "none";
            
            document.getElementById('s3_picker').classList.remove("active");
            document.getElementById('ec2_picker').classList.remove("active");
            document.getElementById('rds_picker').classList.add("active");
            document.getElementById('lambda_picker').classList.remove("active");
            document.getElementById('fargate_picker').classList.remove("active");
            
            break;
        case 'lambda':
            document.getElementById('s3_form').style.display = "none";
            document.getElementById('ec2_form').style.display = "none";
            document.getElementById('rds_form').style.display = "none";
            document.getElementById('lambda_form').style.display = "block";
            document.getElementById('fargate_form').style.display = "none";
            
            document.getElementById('s3_picker').classList.remove("active");
            document.getElementById('ec2_picker').classList.remove("active");
            document.getElementById('rds_picker').classList.remove("active");
            document.getElementById('lambda_picker').classList.add("active");
            document.getElementById('fargate_picker').classList.remove("active");
            
            break;
        case 'fargate':
            document.getElementById('s3_form').style.display = "none";
            document.getElementById('ec2_form').style.display = "none";
            document.getElementById('rds_form').style.display = "none";
            document.getElementById('lambda_form').style.display = "none";
            document.getElementById('fargate_form').style.display = "block";
            
            document.getElementById('s3_picker').classList.remove("active");
            document.getElementById('ec2_picker').classList.remove("active");
            document.getElementById('rds_picker').classList.remove("active");
            document.getElementById('lambda_picker').classList.remove("active");
            document.getElementById('fargate_picker').classList.add("active");
            
            break;
    }
}
select.addEventListener('change', logValue, false);

