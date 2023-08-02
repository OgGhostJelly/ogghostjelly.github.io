---
layout: default
---
<title>{{ page.title }}</title>

# {{ page.title }}™

{% for recipe in site.recipes %}
  * [ {{ recipe.url | relative_url }} ] ( {{ recipe.title }} )
{% endfor %}