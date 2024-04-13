import requests
import json


def search_github_repos(tag, programming_language):
    url = "https://api.github.com/search/repositories"
    params = {
        "q": f"{tag} language:{programming_language}",
        "sort": "starts",
        "order": "desc",
        "per_page": 1
    }

    headers = {
        "Accept": "application/vnd.github.v3+json"
    }
    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        data = response.json()
        if data["total_count"] > 0:
            repository = data["items"][0]
            library = {
                "name": repository["name"],
                "description": repository["description"],
                "url": repository["html_url"],
                "tags": [],
                "programming_language": programming_language
            }
            return library
    return None


tags = []
prog_langs = []
libs = {
    "libraries": []
}

for tag in tags:
    for programming_language in prog_langs:
        library = search_github_repos(tag, programming_language)
        if library:
            libs["libraries"].append(library)


with open("libraries.json", "w") as file:
    json.dump(libs, file, indent=4)
