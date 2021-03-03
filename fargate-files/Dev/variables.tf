#common
variable "Environment" { default = "" }
variable "Provisioned" { default = "" }
variable "ManagedBy" { default = "" }
variable "BusinessUnit" { default = "" }
variable "vpc_id" { default = "" }
variable "subnets" {
 type    = list(string)
 default = []
}
variable "name" { default = "" }
variable "name_prefix" { default = "" }
variable "cluster_name" { default = "" }
variable "task_container_image" { default = "" }
variable "container_name" { default = "" }
variable "task_container_port" { default = "" }
variable "task_host_port" { default = "" }
variable "task_definition_cpu" { default = "" }
variable "task_definition_memory" { default = "" }
variable "alb_port" { default = "" }
variable "alb_protocol" { default = "" }
variable "tg_port" { default = "" }
variable "tg_protocol" { default = "" }
variable "app_count" { default = "" }
variable "launch_type" { default = "" }
variable "container_port" { default = "" }