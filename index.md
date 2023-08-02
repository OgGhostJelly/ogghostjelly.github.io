---
layout: navigator
title: "Cooking With OgGhostJelly"
---

<link rel="icon" type="image/x-icon" href="{{ "/assets/images/cooking-with-ogghostjelly" | relative_url }}">

{% for recipe in site.recipes %}
  * [{{ recipe.title }}]({{recipe.url | relative_url}})
{% endfor %}