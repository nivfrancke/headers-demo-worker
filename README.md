# Cloudflare Worker - cURL Redirect

This Worker demonstrates:
- User-Agent detection for cURL requests
- Conditional redirects to Cloudflare Workers documentation
- Cookie-based bypass mechanism (`cf-noredir=true`)
- Proxying requests to a Cloudflare Tunnel subdomain

## Features
- Redirects cURL requests to Cloudflare Workers docs
- Bypass redirect with cookie: `cf-noredir=true`
- Proxies all other traffic to tunnel subdomain

## Created for a Cloudflare Customer Solutions Engineer Technical Project 
