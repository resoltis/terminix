////////////////////////////SERVER CREATION CODE/////////////////////////////////////////

//Create Web server
const http = require('http');
const express = require('express')
var path = require('path');
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("express"));

//Load landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/express/index.html'));
})

//Open port to incoming GET/POST calls
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//DO NOT CHANGE ANYTHING ABOVE THIS UNTIL WE CONTAINERIZE THE WEB APP
//////////////////////////////////////////////////////////////////////////////////////////

//POST method for generating files
//(POST action name, parser, function(request, response))
app.post('/generateFiles', urlencodedParser, function(req, res){

  //Require file system for writing to file
  const fs = require('fs');

  //Print out the data we received
  console.log(req.body);

  //Put TF file text into a single string called content
  //Variables are passed as 'req.body' + variable name
  const devContent = '#tags' + '\n' +
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

  const providerContent = 'provider "aws" { ' + '\n' +
  ' region = "us-east-1"' + '\n' +
  ' profile = "' + req.body.businessUnit + '"' + '\n' + '}';


  const variableContent = '#common' + '\n' + 
  'variable "Environment" { default = "" }' + '\n' +
  'variable "Provisioned" { default = "" }' + '\n' +
  'variable "ManagedBy" { default = "" }' + '\n' +
  'variable "BusinessUnit" { default = "" }' + '\n' +
  
  'variable "vpc_id" { default = "" }' + '\n' +
  'variable "subnets" {' + '\n' +
  ' type    = list(string)' + '\n' +
  ' default = []' + '\n' +
  '}' + '\n' +
  'variable "name" { default = "" }' + '\n' +
  'variable "name_prefix" { default = "" }' + '\n' +
  'variable "cluster_name" { default = "" }' + '\n' +
  
  'variable "task_container_image" { default = "" }' + '\n' +
  'variable "container_name" { default = "" }' + '\n' +
  'variable "task_container_port" { default = "" }' + '\n' +
  'variable "task_host_port" { default = "" }' + '\n' +
  'variable "task_definition_cpu" { default = "" }' + '\n' +
  'variable "task_definition_memory" { default = "" }' + '\n' +
  'variable "alb_port" { default = "" }' + '\n' +
  'variable "alb_protocol" { default = "" }' + '\n' +
  'variable "tg_port" { default = "" }' + '\n' +
  'variable "tg_protocol" { default = "" }' + '\n' +
  'variable "app_count" { default = "" }' + '\n' +
  'variable "launch_type" { default = "" }' + '\n' +
  'variable "container_port" { default = "" }';

  //Write the file
  fs.writeFile('dev.tfvars', devContent, err => {
      if (err) {
          console.debug(err);
          //We may need to send user to a file fail page here
          return
      }
  //file written successfully
  });

  fs.writeFile('provider.tf', providerContent, err => {
    if (err) {
      console.debug(err);
      return
    }
  });

  fs.writeFile('variables.tf', variableContent, err => {
    if (err) {
      console.debug(err);
      return
    }
  });

  //When finished, send user to file success page!
  res.sendFile(path.join(__dirname + '/express/fileSuccess.html'));
});

