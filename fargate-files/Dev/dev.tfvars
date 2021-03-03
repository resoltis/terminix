#tags
Environment  ="Dev"
Provisioned  = "UACapstoneTeam"
ManagedBy    = "Terraform"
BusinessUnit = "TMX-BI-Dev"

#common
name         = "name"
vpc_id       = "vpc-017f5c0837ecb0839"
subnets      = ["subnet-0d41c14e3fc453c9c", "subnet-0d744fae9354141aa"]
cluster_name = "cname"

#task_defination
task_container_image   = image
task_container_port    = 80
task_host_port         = 80
task_definition_cpu    = 256
task_definition_memory = 0.5

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