data "google_secret_manager_secret" "discord_auth_url" {
  secret_id = "DISCORD_AUTH_URL"
}
data "google_secret_manager_secret" "discord_bot_token" {
  secret_id = "DISCORD_BOT_TOKEN"
}
data "google_secret_manager_secret" "discord_callback_uri" {
  secret_id = "DISCORD_CALLBACK_URI"
}
data "google_secret_manager_secret" "discord_client_id" {
  secret_id = "DISCORD_CLIENT_ID"
}
data "google_secret_manager_secret" "discord_client_secret" {
  secret_id = "DISCORD_CLIENT_SECRET"
}
data "google_secret_manager_secret" "discord_guild_id" {
  secret_id = "DISCORD_GUILD_ID"
}
data "google_secret_manager_secret" "discord_member_role_id" {
  secret_id = "DISCORD_MEMBER_ROLE_ID"
}
data "google_secret_manager_secret" "firebase_admin_cert_path" {
  secret_id = "FIREBASE_ADMIN_CERT_PATH"
}
data "google_secret_manager_secret" "jwt_secret" {
  secret_id = "JWT_SECRET"
}
data "google_secret_manager_secret" "line_auth_url" {
  secret_id = "LINE_AUTH_URL"
}
data "google_secret_manager_secret" "line_callback_uri" {
  secret_id = "LINE_CALLBACK_URI"
}
data "google_secret_manager_secret" "line_client_id" {
  secret_id = "LINE_CLIENT_ID"
}
data "google_secret_manager_secret" "line_client_secret" {
  secret_id = "LINE_CLIENT_SECRET"
}
