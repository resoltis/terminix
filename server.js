const http = require('http');
const express = require('express')
var path = require('path');
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("express"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/express/index.html'));
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


app.post('/generateFiles', urlencodedParser, function(req, res){
  const fs = require('fs');
  console.log(req.body);
    const content = '#tags' + '\n' +
    'Environment  =\"' + req.body.environment + '\"\n' +
    'Provisioned  = "SampathOlluri"' + '\n' +
    'ManagedBy    = "Terraform"' + '\n' +
    'BusinessUnit = \"' + req.body.businessUnit + '\"\n\n' +

    '#common' + '\n' +
    'name         = \"' + req.body.fargateName + '\"\n' +
    'vpc_id       = "vpc-017f5c0837ecb0839"' + '\n' +
    'subnets      = ["subnet-0d41c14e3fc453c9c", "subnet-0d744fae9354141aa"]' + '\n' +
    'cluster_name = \"' + req.body.clusterName + '\"\n\n' +

    '#task_defination' + '\n' +
    'task_container_image   = "328023855383.dkr.ecr.us-east-1.amazonaws.com/salesforceworkorderkafkaconsumer:dev"' + '\n' +
    'task_container_port    = ' + req.body.containerPort + '\n' +
    'task_host_port         = ' + req.body.hostPort + '\n' +
    'task_definition_cpu    = ' + req.body.taskCPU + '\n' +
    'task_definition_memory = ' + req.body.taskMemory + '\n\n' +

    '#alb' + '\n' +
    'alb_port     = ' + req.body.albPort + '\n' +
    'alb_protocol = "HTTP"' + '\n\n' +

    '#tg' + '\n' +
    'tg_port     = ' + req.body.tgPort + '\n' +
    'tg_protocol = "HTTP"' + '\n\n' +

    '#service' + '\n' +
    'app_count   = ' + req.body.appCount + '\n' +
    'launch_type = "FARGATE"' + '\n' +
    'container_port = ' + req.body.containerPort;

    fs.writeFile('dev.tfvars', content, err => {
        if (err) {
            console.debug(err);
            return
        }
    //file written successfully
    });
    res.sendFile(path.join(__dirname + '/express/fileSuccess.html'));
});
