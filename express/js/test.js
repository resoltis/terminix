const fs = require('fs');

    const content = '#tags' + '\n' +
    'Environment  = "Dev"' + '\n' +
    'Provisioned  = "SampathOlluri"' + '\n' +
    'ManagedBy    = "Terraform"' + '\n' +
    'BusinessUnit = "TMX-Integration-DEV"' + '\n\n' +

    '#common' + '\n' +
    'name         = "sfworkorderkafkaconsumer"' + '\n' +
    'vpc_id       = "vpc-017f5c0837ecb0839"' + '\n' +
    'subnets      = ["subnet-0d41c14e3fc453c9c", "subnet-0d744fae9354141aa"]' + '\n' +
    'cluster_name = "tmx-integration-cluster1"' + '\n\n' +

    '#task_defination' + '\n' +
    'task_container_image   = "328023855383.dkr.ecr.us-east-1.amazonaws.com/salesforceworkorderkafkaconsumer:dev"' + '\n' +
    'task_container_port    = 80' + '\n' +
    'task_host_port         = 80' + '\n' +
    'task_definition_cpu    = 256' + '\n' +
    'task_definition_memory = 512' + '\n\n' +

    '#alb' + '\n' +
    'alb_port     = 80' + '\n' +
    'alb_protocol = "HTTP"' + '\n\n' +

    '#tg' + '\n' +
    'tg_port     = 80' + '\n' +
    'tg_protocol = "HTTP"' + '\n\n' +

    '#service' + '\n' +
    'app_count   = 1' + '\n' +
    'launch_type = "FARGATE"' + '\n' +
    'container_port = 80';

    alert('test');
    fs.writeFileSync('dev.tfvars', content, err => {
        if (err) {
            alert(err)
            return
        }
        alert(content);
    //file written successfully
    });