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


//make sure to change environment based on account
function detectAccount(selectObject) {
    //document.getElementById('businessUnit').value = document.getElementById('account').value + '-' + document.getElementById('environment').value;
    var value = selectObject.value;
    if(value === "TMX-CorpsApps" || value === "TMX-Integration") {
        var list = document.getElementById('environment').getElementsByTagName('option');
        for (var i = 0; i < list.length; i++) {
            // lowercase comparison for case-insensitivity
            if(list[i].value.toLowerCase() == "uat") list[i].hidden = false ;
            if(list[i].value.toLowerCase() == "qa") list[i].hidden = false ;
            if(list[i].value.toLowerCase() == "training") list[i].hidden = false ;
          }
    }
    else {
        var list = document.getElementById('environment').getElementsByTagName('option');
        for (var i = 0; i < list.length; i++) {
            // lowercase comparison for case-insensitivity
            if(list[i].value.toLowerCase() == "uat") list[i].hidden = true ;
            if(list[i].value.toLowerCase() == "qa") list[i].hidden = true ;
            if(list[i].value.toLowerCase() == "training") list[i].hidden = true ;
          }

    }

    detectEnvironment(selectObject);
  }

  
function detectEnvironment(selectObject) {
    var value = selectObject.value;
    document.getElementById('businessUnit').value = document.getElementById('account').value + '-' + document.getElementById('environment').value;
            
  }


  //make sure task cpu and task memory are compatible
function detectTaskCPU() {
    
    var cpu = document.getElementById('taskCPU');
    var memory = document.getElementById('taskMemory');

    if(cpu.value === "1024") 
    {
        memory[2].selected = "selected";
        memory[0].hidden = true;
        memory[1].hidden = true;
        memory[2].hidden = false;
    }
    else
    if(cpu.value === "512") 
    {
        memory[1].selected = "selected";
        memory[0].hidden = true;
        memory[1].hidden = false;
        memory[2].hidden = false;
    }
    else
    if(cpu.value === "256") 
    { 
        memory[0].selected = "selected";
        memory[0].hidden = false;
        memory[1].hidden = false;
        memory[2].hidden = false;
    }


}

function uploadFiles() {
    alert(('Account:' + account.value) + '\n' +
    ('Environment:' +environment.value) + '\n' +
    ('Business Unit:' +businessUnit.value) + '\n' +
    ('Name:' +fargateName.value) + '\n' +
    ('Name Prefix:' +namePrefix.value) + '\n' +
    ('Repo URL:' +repoUrl.value) + '\n' +
    ('Cluster Name:' +clusterName.value) + '\n' +
    ('Task Container:' +taskContainer.value) + '\n' +
    ('Container Name:' +containerName.value) + '\n' +
    ('Host Port:' +hostPort.value) + '\n' +
    ('Container Port:' +containerPort.value) + '\n' +
    ('Task CPU:' +taskCPU.value) + '\n' +
    ('Task Memory:' +taskMemory.value) + '\n' +
    ('ALB Port:' +albPort.value) + '\n' +
    ('Task Container Image:' +taskContainerImage.value) + '\n' +
    ('App Count:' +appCount.value));
    
}

