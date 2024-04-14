provider "google" {
  project = "lumos-profile-management"
  region  = "asia-northeast1"
}

terraform {
  required_version = ">= 1.8.0"

  backend "gcs" {
    bucket = "lumos-profile-management-tf-state"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.24.0"
    }
  }
}
