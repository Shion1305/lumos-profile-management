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
      github_sha = "this_label_is_used_for_deployment"
    }
    max_instance_request_concurrency = 80
    revision                         = null
    service_account                  = "cloudrun-svc@lumos-profile-management.iam.gserviceaccount.com"
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
      env {
        name = "NUXT_PUBLIC_DISCORD_AUTH_URL"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.discord_auth_url.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "NUXT_DISCORD_BOT_TOKEN"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.discord_bot_token.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "NUXT_DISCORD_CALLBACK_URI"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.discord_callback_uri.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "NUXT_DISCORD_CLIENT_ID"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.discord_client_id.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "NUXT_DISCORD_CLIENT_SECRET"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.discord_client_secret.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "NUXT_DISCORD_GUILD_ID"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.discord_guild_id.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "NUXT_DISCORD_MEMBER_ROLE_ID"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.discord_member_role_id.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "NUXT_JWT_SECRET"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.jwt_secret.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "NUXT_PUBLIC_LINE_AUTH_URL"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.line_auth_url.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "NUXT_LINE_CALLBACK_URI"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.line_callback_uri.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "NUXT_LINE_CLIENT_ID"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.line_client_id.secret_id
            version = "latest"
          }
        }
      }
      env {
        name = "NUXT_LINE_CLIENT_SECRET"
        value_source {
          secret_key_ref {
            secret  = data.google_secret_manager_secret.line_client_secret.secret_id
            version = "latest"
          }
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
  lifecycle {
    ignore_changes = [
      template[0].labels,
    ]
  }
}
