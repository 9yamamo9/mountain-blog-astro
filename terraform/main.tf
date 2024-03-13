resource "cloudflare_pages_project" "this" {
  account_id        = var.cloudflare_account_id
  name              = "mountain-forest-blog"
  production_branch = "main"

  build_config {
    build_caching   = false
    build_command   = "yarn build"
    destination_dir = "dist"
  }

  deployment_configs {
    preview {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-03-12"
      compatibility_flags                  = []
      d1_databases                         = {}
      durable_object_namespaces            = {}
      environment_variables                = {}
      fail_open                            = true
      kv_namespaces                        = {}
      r2_buckets                           = {}
      secrets                              = {}
      usage_model                          = "standard"
    }
    production {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-03-12"
      compatibility_flags                  = []
      d1_databases                         = {}
      durable_object_namespaces            = {}
      environment_variables                = {}
      fail_open                            = true
      kv_namespaces                        = {}
      r2_buckets                           = {}
      secrets                              = {}
      usage_model                          = "standard"
    }
  }

  source {
    type = "github"
    config {
      deployments_enabled           = true
      owner                         = "9yamamo9"
      pr_comments_enabled           = true
      preview_branch_excludes       = ["main", "deploy"]
      preview_branch_includes       = ["preview"]
      preview_deployment_setting    = "all"
      production_branch             = "main"
      production_deployment_enabled = true
      repo_name                     = "mountain-blog-astro"
    }
  }
}