////////////////////////////SERVER CREATION CODE/////////////////////////////////////////

//Create Web server
const http = require('http');
const express = require('express')
var path = require('path');
const app = express();
const port = 3000;
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
  console.log(`App running at http://localhost:${port}`)
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


app.post('/generateFiles', urlencodedParser, function (req, res) {

  //Require file system for writing to file
  const fs = require('fs');

  var vpc_id;
  var lbs_subnet;
  var app_subnet;
  var businessUnit = req.body.businessUnit.toLowerCase();

  switch (businessUnit) {
    case "tmx-bi dev":
      vpc_id = "vpc-06f5145b2cac7068b";
      lbs_subnet = "subnet-08ebb9f71f54d7c03, subnet-069e59ee55c7869e3";
      app_subnet = "subnet-095f194970f0b4e67, subnet-01bdd2bbffea58d05";
      break;

    case "tmx-bi-test":
      vpc_id = "vpc-03345761b43d01494";
      lbs_subnet = "subnet-020eb8f5b0f0bec16, subnet-0309f0225d9873637";
      app_subnet = "subnet-0201c3c0fef8eefcd, subnet-0201c3c0fef8eefcd";
      break;

    case "tmx-bi-prod":
      vpc_id = "vpc-0771449020fb5142e";
      lbs_subnet = "subnet-05dcf2f33949ab8bd, subnet-036d6d25becc25da3";
      app_subnet = "subnet-0862fb5b5fdf06437, subnet-0862fb5b5fdf06437";
      break;

    case "tmx-commercial-dev":
      vpc_id = "vpc-0b5f89b263be69844";
      lbs_subnet = "subnet-021398ea60b6db2ae, subnet-07ab7d6171c3340c1";
      app_subnet = "subnet-0af63390f61105857, subnet-0003fb6b3111a1ad8";
      break;

    case "tmx-commercial-test":
      vpc_id = "vpc-0362f2555d7037273";
      lbs_subnet = "subnet-0f05cdf1d8b3a118f, subnet-045cd73a31416024e";
      app_subnet = "subnet-0f7ee2e13ebc4b124, subnet-04e27598dd766efcc";
      break;

    case "tmx-commercial-prod":
      vpc_id = "vpc-057d430aaccafdca5";
      lbs_subnet = "subnet-0e423c994c9cd6025, subnet-017ee9c79564f6cae";
      app_subnet = "subnet-031af24954b9a26c4, subnet-0d5dc121b45ae86d3";
      break;

    case "tmx-corpapps-dev":
      vpc_id = "vpc-0fd1e0cfc291f05be";
      lbs_subnet = "subnet-07636b1042d2bf4da, subnet-0db16da98e74b5562";
      app_subnet = "subnet-0e38561ec0382221e, subnet-08e7f38db57fadb29";
      break;

    case "tmx-corpapps-test":
      vpc_id = "vpc-0359fbc43164c103b";
      lbs_subnet = "subnet-071a220f94baf629d, subnet-0656c9f056d03ae3a";
      app_subnet = "subnet-082ee696766bc5ccf, subnet-050b0738760de4673";
      break;

    case "tmx-corpapps-prod":
      vpc_id = "vpc-0e4c7265233e3ff91";
      lbs_subnet = "subnet-0450745fc01dadedd, subnet-0a6c6f339336989f8";
      app_subnet = "subnet-0d1a6ffad8ac87cb2, subnet-0def93e6d4e2b5bb1";
      break;

    case "tmx-corpapps-uat":
      vpc_id = "vpc-0258852e2748a052b";
      lbs_subnet = "subnet-0cb284514ee47809a, subnet-07ac2e23b61479718";
      app_subnet = "subnet-0361b6749e63a30ad, subnet-04b15609421ad1de4";
      break;

    case "tmx-corpapps-qa":
      vpc_id = "vpc-05c6abbc040534762";
      lbs_subnet = "subnet-0668228aa0d60d0f2, subnet-00b40396f36fea884";
      app_subnet = "subnet-019ef0cfdb445efa6, subnet-0f2c7ef0e714327cc";
      break;

    case "tmx-corpapps-training":
      vpc_id = "vpc-0b24f5cdf16e5ca81";
      lbs_subnet = "subnet-0a7ef8f120f916ca0, subnet-0d05f28139a4e6a06";
      app_subnet = "subnet-0801a424986d394d9, subnet-08c3371432240c362";
      break;

    case "tmx-ecomm-dev":
      vpc_id = "vpc-066ca1c28befe151f";
      lbs_subnet = "subnet-0200d0582c6db9190, subnet-0a3fe954e364eb9c7";
      app_subnet = "subnet-0be39299f983f09aa, subnet-07e910d238aa2c14a";
      break;

    case "tmx-ecomm-test":
      vpc_id = "vpc-02048e2212b9e0335";
      lbs_subnet = "subnet-049b8b5bb6e3dd894, subnet-01e99e7ff5d63b251";
      app_subnet = "subnet-0fa35bbd46a83eb2e, subnet-0abb007c7575ca66b";
      break;

    case "tmx-ecomm-prod":
      vpc_id = "vpc-060176ad70173c5bd";
      lbs_subnet = "subnet-0bc94c94a05bb2cbd, subnet-0fa0c0ce5701bfe34";
      app_subnet = "subnet-052a003fe29fbd15f, subnet-0ad98fdd0b087da7c";
      break;

    case "tmx-integration-dev":
      vpc_id = "vpc-017f5c0837ecb0839";
      lbs_subnet = "subnet-0d744fae9354141aa, subnet-0d41c14e3fc453c9c";
      app_subnet = "subnet-05dea48a108a5eaae, subnet-0b39ae62fd4e9347c";
      break;

    case "tmx-integration-test":
      vpc_id = "vpc-02dc69ea180cedf3f";
      lbs_subnet = "subnet-0a3c56b1d3d7dd52f, subnet-0a3c56b1d3d7dd52f";
      app_subnet = "subnet-0923862850b381923, subnet-04de480f7b4876d1f";
      break;

    case "tmx-integration-prod":
      vpc_id = "vpc-0900eb9b296e35c72";
      lbs_subnet = "subnet-03728da7fc8d9069c, subnet-0d65e2f7edb09a47a";
      app_subnet = "subnet-02279cfcd0a558a2e, subnet-0d83ea59caa561419";
      break;

    case "tmx-integration-qa":
      vpc_id = "vpc-093a24f06fa52c1a8";
      lbs_subnet = "subnet-0844a7591a953319b, subnet-0f1a00c934c46cf3e";
      app_subnet = "subnet-040f710f364811a98, subnet-037a02d0f93b51d29";
      break;

    case "tmx-integration-training":
      vpc_id = "vpc-0a2fa78b3220ad009";
      lbs_subnet = "subnet-04da17738e60a61af, subnet-067942c4db7817dca";
      app_subnet = "subnet-0aea9fe18f8d71822, subnet-05ccfbee6a6144750";
      break;

    case "tmx-integration-uat":
      vpc_id = "vpc-01d1382a6ff836ffa";
      lbs_subnet = "subnet-0a411e9516f51288d, subnet-0c0906944fb42fe32";
      app_subnet = "subnet-0eb0d3f9cdf5c59aa, subnet-0efb36a523cd2e45e";
      break;
  }
  //write parameter file here
  // const parameterFile = '[\n' +
  //   '\t{' +
  //   '\n\t "ParameterKey": "TargetEnv",' +
  //   '\n\t "ParameterValue": "' + req.body.environment +
  //   '"\n\t},' +
  //   '\n\t{' +
  //   '\n\t "ParameterKey": "DockerImageUrl",' +
  //   '\n\t "ParameterValue": "' + req.body.dockerImageUrl +
  //   '"\n\t},' +
  //   '\n\t{' +
  //   '\n\t "ParameterKey": "LogRetention",' +
  //   '\n\t "ParameterValue": "' + '7' +
  //   '"\n\t},' +
  //   '\n\t{' +
  //   '\n\t "ParameterKey": "BusinessUnitTag",' +
  //   '\n\t "ParameterValue": "' + req.body.businessUnit +
  //   '"\n\t},' +
  //   '\n\t{' +
  //   '\n\t "ParameterKey": "ProductOwnerTag",' +
  //   '\n\t "ParameterValue": "' + req.body.productOwner +
  //   '"\n\t},' +
  //   '\n\t{' +
  //   '\n\t "ParameterKey": "ContainerPort",' +
  //   '\n\t "ParameterValue": "' + req.body.containerPort +
  //   '"\n\t},' +
  //   '\n\t{' +
  //   '\n\t "ParameterKey": "DesiredCount",' +
  //   '\n\t "ParameterValue": "' + req.body.desiredCount +
  //   '"\n\t}' +
  //   '\n]';
  // //Print out the data we received
  // console.log(req.body);

  var services = req.body.service; //get list of services

  //make folder that will contain files for upload
  fs.mkdirSync(path.join('CFT Files'), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully!');

  });
  //Create parameter file
  fs.openSync(path.join('CFT Files', req.body.environment + '.params.json'), 'w');

  fs.writeFileSync(path.join('CFT Files', req.body.environment + '.params.json'), parameterFile, err => {
    if (err) {
      console.debug(err);
      //We may need to send user to a file fail page here
      return
    }
    //file written successfully


    // fs.writeFileSync(path.join('CTF Files', req.body.environment + '.params.json'), parameterFile, err => {
    //   if (err) {
    //     console.debug(err);
    //     //We may need to send user to a file fail page here
    //     return
    //   }
    //   //file written successfully

    // });


    //Create base level CFT File

    fs.openSync(path.join('CFT Files', 'cloudformation.yml'), 'w');

    //Append templates to yaml file
    //Completely expanded as long as templates are uploaded to YmlTemplates
    if (services.includes("fargate")) {
      fs.appendFileSync(path.join('CFT Files', 'cloudformation.yml'), fs.readFileSync(path.join('YmlTemplates', 'fargate.yml')), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    } else
      if (services.includes("s3_bucket")) {
        //do something
      }
      else if (services.includes("fargateIngress")) {
        //append FI template to Yaml file output
        fs.appendFileSync(path.join('CFT Files', 'cloudformation.yml'), fs.readFileSync(path.join('YmlTemplates', 'fargateIngress.yml')), function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
      }


    // Writes to Paramater File 
    fs.appendFileSync(path.join('CFT Files', req.body.environment + '.params.json'), '[\n');
    fileWriterJson(req.body.environment + '.params.json', 'AlbListenerArn', 'fill these values into the array of objects and then make a function to call on them here');
    fileWriterJson(req.body.environment + '.params.json', 'vpcID', vpcLookup(staticValues, req.body.account, req.body.environment));
    fileWriterJson(req.body.environment + '.params.json', 'DockerImageUrl', req.body.dockerImageUrl);
    fileWriterJson(req.body.environment + '.params.json', 'TargetEnv', req.body.targetEnv);
    fileWriterJson(req.body.environment + '.params.json', 'ContainerName', 'explain this with an example');
    fileWriterJson(req.body.environment + '.params.json', 'ClusterName', req.body.account + '-' + req.body.environment);
    fileWriterJson(req.body.environment + '.params.json', 'LogRetention', '7');
    fileWriterJson(req.body.environment + '.params.json', 'Version', req.body.version);
    fileWriterJson(req.body.environment + '.params.json', 'RulePriority', 'lets get to talking about it');
    fileWriterJson(req.body.environment + '.params.json', 'BusinessUnitTag', req.body.businessUnit);
    fileWriterJson(req.body.environment + '.params.json', 'CustomerTag', req.body.customerTag);
    fileWriterJson(req.body.environment + '.params.json', 'ManagedByTag', 'Portal name');
    fileWriterJson(req.body.environment + '.params.json', 'ProductOwnerTag', req.body.productOwner);
    fileWriterJson(req.body.environment + '.params.json', 'ProvisionedTag', 'Portal name');
    fileWriterJson(req.body.environment + '.params.json', 'Subnets', subLookup(staticValues, req.body.account, req.body.environment));
    fileWriterJsonLast(req.body.environment + '.params.json', 'DesiredCount', req.body.desiredCount);
    fs.appendFileSync(path.join('CFT Files', req.body.environment + '.params.json'), ']');

    function fileWriterJson(fileName, paramKey, paramValue) {
      fs.appendFileSync(path.join('CFT Files', fileName), '{' + '\n' + '"ParamaterKey": ' + '"' + paramKey + '",' + '\n');
      fs.appendFileSync(path.join('CFT Files', fileName), '"ParamaterValue": ' + '"' + paramValue + '"' + '\n' + '},\n');
      return
    }

    res.writeHead(301,
      { Location: req.body.repoUrl }
    );
    res.end();



    //This is just an example of how to sort the logic and "write to the file" for the param file. 
    // var account = 'TMX-BI'
    // var enviroment = 'Dev'
    // var businessUnit = 'lmlkm'
    // var productOwner = ['1', '2', '3', '4'];
    // var customerTag = ['tag1', 'tag2', 'tag3', 'tag4'];
    // var containerPort = ['80', '50', '90', '100'];
    // var containerCPU = ['256', '256', '256', '512'];
    // var containerMemory = ['.5', '1', '2', '1'];
    // var dockerimageurl = ['url1', 'url2', 'url3', 'url4'];
    // var desiredCount = ['1', '2', '3', '1'];
    // var serviceType = ['fni', 'fni', 'fi', 'fi'];


    // var memoryarray = [];
    // var cpuarray = [];
    // var portarray = [];
    // var dockerarray = [];
    // var ownerarray = [];
    // var tagarray = [];
    // var countarray = [];



    // let j = 1;

    // for (var i = 0; i < serviceType.length; i++) {
    //     if (i == 0) { // univerisal values go here
    //         console.log('AccountName : ' + account);
    //         console.log('TargetEnviorment : ' + enviroment);
    //         console.log('businessUnit : ' + account + '-' + enviroment);
    //         console.log('AlbListenerArn : will be defined later');
    //         console.log('VpcId : ' + vpcLookup(staticValues, account, enviroment));
    //         console.log('ContainerName : This is the project name based off the repo');
    //         console.log('ClusterName : ' + account + '-' + enviroment + '-Cluster');
    //         console.log('Logretention : 7');
    //         console.log('RulePriority : not yet known');
    //         console.log('ManagedBy : portal name');
    //         console.log('subnets : ' + subLookup(staticValues, account, enviroment));
    //     }

    //     if (serviceType[i] == 'fi' || serviceType[i] == 'fni') {

    //         var memory = 'ContainerMemory' + j;
    //         var cpu = 'ContainerCPU' + j;
    //         var port = 'ContainerPort' + j;
    //         var docker = 'DockerImageUrl' + j;
    //         var owner = 'ProductOwner' + j;
    //         var tag = 'CustomerTag' + j;
    //         var count = 'DesiredCount' + j;
    //         j++;
    //     }

    //     switch (serviceType[i]) {

    //         case 'fi':  //Fargate Ingress\

    //             memoryarray[i] = (memory + ' : ' + containerMemory[i]);
    //             portarray[i] = (port + ' : ' + containerPort[i]);
    //             cpuarray[i] = (cpu + ' : ' + containerCPU[i]);
    //             dockerarray[i] = (docker + ' : ' + dockerimageurl[i]);
    //             ownerarray[i] = (owner + ' : ' + productOwner[i]);
    //             tagarray[i] = (tag + ' : ' + customerTag[i]);
    //             countarray[i] = (count + ' : ' + desiredCount[i]);
    //             break;



    //         case "fni": //Fargate Non Ingress

    //             memoryarray[i] = (memory + ' : ' + containerMemory[i]);
    //             portarray[i] = (port + ' : ' + containerPort[i]);
    //             cpuarray[i] = (cpu + ' : ' + containerCPU[i]);
    //             dockerarray[i] = (docker + ' : ' + dockerimageurl[i]);
    //             ownerarray[i] = (owner + ' : ' + productOwner[i]);
    //             tagarray[i] = (tag + ' : ' + customerTag[i]);
    //             countarray[i] = (count + ' : ' + desiredCount[i]);
    //             break;

    //     }

    // }
    // printarray(memoryarray, serviceType.length);
    // printarray(portarray, serviceType.length);
    // printarray(cpuarray, serviceType.length);
    // printarray(dockerarray, serviceType.length);
    // printarray(ownerarray, serviceType.length);
    // printarray(tagarray, serviceType.length);
    // printarray(countarray, serviceType.length);


    // function printarray(array, length) {
    //     for (var i = 0; i < length; i++) {
    //         console.log(array[i]);
    //     }
    // }

    function vpcLookup(values, accountName, enviorment) {
      let specificValue = values.find(specificValue => specificValue.accName === accountName && specificValue.env === enviorment);
      let valueSeek = specificValue.vpc;
      return valueSeek;
    }
    function subLookup(values, accountName, enviorment) {
      let specificValue = values.find(specificValue => specificValue.accName === accountName && specificValue.env === enviorment);
      let valueSeek = specificValue.sub1 + ',' + specificValue.sub2;
      return valueSeek;
    }




  });

});
