#########################################################
#environment variable for task defination
#########################################################

#   task_container_environment = {
#     "ASPNETCORE_ENVIRONMENT" = var.Environment
#   }

#########################################################
#########################################################
#tags
#########################################################
locals {
	Environment  = var.Environment
	Provisioned  = var.Provisioned
	ManagedBy    = var.ManagedBy
	BusinessUnit = var.BusinessUnit
}

locals {
	# Common tags to be assigned to all resources
	common_tags = {
		Environment  = local.Environment
		Provisioned  = local.Provisioned
		ManagedBy    = local.ManagedBy
		BusinessUnit = local.BusinessUnit
	}
}

#########################################################
#Container Defination
#########################################################

resource "aws_cloudwatch_log_group" "main" {
	name              = "${var.name}"
	tags              = local.common_tags
	retention_in_days = 14
}

module "ecs-task-definition" {
	source = "git::https://ounganpfuzzeit7hzjd3iiw2m5a3wbmkdmssbn5xgtm24nenxdpq@tfs-svm.visualstudio.com/Terraform-Modules/_git/terraform-aws-ecs-fargate-task-definition?ref=master"

	enabled              = true
	name_prefix          = "${var.name}-td"
	task_container_image = var.task_container_image

	container_name      = var.name
	task_container_port = var.task_container_port
	task_host_port      = var.task_host_port

	task_definition_cpu    = var.task_definition_cpu
	task_definition_memory = var.task_definition_memory

	task_container_environment = {
		  "ASPNETCORE_ENVIRONMENT" = var.Environment
	}

	cloudwatch_log_group_name = var.name

	task_stop_timeout = 90

	tags = local.common_tags

}


#########################################################
#Cluster
#########################################################

resource "aws_ecs_cluster" "main" {
name = var.cluster_name
 tags = local.common_tags
}

#########################################################
# ALB
#########################################################
resource "aws_lb" "main" {
name               = "${var.name}-lb"
internal           = true
load_balancer_type = "application"
security_groups    = [aws_security_group.main.id]
subnets            = var.subnets
 tags               = local.common_tags
}

# lb listerner
resource "aws_lb_listener" "main" {

load_balancer_arn = aws_lb.main.id
port              = var.alb_port
protocol          = var.alb_protocol

default_action
target_group_arn = aws_lb_target_group.main.id
type             = "forward"
}

#########################################################
#Target Group
#########################################################

resource "aws_lb_target_group" "main" {

	name     = "${var.name}-tg"
	port     = var.tg_port
	protocol = var.tg_protocol

	vpc_id      = var.vpc_id
	target_type = "ip"

	deregistration_delay = 90
	 tags                 = local.common_tags

	health_check {
		timeout             = 5
		interval            = 30
		path                = "/"
		protocol            = var.tg_protocol
		healthy_threshold   = 3
		unhealthy_threshold = 3
		matcher             = "200"
	}
0}
0#########################################################
#Security Group
#########################################################

resource "aws_security_group" "main" {
	name   = "${var.name}-sg"
	vpc_id = var.vpc_id
	tags   = local.common_tags
}

resource "aws_security_group_rule" "app_lb_allow_outbound" {
	security_group_id = aws_security_group.main.id

	type        = "egress"
	from_port   = 0
	to_port     = 0
	protocol    = "-1"
	cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "app_lb_allow_all_http" {
	security_group_id = aws_security_group.main.id
	type              = "ingress"
	from_port         = 0
	to_port           = 65535
	protocol          = "tcp"
	cidr_blocks       = ["10.0.0.0/8"]
}

#########################################################
# ECS Fargate Service
#########################################################

resource "aws_ecs_service" "main" {
	name            = "${var.name}-service"
	cluster         = aws_ecs_cluster.main.id
	task_definition = module.ecs-task-definition.task_definition_arn
	desired_count   = var.app_count
	launch_type     = var.launch_type
	tags            = local.common_tags

	network_configuration {
		security_groups = [aws_security_group.main.id]
		subnets         = var.subnets
		assign_public_ip = false
	}

	load_balancer {
		target_group_arn = aws_lb_target_group.main.id
		container_name   = var.name
		container_port   = var.container_port
	}

	depends_on = [aws_lb_listener.main]
}