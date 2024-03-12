terraform {
  required_version = "~> 1.7.0"

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "Mt-Three-Trees"
    workspaces {
      name = "mountain-blog-astro"
    }
    token = var.terraform_api_token
  }
}