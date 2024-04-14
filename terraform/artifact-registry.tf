resource "google_artifact_registry_repository" "main-repo" {
  project       = var.project_id
  location      = var.region
  repository_id = "main"
  format        = "DOCKER"

  cleanup_policy_dry_run = false
  cleanup_policies {
    id     = "delete"
    action = "DELETE"
    condition {
      tag_state  = "ANY"
      older_than = "1209600s" # 14 days
    }
  }

  cleanup_policies {
    id     = "keep-minimum-versions"
    action = "KEEP"
    most_recent_versions {
      keep_count = 5
    }
  }
}
