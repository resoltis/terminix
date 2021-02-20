#tags
Environment  ="Test"
Provisioned  = "SampathOlluri"
ManagedBy    = "Terraform"
BusinessUnit = "TMX-CorpsApps-Test"

#common
name         = "name"
vpc_id       = "vpc-017f5c0837ecb0839"
subnets      = ["subnet-0d41c14e3fc453c9c", "subnet-0d744fae9354141aa"]
cluster_name = "cname"

#task_defination
task_container_image   = "328023855383.dkr.ecr.us-east-1.amazonaws.com/salesforceworkorderkafkaconsumer:dev"
task_container_port    = 80
task_host_port         = 80
task_definition_cpu    = 1024
task_definition_memory = 2

#alb
alb_port     = 80
alb_protocol = "HTTP"

#tg
tg_port     = undefined
tg_protocol = "HTTP"

#service
app_count   = 1
launch_type = "FARGATE"
container_port = 80