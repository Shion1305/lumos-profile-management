variable "project_id" {
  type        = string
  description = "The GCP project ID."
  default     = "lumos-profile-management"
}

variable "region" {
  type        = string
  description = "The GCP region."
  default     = "asia-northeast1"
}

variable "zone" {
  type        = string
  description = "The GCP zone."
  default     = "asia-northeast1-a"
}
