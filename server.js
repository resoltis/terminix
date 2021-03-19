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


//POST method for generating files
//(POST action name, parser, function(request, response))

app.post('/generateFiles', urlencodedParser, function (req, res) {

  var vpc_id;
  var lbs_subnet;
  var app_subnet;
  var businessUnit = req.body.businessUnit.toLowerCase()
  switch (businessUnit) {
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






  // //Require file system for writing to file
  // const fs = require('fs');
  // staticValues.accName.get
  // //Print out the data we received
  // console.log(req.body);

  //Put TF file text into a single string called content
  //Variables are passed as 'req.body' + variable name


  // const devContent = '#tags' + '\n' +
  //   'Environment  =\"' + req.body.environment + '\"\n' +
  //   'Provisioned  = "UACapstoneTeam"' + '\n' +
  //   'ManagedBy    = "Terraform"' + '\n' +
  //   'BusinessUnit = \"' + req.body.businessUnit + '\"\n\n' +

  //   '#common' + '\n' +
  //   'name         = \"' + req.body.fargateName + '\"\n' +
  //   'vpc_id       = ' + vpc_id + '\n' +
  //   'subnets      = [' + lbs_subnet + ']' + '\n' +
  //   'cluster_name = \"' + req.body.clusterName + '\"\n\n' +

  //   '#task_defination' + '\n' +
  //   'task_container_image   = ' + req.body.taskContainerImage + '\n' +
  //   'task_container_port    = ' + req.body.containerPort + '\n' +
  //   'task_host_port         = ' + req.body.hostPort + '\n' +
  //   'task_definition_cpu    = ' + req.body.taskCPU + '\n' +
  //   'task_definition_memory = ' + req.body.taskMemory + '\n\n' +

  //   '#alb' + '\n' +
  //   'alb_port     = ' + req.body.albPort + '\n' +
  //   'alb_protocol = "HTTP"' + '\n\n' +

  //   '#tg' + '\n' +
  //   'tg_port     = ' + req.body.tgPort + '\n' +
  //   'tg_protocol = "HTTP"' + '\n\n' +

  //   '#service' + '\n' +
  //   'app_count   = ' + req.body.appCount + '\n' +
  //   'launch_type = "FARGATE"' + '\n' +
  //   'container_port = ' + req.body.containerPort;


  // //write main file
  // fs.writeFileSync(path.join('fargate-files', req.body.environment, 'main.tf'), providerMain, err => {
  //   if (err) {
  //     console.debug(err);
  //     return
  //   }
  //});


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
    { Location: req.body.repoUrl }
  );
  res.end();

});
