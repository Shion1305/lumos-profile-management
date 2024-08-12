import {
  id = "asia-northeast1/release"
  to = google_cloud_run_v2_service.release
}

resource "google_cloud_run_v2_service" "release" {
  annotations      = {}
  client           = "cloud-console"
  client_version   = null
  custom_audiences = []
  description      = null
  ingress          = "INGRESS_TRAFFIC_ALL"
  labels           = {}
  launch_stage     = "GA"
  location         = "asia-northeast1"
  name             = "release"
  project          = "lumos-profile-management"
  template {
    annotations           = {}
    encryption_key        = null
    execution_environment = null
    labels = {
      commit-sha = "51388093213b127735a6253af62a08fcfb1276f8"
      github_sha = "edb2df9aa77a4294d8c4475cc2e733fc38edc011"
      managed-by = "github-actions"
    }
    max_instance_request_concurrency = 80
    revision                         = null
    service_account                  = "938038185918-compute@developer.gserviceaccount.com"
    session_affinity                 = false
    timeout                          = "300s"
    containers {
      args        = []
      command     = []
      depends_on  = []
      image       = "asia-northeast1-docker.pkg.dev/lumos-profile-management/main/nuxt3-release:latest"
      name        = "nuxt3-release-1"
      working_dir = null
      ports {
        container_port = 8080
        name           = "http1"
      }
      resources {
        cpu_idle = true
        limits = {
          cpu    = "1000m"
          memory = "512Mi"
        }
        startup_cpu_boost = true
      }
      startup_probe {
        failure_threshold     = 1
        initial_delay_seconds = 0
        period_seconds        = 240
        timeout_seconds       = 240
        tcp_socket {
          port = 8080
        }
      }
    }
    scaling {
      max_instance_count = 100
      min_instance_count = 0
    }
  }
  traffic {
    percent  = 100
    revision = null
    tag      = null
    type     = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }
}
