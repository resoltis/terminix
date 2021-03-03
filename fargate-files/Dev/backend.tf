terraform {
	backend "s3" {
		bucket  = "tf-svm-state-files-prod"
		key     = "TMX-BI-Dev/salesforceworkorderkafkaconsumer/ecs_fargate_stack/terraform.tfstate"
		region  = "us-east-1"
		profile = "obiwanprod"
	}
}