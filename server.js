////////////////////////////SERVER CREATION CODE/////////////////////////////////////////

//Create Web server
const http = require('http');
const express = require('express')
var path = require('path');
const app = express()
const port = 3000
var bodyParser = require('body-parser');
const { exec } = require('child_process');
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

//object array holding all static values related to each Account/Enviorment
//AccountName = accName, Enviorment = env, vpc_id = vpc, lb subnets = lb1/lb2, 
//App subnets = sub1/sub2
let staticValues = [
  { // BI-Dev 
    "accName": "TMX-BI", "env": "Dev", "vpc": "vpc-06f5145b2cac7068b",
    "lb1": "subnet-08ebb9f71f54d7c03", "lb2": "subnet-069e59ee55c7869e3",
    "sub1": "subnet-095f194970f0b4e67", "sub2": "subnet-01bdd2bbffea58d05"
  },
  { // BI-Test
    "accName": "TMX-BI", "env": "Test", "vpc": "vpc-03345761b43d01494",
    "lb1": "subnet-05dcf2f33949ab8bd", "lb2": "subnet-0309f0225d9873637",
    "sub1": "subnet-0201c3c0fef8eefcd", "sub2": "subnet-0201c3c0fef8eefcd"
  },
  { //BI-Prod
    "accName": "TMX-BI", "env": "Prod", "vpc": "vpc-0771449020fb5142e",
    "lb1": "subnet-020eb8f5b0f0bec16", "lb2": "subnet-036d6d25becc25da3",
    "sub1": "subnet-0862fb5b5fdf06437", "sub2": "subnet-0862fb5b5fdf06437"
  },
  { //Commerical-Dev
    "accName": "TMX-Commercial", "env": "Dev", "vpc": "vpc-0b5f89b263be69844",
    "lb1": "subnet-021398ea60b6db2ae", "lb2": "subnet-07ab7d6171c3340c1",
    "sub1": "subnet-0af63390f61105857", "sub2": "subnet-0003fb6b3111a1ad8"
  },
  { // Commerical-Test
    "accName": "TMX-Commercial", "env": "Test", "vpc": "vpc-0362f2555d7037273",
    "lb1": "subnet-0f05cdf1d8b3a118f", "lb2": "subnet-045cd73a31416024e",
    "sub1": "subnet-0f7ee2e13ebc4b124", "sub2": "subnet-04e27598dd766efcc"
  },
  {// Commerical-Prod
    "accName": "TMX-Commercial", "env": "Prod", "vpc": "vpc-057d430aaccafdca5",
    "lb1": "subnet-0e423c994c9cd6025", "lb2": "subnet-017ee9c79564f6cae",
    "sub1": "subnet-031af24954b9a26c4", "sub2": "subnet-0d5dc121b45ae86d3"
  },
  {//Corp-Dev 
    "accName": "TMX-CorpApps", "env": "Dev", "vpc": "vpc-0fd1e0cfc291f05be",
    "lb1": "subnet-07636b1042d2bf4da", "lb2": "subnet-0db16da98e74b5562",
    "sub1": "subnet-0e38561ec0382221e", "sub2": "subnet-08e7f38db57fadb29"
  },
  {//Corp-test
    "accName": "TMX-CorpApps", "env": "Test", "vpc": "vpc-0359fbc43164c103b",
    "lb1": "subnet-071a220f94baf629d", "lb2": "subnet-0656c9f056d03ae3a",
    "sub1": "subnet-082ee696766bc5ccf", "sub2": "subnet-050b0738760de4673"
  },
  {//Corp-prod
    "accName": "TMX-CorpApps", "env": "Prod", "vpc": "vpc-0e4c7265233e3ff91",
    "lb1": "subnet-0450745fc01dadedd", "lb2": "subnet-0a6c6f339336989f8",
    "sub1": "subnet-0d1a6ffad8ac87cb2", "sub2": "subnet-0def93e6d4e2b5bb1"
  },
  {//Corp-UAT
    "accName": "TMX-CorpApps", "env": "UAT", "vpc": "vpc-0258852e2748a052b",
    "lb1": "subnet-0cb284514ee47809a", "lb2": "subnet-07ac2e23b61479718",
    "sub1": "subnet-0361b6749e63a30ad", "sub2": "subnet-04b15609421ad1de4"
  },
  {//Corp-QA
    "accName": "TMX-CorpApps", "env": "QA", "vpc": "vpc-05c6abbc040534762",
    "lb1": "subnet-0668228aa0d60d0f2", "lb2": "subnet-00b40396f36fea884",
    "sub1": "subnet-019ef0cfdb445efa6", "sub2": "subnet-0f2c7ef0e714327cc"
  },
  {//Corp-training
    "accName": "TMX-CorpApps", "env": "Training", "vpc": "vpc-0b24f5cdf16e5ca81",
    "lb1": "subnet-0a7ef8f120f916ca0", "lb2": "subnet-0d05f28139a4e6a06",
    "sub1": "subnet-0801a424986d394d9", "sub2": "subnet-08c3371432240c362"
  },
  {//Ecomm-Dev
    "accName": "TMX-Ecomm", "env": "Dev", "vpc": "vpc-066ca1c28befe151f",
    "lb1": "subnet-0200d0582c6db9190", "lb2": "subnet-0a3fe954e364eb9c7",
    "sub1": "subnet-0be39299f983f09aa", "sub2": "subnet-07e910d238aa2c14a"
  },
  {//Ecomm-Test
    "accName": "TMX-Ecomm", "env": "Test", "vpc": "vpc-02048e2212b9e0335",
    "lb1": "subnet-049b8b5bb6e3dd894", "lb2": "subnet-01e99e7ff5d63b251",
    "sub1": "subnet-0fa35bbd46a83eb2e", "sub2": "subnet-0abb007c7575ca66b"
  },
  {//Ecomm-Prod
    "accName": "TMX-Ecomm", "env": "Prod", "vpc": "vpc-060176ad70173c5bd",
    "lb1": "subnet-0bc94c94a05bb2cbd", "lb2": "subnet-0fa0c0ce5701bfe34",
    "sub1": "subnet-052a003fe29fbd15f", "sub2": "subnet-0ad98fdd0b087da7c"
  },
  {//Integration-Dev
    "accName": "TMX-Integration", "env": "Dev", "vpc": "vpc-017f5c0837ecb0839",
    "lb1": "subnet-0d744fae9354141aa", "lb2": "subnet-0d41c14e3fc453c9c",
    "sub1": "subnet-05dea48a108a5eaae", "sub2": "subnet-0b39ae62fd4e9347c"
  },
  {//Integration-Test
    "accName": "TMX-Integration", "env": "Test", "vpc": "vpc-02dc69ea180cedf3f",
    "lb1": "subnet-0a3c56b1d3d7dd52f", "lb2": "subnet-0a3c56b1d3d7dd52f",
    "sub1": "subnet-0923862850b381923", "sub2": "subnet-04de480f7b4876d1f"
  },
  {//Integration-Prod
    "accName": "TMX-Integration", "env": "Prod", "vpc": "vpc-0900eb9b296e35c72",
    "lb1": "subnet-03728da7fc8d9069c", "lb2": "subnet-0d65e2f7edb09a47a",
    "sub1": "subnet-02279cfcd0a558a2e", "sub2": "subnet-0d83ea59caa561419"
  },
  {//Integration-QA
    "accName": "TMX-Integration", "env": "QA", "vpc": "vpc-093a24f06fa52c1a8",
    "lb1": "subnet-0844a7591a953319b", "lb2": "subnet-0f1a00c934c46cf3e",
    "sub1": "subnet-040f710f364811a98", "sub2": "subnet-037a02d0f93b51d29"
  },
  {//Integration-Training
    "accName": "TMX-Integration", "env": "QA", "vpc": "vpc-0a2fa78b3220ad009",
    "lb1": "subnet-04da17738e60a61af", "lb2": "subnet-067942c4db7817dca",
    "sub1": "subnet-0aea9fe18f8d71822", "sub2": "subnet-05ccfbee6a6144750"
  },
  {//Integration-UAT
    "accName": "TMX-Integration", "env": "UAT", "vpc": "vpc-01d1382a6ff836ffa",
    "lb1": "subnet-0a411e9516f51288d", "lb2": " subnet-0c0906944fb42fe32",
    "sub1": "subnet-0eb0d3f9cdf5c59aa", "sub2": "subnet-0efb36a523cd2e45e"
  }
];

//POST method for generating files
//(POST action name, parser, function(request, response))


app.post('/generateFilesTest', urlencodedParser, function (req, res) {
    console.log(req.body);
});

app.post('/generateFiles', urlencodedParser, function (req, res) {

  var vpc_id;
var lbs_subnet;
var app_subnet;
var businessUnit = req.body.businessUnit.toLowerCase()
switch(businessUnit){
  case "tmx-bi dev":
  vpc_id = "vpc-06f5145b2cac7068b";
  lbs_subnet = "subnet-08ebb9f71f54d7c03, subnet-069e59ee55c7869e3";
  app_subnet = "subnet-095f194970f0b4e67, subnet-01bdd2bbffea58d05";
  break;

  case "tmx-bi test":
  vpc_id = "vpc-03345761b43d01494";
  lbs_subnet = "subnet-020eb8f5b0f0bec16, subnet-0309f0225d9873637";
  app_subnet = "subnet-0201c3c0fef8eefcd, subnet-0201c3c0fef8eefcd";
  break;

  case "tmx-bi prod":
    vpc_id = "vpc-0771449020fb5142e";
    lbs_subnet = "subnet-05dcf2f33949ab8bd, subnet-036d6d25becc25da3";
    app_subnet = "subnet-0862fb5b5fdf06437, subnet-0862fb5b5fdf06437";
    break;

  case "tmx-commercial dev":
    vpc_id = "vpc-0b5f89b263be69844";
    lbs_subnet = "subnet-021398ea60b6db2ae, subnet-07ab7d6171c3340c1";
    app_subnet = "subnet-0af63390f61105857, subnet-0003fb6b3111a1ad8";
    break;

  case "tmx-commercial test":
    vpc_id = "vpc-0362f2555d7037273";
    lbs_subnet = "subnet-0f05cdf1d8b3a118f, subnet-045cd73a31416024e";
    app_subnet = "subnet-0f7ee2e13ebc4b124, subnet-04e27598dd766efcc";
    break;

  case "tmx-commercial prod":
    vpc_id = "vpc-057d430aaccafdca5";
    lbs_subnet = "subnet-0e423c994c9cd6025, subnet-017ee9c79564f6cae";
    app_subnet = "subnet-031af24954b9a26c4, subnet-0d5dc121b45ae86d3";
    break;

  case "tmx-corpapps dev":
    vpc_id = "vpc-0fd1e0cfc291f05be";
    lbs_subnet = "subnet-07636b1042d2bf4da, subnet-0db16da98e74b5562";
    app_subnet = "subnet-0e38561ec0382221e, subnet-08e7f38db57fadb29";
    break;

  case "tmx-corpapps test":
    vpc_id = "vpc-0359fbc43164c103b";
    lbs_subnet = "subnet-071a220f94baf629d, subnet-0656c9f056d03ae3a";
    app_subnet = "subnet-082ee696766bc5ccf, subnet-050b0738760de4673";
    break;

  case "tmx-corpapps prod":
    vpc_id = "vpc-0e4c7265233e3ff91";
    lbs_subnet = "subnet-0450745fc01dadedd, subnet-0a6c6f339336989f8";
    app_subnet = "subnet-0d1a6ffad8ac87cb2, subnet-0def93e6d4e2b5bb1";
    break;

  case "tmx-corpapps uat":
    vpc_id = "vpc-0258852e2748a052b";
    lbs_subnet = "subnet-0cb284514ee47809a, subnet-07ac2e23b61479718";
    app_subnet = "subnet-0361b6749e63a30ad, subnet-04b15609421ad1de4";
    break;

  case "tmx-corpapps qa":
    vpc_id = "vpc-05c6abbc040534762";
    lbs_subnet = "subnet-0668228aa0d60d0f2, subnet-00b40396f36fea884";
    app_subnet = "subnet-019ef0cfdb445efa6, subnet-0f2c7ef0e714327cc";
    break;

  case "tmx-corpapps training":
    vpc_id = "vpc-0b24f5cdf16e5ca81";
    lbs_subnet = "subnet-0a7ef8f120f916ca0, subnet-0d05f28139a4e6a06";
    app_subnet = "subnet-0801a424986d394d9, subnet-08c3371432240c362";
    break;
    
  case "tmx-ecomm dev":
    vpc_id = "vpc-066ca1c28befe151f";
    lbs_subnet = "subnet-0200d0582c6db9190, subnet-0a3fe954e364eb9c7";
    app_subnet = "subnet-0be39299f983f09aa, subnet-07e910d238aa2c14a";
    break;

  case "tmx-ecomm test":
    vpc_id = "vpc-02048e2212b9e0335";
    lbs_subnet = "subnet-049b8b5bb6e3dd894, subnet-01e99e7ff5d63b251";
    app_subnet = "subnet-0fa35bbd46a83eb2e, subnet-0abb007c7575ca66b";
    break;

  case "tmx-ecomm prod":
    vpc_id = "vpc-060176ad70173c5bd";
    lbs_subnet = "subnet-0bc94c94a05bb2cbd, subnet-0fa0c0ce5701bfe34";
    app_subnet = "subnet-052a003fe29fbd15f, subnet-0ad98fdd0b087da7c";
    break;

  case "tmx-integration dev":
    vpc_id = "vpc-017f5c0837ecb0839";
    lbs_subnet = "subnet-0d744fae9354141aa, subnet-0d41c14e3fc453c9c";
    app_subnet = "subnet-05dea48a108a5eaae, subnet-0b39ae62fd4e9347c";
    break;

  case "tmx-integration test":
    vpc_id = "vpc-02dc69ea180cedf3f";
    lbs_subnet = "subnet-0a3c56b1d3d7dd52f, subnet-0a3c56b1d3d7dd52f";
    app_subnet = "subnet-0923862850b381923, subnet-04de480f7b4876d1f";
    break;

  case "tmx-integration prod":
    vpc_id = "vpc-0900eb9b296e35c72";
    lbs_subnet = "subnet-03728da7fc8d9069c, subnet-0d65e2f7edb09a47a";
    app_subnet = "subnet-02279cfcd0a558a2e, subnet-0d83ea59caa561419";
    break;

  case "tmx-integration qa":
    vpc_id = "vpc-093a24f06fa52c1a8";
    lbs_subnet = "subnet-0844a7591a953319b, subnet-0f1a00c934c46cf3e";
    app_subnet = "subnet-040f710f364811a98, subnet-037a02d0f93b51d29";
    break;

  case "tmx-integration training":
    vpc_id = "vpc-0a2fa78b3220ad009";
    lbs_subnet = "subnet-04da17738e60a61af, subnet-067942c4db7817dca";
    app_subnet = "subnet-0aea9fe18f8d71822, subnet-05ccfbee6a6144750";
    break;

  case "tmx-integration uat":
    vpc_id = "vpc-01d1382a6ff836ffa";
    lbs_subnet = "subnet-0a411e9516f51288d, subnet-0c0906944fb42fe32";
    app_subnet = "subnet-0eb0d3f9cdf5c59aa, subnet-0efb36a523cd2e45e";
    break;
}

//write param json
const params = '['
+ '\n' + '"parameters":  {'
+ '\n\t'+ '"ParameterKey": "AlbListenerArn",'
      "ParameterValue": ""
    },
    {
      "ParameterKey": "VpcId", //This will be static based on Account/Env
      '"ParameterValue": "'   
    },
    {
      "ParameterKey": "DockerImageUrl",
      "ParameterValue": 
    },
    {
      "ParameterKey": "TargetEnv",
      "ParameterValue": ""
    },
    {
      "ParameterKey": "ContainerName",
      "ParameterValue": ""
    },
    {
      "ParameterKey": "ContainerPort",
      "ParameterValue": ""
      "Default": "6379"
    },
    {
      "ParameterKey": "ClusterName",
      "ParameterValue": ""
    },
    {
      "ParameterKey": "LogRetention",
      "ParameterValue": ""
      "Default": "7"
    },
    {
      "ParameterKey": "Version",
      "ParameterValue": ""
      "Default": "1"
    },
    {
      "ParameterKey": "RulePriority",
      "ParameterValue": ""
    },
    {
      "ParameterKey": "BusinessUnitTag",
      "ParameterValue": ""
    },
    {
      "ParameterKey": "CustomerTag",
      "ParameterValue": ""
    },
    {
      "ParameterKey": "EnvironmentTag",
      "ParameterValue": ""
    },
    { 
      "ParameterKey": "ManagedByTag",
      "ParameterValue": ""
    },
    {
      "ParameterKey": "ProductOwnerTag",
      "ParameterValue": ""
    },
    {
      "ParameterKey": "ProvisionedTag",
      "ParameterValue": ""
    },
    {
      "ParameterKey": "Subnets",
      "ParameterValue": ""
    },
    {
      "ParameterKey": "DesiredCount",
      "ParameterValue": ""
      "Default": "2"
    },
    
]       

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
    'vpc_id       = '+ vpc_id +'\n'+
    'subnets      = ['+ lbs_subnet +']' + '\n' +
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
  //res.sendFile(path.join(__dirname + '/express/fileSuccess.html'));

  // Get the current filenames 
// in the directory 
getCurrentFilenames(); 
  
// Using the recursive option to delete 
// multiple directories that are nested 
fs.rmdirSync("fargate-files", { 
  recursive: true, 
}); 
console.log("Directories Deleted!"); 
  
// Get the current filenames 
// in the directory to verify 
getCurrentFilenames(); 
  
  
// Function to get current filenames 
// in directory 
function getCurrentFilenames() { 
  console.log("\nCurrent filenames:"); 
  fs.readdirSync(__dirname).forEach(file => { 
    console.log(file); 
  }); 
  console.log("\n"); 
} 

  res.writeHead(301,
    {Location: req.body.repoUrl}
  );
  res.end();

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
