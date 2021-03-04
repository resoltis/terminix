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
app.post('/generateFiles', urlencodedParser, function (req, res) {

  //Require file system for writing to file
  const fs = require('fs');

  //Print out the data we received
  console.log(req.body);

  //Put TF file text into a single string called content
  //Variables are passed as 'req.body' + variable name
  const devContent = '#tags' + '\n' +
    'Environment  =\"' + req.body.environment + '\"\n' +
    'Provisioned  = "UACapstoneTeam"' + '\n' +
    'ManagedBy    = "Terraform"' + '\n' +
    'BusinessUnit = \"' + req.body.businessUnit + '\"\n\n' +

    '#common' + '\n' +
    'name         = \"' + req.body.fargateName + '\"\n' +
    'vpc_id       = "vpc-017f5c0837ecb0839"' + '\n' +
    'subnets      = ["subnet-0d41c14e3fc453c9c", "subnet-0d744fae9354141aa"]' + '\n' +
    'cluster_name = \"' + req.body.clusterName + '\"\n\n' +

    '#task_defination' + '\n' +
    'task_container_image   = ' + req.body.taskContainerImage + '\n' +
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

  // backend file
  const providerBackEnd = 'terraform {'
    + '\n\t' + 'backend "s3" {'
    + '\n\t\t' + 'bucket  = "tf-svm-state-files-prod"'
    + '\n\t\t' + 'key     = "' + req.body.businessUnit + '/salesforceworkorderkafkaconsumer/ecs_fargate_stack/terraform.tfstate"'
    + '\n\t\t' + 'region  = "us-east-1"'
    + '\n\t\t' + 'profile = "obiwanprod"'
    + '\n\t' + '}'
    + '\n' + '}';

  // main file
  const providerMain = '#########################################################'
    + '\n' + '#environment variable for task defination'
    + '\n' + '#########################################################'
    + '\n' + '\n' + '#   task_container_environment = {'
    + '\n' + '#     "ASPNETCORE_ENVIRONMENT" = var.Environment'
    + '\n' + '#   }' + '\n'
    + '\n' + '#########################################################'
    + '\n' + '#########################################################'
    + '\n' + '#tags'
    + '\n' + '#########################################################'
    + '\n' + 'locals {'
    + '\n\t' + 'Environment  = var.Environment'
    + '\n\t' + 'Provisioned  = var.Provisioned'
    + '\n\t' + 'ManagedBy    = var.ManagedBy'
    + '\n\t' + 'BusinessUnit = var.BusinessUnit'
    + '\n' + '}'
    + '\n' + '\n' + 'locals {'
    + '\n\t' + '# Common tags to be assigned to all resources'
    + '\n\t' + 'common_tags = {'
    + '\n\t\t' + 'Environment  = local.Environment'
    + '\n\t\t' + 'Provisioned  = local.Provisioned'
    + '\n\t\t' + 'ManagedBy    = local.ManagedBy'
    + '\n\t\t' + 'BusinessUnit = local.BusinessUnit'
    + '\n\t' + '}'
    + '\n' + '}'
    + '\n' + '\n' + '#########################################################'
    + '\n' + '#Container Defination'
    + '\n' + '#########################################################'
    + '\n' + '\n' + 'resource "aws_cloudwatch_log_group" "main" {'
    + '\n\t' + 'name              = "${var.name}"'
    + '\n\t' + 'tags              = local.common_tags'
    + '\n\t' + 'retention_in_days = 14'
    + '\n' + '}'
    + '\n' + '\n' + 'module "ecs-task-definition" {'
    + '\n\t' + 'source = "git::https://ounganpfuzzeit7hzjd3iiw2m5a3wbmkdmssbn5xgtm24nenxdpq@tfs-svm.visualstudio.com/Terraform-Modules/_git/terraform-aws-ecs-fargate-task-definition?ref=master"'
    + '\n' + '\n\t' + 'enabled              = true'
    + '\n\t' + 'name_prefix          = "${var.name}-td"'
    + '\n\t' + 'task_container_image = var.task_container_image'
    + '\n' + '\n\t' + 'container_name      = var.name'
    + '\n\t' + 'task_container_port = var.task_container_port'
    + '\n\t' + 'task_host_port      = var.task_host_port'
    + '\n' + '\n\t' + 'task_definition_cpu    = var.task_definition_cpu'
    + '\n\t' + 'task_definition_memory = var.task_definition_memory'
    + '\n' + '\n\t' + 'task_container_environment = {'
    + '\n\t\t' + '  "ASPNETCORE_ENVIRONMENT" = var.Environment'
    + '\n\t' + '}' + '\n'
    + '\n\t' + 'cloudwatch_log_group_name = var.name'
    + '\n' + '\n\t' + 'task_stop_timeout = 90'
    + '\n' + '\n\t' + 'tags = local.common_tags'
    + '\n' + '\n' + '}'
    + '\n' + '\n' + '\n' + '#########################################################'
    + '\n' + '#Cluster'
    + '\n' + '#########################################################'
    + '\n' + '\n' + 'resource "aws_ecs_cluster" "main" {'
    + '\n' + 'name = var.cluster_name'
    + '\n' + ' tags = local.common_tags'
    + '\n' + '}'
    + '\n' + '\n' + '#########################################################'
    + '\n' + '# ALB'
    + '\n' + '#########################################################'
    + '\n' + 'resource "aws_lb" "main" {'
    + '\n' + 'name               = "${var.name}-lb"'
    + '\n' + 'internal           = true' + '\n' + 'load_balancer_type = "application"'
    + '\n' + 'security_groups    = [aws_security_group.main.id]'
    + '\n' + 'subnets            = var.subnets'
    + '\n' + ' tags               = local.common_tags'
    + '\n' + '}' + '\n'
    + '\n' + '# lb listerner'
    + '\n' + 'resource "aws_lb_listener" "main" {'
    + '\n' + '\n' + 'load_balancer_arn = aws_lb.main.id'
    + '\n' + 'port              = var.alb_port'
    + '\n' + 'protocol          = var.alb_protocol'
    + '\n' + '\n' + 'default_action'
    + '\n' + 'target_group_arn = aws_lb_target_group.main.id' + '\n' + 'type             = "forward"'
    + '\n' + '}' + '\n'
    + '\n' + '#########################################################'
    + '\n' + '#Target Group'
    + '\n' + '#########################################################'
    + '\n' + '\n' + 'resource "aws_lb_target_group" "main" {'
    + '\n' + '\n\t' + 'name     = "${var.name}-tg"'
    + '\n\t' + 'port     = var.tg_port'
    + '\n\t' + 'protocol = var.tg_protocol'
    + '\n' + '\n\t' + 'vpc_id      = var.vpc_id'
    + '\n\t' + 'target_type = "ip"'
    + '\n' + '\n\t' + 'deregistration_delay = 90'
    + '\n\t' + ' tags                 = local.common_tags'
    + '\n' + '\n\t' + 'health_check {'
    + '\n\t\t' + 'timeout             = 5'
    + '\n\t\t' + 'interval            = 30'
    + '\n\t\t' + 'path                = "/"'
    + '\n\t\t' + 'protocol            = var.tg_protocol'
    + '\n\t\t' + 'healthy_threshold   = 3'
    + '\n\t\t' + 'unhealthy_threshold = 3'
    + '\n\t\t' + 'matcher             = "200"'
    + '\n\t' + '}' + '\n' +
    + '\n' + '}' + '\n' +
    + '\n' + '#########################################################'
    + '\n' + '#Security Group'
    + '\n' + '#########################################################' + '\n'
    + '\n' + 'resource "aws_security_group" "main" {'
    + '\n\t' + 'name   = "${var.name}-sg"'
    + '\n\t' + 'vpc_id = var.vpc_id'
    + '\n\t' + 'tags   = local.common_tags'
    + '\n' + '}' + '\n'
    + '\n' + 'resource "aws_security_group_rule" "app_lb_allow_outbound" {'
    + '\n\t' + 'security_group_id = aws_security_group.main.id' + '\n'
    + '\n\t' + 'type        = "egress"'
    + '\n\t' + 'from_port   = 0'
    + '\n\t' + 'to_port     = 0'
    + '\n\t' + 'protocol    = "-1"'
    + '\n\t' + 'cidr_blocks = ["0.0.0.0/0"]'
    + '\n' + '}' + '\n'
    + '\n' + 'resource "aws_security_group_rule" "app_lb_allow_all_http" {'
    + '\n\t' + 'security_group_id = aws_security_group.main.id'
    + '\n\t' + 'type              = "ingress"'
    + '\n\t' + 'from_port         = 0'
    + '\n\t' + 'to_port           = 65535'
    + '\n\t' + 'protocol          = "tcp"'
    + '\n\t' + 'cidr_blocks       = ["10.0.0.0/8"]'
    + '\n' + '}' + '\n'
    + '\n' + '#########################################################'
    + '\n' + '# ECS Fargate Service'
    + '\n' + '#########################################################' + '\n'
    + '\n' + 'resource "aws_ecs_service" "main" {'
    + '\n\t' + 'name            = "${var.name}-service"'
    + '\n\t' + 'cluster         = aws_ecs_cluster.main.id'
    + '\n\t' + 'task_definition = module.ecs-task-definition.task_definition_arn'
    + '\n\t' + 'desired_count   = var.app_count'
    + '\n\t' + 'launch_type     = var.launch_type'
    + '\n\t' + 'tags            = local.common_tags' + '\n'
    + '\n\t' + 'network_configuration {'
    + '\n\t\t' + 'security_groups = [aws_security_group.main.id]'
    + '\n\t\t' + 'subnets         = var.subnets'
    + '\n\t\t' + 'assign_public_ip = false'
    + '\n\t' + '}' + '\n'
    + '\n\t' + 'load_balancer {'
    + '\n\t\t' + 'target_group_arn = aws_lb_target_group.main.id'
    + '\n\t\t' + 'container_name   = var.name'
    + '\n\t\t' + 'container_port   = var.container_port'
    + '\n\t' + '}' + '\n'
    + '\n\t' + 'depends_on = [aws_lb_listener.main]'
    + '\n' + '}'

  fs.mkdirSync(path.join('fargate-files'), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');

  });
  // test

  fs.mkdirSync(path.join('fargate-files', req.body.environment), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');
  });

  //Write the file
  fs.writeFileSync(path.join('fargate-files', req.body.environment, 'dev.tfvars'), devContent, err => {
    if (err) {
      console.debug(err);
      //We may need to send user to a file fail page here
      return
    }
    //file written successfully

  });

  fs.writeFileSync(path.join('fargate-files', req.body.environment, 'provider.tf'), providerContent, err => {
    if (err) {
      console.debug(err);
      return
    }
  });

  fs.writeFileSync(path.join('fargate-files', req.body.environment, 'variables.tf'), variableContent, err => {
    if (err) {
      console.debug(err);
      return
    }
  });

  // write backend file
  fs.writeFileSync(path.join('fargate-files', req.body.environment, 'backend.tf'), providerBackEnd, err => {
    if (err) {
      console.debug(err);
      return
    }
  });

  //write main file
  fs.writeFileSync(path.join('fargate-files', req.body.environment, 'main.tf'), providerMain, err => {
    if (err) {
      console.debug(err);
      return
    }
  });

  //When finished, send user to file success page!
  res.sendFile(path.join(__dirname + '/express/fileSuccess.html'));

});
/* Commented out app.post while in progress
app.post('lambda:InvokeFunction', urlencodedParser,function(req, res){
  //Require file system for writing to file
  const fs = require('fs');

  //Print out the data we received
  console.log(req.body);

  //Backend File
  const providerBackEnd = 'terraform {'
    + '\n\t' + 'backend "s3" {'
    + '\n\t\t' + 'bucket  = "tf-svm-state-files-prod"'
    + '\n\t\t' + 'key     = "' + req.body.businessUnit + 'https_alb_lambda/terraform.tfstate"'
    + '\n\t\t' + 'region  = "us-east-1"'
    + '\n\t\t' + 'profile = "obiwanprod"'
    + '\n\t' + '}'
    + '\n' + '}';

  const providerMain = '#########################################################'
  + '\n' + '#tags'
  + '\n' + '#########################################################'
  + '\n' + 'locals {'
  + '\n\t' + 'Environment  = var.Environment'
  + '\n\t' + 'Provisioned  = var.Provisioned'
  + '\n\t' + 'ManagedBy    = var.ManagedBy'
  + '\n\t' + 'BusinessUnit = var.BusinessUnit'
  + '\n' + '}'
  + '\n' + '\n' + 'locals {'
  + '\n\t' + '# Common tags to be assigned to all resources'
  + '\n\t' + 'common_tags = {'
  + '\n\t\t' + 'Environment  = local.Environment'
  + '\n\t\t' + 'Provisioned  = local.Provisioned'
  + '\n\t\t' + 'ManagedBy    = local.ManagedBy'
  + '\n\t\t' + 'BusinessUnit = local.BusinessUnit'
  + '\n\t' + '}'
  + '\n' + '}';

//Insert devContent file info here
  const devContent;

//Insert provider file here
  const providerContent;

//role file
const providerRole = '# # TODO: set lambda app permissions here'
+'\n' + '# resource "aws_iam_role_policy" "main" {'
+'\n' + '#   role = "${aws_iam_role.app_role.arn}"'
+'\n' + '#   name = "${local.ns}"'
+'\n' +
+'\n' + '#   policy = <<EOF'
+'\n' + '# {'
+'\n' + '#   "Version": "2012-10-17",'
+'\n' + '#   "Statement": ['
+'\n' + '#     {'
+'\n' + '#       "Effect": "Allow",'
+'\n' + '#       "Action": ['
+'\n' + '#         "change:me"'
+'\n' + '#       ],'
+'\n' + '#       "Resource": ['
+'\n' + '#         "*"'
+'\n' + '#       ]'
+'\n' + '#     }'
+'\n' + '#   ]'
+'\n' + '# }'
+'\n' + '# EOF'
+'\n' + '# }'
+'\n' +
+'\n' + 'resource "aws_iam_role" "app_role" {'
+'\n' + '  name = "${var.name}-role"'
+'\n' +
+'\n' +'  assume_role_policy = <<EOF'
+'\n' + '{'
+'\n' +'  "Version": "2012-10-17",'
+'\n' +'  "Statement": ['
+'\n' +'    {'
+'\n' +'      "Action": "sts:AssumeRole",'
+'\n' +'      "Principal": {'
+'\n' +'        "Service": "lambda.amazonaws.com"'
+'\n' +'      },'
+'\n' +'      "Effect": "Allow",'
+'\n' +'      "Sid": ""'
+'\n' +'    }'
+'\n' +'  ]'
+'\n' +'}'
+'\n' +'EOF'
+'\n' +'}'
+'\n' +
+'\n' +'resource "aws_iam_role_policy" "cloudwatch" {'
+'\n' +'  role = aws_iam_role.app_role.id'
+'\n' +'  name = "cw-${var.name}-role-policy"'
+'\n' +
+'\n' +'  policy = <<EOF'
+'\n' +'{'
+'\n' +'  "Version": "2012-10-17",'
+'\n' +'  "Statement": ['
+'\n' +'    {'
+'\n' +'      "Effect": "Allow",'
+'\n' +'      "Action": ['
+'\n' +'        "logs:CreateLogGroup",'
+'\n' +'        "logs:CreateLogStream",'
+'\n' +'        "logs:PutLogEvents",'
+'\n' +'        "ec2:DescribeNetworkInterfaces",'
+'\n' +'        "ec2:CreateNetworkInterface",'
+'\n' +'        "ec2:DeleteNetworkInterface",'
+'\n' +'        "ec2:DescribeInstances",'
+'\n' +'        "ec2:AttachNetworkInterface"'
+'\n' +'      ],'
+'\n' +'      "Resource": ['
+'\n' +'        "*"'
+'\n' +'      ]'
+'\n' +'    }'
+'\n' +'  ]'
+'\n' +'}'
+'\n' +'EOF'
+'\n' +'}';




});
*/
