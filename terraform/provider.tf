provider "google" {
  project = "lumos-profile-management"
  region  = "asia-northeast1"
}

terraform {
  required_version = ">= 1.8.0"

  backend "local" {
    path = "state/terraform.tfstate"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.24.0"
    }
  }
}
